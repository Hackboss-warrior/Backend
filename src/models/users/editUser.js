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
  return insertId;
};

const editUserAdmin = async ({
  id,
  role,
}) => {
  const [{ insertId }] = await pool.query(
    "UPDATE users SET role = ? WHERE id = ?",
    [role, id]
  );
  console.log(role, id)
  return insertId;
};

export {editUser, editUserAdmin};
