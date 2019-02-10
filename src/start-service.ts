import { updateConfigFile } from '@carnesen/bitcoin-config';
import { isServiceRunning } from './is-service-running';

import { join } from 'path';
import { spawn as childProcessSpawn } from 'child_process';
import { platform } from 'os';

const BITCOIND_EXE = platform() === 'win32' ? 'bitcoind.exe' : 'bitcoind';

export async function startService(configFilePath: string, bitcoinHome?: string) {
  const returnValue = { changed: false };
  if (!isServiceRunning(configFilePath)) {
    returnValue.changed = true;
    updateConfigFile(configFilePath, { daemon: true });
    await new Promise((resolve, reject) => {
      const command = bitcoinHome ? join(bitcoinHome, 'bin', BITCOIND_EXE) : BITCOIND_EXE;
      const args = [`-conf=${configFilePath}`];
      const spawned = childProcessSpawn(command, args, {
        stdio: 'inherit',
      });

      spawned.on('error', err => {
        reject(err);
      });

      spawned.on('exit', code => {
        if (code === 0) {
          resolve();
        } else {
          // bitcoind has hopefully printed an error message to console too
          reject(new Error(`bitcoind exited with code ${code}`));
        }
      });

      setTimeout(() => {
        reject(new Error('Timed out spawning bitcoind'));
      }, 5000);
    });
  }
  return returnValue;
}
