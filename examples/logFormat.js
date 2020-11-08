const Loggaby = require('../lib');

const logger = new Loggaby({
	debug: 'auto',
	format: '{grey}[{level.color}{level.symbol}{grey}] ',
	levels: [
		{
			...Loggaby.levels.log,
			symbol: '+'
		},
		{
			...Loggaby.levels.debug,
			symbol: '@'
		},
		{
			...Loggaby.levels.warn,
			symbol: '-'
		},
		{
			...Loggaby.levels.error,
			symbol: '!'
		},
		{
			...Loggaby.levels.fatal,
			symbol: '%'
		}
	]
});

logger.log('Log');
logger.debug('Debug');
logger.warn('Warn');
logger.error('Error');
logger.fatal('Fatal')