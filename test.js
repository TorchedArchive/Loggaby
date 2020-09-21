const Loggaby = require("./lib/index");
const logger = new Loggaby();

logger.debug("Test");
logger.log("Test");
logger.warn("Test");
logger.error("Test");
logger.fatal("Test");
