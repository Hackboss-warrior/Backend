import getPool from '../pool.js';

const createTableLikes = async () => {
    try {
        const pool = await getPool();

        // Ejecuta la consulta SQL para crear la tabla "likes".
        await pool.query(`
        CREATE TABLE likes (
            id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
            post_Id INT,
            user_Id INT,
            like boolean NOT NULL DEFAULT FALSE,
            createdAt DATETIME NOT NULL  DEFAULT DATETIME_TIMESAMP,
            foreing key (post_Id) reference posts(id),
            foreing key (user_Id) reference users(id)
         );`
    );

        console.log('Tabla de likes creada con éxito.');
    } catch (err) {
        // Si ocurre un error, muestra un mensaje en la consola.
        console.error(err.message);
    }
};

// Llama a la función "createTable" para crear la tabla de usuarios.
createTableLikes();