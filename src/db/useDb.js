// En este archivo generamos una acción para ubicarnos en la base de datos sobre la que estamos trabajando
import getPool from "./pool.js"
import 'dotenv/config'
const { DB_NAME } =process.env
const useDb = async ()=>{
    try {
        const pool = await getPool();
        await pool.query(`USE ${DB_NAME}`)
        console.log(`base de datos en uso`);
    } catch (error) {
        console.error(`☠ La base de datos no se ha ejecutado ☠ ${error}`)
    }
}


export default useDb;