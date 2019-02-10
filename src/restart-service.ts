import { stopService } from './stop-service';
import { startService } from './start-service';

export async function restartService(configFilePath: string, bitcoinHome?: string) {
  const returnValue = { changed: true };
  await stopService(configFilePath);
  await startService(configFilePath, bitcoinHome);
  return returnValue;
}
