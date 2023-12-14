import getPool from "../../db/pool.js";
let pool = await getPool();
import generateError from "../../utils/generateError.js";

const likeInteract = async (like, postId, AuthUserId) => {
  try {
    await pool.query(
      `insert into interacts(interaction,postId,userId) values(?,?,?)`,
      [like, postId, AuthUserId]
    );

    return;
  } catch (error) {
    generateError(error, 400);
  }
};

const modifyInteraction = async (like, postId, AuthUserId) => {
  try {
    await pool.query(
      "UPDATE interacts SET interaction = ? WHERE postId = ? AND userId = ?",
      [like, postId, AuthUserId]
    );

    return;
  } catch (error) {
    generateError(error, 400);
  }
};

const dropInteraction = async (like, postId, AuthUserId) => {
  try {
    await pool.query(
      "DELETE FROM interacts WHERE postId = ? AND userId = ? AND interaction = ?",
      [postId, AuthUserId, like]
    );

    return;
  } catch (error) {
    generateError(error, 400);
  }
};

export { likeInteract, modifyInteraction, dropInteraction };
