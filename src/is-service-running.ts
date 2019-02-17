import { readPidFile } from './read-pid-file';

export async function isServiceRunning(configFilePath: string) {
  const pid = readPidFile(configFilePath);
  if (pid === null) {
    return false;
  }
  process.kill(pid, 0);
  // ^^ checks
  // - the process is alive
  // - this user has permission to send signals to it
  return true;
}
