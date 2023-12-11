import getPool from "../../db/pool.js";
let pool = await getPool();

const selectUser = async (email, nickName, hashedPassword) => {
  const [users] = await pool.query(
    "SELECT id,email, nickName, passwordHash FROM users"
  );

  return users;
};

const selectUserAll = async (id) => {
  const [users] = await pool.query(
    "SELECT name, firstName, nickName, email, DOB FROM users WHERE id=?", [id]
  );

  return users;
};

export {selectUser, selectUserAll};
