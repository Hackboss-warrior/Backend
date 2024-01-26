import mysql from "mysql2/promise";
import generateError from "../utils/generateError.js";
import "dotenv/config";

let initPool;

const getInitPool = async () => {
  try {
    if (!initPool) {
      initPool = mysql.createPool({
        connectionLimit: 10,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        timezone: "local",
      });
    }
    return initPool;
  } catch (err) {
    generateError(
      "Se ha producido un error al generar la conexión con la base de datos",
      500
    );
  }
};

export default getInitPool;
