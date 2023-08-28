require("dotenv").config();

const { DB_USER, DB_PASSWORD, DB_DATABASE, DB_PORT, DB_HOST } = process.env;

module.exports = {
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  port: DB_PORT,
  host: DB_HOST,
  dialect: "postgres",
};
