import getPool from "../../db/pool.js";
let pool = await getPool();

const getComments = async () => {
  const [resultado] = await pool.query(
    "SELECT comments.*, posts.id as postIds, users.nickName, users.avatar FROM comments INNER JOIN posts ON comments.postId = posts.id INNER JOIN users ON comments.userId = users.id"
  );

  return resultado;
};

export default getComments;
