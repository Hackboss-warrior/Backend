import getPool from "../../db/pool.js";
let pool = await getPool();
    



const updatePost = async({ title, files, topic, body, tags, id})=>{
    
    const [{ resultado }] = await pool.query(
        "UPDATE posts SET title = ?, files = ?, topic = ?, body = ?, tags = ? WHERE id = ?",
        [title, files, topic, body, JSON.stringify(tags), id]
    );
    return resultado
   
}
    


export default updatePost

