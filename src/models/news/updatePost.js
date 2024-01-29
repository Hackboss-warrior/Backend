import getPool from "../../db/pool.js";
let pool = await getPool();
    



const updatePost = async({ title, files, topic, body, id})=>{
    
    const [{ resultado }] = await pool.query(
        "UPDATE posts SET title = ?, files = ?, topic = ?, body = ? WHERE id = ?",
        [title, files, topic, body, id]
    );
    return resultado
   
}
    


export default updatePost

