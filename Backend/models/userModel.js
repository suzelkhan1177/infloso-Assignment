const pool = require('../config/mysql');

async function createUserTable() {
  try {
    const [rows] = await pool.query("SHOW TABLES LIKE 'User';");

    if (rows.length === 0) {
      const createTableQuery = `
   CREATE TABLE User (
    UserID BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    reset_password_token VARCHAR(255),
    reset_password_expires BIGINT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  ); `;

      await pool.query(createTableQuery);
      console.log('User table created successfully');
    } else {
      // console.log('User table already exists');
    }
  } catch (error) {
    console.error('Error creating User table: ' + error.message);
  }
}

createUserTable();

