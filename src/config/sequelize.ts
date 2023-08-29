import config from "./config";
import { Sequelize } from "sequelize";
import logger from "../middleware/logger";

const db = config.database;

const sequelize = new Sequelize(db.database, db.username, db.password, {
  host: db.host,
  port: db.port,
  dialect: "postgres",
  logging: false,
});

logger.info("Connected to DB");

export default sequelize;
