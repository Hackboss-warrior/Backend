
import getPool from "../../db/pool.js";
let pool = await getPool();
import generateError from "../../utils/generateError.js";



const selectFavoriteByPost = async (postId, userId) => {
  const [[selectFavorites]] = await pool.query(`SELECT postId, userId FROM favorites WHERE postId =? AND userId= ?`, [postId, userId]);
  return selectFavorites;
}


const saveFavorite = async (postId, AuthUserId) => {
  try {
    await pool.query(
      `insert into favorites (postId,userId) values(?,?)`,
      [postId, AuthUserId]
    );

    return;
  } catch (error) {
    generateError(error, 400);
  }
};


const dropfavorite = async (postId, AuthUserId) => {
  try {
    await pool.query(
      "DELETE FROM favorites WHERE postId = ? AND userId = ?",
      [postId, AuthUserId]
    );

    return;
  } catch (error) {
    generateError(error, 400);
  }
};


const selectFavoritesPosts = async (AuthUserId) => {


  const [resultado] = await pool.query("SELECT * FROM favorites where userId=?", [AuthUserId]);

  return resultado
}


export { selectFavoriteByPost, saveFavorite, dropfavorite, selectFavoritesPosts };















