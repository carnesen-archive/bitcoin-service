import { ServiceOptions } from './constants';
import { getPid } from './get-pid';

export function stopService(options: Pick<ServiceOptions, 'conf'>) {
  const pid = getPid(options);
  const returnValue = {
    changed: false,
  };
  if (pid !== null) {
    returnValue.changed = true;
    process.kill(pid, 'SIGINT');
  }
  return returnValue;
}
