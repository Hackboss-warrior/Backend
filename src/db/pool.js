import mysql from 'mysql2/promise'
import 'dotenv/config'
const {DB_HOST, DB_USER, DB_PORT, DB_PASS, DB_NAME} = process.env

// Declara una variable para almacenar el pool de conexiones.
let pool;

const getPool = async () => {
    try {
        if (!pool) {
            pool = mysql.createPool({
                connectionLimit: 10,
                host: DB_HOST,
                user: DB_USER,
                password: DB_PASS,
                timezone: 'local', 
            });
        }
        return pool;
    } catch (err) {
        console.error(err);
    }
};

export default getPool;