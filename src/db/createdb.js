import getPool from "./pool.js";
import useDb from "./useDb.js";
import generateError from "../utils/generateError.js";
import "dotenv/config";

const createDB = async () => {
  try {
    
    const pool = await getPool();
    await pool.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`);
    console.log(`base de datos ${process.env.DB_NAME} creada con exito`);
    await useDb();
  } catch (error) {
    generateError(
      `Se ha producido un error al crear la base de datos ${error}`,
      500
    );
  } finally {
    process.exit();
  }
};

createDB();
