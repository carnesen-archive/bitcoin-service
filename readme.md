# @carnesen/bitcoin-service [![npm version](https://badge.fury.io/js/%40carnesen%2Fbitcoin-service.svg)](https://badge.fury.io/js/%40carnesen%2Fbitcoin-service) [![Build Status](https://travis-ci.com/carnesen/bitcoin-service.svg?branch=master)](https://travis-ci.com/carnesen/bitcoin-service)

A Node.js library for managing the bitcoin service `bitcoind`. The package includes runtime JavaScript files suitable for Node.js >=8 as well as the corresponding TypeScript type declarations.

## Usage

Here is a little TypeScript Node.js script that starts `bitcoind`:
```ts
// example.ts
import { startService } from '@carnesen/bitcoin-service';
const bitcoinHome = '/usr/local/bitcoin-0.17.1';
(async () => {
  try {
    await startService({ bitcoinHome });
    process.exit(0);
  } catch (ex) {
    console.log(ex);
    process.exit(1);
  }
})()
```

Running the script looks like:
```
$ ts-node example.ts
Bitcoin server starting
```

## API
### `startService(configFilePath, bitcoinHome?): Promise\<{changed}>`
Sets `daemon` to `true` in the configuration file and starts `bitcoind` if it's not running already

#### `configFilePath`
`string`. Absolute path of a bitcoin configuration file. Will be created if it does not already exist.

#### `bitcoinHome`
Optional `string`. Absolute path of a directory where the bitcoin server software is installed. If not provided, `` `${bitcoinHome}/bin` `` must be on your `PATH`.

#### `changed`
`boolean`. Is `false` if `bitcoind` was already running, `true` if the service was successfully started.

### `stopService(configFilePath): Promise\<{changed}>`
Stops `bitcoind` if it's running

#### `changed`
`boolean`. Is `false` if `bitcoind` wasn't running. Is `true` if the service was running and successfully stopped.

### `restartService(configFilePath, bitcoinHome?): Promise\<{changed}>`
Stops and starts `bitcoind` as documented above.

### `isServiceRunning(configFilePath): Promise\<boolean>`
The returned promise resolves to `true` if the service is running or `false` if it is not.

## More information
Check out [the tests directory](src/__tests__) for more examples of how it works. If you encounter any bugs or have any questions or feature requests, please don't hesitate to file an issue or submit a pull request on this project's repository on GitHub.

## Related
- [@carnesen/bitcoin-service-cli](https://github.com/carnesen/bitcoin-service-cli): A Node.js CLI and library for managing the bitcoin server process `bitcoind`

- [@carnesen/bitcoin-config](https://github.com/carnesen/bitcoin-config): A Node.js library for bitcoin server software configuration
