import getPool from "../../db/pool.js";
let pool = await getPool();

const listCommentByPostId = async (id) => {
  const [resultado] = await pool.query(
    "SELECT * FROM comments WHERE postId = ?",
    [id]
  );

  return resultado;
};

export default listCommentByPostId;
