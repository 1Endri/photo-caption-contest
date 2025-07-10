require('dotenv').config();
const mysql = require('mysql2/promise');

async function testConnection() {
  console.log("Testing MySQL connection...");
  
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    });
    
    console.log("✅ Connected to MySQL!");
    const [rows] = await connection.query('SELECT 1 + 1 AS solution');
    console.log("Test query result:", rows[0].solution);
    
    await connection.end();
  } catch (error) {
    console.error("❌ Connection failed:", error.message);
  }
}

testConnection();