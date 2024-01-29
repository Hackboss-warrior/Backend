import getPool from "../../db/pool.js";
let pool = await getPool();

const deleteUserById = async (id) => {
  await pool.query("DELETE FROM users WHERE  id = ?;", [id]);
};

export {deleteUserById}