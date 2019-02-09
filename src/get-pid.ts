import {
  readConfigFiles,
  getChainName,
  getDefaultConfig,
  toAbsolute,
} from '@carnesen/bitcoin-config';
import { readFileSync } from 'fs';
import { ServiceOptions } from './constants';
import { getConfigFilePath } from './get-config-file-path';

export function getPid({ conf }: Pick<ServiceOptions, 'conf'>) {
  const configFilePath = getConfigFilePath(conf);
  const config = readConfigFiles(configFilePath);
  const chainName = getChainName(config);
  const defaultConfig = getDefaultConfig(chainName);
  const pidFilePath = toAbsolute(
    config.pid || defaultConfig.pid,
    config.datadir,
    chainName,
  );
  let pidFileContents = '';
  try {
    pidFileContents = readFileSync(pidFilePath, { encoding: 'utf8' });
  } catch (ex) {
    if (ex.code !== 'ENOENT') {
      throw ex;
    }
  }
  if (pidFileContents) {
    const pid = Number(pidFileContents);
    if (isNaN(pid)) {
      throw new Error(
        `Could not convert pid file contents "${pidFileContents}" to a number`,
      );
    }
    return pid;
  }
  return null;
}
