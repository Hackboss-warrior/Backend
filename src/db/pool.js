import mysql from "mysql2/promise";
import generateError from "../utils/generateError.js";

// Declara una variable para almacenar el pool de conexiones.
let pool;

const getPool = async () => {
  try {
    if (!pool) {
      pool = mysql.createPool({
        connectionLimit: 10,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        timezone: "local",
      });
    }
    return pool;
  } catch (err) {
    generateError(
      "Se ha producido un error al generar la conexión con la base de datos",
      500
    );
  }
};

export default getPool;
