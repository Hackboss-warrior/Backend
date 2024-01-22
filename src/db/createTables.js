// Creamos el script de inicialización de la base de datos, con las tablas.

import getPool from "./pool.js";
import useDb from "./useDb.js";
import generateError from "../utils/generateError.js";

async function createTables() {
  let pool;
  try {
    pool = await getPool();
    await useDb();
    await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
               id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
               name VARCHAR(50) NOT NULL,
               firstName VARCHAR(50),
               BIO VARCHAR(150),
               avatar VARCHAR(255) UNIQUE,
               nickName VARCHAR(100) NOT NULL UNIQUE,
               email VARCHAR(100) NOT NULL,
               role VARCHAR(50) DEFAULT 'user' NOT NULL,
               passwordHash VARCHAR(255) NOT NULL,
               DOB DATE NOT NULL,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                modifiedAt DATETIME ON UPDATE CURRENT_TIMESTAMP
            );`);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS posts (
        id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
        title VARCHAR(50) NOT NULL,
        files VARCHAR(255),
        topic VARCHAR(100),
        body LONGTEXT NOT NULL,
        tags LONGTEXT DEFAULT ('{"Política":false, "Economía":false, "Tecnología":false, "Ciencia":false, "Salud":false, "Cultura":false, "Deportes":false, "Entretenimiento":false}'),
        userId INT NOT NULL,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        modifiedAt DATETIME ON UPDATE CURRENT_TIMESTAMP,            
        FOREIGN KEY(userId) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
    );`);

    await pool.query(`
            CREATE TABLE IF NOT EXISTS interacts (
                id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
                postId INT NOT NULL,
                userId INT NOT NULL,
                interaction INT(2) NOT NULL,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                modifiedAt DATETIME ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY(postId) REFERENCES posts(id) ON DELETE CASCADE ON UPDATE CASCADE,
                FOREIGN KEY(userId) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
                
             );`);
    await pool.query(`
            CREATE TABLE IF NOT EXISTS favorites (
                id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
                postId INT NOT NULL,
                userId INT NOT NULL,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                modifiedAt DATETIME ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY(postId) REFERENCES posts(id) ON DELETE CASCADE ON UPDATE CASCADE,
                FOREIGN KEY(userId) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
             );`);

    await pool.query(`
              CREATE TABLE IF NOT EXISTS comments (
                  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
                  postId INT NOT NULL,
                  userId INT NOT NULL,
                  comment VARCHAR(255) NOT NULL,
                  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                  modifiedAt DATETIME ON UPDATE CURRENT_TIMESTAMP,
                  FOREIGN KEY(postId) REFERENCES posts(id) ON DELETE CASCADE ON UPDATE CASCADE,
                  FOREIGN KEY(userId) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
               );`);

    await pool.query(`
              CREATE TABLE IF NOT EXISTS likeComments (
                  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
                  commentId INT NOT NULL,
                  userId INT NOT NULL,
                  interaction INT(2) NOT NULL,
                  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                  modifiedAt DATETIME ON UPDATE CURRENT_TIMESTAMP,
                  FOREIGN KEY(commentId) REFERENCES comments(id) ON DELETE CASCADE ON UPDATE CASCADE,
                  FOREIGN KEY(userId) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
               );`);
    await pool.query(`
              CREATE TABLE IF NOT EXISTS answers (
                id INT PRIMARY KEY,
                commentId INT,
                userId INT NOT NULL,
                answerComment TEXT,
                answerRef INT,
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (commentId) REFERENCES comments(id) ON DELETE CASCADE ON UPDATE CASCADE,
                FOREIGN KEY (answerRef) REFERENCES answers(id) ON DELETE CASCADE ON UPDATE CASCADE,
                FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
              );`);

    console.log(`Las tablas fueron creadas con exito`);
    process.exit();
  } catch (error) {
    generateError(
      `☠ Ha sucedido un imprevisto con la creación de las tablas ☠ ${error}`,
      500
    );
  }
}

createTables();
