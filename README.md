<div align="center">
	<h1>Loggaby</h1>
	<blockquote align="center">📝 A minimal and simplistic logger with no bloat.</blockquote>
	<p>
		<a href="https://github.com/Luvella/Loggaby/blob/master/LICENSE">
			<img alt="GitHub license" src="https://img.shields.io/github/license/Luvella/Loggaby?style=for-the-badge">
		</a>
		<a href="https://github.com/Luvella/Loggaby/stargazers">
			<img alt="GitHub stars" src="https://img.shields.io/github/stars/Luvella/Loggaby?style=for-the-badge">
		</a>
		<br>
		Loggaby aims to be a simple, minimalistic and lightweight logger that doesn't bring useless dependencies and extra unneeded features.
		It has 1 goal and strives for it well: Posting nice looking logs to your terminal (or perhaps a custom transport?!? See <a href="#example">the examples</a> for details)
		<br><br>
		Oh, it looks like this:<br>
		<img alt="Preview" src="https://modeus.is-inside.me/V6nRi6i6.png">
	</p>
</div>

# Table of Contents
- [Install](#install)
- [Examples](#examples)
- [Docs](#documentatiob)
- [License](#license) 

## Install
`npm i loggaby`

## Examples
```js
const Loggaby = require('loggaby');
const TerminalTransport = new Loggaby.TerminalTransport();
const logger = new Loggaby({
	transports: [TerminalTransport] // NOTE: This is provided by default. There is no reason
									// to import TerminalTransport unless adding your own extra transports.
									// For an implementation example of a Transport, see below.
});

logger.log('Hello World!');
```

Transport Example:  
```js
// CustomTransport.js
// It's essentially just the TerminalTransport without color.
// Realistically you can just pass `false` to the TerminalTransport constructor
const Loggaby = require('loggaby');
class CustomTransport extends Loggaby.Transport {
	constructor() {
		super(false) // Disable color
	}

	transmit(msg) { // The function to post/print a message
		console.log(msg)
	}
}

module.exports = CustomTransport;

// index.js
const Loggaby = require('loggaby');
const CustomTransport = require('./CustomTransport');
const logger = new Loggaby({
	transports: [new CustomTransport()]
});

logger.log('Hello World!');
```  

Custom levels:  
```js
const Loggaby = require('loggaby');

const logger = new Loggaby({
	levels: [
		{
			name: 'API',
			color: 'magenta'
		},
		{
			// Overriding default levels is also an option
			name: 'Log',
			color: 'yellow'
		}
	]
});

logger.log('Hello World!');
logger.api('Online at port 3000!');
```  
![](https://modeus.is-inside.me/HzSP9TCd.png)

# Documentation
#### new Loggaby(options) 
The Loggaby constructor, which creates a `logger` instance.
- `options` {Object}
  - `transports` {Object[]} (An array of objects or specifically [transport instances](lib/transports/)) What transports to log to.  An example is provided above. (Default: `[TerminalTransport]`)
  - `debug` {Boolean} Whether to print debug messages. (Default: `true`)
  - `levels` {Object[]} Additional custom levels to provide.
    - `name` {String} Name of the level
    - `color` {String} Color of the level (accepted values are [here](https://github.com/Luvella/AnsiKit#colors))
    - `debug` {Boolean} Whether this is a debug log (hidden with `debug: false`)
    - `fatal` {Boolean} Whether to make the level name and message bold and underline

## Levels
`debug`, `log`, `warn`, `error`,  `fatal`  

You can log with `logger.<Level>()` [for example](#example).

# License
Loggaby is licensed under the MIT license.  
[Read here](LICENSE) for more info.