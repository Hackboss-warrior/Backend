import getPool from "../../db/pool.js";
let pool = await getPool();

const insertComment = async ({ postId, AuthUserId, comment, hierarchy }) => {
  let [{ commentPosted }] = await pool.query(
    `INSERT INTO comments (postId, userId, comment, hierarchy) 
     VALUES (?,?,?,?)`,
    [postId, AuthUserId, comment, hierarchy]
  );
  return commentPosted;
};

export default insertComment;
