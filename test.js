const Loggaby = require("./lib/index");

const logger = new Loggaby({
	levels: [
		{
			name: 'API',
			color: 'magenta'
		},
		{
			// Overriding default levels is also an option
			name: 'Log',
			color: 'yellow'
		}
	]
});

logger.log('Hello World!');
logger.api('Online at port 3000!')