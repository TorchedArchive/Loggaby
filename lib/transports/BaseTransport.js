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
	constructor(options = {}) {
		if (Array.isArray(options) || typeof options !== 'object' && options !== null) throw new TypeError('"options" has to be an object.');
		this.options = Object.assign({
			color: true
		}, options);
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
