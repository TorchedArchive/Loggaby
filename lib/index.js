const ansikit = require('ansikit');
const Transport = require('./transports/BaseTransport');
const TerminalTransport = require('./transports/TerminalTransport');

const _levels = [
	{
		color: 'cyan',
		name: 'Log'
	},
	{
		color: 'green',
		name: 'Debug',
		debug: true
	},
	{
		color: 'yellow',
		name: 'Warn'
	},
	{
		color: 'red',
		name: 'Error'
	},
	{
		color: 'red',
		name: 'Fatal',
		fatal: true
	}
];

/**
 * 📝 Simplistic, customizable yet opinionated logger.
 * @module Loggaby
 */

/**
 * The Loggaby class.
 * Providing opinionated but customizable logs.
 */
class Loggaby {
	/**
	 * @typedef {object} LoggabyLevel
	 * @prop {string} name - Name of the level that appears in the logs.
	 * @prop {string} color - Color of the level name. Accepted values are hex or {@link https://github.com/Luvella/AnsiKit#colors named colors}.
	 * @prop {boolean} [debug] - Whether this level will be hidden when <code>options.debug</code> is false.
	 * @prop {boolean} [fatal] - Whether to make the level name and message bold and underline (to be noticeable).
	 * @prop {string} [call] - Name to use as the function call.
	 */
	/**
	 * Creates a new Loggaby instance.
	 * @param {object} options 
	 * @param {boolean} [options.debug=true] Whether to post debug logs.
	 * @param {string} [options.format='{grey}{time}{reset} {level} > '] Format for how logs should look
	 * @param {LoggabyLevel[]} [options.levels] Logging levels to provide.
	 * @param {object[]} [options.transports] Transports to post logs to.
	 */
	// i really don't feel like documenting the default levels :|
	constructor(options = {}) {
		if (Array.isArray(options) || typeof options !== 'object' && options !== null) throw new TypeError('"options" has to be an object.');
		this.options = Object.assign({
			debug: true,
			transports: [new TerminalTransport()],
			levels: [],
			format: '{grey}{time}{reset} {level} > '
		}, options);
		if (!Array.isArray(this.options.levels)) throw new TypeError('levels should be an array of objects');
		this.transports = this.options.transports;
		this.format = this.options.format;

		const loggers = [
			..._levels,
			...this.options.levels
		];

		for (const logger of loggers) {
			this[logger.call || this._makeValid(logger.name.toLowerCase())] = (...msg) => {
				let color;
				if (/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.test(logger.color)) {
					const int = parseInt(logger.color.slice(1), 16);
					const r = (int >> 16) & 255;
					const g = (int >> 8) & 255;
					const b = int & 255;

					color = this._rgb(r, g, b);
				} else {
					color = `{${logger.color}}`;
				}
				
				for (const transport of this.transports) {
					// TODO: Check if extends BaseTransport
					// TODO: More keys 
					const keys = {
						'time': this.time,
						'level': logger.name
					};

					for (const l in logger) keys[`level.${l}`] = logger[l];

					let logmsg = this.format;
					for (const key in keys) {
						if (key === 'level.color') {
							logmsg = logmsg.replace(`{level.color}`, color);
							continue;
						}
						if (key === 'level' && transport.options.color) {
							logmsg = logmsg.replace(`{level}`, `${color}${logger.name}{reset}`);
							continue;
						}
						logmsg = logmsg.replace(`{${key}}`, keys[key]);
					}

					const opts = {
						debug: this.options.debug,
						level: logger
					}

					if (!transport.options.color) return transport.transmit([this.strip(`${logmsg}${msg[0]}`), ...this.strip(msg.slice(1))], opts);
					if (logger.fatal) return transport.transmit([ansikit.format(`{bold}{underline}${logmsg}{white}${msg[0]}`), ...msg.slice(1), '\x1b[0m'], opts);
					transport.transmit([ansikit.format(`${logmsg}{reset}${msg[0]}`), ...msg.slice(1)], opts);
				}
			};
		}
		if (!Loggaby.instance) Loggaby.instance = this;
	}

	get time() {
		const options = {
			hour: 'numeric', minute: 'numeric', second: 'numeric',
			hour12: true
		};

		return new Intl.DateTimeFormat({}, options).format(new Date());
	}

	/**
	 * Removes spaces
	 * @param {string} name 
	 * @private
	 */
	_makeValid(name) {
		return name.replace(/\s/g, '');
	}

	/**
	 * Sets text color to an RGB value. 
	 * @param  {number} r 
	 * @param  {number} g 
	 * @param  {number} b 
	 */
	_rgb(r, g, b) {
		if (r >= 256 || r <= -1 || typeof r !== 'number') r = 0;
		if (g >= 256 || g <= -1 || typeof g !== 'number') g = 0;
		if (b >= 256 || b <= -1 || typeof b !== 'number') b = 0;

		return `\x1b[38;2;${r};${g};${b}m`;
	}

	/**
	 * Gets the first initialized Loggaby instance (or null if none).
	 * @return {Loggaby | null}
	 */
	static getInstance() {
		if (!Loggaby.instance) return null;
		return Loggaby.instance;
	}

	strip(msg) {
		if (Array.isArray(msg)) {
			for (let i = 0; i > msg.length; i++) msg[i] = msg[i].replace(/\u001b\[.*?m/g, '');
			return msg;
		}
		return ansikit.format(msg).replace(/\u001b\[.*?m/g, '')
	}
}

Loggaby.Transport = Transport;
Loggaby.TerminalTransport = TerminalTransport;
Loggaby.levels =  {
	log: _levels[0],
	debug: _levels[1],
	warn: _levels[2],
	error: _levels[3],
	fatal: _levels[4]
};

module.exports = Loggaby;
