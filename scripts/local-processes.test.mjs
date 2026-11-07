import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { startManagedProcess } from './local-processes.mjs';
test('un avvio fallito termina il processo e non eredita configurazioni database o token', async () => {
  const dir = await mkdtemp(path.join(os.tmpdir(), 'arena-launcher-test-'));
  const output = path.join(dir, 'probe.json');
  const state = {};
  let recorded = false;
  const code = `require('node:fs').writeFileSync(${JSON.stringify(output)},JSON.stringify({pid:process.pid,keys:Object.keys(process.env)}));setInterval(()=>{},1000);`;
  try {
    await assert.rejects(
      startManagedProcess(
        {
          id: 'fixture',
          command: process.execPath,
          args: ['-e', code],
          cwd: dir,
          port: 0,
        },
        {
          state,
          persist: async () => {
            recorded ||= Boolean(state.fixture);
          },
          probe: async () => false,
          logPath: path.join(dir, 'log'),
          timeoutMs: 400,
          sourceEnv: {
            PATH: process.env.PATH,
            DATABASE_URL: 'not-a-real-database',
            BETTER_AUTH_SECRET: 'synthetic-marker',
            NODE_OPTIONS: '--no-warnings',
          },
        },
      ),
      /avvio non completato/,
    );
    const child = JSON.parse(await readFile(output, 'utf8'));
    assert.equal(recorded, true);
    assert.deepEqual(state, {});
    for (const key of ['DATABASE_URL', 'BETTER_AUTH_SECRET', 'NODE_OPTIONS'])
      assert.equal(child.keys.includes(key), false);
    assert.throws(
      () => process.kill(child.pid, 0),
      (error) => error.code === 'ESRCH',
    );
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});
