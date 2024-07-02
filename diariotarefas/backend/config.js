const dotenv = require('dotenv');
const { Pool } = require('pg');

dotenv.config(); // Carrega variáveis de ambiente do arquivo .env

const pool = new Pool({
  connectionString: process.env.pgConnection,
  ssl: {
    rejectUnauthorized: false // Apenas se estiver usando SSL
  }
});

module.exports = { pool };
