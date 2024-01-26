import getInitPool from "./initPool.js";
import useDb from "./useDb.js";
import generateError from "../utils/generateError.js";
import "dotenv/config";

const createDB = async () => {
  try {
    const pool = await getInitPool();
    await pool.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`);
    console.log(
      `La base de datos ${process.env.DB_NAME} ha sido creada con éxito`
    );
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
