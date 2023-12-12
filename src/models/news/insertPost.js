import getPool from "../../db/pool.js";
let pool = await getPool();

const insertPost = async ({ title, uniqueFilename, topic, body, tags, AuthUserId }) => {
  let [{ InsertId }] = await pool.query(
    `INSERT INTO posts (title,files,topic,body,tags,userId) 
     VALUES (?,?,?,?,?,?)`,
    [title, uniqueFilename, topic, body, JSON.stringify(tags), AuthUserId]
  );

  return InsertId;
};

export default insertPost;
