import { spawnSync } from 'node:child_process';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import net from 'node:net';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  minimalEnvironment,
  terminateOwned,
  startManagedProcess,
} from './local-processes.mjs';
const root = fileURLToPath(new URL('../', import.meta.url));
const privateRoot = path.join(root, '.local-demos');
const statePath = path.join(privateRoot, 'launcher-processes.json');
const apps = [
  {
    id: 'tavqi',
    port: 4181,
    dir: 'tavqi',
    command: './start-local.sh',
    args: [],
  },
  { id: 'auto', port: 4182, dir: 'auto', command: './local-run.py', args: [] },
  {
    id: 'receptionist',
    port: 4183,
    dir: 'receptionist',
    command: process.execPath,
    args: [
      'run-local.mjs',
      'node',
      'node_modules/next/dist/bin/next',
      'dev',
      'apps/web',
      '--turbopack',
      '--hostname',
      '127.0.0.1',
      '--port',
      '4183',
    ],
  },
  { id: 'fps', port: 4184, dir: 'fps', command: './start-local.sh', args: [] },
  {
    id: 'portfolio',
    port: 4175,
    dir: '..',
    command: process.execPath,
    args: [
      path.join(root, 'node_modules/vite/bin/vite.js'),
      'preview',
      '--host',
      '127.0.0.1',
      '--port',
      '4175',
      '--strictPort',
    ],
  },
];
const alive = (port) =>
  new Promise((resolve) => {
    const socket = net.connect({ host: '127.0.0.1', port });
    socket.setTimeout(500);
    socket.once('connect', () => {
      socket.destroy();
      resolve(true);
    });
    socket.once('error', () => resolve(false));
    socket.once('timeout', () => {
      socket.destroy();
      resolve(false);
    });
  });
const command = process.argv[2] || 'status';
const names = process.argv.slice(3);
if (names.some((name) => !apps.some((app) => app.id === name)))
  throw new Error('Nome demo non riconosciuto.');
const selectedApps = names.length
  ? apps.filter((app) => names.includes(app.id))
  : apps;
await mkdir(privateRoot, { recursive: true, mode: 0o700 });
let state = {};
try {
  state = JSON.parse(await readFile(statePath, 'utf8'));
} catch {}
if (command === 'stop') {
  for (const app of selectedApps) {
    const item = state[app.id];
    if (!item) continue;
    if (await terminateOwned(item))
      console.log(`${app.id}: processo avviato dal launcher fermato.`);
    delete state[app.id];
  }
  await writeFile(statePath, JSON.stringify(state, null, 2), { mode: 0o600 });
  console.log(
    'Database conservato; eventuali processi avviati separatamente non vengono fermati.',
  );
} else if (command === 'up') {
  const pg = spawnSync(
    'pg_ctl',
    ['-D', path.join(privateRoot, 'postgres'), 'status'],
    { stdio: 'ignore', env: minimalEnvironment() },
  );
  if (pg.status !== 0) {
    const start = spawnSync(
      'pg_ctl',
      [
        '-D',
        path.join(privateRoot, 'postgres'),
        '-l',
        path.join(privateRoot, 'postgres.log'),
        '-w',
        'start',
      ],
      { stdio: 'ignore', env: minimalEnvironment() },
    );
    if (start.status !== 0)
      throw new Error(
        'Database demo non avviato: verificare la copia locale esistente. Nessun database viene inizializzato o cancellato.',
      );
  }
  for (const app of selectedApps) {
    if (await alive(app.port)) {
      console.log(`${app.id}: già attivo su ${app.port}.`);
      continue;
    }
    await startManagedProcess(
      { ...app, cwd: path.resolve(privateRoot, app.dir) },
      {
        state,
        persist: () =>
          writeFile(statePath, JSON.stringify(state, null, 2), { mode: 0o600 }),
        probe: alive,
        logPath: path.join(privateRoot, `launcher-${app.id}.log`),
      },
    );
    console.log(`${app.id}: attivo su ${app.port}.`);
  }
  console.log('Portfolio: http://127.0.0.1:4175/');
} else if (command === 'status') {
  console.log(`PostgreSQL demo: ${(await alive(55439)) ? 'attivo' : 'spento'}`);
  for (const app of apps)
    console.log(
      `${app.id}: ${(await alive(app.port)) ? 'attivo' : 'spento'} · http://127.0.0.1:${app.port}`,
    );
} else throw new Error('Usa up, status o stop.');
