import getPool from "../../db/pool.js";
let pool = await getPool();

const selectPostByTitle = async (title) => {


    const [postWithSametitle] = await pool.query(`SELECT  p.*,u.nickName, u.avatar
    FROM  users u 
    INNER JOIN 
      posts p ON u.id = p.userId 
    
    WHERE  
     p.title LIKE ? ` , [`%${title}%`] );
    return postWithSametitle;

}
const selectPostByTitleTag = async (title, tag) => {


  const [postWithSametitle] = await pool.query(`SELECT  p.*,u.nickName, u.avatar
  FROM  users u 
  INNER JOIN 
    posts p ON u.id = p.userId 
  
  WHERE  
   p.title LIKE ? AND  p.tag = ?` , [`%${title}%`, tag] );
  return postWithSametitle;

}




export  {selectPostByTitle,selectPostByTitleTag};

