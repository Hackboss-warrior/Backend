import getPool from "../../db/pool.js";
let pool = await getPool();

const selectPosts = async () => {
  const [resultado] = await pool.query(
    "SELECT users.nickName, users.avatar, posts.*, comments.comment, interacts.postId, interacts.userId, interacts.interaction FROM users INNER JOIN posts ON users.id = posts.userId LEFT JOIN comments ON posts.id = comments.postId LEFT JOIN interacts ON posts.id = interacts.postId"
  );

  ///////////// Este código funciona pero agrupa los comentarios en una fila única se podría separar por la coma para pintarlos??? /////////////
  /*
  SELECT
    users.nickName,
    users.avatar,
    posts.*,
    (SELECT GROUP_CONCAT(comment) FROM comments WHERE postId = posts.id) AS all_comments,
    interacts.userId,
    (SELECT GROUP_CONCAT(interaction) FROM interacts WHERE postId = posts.id) AS all_interactions
FROM
    users
INNER JOIN
    posts ON users.id = posts.userId
LEFT JOIN
    interacts ON posts.id = interacts.postId
  */

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////

  /*
    SELECT users.nickName, users.avatar, posts.*, comments.comment, interacts.postId, interacts.userId, interacts.interaction FROM users INNER JOIN posts ON users.id = posts.userId LEFT JOIN comments ON posts.id = comments.postId LEFT JOIN interacts ON posts.id = interacts.postId
*/

  /*SELECT * FROM posts*/

  return resultado;
};

export default selectPosts;
