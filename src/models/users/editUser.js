import getPool from "../../db/pool.js";
let pool = await getPool();

const editUser = async ({
  AuthUserId,
  name,
  firstName,
  BIO,
  avatar,
  nickName,
  email,
  password,
  DOB,
}) => {
  const [{ insertId }] = await pool.query(
    "UPDATE users SET name = ?, firstName = ?, BIO = ?, avatar =?, nickName = ?, email = ?, passwordHash = ?, DOB = ? WHERE id = ?",
    [name, firstName, BIO, avatar, nickName, email, password, DOB, AuthUserId]
  );
  console.log(avatar);
  return insertId;
};

export default editUser;
