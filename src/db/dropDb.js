// Generamos un script con el que podemos eliminar la base de datos y resetearla.

import getPool from "./pool.js";

let pool = await getPool();

const dropDb = async () => {
  try {
    await pool.query(`DROP DATABASE IF EXISTS ${process.env.DB_NAME}`);

    console.log(`La base de datos ${process.env.DB_NAME} ha sido eliminada`);
  } catch (error) {
    console.error(error);
  } finally {
    pool.release();
    process.exit();
  }
};

dropDb();
