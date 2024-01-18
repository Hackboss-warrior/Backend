import getPool from "../../db/pool.js";
let pool = await getPool();

const insertComment = async ({ postId, AuthUserId, comment }) => {
  let [{ commentPosted }] = await pool.query(
    `INSERT INTO comments (postId, userId, comment) 
     VALUES (?,?,?)`,
    [postId, AuthUserId, comment]
  );
  return commentPosted;
};

export default insertComment;
