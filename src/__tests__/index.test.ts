import { resolve, join } from 'path';
import { installSoftware, getBitcoinHome } from '@carnesen/bitcoin-software';
import { writeConfigFile } from '@carnesen/bitcoin-config';

import { stopService } from '../stop-service';
import { startService } from '../start-service';
import { isServiceRunning } from '../is-service-running';
import { restartService } from '../restart-service';

export const datadir = resolve(__dirname, '..', '..', 'tmp');
export const target = {
  datadir,
};
export const bitcoinHome = getBitcoinHome(target);
export const configFilePath = join(datadir, 'bitcoin.conf');

describe('bitcoin-service', () => {
  beforeAll(async () => {
    writeConfigFile(configFilePath, {
      regtest: true,
      sections: {
        regtest: {
          port: 54932,
          rpcport: 29302,
        },
      },
    });
    await installSoftware(target);
  }, 30000);

  it('starts stops and restarts', async () => {
    await stopService(configFilePath);
    expect(await isServiceRunning(configFilePath)).toBe(false);
    await startService(configFilePath, bitcoinHome);
    expect(await isServiceRunning(configFilePath)).toBe(true);
    await restartService(configFilePath, bitcoinHome);
    expect(await isServiceRunning(configFilePath)).toBe(true);
    await stopService(configFilePath);
    expect(await isServiceRunning(configFilePath)).toBe(false);
  });
});
