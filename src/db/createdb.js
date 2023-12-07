import getPool from "./pool.js"
import useDb from "./useDb.js";
const createDB = async ()=>{
    try {
        const pool = await getPool();
        await pool.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`)
        console.log(`base de datos ${process.env.DB_NAME} creada con exito`);
        await useDb()
        console.log(`base de datos en uso`);
    } catch (error) {
        console.log(`Se ha producido un error al crear la base de datos ${error}`)
    }
}

createDB()
