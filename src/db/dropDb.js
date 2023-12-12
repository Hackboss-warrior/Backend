// Generamos un script con el que podemos eliminar la base de datos y resetearla.

import generateError from "../utils/generateError.js";
import getPool from "./pool.js";
import "dotenv/config";

let pool = await getPool();

const dropDb = async () => {
  try {
    await pool.query(`DROP DATABASE IF EXISTS ${process.env.DB_NAME}`);

    console.log(`La base de datos ${process.env.DB_NAME} ha sido eliminada`);
  } catch (error) {
    generateError("Se ha producido un error al eliminar la base de datos", 500);
  } finally {
    process.exit();
  }
};

dropDb();
