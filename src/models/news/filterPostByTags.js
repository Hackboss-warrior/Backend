import getPool from "../../db/pool.js";
import generateError from "../../utils/generateError.js";
let pool = await getPool();

const filterPostByTags = async ({ etiqueta }) => {
  const conditions = etiqueta.map(etiqueta => `JSON_EXTRACT(tags, '$.${etiqueta}') = true`).join(' OR ');
  const queryString = `SELECT title, files, topic, body, tags, userId, createdAt FROM posts WHERE ${conditions}`;
  try {
    const [rows, fields] = await pool.query(queryString);
    return rows;
  } catch (error) {
    generateError(`Error al buscar posts por etiquetas:${error}`, 400)
  }
};

export default filterPostByTags;