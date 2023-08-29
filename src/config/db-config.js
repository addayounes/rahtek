require("dotenv").config();

const { DB_USER, DB_PASSWORD, DB_DATABASE, DB_PORT, DB_HOST } = process.env;

module.exports = {
  username: String(DB_USER),
  password: String(DB_PASSWORD),
  database: String(DB_DATABASE),
  port: Number(DB_PORT),
  host: String(DB_HOST),
  dialect: "postgres",
};
