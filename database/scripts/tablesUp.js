const { logger } = require("../../utils/logger");
const { createTableUsers: createTableUSersQuery } = require("../queries");

(() => {
  require("../../config/db.config").query(createTableUSersQuery, (err, _) => {
    if (err) {
      logger.error(err.message);
      return;
    }
    logger.info("Table users created!");
    process.exit(0);
  });
})();
