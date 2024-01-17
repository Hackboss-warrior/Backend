import getPool from "../../db/pool.js";
let pool = await getPool();

const selectUser = async () => {
  const [users] = await pool.query(
    "SELECT id, email, nickName, passwordHash FROM users"
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
// igual que la de arriba pero no solicita passwordHash
const selectUserByAuthToken = async (id) => {
  const [users] = await pool.query(
    "SELECT name, firstName, avatar, BIO, nickName, email,  DOB FROM users WHERE id=?",
    [id]
  );
  return users;
  }


export { selectUser, selectUserById, selectUserByAuthToken };
