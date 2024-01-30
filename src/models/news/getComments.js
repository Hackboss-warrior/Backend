import getPool from "../../db/pool.js";
let pool = await getPool();

const getComments = async () => {
  const [resultado] = await pool.query(
    "SELECT comments.*, posts.id as postIds, users.nickName, users.avatar FROM comments INNER JOIN posts ON comments.postId = posts.id INNER JOIN users ON comments.userId = users.id"
  );

  return resultado;
};

const getCommentsbyId = async (id) => {
  const [resultado] = await pool.query("SELECT * FROM comments WHERE id= ?", [
    id,
  ]);

  return resultado;
};

const selectIdCommentByIdUser = async (id) => {
  const [[resultado]] = await pool.query(
    "SELECT * FROM comments WHERE id = ?;",
    [id]
  );

  return resultado;
};

const deleteCommentById = async (id) => {
  await pool.query("DELETE FROM comments WHERE  id = ?;", [id]);
};

export {
  getComments,
  getCommentsbyId,
  selectIdCommentByIdUser,
  deleteCommentById,
};
