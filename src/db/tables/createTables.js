// Creamos el script de inicialización de la base de datos, con las tablas.

import getPool from "../pool.js";
import useDb from "../useDb.js";
import generateError from "../../utils/generateError.js";

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
               nickName VARCHAR(100) NOT NULL,
               email VARCHAR(100) NOT NULL,
               passwordHash VARCHAR(255) NOT NULL,
               DOB DATE NOT NULL,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                modifiedAt DATETIME ON UPDATE CURRENT_TIMESTAMP
            );`);

    await pool.query(`
            CREATE TABLE IF NOT EXISTS posts (
                id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
                title VARCHAR(50) NOT NULL,
                files LONGTEXT,
                topic VARCHAR(100),
                body LONGTEXT NOT NULL,
                tags JSON,
                userId INT NOT NULL,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                modifiedAt DATETIME ON UPDATE CURRENT_TIMESTAMP,            
                FOREIGN KEY(userId) REFERENCES users(id)
                );`);

    await pool.query(`
            CREATE TABLE IF NOT EXISTS interacts (
                id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
                postId INT,
                userId INT,
                interaction INT(2) NOT NULL,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                modifiedAt DATETIME ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY(postId) REFERENCES posts(id),
                FOREIGN KEY(userId) REFERENCES users(id)
                
             );`);
    await pool.query(`
            CREATE TABLE IF NOT EXISTS favorites (
                id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
                postId INT NOT NULL,
                userId INT NOT NULL,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                modifiedAt DATETIME ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY(postId) REFERENCES posts(id),
                FOREIGN KEY(userId) REFERENCES users(id)
             );`);
    // await pool.query(`CREATE TABLE IF NOT EXISTS comments (
    //      id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    //      post_id INT NOT NULL,
    //      user_id INT NOT NULL,
    //      comment VARCHAR(255) NOT NULL,
    //      hierarchy VARCHAR(255),
    //      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    //      modifiedAt DATETIME ON UPDATE CURRENT_TIMESTAMP,
    //      FOREIGN KEY(post_Id) REFERENCES posts(id),
    //      FOREIGN KEY(user_Id) REFERENCES users(id)
    //     );`
    // );

    // await pool.query(`CREATE TABLE IF NOT EXISTS interactComments (
    //      id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    //      comment_id INT,
    //      user_id INT,
    //      interaction VARCHAR(255),
    //      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    //      modifiedAt DATETIME ON UPDATE CURRENT_TIMESTAMP,
    //      FOREIGN KEY(post_Id) REFERENCES posts(id),
    //      FOREIGN KEY(user_Id) REFERENCES users(id)
    //      );`
    // );

    console.log(`😎 las tablas fueron creadas con exito`);
  } catch (error) {
    generateError(
      `☠ Ha sucedido un imprevisto con la creación de las tablas ☠ ${error}`,
      500
    );
  } finally {
    process.exit();
  }
}

createTables();
