const Transport = require('./BaseTransport');
const util = require('util');

/**
 * 📝 Simplistic, customizable yet opinionated logger.
 * @module Loggaby
 */

/**
 * A terminal Transport, to post logs to your terminal.
 * @extends Transport
 */
class TerminalTransport extends Transport {
	transmit(args, opts) {
		if (opts.level.debug && !opts.debug) return;
		if (opts.level.debug && opts.debug === 'auto') {
			const nodeEnv = process.env['NODE_ENV'] || 'development';
			if (nodeEnv !== 'development') return;
		};
		const msg = util.format(...args);
		console.log(msg);
	}
}

module.exports = TerminalTransport;
