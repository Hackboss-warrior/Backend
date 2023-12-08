import getPool from "../../db/pool.js";
let pool = await getPool();

const selectUser = async (email, nickName, hashedPassword) => {
  const [users] = await pool.query(
    "SELECT email, nickName, passwordHash FROM users"
  );

  return users;
};

export default selectUser;
