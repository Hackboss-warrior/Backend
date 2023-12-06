import getPool from "./pool.js"

const createDB = async ()=>{
    try {
        const pool = await getPool();
        await pool.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`)
    } catch (error) {
        console.log(`Se ha producido un error al crear la base de datos ${error}`)
    }
}

createDB()