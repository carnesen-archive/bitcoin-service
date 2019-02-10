import { stopService } from '../stop-service';
import { startService } from '../start-service';
import { configFilePath, bitcoinHome } from '../install-software';
import { isServiceRunning } from '../is-service-running';
import { restartService } from '../restart-service';

describe('bitcoin-service', () => {
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
