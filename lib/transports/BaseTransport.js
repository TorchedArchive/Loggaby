/**
 * 📝 Simplistic, customizable yet opinionated logger.
 * @module Loggaby
 */

/**
 * The base transport class.
 */
class BaseTransport {
	/**
	 * Creates a new transport.
	 * @param {object} opts Options for the Transport
	 */
	constructor(opts = {}) {
		this.useColor = Boolean(useColor);
	}

	/**
	 * Posts content to a transport.
	 * @abstract
	 */
	transmit() {
		throw new Error('missing implementation of transmit function for transport class');
	}
}

module.exports = BaseTransport;
