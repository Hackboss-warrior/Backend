// Creamos el script de inicialización de la base de datos, con las tablas.
import getPool from './pool.js';

 async function createTables () {
    let pool;
    try{
        pool = await getPool()
        
        await pool.query(`
            CREATE TABLE Users (
               id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
               name VARCHAR(50) NOT NULL,
               firstName VARCHAR(50),
               nickName VARCHAR(100) NOT NULL,
               email VARCHAR(100) NOT NULL,
               passwordHash VARCHAR(255) NOT NULL,
               DOB DATE NOT NULL,
               createdAt DATETIME NOT NULL  DEFAULT DATETIME_TIMESAMP,
               modifiedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            );`
        );




        await pool.query(`
            CREATE TABLE posts (
                id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
                title VARCHAR(50) NOT NULL,
                files LONGTEXT,
                subject VARCHAR(100),
                body LONGTEXT,
                tags JSON,
                user_Id INT NOT NULL,
                createdAt DATETIME NOT NULL  DEFAULT DATETIME_TIMESAMP,
                modifiedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                foreing key (user_Id) reference users(id)
                );
        `);

        await pool.query(`
            CREATE TABLE Likes (
                id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
                post_Id INT,
                user_Id INT,
                like boolean NOT NULL DEFAULT FALSE,
                createdAt DATETIME NOT NULL  DEFAULT DATETIME_TIMESAMP,
                foreing key (post_Id) reference posts(id),
                foreing key (user_Id) reference users(id)
             );`
        );
        await pool.query(`
            CREATE TABLE Favorites (
                id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
                post_i INT NOT NULL,
                user_id INT NOT NULL,
                createdAt DATETIME NOT NULL  DEFAULT DATETIME_TIMESAMP,
                foreing key (post_Id) reference posts(id),
                foreing key (user_Id) reference users(id)
             );`
             
        );
        await pool.query(`CREATE TABLE comments (
            id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
            post_id INT NOT NULL,
            user_id INT NOT NULL,
            comment VARCHAR(255) NOT NULL,
            hierarchy VARCHAR(255),
            createdAt DATETIME NOT NULL  DEFAULT DATETIME_TIMESAMP,
            modifiedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            foreing key (post_Id) reference posts(id),
            foreing key (user_Id) reference users(id)
            );`
        );

        await pool.query(`CREATE TABLE likeComments (
            id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
            comment_id INT,
            user_id INT,
            like VARCHAR(255),
            createdAt DATETIME NOT NULL  DEFAULT DATETIME_TIMESAMP,
            foreing key (comment_id) reference comments(id),
            foreing key (user_Id) reference users(id)
            );`
        );



    } catch (error){
        console.error(console.log(`☠ Ha sucedido un imprevisto con la creación de las tablas ☠${error}`))
    } finally{
        if(pool) {
            pool.release() /*--> pool.release() Para forzar la desconexión al finalizar el proceso de creación en la base de datos
            process.exit()*/
        }
    }
}

createTables()

