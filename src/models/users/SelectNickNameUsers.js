import getPool from "../../db/pool.js";
let pool = await getPool();

const selectUserByNickName = async (nickName) => {
    const[[userWithSameNickname]] = await pool.query(`SELECT nickName FROM users WHERE nickName = ?`, [nickName]);
    return userWithSameNickname;
}

export default selectUserByNickName
