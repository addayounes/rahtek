import config from "./config";
import { Sequelize } from "sequelize";
import logger from "src/middleware/logger";

const db = config.database;

const sequelize = new Sequelize(db.database, db.username, db.password, {
  host: db.host,
  port: db.port,
});

logger.info("Connected to DB");

sequelize.sync({ force: true }).then(() => logger.info("Synced DB"));

export default sequelize;
