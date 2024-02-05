import getPool from "../../db/pool.js";
let pool = await getPool();

const filterPostByTags = async (tag) => {
  const [resultado] = await pool.query(
    "SELECT users.nickName, users.avatar, users.id as idUserTable,  posts.*, comments.comment, interacts.postId as interactPostId, interacts.userId as interactUserId, interacts.interaction FROM users INNER JOIN posts ON users.id = posts.userId LEFT JOIN comments ON posts.id = comments.postId LEFT JOIN interacts ON posts.id = interacts.postId WHERE posts.tag = ?",
    [tag]
  );

  return resultado;
};


const SearchPostByTags = async (tag) => {
  const [resultado] = await pool.query(
    "SELECT  p.*,u.nickName, u.avatar FROM  users u INNER JOIN posts p ON u.id = p.userId WHERE p.tag = ?",
    [tag]
  );

  return resultado;
};




export  {filterPostByTags, SearchPostByTags};