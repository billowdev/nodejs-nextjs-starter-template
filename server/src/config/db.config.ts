import config from "./config"; // this is important!

module.exports = {
  development: {
    username: config.database.username,
    password: config.database.password,
    database: config.database.dbDevelopment,
    host: config.database.host,
    dialect: config.database.dialect,
  },
  test: {
    username: config.database.username,
    password: config.database.password,
    database: config.database.dbTest,
    host: config.database.host,
    dialect: config.database.dialect,
  },
  production: {
    username: config.database.username,
    password: config.database.password,
    database: config.database.dbProduction,
    host: config.database.host,
    dialect: config.database.dialect,
  },
};
