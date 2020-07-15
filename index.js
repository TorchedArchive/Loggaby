const ansiplace = require("ansiplace")
class Loggaby {
	constructor(options = {}) {
		if (Array.isArray(options) || typeof options !== "object" && options !== null) throw new TypeError("'options' has to be an object.")
		this.options = Object.assign({debug: true}, options)
	}

	log(msg, color = !this.options.color, logfunc = this.options.logFunction || console.info) {
		logfunc(color ? this._print(msg, "cyan", "Log") : `${this._time} Log > ${msg}`)
	}

	debug(msg, color = !this.options.color, logfunc = this.options.logFunction || console.debug) {
		if(this.options.debug) return logfunc(color ? this._print(msg, "green", "Debug") : `${this._time} Debug > ${msg}`)
	}

	warn(msg, color = !this.options.color, logfunc = this.options.logFunction || console.warn) {
		logfunc(color ? this._print(msg, "yellow", "Warn") : `${this._time} Warn > ${msg}`)
	}

	error(msg, color = !this.options.color, logfunc = this.options.logFunction || console.error) {
		logfunc(color ? this._print(msg, "red", "Error") : `${this._time} Error > ${msg}`)
	}

	fatal(msg, color = !this.options.color, logfunc = this.options.logFunction || console.error) {
		logfunc(color ? this._print(msg, "red", "Fatal", true) : `${this._time} Fatal > ${msg}`)
	}

	_print(msg, color, level, fatal) {
		return ansiplace(`\u001b[90m${this._time} ${fatal ? "{bold}{underline}" : ""}{${color}}${level}{reset}{${color}} > {reset}${fatal ? "{bold}{underline}" : ""}${msg}`)
	}

	get _time() {
		const options = {
			hour: "numeric", minute: "numeric", second: "numeric",
			hour12: true
		}
		return new Intl.DateTimeFormat({}, options).format(new Date())
	}
}

module.exports = Loggaby;