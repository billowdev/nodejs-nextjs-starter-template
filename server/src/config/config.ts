import dotenv from "dotenv";
dotenv.config();

const config = {
  env: process.env.NODE_ENV || "development",
  port: process.env.PORT || 5000,
  webtoken: process.env.JWT_SECRET,
  client: process.env.CLIENT_URL,
  database: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    dbDevelopment: process.env.DB_DATABASE_DEVELOPMENT,
    dbProduction: process.env.DB_DATABASE_PRODUCTION,
    dbTest: process.env.DB_DATABASE_TEST,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
  },
};

export default config;
