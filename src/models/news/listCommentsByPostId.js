import getPool from "../../db/pool.js";
let pool = await getPool();

const listCommentByPostId = async (id) => {
  const [resultado] = await pool.query(
    "SELECT comments.*, posts.id as postIds, users.nickName, users.avatar FROM comments INNER JOIN posts ON comments.postId = posts.id INNER JOIN users ON comments.userId = users.id WHERE postId=?",
    [id]
  );

  return resultado;
};

export default listCommentByPostId;
