import getPool from "../../db/pool.js";
let pool = await getPool();


const selectPosts = async()=>{
    
    const [resultado] = await pool.query("SELECT * FROM posts");
   
return resultado

}

export default selectPosts