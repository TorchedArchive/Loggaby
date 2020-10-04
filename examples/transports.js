const Loggaby = require('../lib');
const CustomTransport = require('./CustomTransport');
const logger = new Loggaby({
	transports: [new CustomTransport()]
});

logger.log('Hello World!');