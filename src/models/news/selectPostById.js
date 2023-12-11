import getPool from "../../db/pool.js";
let pool = await getPool();


const selectPostById = async(id)=>{
    
    const [[resultado]] = await pool.query("SELECT * FROM posts WHERE  id = ?;",[id]);
   
return resultado

}

const selectPostByIdLimit = async(id)=>{
    
    const [[resultado]] = await pool.query("SELECT title, files, topic, body, tags FROM posts WHERE  id = ?;",[id]);
   
return resultado

}

export {selectPostById, selectPostByIdLimit} 