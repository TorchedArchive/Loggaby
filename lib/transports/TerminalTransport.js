const Transport = require('./BaseTransport');
const util = require('util');

class TerminalTransport extends Transport {
	transmit(args) {
		const msg = util.format(...args);
		console.log(msg);
	}
}

module.exports = TerminalTransport;
