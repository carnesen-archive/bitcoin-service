import { toAbsolute, DEFAULT_CONFIG_FILE_NAME } from '@carnesen/bitcoin-config';

export function getConfigFilePath(conf?: string) {
  return toAbsolute(conf || DEFAULT_CONFIG_FILE_NAME);
}
