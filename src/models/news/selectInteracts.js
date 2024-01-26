import getPool from "../../db/pool.js";
let pool = await getPool();

const selectInteracts = async (postId, userId) => {
  const [[selectInteracts]] = await pool.query(
    `SELECT postId, userId, interaction FROM interacts WHERE postId =? AND userId= ?`,
    [postId, userId]
  );
  return selectInteracts;
};

const selectAllInteracts = async () => {
  const [allInteracts] = await pool.query(
    "SELECT postId, userId, interaction FROM interacts"
  );
  return allInteracts;
};

export { selectInteracts, selectAllInteracts };
