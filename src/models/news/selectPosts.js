import getPool from "../../db/pool.js";
let pool = await getPool();

const selectPosts = async () => {
  const [resultado] = await pool.query(
    "SELECT users.nickName, users.avatar, posts.* FROM users INNER JOIN posts ON users.id = posts.userId"
  );

  /* "SELECT users.nickName, users.avatar, posts.*, interacts.postId, interacts.userId, interacts.interaction FROM users INNER JOIN posts ON users.id = posts.userId LEFT JOIN interacts ON posts.id = interacts.postId" */

  return resultado;
};

export default selectPosts;
