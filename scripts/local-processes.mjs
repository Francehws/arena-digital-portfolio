import { spawn, spawnSync } from 'node:child_process';
import { open } from 'node:fs/promises';
import { once } from 'node:events';
import { setTimeout as delay } from 'node:timers/promises';
export function minimalEnvironment(source = process.env) {
  const safe = { NEXT_TELEMETRY_DISABLED: '1' };
  for (const key of [
    'PATH',
    'HOME',
    'TMPDIR',
    'LANG',
    'LC_ALL',
    'LC_CTYPE',
    'TERM',
    'SystemRoot',
  ])
    if (source[key] !== undefined) safe[key] = source[key];
  return safe;
}
export function fingerprint(pid) {
  const r = spawnSync('ps', ['-p', String(pid), '-o', 'lstart='], {
    encoding: 'utf8',
  });
  return r.status === 0 ? r.stdout.trim() : '';
}
export async function terminateOwned(item, child) {
  if (!item?.started || fingerprint(item.pid) !== item.started) return false;
  try {
    process.kill(-item.pid, 'SIGTERM');
  } catch {
    return false;
  }
  if (child && child.exitCode === null && child.signalCode === null) {
    await Promise.race([once(child, 'exit').catch(() => {}), delay(1000)]);
    if (fingerprint(item.pid) === item.started) {
      try {
        process.kill(-item.pid, 'SIGKILL');
      } catch {}
    }
  }
  return true;
}
export async function startManagedProcess(
  app,
  {
    state,
    persist,
    probe,
    logPath,
    timeoutMs = 30000,
    sourceEnv = process.env,
  },
) {
  const log = await open(logPath, 'a', 0o600);
  let child;
  let item;
  try {
    child = spawn(app.command, app.args, {
      cwd: app.cwd,
      detached: true,
      stdio: ['ignore', log.fd, log.fd],
      env: minimalEnvironment(sourceEnv),
    });
    await once(child, 'spawn');
    item = { pid: child.pid, started: fingerprint(child.pid), port: app.port };
    if (!item.started)
      throw new Error('Processo demo terminato durante l’avvio.');
    state[app.id] = item;
    await persist();
    const deadline = Date.now() + timeoutMs;
    while (Date.now() < deadline) {
      if (child.exitCode !== null || child.signalCode !== null)
        throw new Error('Processo demo terminato prima di essere pronto.');
      if (await probe(app.port)) {
        child.unref();
        return item;
      }
      await delay(100);
    }
    throw new Error('Tempo di avvio superato.');
  } catch (error) {
    if (item) await terminateOwned(item, child);
    delete state[app.id];
    try {
      await persist();
    } catch {}
    throw new Error(
      `${app.id}: avvio non completato. Vedi il log locale privato.`,
      { cause: error },
    );
  } finally {
    await log.close();
  }
}
