import { ServiceOptions } from './constants';
import { stopService } from './stop-service';
import { startService } from './start-service';

export async function restartService(options: ServiceOptions = {}) {
  const returnValue = { changed: true };
  await stopService(options);
  await startService(options);
  return returnValue;
}
