class BaseTransport {
	constructor(useColor = true) {
		this.useColor = Boolean(useColor);
	}

	transmit() {
		throw new Error('missing implementation of transmit function for transport class');
	}
}

module.exports = BaseTransport;
