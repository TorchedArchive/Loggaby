const Loggaby = require('./lib/index');

const logger = new Loggaby({
	levels: [
		{
			name: 'lol no',
			color: '#8a1ce9'
		},
		{
			name: 'API Status',
			color: '#34eded',
			call: 'status'
		}
	]
});

logger.lolno('The level of this is #8a1ce9')
logger.status('Online at port 69')