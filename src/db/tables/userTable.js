import getPool from '../pool.js';

const createTableUsers = async () => {
    try {
        const pool = await getPool();

        // Ejecuta la consulta SQL para crear la tabla "users".
        await pool.query(`
        CREATE TABLE users (
           id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
           name VARCHAR(50) NOT NULL,
           firstName VARCHAR(50),
           nickName VARCHAR(100) NOT NULL,
           email VARCHAR(100) NOT NULL,
           passwordHash VARCHAR(255) NOT NULL,
           birthDay DATE NOT NULL,
           createdAt DATETIME NOT NULL  DEFAULT DATETIME_TIMESAMP,
           modifiedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        );`);

        console.log('Tabla de usuarios creada con éxito.');
    } catch (err) {
        // Si ocurre un error, muestra un mensaje en la consola.
        console.error(err.message);
    }
};

// Llama a la función "createTable" para crear la tabla de usuarios.
createTableUsers();