import getPool from "../../db/pool.js";
let pool = await getPool();

const selectPosts = async () => {
  const [resultado] = await pool.query("SELECT * FROM posts");

  /*
    SELECT *
FROM users
INNER JOIN posts ON users.id = posts.userId
LEFT JOIN comments ON posts.id = comments.userId*/

  /*SELECT * FROM posts*/

  return resultado;
};

export default selectPosts;
