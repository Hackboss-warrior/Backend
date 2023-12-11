import getPool from "../../db/pool.js";
let pool = await getPool();

const editUser = async ({AuthUserId, name, firstName, nickName, email, password, DOB}) => {
    const[{insertId}] = await pool.query(
        "UPDATE users SET name = ?, firstName = ?, nickName = ?, email = ?, passwordHash = ?, DOB = ? WHERE id = ?",
        [name, firstName, nickName, email, password, DOB, AuthUserId])

    return insertId
}

export default editUser