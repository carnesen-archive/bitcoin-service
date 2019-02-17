import { readPidFile } from './read-pid-file';
import { isServiceRunning } from './is-service-running';

const delay = () =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, 50);
  });

export async function stopService(configFilePath: string) {
  const pid = readPidFile(configFilePath);
  const returnValue = {
    changed: false,
  };
  if (pid !== null) {
    returnValue.changed = true;
    process.kill(pid, 'SIGINT');
  }
  let retries = 5;
  while (await isServiceRunning(configFilePath)) {
    await delay();
    if (retries > 0) {
      retries -= 1;
    } else {
      throw new Error('Failed to stop bitcoin server');
    }
  }
  return returnValue;
}
