import getPool from "../../db/pool.js";
let pool = await getPool();
    



const updatePost = async({ title, topic, body, id})=>{
    
    const [{ resultado }] = await pool.query(
        "UPDATE posts SET title = ?, topic = ?, body = ? WHERE id = ?",
        [title, topic, body, id]
    );
    
    return resultado
   
}
    


export default updatePost

