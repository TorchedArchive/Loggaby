const ansikit = require('ansikit');
const Transport = require('./transports/BaseTransport');
const TerminalTransport = require('./transports/TerminalTransport');

class Loggaby {
	constructor(options = {}) {
		if (Array.isArray(options) || typeof options !== 'object' && options !== null) throw new TypeError('"options" has to be an object.')
		this.options = Object.assign({
			debug: true,
			transports: [new TerminalTransport()]
		}, options);
		this.transports = this.options.transports;
	}

	log(msg) {
		for (const transport of this.transports) {
			if (!transport.useColor) return transport.transmit(`${this._time} Log > ${msg}`);
			transport.transmit(ansikit.format(`{gray}${this._time} {cyan}Log {reset}> ${msg}`));
		}
	}

	debug(msg, color = !this.options.color, logfunc = this.options.logFunction || console.debug) {
		if(this.options.debug) return logfunc(color ? this._print(msg, 'green', 'Debug') : `${this._time} Debug > ${msg}`)
	}

	warn(msg, color = !this.options.color, logfunc = this.options.logFunction || console.warn) {
		logfunc(color ? this._print(msg, 'yellow', 'Warn') : `${this._time} Warn > ${msg}`)
	}

	error(msg, color = !this.options.color, logfunc = this.options.logFunction || console.error) {
		logfunc(color ? this._print(msg, 'red', 'Error') : `${this._time} Error > ${msg}`)
	}

	fatal(msg, color = !this.options.color, logfunc = this.options.logFunction || console.error) {
		logfunc(color ? this._print(msg, 'red', 'Fatal', true) : `${this._time} Fatal > ${msg}`)
	}

	_print(msg, color, level, fatal) {
		return ansikit.format(`\u001b[90m${this._time} ${fatal ? '{bold}{underline}' : ''}{${color}}${level}{reset}{${color}} > {reset}${fatal ? '{bold}{underline}' : ''}${msg}`)
	}

	get _time() {
		const options = {
			hour: 'numeric', minute: 'numeric', second: 'numeric',
			hour12: true
		}
		return new Intl.DateTimeFormat({}, options).format(new Date())
	}
}

Loggaby.Transport = Transport;
module.exports = Loggaby;