<div align="center">
	<h1>Loggaby</h1>
	<blockquote align="center">📝 Simplistic, customizable yet opinionated logger.</blockquote>
	<p>
		<a href="https://github.com/Loggaby/Loggaby/blob/master/LICENSE">
			<img alt="GitHub license" src="https://img.shields.io/github/license/Loggaby/Loggaby?style=for-the-badge">
		</a>
		<a href="https://github.com/Loggaby/Loggaby/stargazers">
			<img alt="GitHub stars" src="https://img.shields.io/github/stars/Loggaby/Loggaby?style=for-the-badge">
		</a>
		<br>
		Loggaby is the cool logger that is made to be simplistic (because lack of features), lightweight and minimal.<br>
		It's also opinionated but not so that everything is forced (it provides transports, custom levels) but more that the features and whatever else are only what I think is needed or want.<br>
		It has 1 goal and strives for it well: Posting nice looking logs to your terminal (or wherever you want, see <a href="#examples">the examples</a> for details)
		<br><br>
		<img alt="Preview" src="https://modeus.is-inside.me/V6nRi6i6.png">
	</p>
</div>

# Table of Contents
- [Install](#install)
- [Examples](#examples)
- [Docs](#documentation)
- [License](#license) 

## Install
`npm install loggaby` or `yarn add loggaby`

## Examples
[Provided Here](examples/).

# Documentation
#### new Loggaby(options) 
The Loggaby constructor, which creates a new `Loggaby` instance.
- `options` {Object}
  - `transports` {Object[]} (An array of objects or specifically [transport instances](lib/transports/)) What transports to log to.  An example is provided above. (Default: `[TerminalTransport]`)
  - `debug` {Boolean} Whether to print debug messages. (Default: `true`)
  - `levels` {Object[]} Additional custom levels to provide.
    - `name` {String} Name of the level that appears in the logs.
    - `color` {String} Color of the level name. Accepted values are a hex value or [named colors](https://github.com/Luvella/AnsiKit#colors).
    - `debug` {Boolean} Whether this level will be hidden when `options.debug` is false.
    - `fatal` {Boolean} Whether to make the level name and message bold and underline (to be noticeable).
    - `call` {String} Name of the function to use this level.

## Default Levels
`debug`, `log`, `warn`, `error` and `fatal`  
You can log with `Loggaby.<Level>()`.

# License
Loggaby is licensed under the MIT license.  
[Read here](LICENSE) for more info.

<hr>
<p align="center">
	<i>A <a href="https://github.com/Luvella">Luvella</a> project.</i>
	<br>
	<img src="https://modeus.is-inside.me/ZvFTbWcA.png" width=52>
</p>
