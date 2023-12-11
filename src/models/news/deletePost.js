import getPool from "../../db/pool.js";
let pool = await getPool();


const deletePostById = async(id)=>{   

     await pool.query("DELETE FROM posts WHERE  id = ?;",[id]); 
}

export default deletePostById