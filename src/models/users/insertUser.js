import getPool from "../../db/pool.js";
let pool = await getPool();

const insertUser = async ({name, firstName, nickName, email, hashedPassword, DOB}) => {
    const[{insertId}] = await pool.query(`INSERT INTO users (name, firstName, nickName, email, passwordHash, DOB) VALUES (?,?,?,?,?,?)`, [name, firstName, nickName, email, hashedPassword, DOB]); 
    return insertId
}

export default insertUser