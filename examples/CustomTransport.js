// This is essentially just the TerminalTransport without color.
// Realistically you can just pass `false` to the TerminalTransport constructor like:
/*
	const Loggaby = require('loggaby');
	const TerminalTransport = new Loggaby.TerminalTransport(false);
	const logger = new Loggaby({
		transports: [TerminalTransport]
	});

	logger.log('Hello World!');
*/

const Loggaby = require('loggaby');

class CustomTransport extends Loggaby.Transport {
	constructor() {
		super(false); // Disable color
	}

	transmit(msg) { // The function to post/print a message
		console.log(msg);
	}
}

module.exports = CustomTransport;
