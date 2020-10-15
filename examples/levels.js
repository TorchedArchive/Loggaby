const Loggaby = require('../lib');

const logger = new Loggaby({
	levels: [
		{
			name: 'Inbox',
			color: 'magenta'
		},
		{
			// Overriding default levels is also an option
			name: 'Log',
			color: 'yellow'
		},
		{
			// Levels can have spaces; they will be stripped
			name: 'Hello World', // Called like: <Loggaby>.helloworld(message)
			color: '#8a1ce9' // Hex colors can be provided (not all terminals support this though)
		},
		{
			name: 'API Status',
			color: '#34eded',
			call: 'status' // Name to be used as the function call
		}
	]
});

logger.log('Hello World!');
logger.inbox('New message from sammy: Hi there');
logger.helloworld('!!!');
logger.status('Online at port 3000');
