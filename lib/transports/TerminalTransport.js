const Transport = require('./BaseTransport');
const util = require('util');

class TerminalTransport extends Transport {
	transmit(args) {
		const msg = util.format.apply(null, args);
		console.log(msg);
	}
}

module.exports = TerminalTransport;
