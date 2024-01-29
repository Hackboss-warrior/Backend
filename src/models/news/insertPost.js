import getPool from "../../db/pool.js";
let pool = await getPool();

const insertPost = async ({
  title,
  uniqueFilename,
  topic,
  body,
  AuthUserId,
  tag,
}) => {
  let [{ InsertId }] = await pool.query(
    `INSERT INTO posts (title,files,topic,body,userId,tag) 
     VALUES (?,?,?,?,?,?)`,
    [title, uniqueFilename, topic, body, AuthUserId, tag]
  );

  return InsertId;
};

export default insertPost;
