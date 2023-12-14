import getPool from "../../db/pool.js";
import generateError from "../../utils/generateError.js";
let pool = await getPool();


const selectInteractsComment = async (commentId, userId) => {
    const [[selectInteracts]] = await pool.query(`SELECT commentId, userId, interaction FROM likeComments WHERE commentId =? AND userId= ?`, [commentId, userId]);
    return selectInteracts;
}

const likeInteractComment = async (binaryLikes, commentId, AuthUserId) => {
    try {
      await pool.query(
        `INSERT INTO likeComments(interaction,commentId,userId) VALUES(?,?,?)`,
        [binaryLikes, commentId, AuthUserId]
      );
  
      return;
    } catch (error) {
      generateError(error, 400);
    }
  };

  const dropInteractionComment = async (binaryLikes, commentId, AuthUserId) => {
    try {
      await pool.query(
        "DELETE FROM likeComments WHERE commentId = ? AND userId = ? AND interaction = ?",
        [commentId, AuthUserId, binaryLikes]
      );
  
      return;
    } catch (error) {
      generateError(error, 400);
    }
  };

  const modifyInteractionComment = async (binaryLikes, commentId, AuthUserId) => {
    try {
      await pool.query(
        "UPDATE likeComments SET interaction = ? WHERE commentId = ? AND userId = ?",
        [binaryLikes, commentId, AuthUserId]
      );
  
      return;
    } catch (error) {
      generateError(error, 400);
    }
  };

  export { selectInteractsComment, likeInteractComment, dropInteractionComment, modifyInteractionComment };