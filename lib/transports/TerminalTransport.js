const Transport = require('./BaseTransport');

class TerminalTransport extends Transport {
	constructor(useColor) {
		super(useColor);
	}

	transmit(msg, ...args) {
		console.log(msg, args.join(''))
	}
}

module.exports = TerminalTransport;
