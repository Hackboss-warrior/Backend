import getPool from "../../db/pool.js";
let pool = await getPool();
import generateError from "../../utils/generateError.js";

const likeComment = async (postId, AuthUserId, commentId) => {
    try {
      await pool.query(
        `insert into likeComments(postId, AuthUserId, commentId) values(?,?,?)`,
        [postId, AuthUserId, commentId]
      );
  
      return;
    } catch (error) {
      generateError(error, 400);
    }
  };
  
  const removeLike = async (postId, AuthUserId, commentId) => {
    try {
      await pool.query(
        "DELETE FROM likeComments WHERE postId = ? AND userId = ? AND interaction = ?",
        [postId, AuthUserId, commentId]
      );
  
      return;
    } catch (error) {
      generateError(error, 400);
    }
  };
  
  export { likeComment, removeLike };
  