import {
  updateConfigFile,
  toAbsolute,
  DEFAULT_CONFIG_FILE_NAME,
} from '@carnesen/bitcoin-config';
import { isServiceRunning } from './is-service-running';
import { ServiceOptions } from './constants';
import { spawnBitcoind } from './spawn-bitcoind';

export async function startService(options: ServiceOptions = {}) {
  const returnValue = { changed: false };
  const configFilePath = toAbsolute(options.conf || DEFAULT_CONFIG_FILE_NAME);
  if (!isServiceRunning(options)) {
    returnValue.changed = true;
    updateConfigFile(configFilePath, { daemon: true });
    await Promise.race([
      spawnBitcoind(options),
      new Promise((_, reject) => {
        setTimeout(() => {
          reject(new Error('Timed out spawning bitcoind'));
        }, 5000);
      }),
    ]);
  }
  return returnValue;
}
