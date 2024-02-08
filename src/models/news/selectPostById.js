import getPool from "../../db/pool.js";
let pool = await getPool();

const selectPostById = async (id) => {
  const [[resultado]] = await pool.query(
    "SELECT users.nickName, users.avatar, users.id as idUserTable,  posts.*, comments.comment, interacts.postId as interactPostId, interacts.userId as interactUserId, interacts.interaction FROM users INNER JOIN posts ON users.id = posts.userId LEFT JOIN comments ON posts.id = comments.postId LEFT JOIN interacts ON posts.id = interacts.postId WHERE posts.id = ?",
    [id]
  );

  return resultado;
};

const selectPostByIdLimit = async (id) => {
  const [[resultado]] = await pool.query(
    "SELECT title, files, topic, body, tag FROM posts WHERE id = ?;",
    [id]
  );

  return resultado;
};

export { selectPostById, selectPostByIdLimit };