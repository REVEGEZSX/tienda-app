const { Pool } = require('pg')

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'shopbd',
  password: 'postgres',
  port: 5432,
})

module.exports = {
  query: (text, params) => {
      return pool.query(text, params)
          .catch(err => {
              console.error('Error executing query', err.stack)
          });
  }
}