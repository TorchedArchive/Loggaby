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

## Levels
`debug`, `log`, `warn`, `error`,  `fatal`  

You can log with `logger.<Level>()` [for example](#example).