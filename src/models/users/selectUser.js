import getPool from "../../db/pool.js";
let pool = await getPool();

const selectUser = async (email, nickName, hashedPassword) => {
  const [users] = await pool.query(
    "SELECT email, nickName, passwordHash FROM users"
  );

  return users;
};

/* const selectUser = async ({ email, nickname, hashedPassword }) => {
  const [{ user }] = await pool.query(
    (`SELECT email FROM users WHERE email = ?`, [email])
  );

  console.log(user);
  return user;
};
*/

export default selectUser;
