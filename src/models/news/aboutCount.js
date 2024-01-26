import getPool from "../../db/pool.js";
let pool = await getPool();

const aboutCount = async () => {
  const [[resultado]]= await pool.query(
    "SELECT COUNT(DISTINCT u.id) AS totalUsers, COUNT(DISTINCT p.id) AS totalPosts, COUNT(DISTINCT c.id) AS totalComments FROM users u LEFT JOIN posts p ON u.id = p.userId LEFT JOIN comments c ON u.id = c.userId;"
  );


  return resultado;
};

export default aboutCount;