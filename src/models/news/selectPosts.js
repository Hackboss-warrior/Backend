import getPool from "../../db/pool.js";

let pool = await getPool();

const selectPosts = async (title, tag) => {
  const params = [];

  let query = `
    SELECT users.nickName, users.avatar, posts.* FROM users INNER JOIN posts ON users.id = posts.userId
  `;
  
  if (title !== "") {
    query += ` WHERE posts.title LIKE ?`;
    params.push(`%${title}%`);
  }

  if (tag !== "") {
    query += title !== "" ? ` AND posts.tag = ?` : ` WHERE posts.tag = ?`;
    params.push(tag);
  }

  const [resultado] = await pool.query(query, params);
  return resultado;
};

export default selectPosts;
