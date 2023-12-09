import getPool from '../../db/pool.js'
let pool = await getPool();

const insertPost =async ({title,files,topic,body,tags,userId})=>{
// console.log({title,files,topic,body,tags});
     
let [{InsertId}] = await pool.query(`INSERT INTO posts (title,files,topic,body,tags,userId) 
     VALUES (?,?,?,?,?,?)`,[title,files,topic,body,tags,userId]);
  
     return InsertId 

};



export default insertPost