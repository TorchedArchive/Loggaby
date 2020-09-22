const ansikit = require('ansikit');
const Transport = require('./transports/BaseTransport');
const TerminalTransport = require('./transports/TerminalTransport');

class Loggaby {
	constructor(options = {}) {
		if (Array.isArray(options) || typeof options !== 'object' && options !== null) throw new TypeError('"options" has to be an object.');
		this.options = Object.assign({
			debug: true,
			transports: [new TerminalTransport()]
		}, options);
		this.transports = this.options.transports;

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
			}
		];

		for (const logger of loggers) {
			this[logger.name.toLowerCase()] = (msg) => {
				if (logger.debug && !this.options.debug) return;
				for (const transport of this.transports) {
					if (!transport.useColor) return transport.transmit(`${this.time} ${logger.name} > ${msg}`);
					if (logger.fatal) return transport.transmit(ansikit.format(`{gray}${this.time} {bold}{underline}{${logger.color}}${logger.name}{underline-off} {white}> {underline}${msg}`));
					transport.transmit(ansikit.format(`{gray}${this.time} {${logger.color}}${logger.name} {reset}> ${msg}`));
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
}

Loggaby.Transport = Transport;
Loggaby.TerminalTransport = TerminalTransport;
module.exports = Loggaby;
