import getPool from "../../db/pool.js";


const pool = getPool()
 const lsPostById = async(id)=>{
    cosnt [[title]] = await pool.query("SELECT title FROM posts WHERE  id=?;",[id]);
res.send(title)
};

export default lsPostById