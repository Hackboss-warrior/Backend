import getPool from '../pool.js';

const createTablePosts = async () => {
    try {
        const pool = await getPool();

        // Ejecuta la consulta SQL para crear la tabla "posts".
        await pool.query(`
        CREATE TABLE posts (
            id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
            title VARCHAR(50) NOT NULL,
            files LONGTEXT,
            subject VARCHAR(100),
            body LONGTEXT,
            tags JSON,
            user_Id INT NOT NULL,
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
            modifiedAt DATETIME ON UPDATE CURRENT_TIMESTAMP,
            foreing key (user_Id) reference users(id)
            );
    `);


        console.log('Tabla de posts creada con éxito.');
    } catch (err) {
        // Si ocurre un error, muestra un mensaje en la consola.
        console.error(err.message);
    }
};

// Llama a la función "createTable" para crear la tabla de usuarios.
createTablePosts();