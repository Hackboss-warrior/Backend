import getPool from '../../db/pool.js'
const pool = getPool()

const insertPost = async ({title,files,subject,body,tags,userId})=>{
   

     await pool.query(`INSERT INTO posts(title,files,subject,body,tags,userId) VALUES (?,?,?,?,?,?)`,[title,files,subject,body,tags,userId]);
   
};


export default insertPost