const { Pool } = require("pg");

module.exports = app => {
  return new Pool({
    user: app.get("PG_USER"),
    host: app.get("PG_HOST"),
    database: app.get("PG_DB"),
    password: app.get("PG_PASSWORD"),
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000
  });
};
