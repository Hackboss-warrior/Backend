import getPool from '../pool.js';
import useDb from '../useDb.js';
const createTableFavorites = async () => {
    try {
        const pool = await getPool();
        await
        // Ejecuta la consulta SQL para crear la tabla "favorites".
        await pool.query(`
        CREATE TABLE favorites (
            id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
            post_i INT NOT NULL,
            user_id INT NOT NULL,
            createdAt DATETIME NOT NULL  DEFAULT DATETIME_TIMESTAMP,
            foreing key (post_Id) reference posts(id),
            foreing key (user_Id) reference users(id)
             );`
        );

        console.log('Tabla de favorites creada con éxito.');
    } catch (err) {
        // Si ocurre un error, muestra un mensaje en la consola.
        console.error(err.message);
    }
};

// Llama a la función "createTable" para crear la tabla de usuarios.
createTableFavorites();