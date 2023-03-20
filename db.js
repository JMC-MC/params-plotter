const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

//Connect to the database
const pool = new Pool({
  user: process.env.DATABASE_USERNAME,
  host: process.env.DATABASE_HOSTNAME,
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASSWORD,
  port: process.env.DATABASE_PORT,
});

module.exports = {
  query: async (text, params) => {
    const client = await pool.connect();
    try {
      const res = await client.query(text, params);
      return res;
    } finally {
      client.release();
    }
  },
};
