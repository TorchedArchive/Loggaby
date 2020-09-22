const Transport = require('./BaseTransport');

class TerminalTransport extends Transport {
	transmit(msg) {
		console.log(msg);
	}
}

module.exports = TerminalTransport;
