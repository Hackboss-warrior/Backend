import getPool from "./pool.js"
import useDb from "./useDb.js";
import 'dotenv/config'

const createDB = async () => {
    try {
        const pool = await getPool();
        await pool.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`)
        console.log(`base de datos ${process.env.DB_NAME} creada con exito`);
        await useDb()
    } catch (error) {
        console.log(`Se ha producido un error al crear la base de datos ${error}`)
    } finally {
        process.exit()
    }
}

createDB()
