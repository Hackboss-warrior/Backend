import getPool from "../../db/pool.js";
let pool = await getPool();

const updatePost = async({ title, topic, body, tag, postFile, id})=>{
    await pool.query(
        "UPDATE posts SET title = ?, topic = ?, body = ?, tag = ?, files = ? WHERE id = ?",
        [title, topic, body, tag, postFile, id]
    );
    return
}

export default updatePost

