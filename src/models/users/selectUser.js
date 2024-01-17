import getPool from "../../db/pool.js";
let pool = await getPool();

const selectUser = async (email, nickName) => {
  const [users] = await pool.query(
    "SELECT id, email, nickName, passwordHash FROM users WHERE email = ? OR nickName = ?",
    [email, nickName]
  );

  return users;
};

const selectUserById = async (id) => {
  const [users] = await pool.query(
    "SELECT name, firstName, avatar, BIO, nickName, email, passwordHash, DOB FROM users WHERE id=?",
    [id]
  );

  return users;
};

export { selectUser, selectUserById };
