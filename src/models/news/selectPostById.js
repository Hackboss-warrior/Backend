import getPool from "../../db/pool.js";
let pool = await getPool();


const selectByPostId = async(id)=>{
    
    const [[resultado]] = await pool.query("SELECT * FROM posts WHERE  id = ?;",[id]);
   
return resultado

}

export default selectByPostId