# Loggaby
The simple and light logger for Node.js

![](https://modeus.is-inside.me/V6nRi6i6.png)
## Install
`npm i loggaby`

## Example
```js
const Loggaby = require("loggaby")
const logger = new Loggaby()

logger.log("Hello World!")
```

#### new Loggaby(options) 
The Loggaby constructor, which creates a `logger` instance.
- `options` {Object}
  - `logFunction` {Function} The function to use to log. (Default: `console.log`)
  - `color` {Boolean} Whether to use ANSI color codes for color. (Default: `true`)
  - `debug` {Boolean} Whether to print debug messages. (Default: `true`)

## Levels
`debug`, `log`, `warn`, `error`,  `fatal`  

You can log with `logger.<Level>()` [for example](#example).