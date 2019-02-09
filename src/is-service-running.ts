import { ServiceOptions } from './constants';
import { getPid } from './get-pid';

export function isServiceRunning(options: Pick<ServiceOptions, 'conf'>) {
  const pid = getPid(options);
  if (pid === null) {
    return false;
  }
  process.kill(pid, 0);
  // ^^ checks
  // - the process is alive
  // - this user has permission to send signals to it
  return true;
}
