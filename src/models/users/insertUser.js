import getPool from "../../db/pool.js";
let pool = await getPool();

const insertUser = async ({
  name,
  firstName,
  BIO,
  uniqueFilename,
  nickName,
  email,
  hashedPassword,
  DOB,
}) => {
  const [{ insertId }] = await pool.query(
    `INSERT INTO users (name, firstName, BIO, avatar, nickName, email, passwordHash, DOB) VALUES (?,?,?,?,?,?,?,?)`,
    [name, firstName, BIO, uniqueFilename, nickName, email, hashedPassword, DOB]
  );
  return insertId;
};

export default insertUser;
