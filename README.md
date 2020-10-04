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
[Provided Here](examples/).

# Documentation
#### new Loggaby(options) 
The Loggaby constructor, which creates a `logger` instance.
- `options` {Object}
  - `transports` {Object[]} (An array of objects or specifically [transport instances](lib/transports/)) What transports to log to.  An example is provided above. (Default: `[TerminalTransport]`)
  - `debug` {Boolean} Whether to print debug messages. (Default: `true`)
  - `levels` {Object[]} Additional custom levels to provide.
    - `name` {String} Name of the level that appears in the logs
    - `color` {String} Color of the `name` (accepted values are [these](https://github.com/Luvella/AnsiKit#colors) or a hex value)
    - `debug` {Boolean} Whether this is a debug log (that is hidden with `debug: false`)
    - `fatal` {Boolean} Whether to make the level name and message bold and underline
    - `call` {String} Name of the function to use this level

## Levels
`debug`, `log`, `warn`, `error`,  `fatal`  

You can log with `logger.<Level>()` [for example](#example).

# License
Loggaby is licensed under the MIT license.  
[Read here](LICENSE) for more info.