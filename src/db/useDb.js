// En este archivo generamos una acción para ubicarnos en la base de datos sobre la que estamos trabajando
import generateError from "../utils/generateError.js";
import getPool from "./pool.js";
import "dotenv/config";

const useDb = async () => {
  try {
    const pool = await getPool();
    await pool.query(`USE ${process.env.DB_NAME}`);
    console.log(`Base de datos en uso`);
  } catch (error) {
    generateError("No se ha podido acceder a la base de datos", 500);
  }
};

export default useDb;
