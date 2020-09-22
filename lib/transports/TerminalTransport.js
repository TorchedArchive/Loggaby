const Transport = require('./BaseTransport');

class TerminalTransport extends Transport {
	constructor(useColor) {
		super(useColor);
	}

	transmit(msg) {
		console.log(msg)
	}
}

module.exports = TerminalTransport;
