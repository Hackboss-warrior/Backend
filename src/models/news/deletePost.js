import getPool from "../../db/pool.js";
let pool = await getPool();

const deletePostById = async (id) => {
  await pool.query("DELETE FROM posts WHERE  id = ?;", [id]);
};

const deleteCommentByPostId = async (id) => {
  
  await pool.query("DELETE FROM likeComments WHERE commentId IN (SELECT id FROM comments WHERE postId = ?)", [id]);
  await pool.query("DELETE FROM comments WHERE postId = ?", [id]);

  
};

const deleteFavoriteByPostId = async (id) => {
  await pool.query("DELETE FROM favorites WHERE postId = ?", [id]);
};

const deleteInteractsByPostId = async (id) => {
  await pool.query("DELETE FROM interacts WHERE postId = ?", [id]);
};

export {
  deletePostById,
  deleteCommentByPostId,
  deleteFavoriteByPostId,
  deleteInteractsByPostId,
};
