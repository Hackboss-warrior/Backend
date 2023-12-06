// En este archivo generamos una acción para ubicarnos en la base de datos sobre la que estamos trabajando
import getPool from "./pool.js"

const useDb = async ()=>{
    try {
        const pool = await getPool();
        await pool.query(`USE ${process.env.DB_NAME}`)
    } catch (error) {
        console.error(`☠ La base de datos no se ha ejecutado ☠ ${error}`)
    }
}

useDb()