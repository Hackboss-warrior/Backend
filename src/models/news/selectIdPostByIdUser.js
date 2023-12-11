import getPool from "../../db/pool.js";
let pool = await getPool();


const selectIdPostByIdUser = async(id)=>{
    
    const [[resultado]] = await pool.query("SELECT userId FROM posts WHERE  id = ?;",[id]);
   
return resultado

}

export default selectIdPostByIdUser