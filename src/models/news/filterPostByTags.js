import getPool from "../../db/pool.js";
let pool = await getPool();

const filterPostByTags = async ({ etiqueta }) => {
    const queryString = `SELECT * FROM posts WHERE JSON_CONTAINS(tags, '{"${etiqueta}": true}')`;
    try {
      const [rows, fields] = await pool.query(queryString);
      return rows;
    } catch (error) {
      console.error('Error al buscar posts por etiquetas:', error);
      throw error;
    }
  };
  
  export default filterPostByTags;
  