const ansikit = require('ansikit');
const Transport = require('./transports/BaseTransport');
const TerminalTransport = require('./transports/TerminalTransport');

class Loggaby {
	constructor(options = {}) {
		if (Array.isArray(options) || typeof options !== 'object' && options !== null) throw new TypeError('"options" has to be an object.');
		this.options = Object.assign({
			debug: true,
			transports: [new TerminalTransport()],
			levels: [],
			format: '{time} {level} > '
		}, options);
		if (!Array.isArray(this.options.levels)) throw new TypeError('levels should be an array of objects');
		this.transports = this.options.transports;
		this.format = this.options.format;

		const loggers = [
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
			},
			...this.options.levels
		];

		for (const logger of loggers) {
			this[logger.call || this._makeValid(logger.name.toLowerCase())] = (...msg) => {
				let color;
				if (/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.test(logger.color)) {
					let int = parseInt(logger.color.slice(1), 16);
				    let r = (int >> 16) & 255;
				    let g = (int >> 8) & 255;
				    let b = int & 255;

				    color = this._rgb(r, g, b);
				} else {
					color = `{${logger.color}}`;
				}
				
				if (logger.debug && !this.options.debug) return;
				for (const transport of this.transports) {
					const keys = {
						'time': this.time,
						'level': logger.name
					};
					// TODO: Format

					if (!transport.useColor) return transport.transmit([`${this.time} ${logger.name} > ${msg[0]}`, ...msg.slice]);
					if (logger.fatal) return transport.transmit([ansikit.format(`{gray}${this.time} {bold}{underline}{${logger.color}}${logger.name}{underline-off} {white}> {underline}${msg[0]}`), ...msg.slice(1)]);
					transport.transmit([ansikit.format(`{gray}${this.time} ${color}${logger.name} {reset}> ${msg[0]}`), ...msg.slice(1)]);
				}
			};
		}
	}

	get time() {
		const options = {
			hour: 'numeric', minute: 'numeric', second: 'numeric',
			hour12: true
		};
		return new Intl.DateTimeFormat({}, options).format(new Date());
	}

	_makeValid(name) {
		return name.replace(/\s/g, '')
	}

	_rgb(r, g, b) {
		if (r >= 256 || r <= -1 || typeof r !== 'number') r = 0;
		if (g >= 256 || g <= -1 || typeof g !== 'number') g = 0;
		if (b >= 256 || b <= -1 || typeof b !== 'number') b = 0;

		return `\x1b[38;2;${r};${g};${b}m`;
	}
}

Loggaby.Transport = Transport;
Loggaby.TerminalTransport = TerminalTransport;
module.exports = Loggaby;
