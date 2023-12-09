import getPool from "../../db/pool.js";
let pool = await getPool();

const selectUserByEmail = async (email) => {
    const[[userWithSameEmail]] = await pool.query(`SELECT email FROM users WHERE email = ?`, [email]);
    return userWithSameEmail;
}

export default selectUserByEmail