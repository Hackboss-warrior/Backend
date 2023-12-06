import getPool from '../pool.js';

const createTableUsers = async () => {
    try {
        const pool = await getPool();

        // Ejecuta la consulta SQL para crear la tabla "users".
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                firstName VARCHAR(255),
                lastName VARCHAR(255)
            )
        `);

        console.log('Tabla de usuarios creada con éxito.');
    } catch (err) {
        // Si ocurre un error, muestra un mensaje en la consola.
        console.error(err.message);
    }
};

// Llama a la función "createTable" para crear la tabla de usuarios.
createTable();