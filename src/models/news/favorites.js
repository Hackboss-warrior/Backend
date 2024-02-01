import getPool from "../../db/pool.js";
let pool = await getPool();
import generateError from "../../utils/generateError.js";

const selectFavoriteByPost = async (postId, userId) => {
  const [[selectFavorites]] = await pool.query(
    `SELECT postId, userId FROM favorites WHERE postId =? AND userId= ?`,
    [postId, userId]
  );
  return selectFavorites;
};

const getFavorites = async () => {
  const [favorites] = await pool.query(`SELECT * FROM favorites`);
  return favorites;
};

const saveFavorite = async (postId, AuthUserId) => {
  try {
    await pool.query(`insert into favorites (postId,userId) values(?,?)`, [
      postId,
      AuthUserId,
    ]);

    return;
  } catch (error) {
    generateError(error, 400);
  }
};

const dropfavorite = async (postId, AuthUserId) => {
  try {
    await pool.query("DELETE FROM favorites WHERE postId = ? AND userId = ?", [
      postId,
      AuthUserId,
    ]);

    return;
  } catch (error) {
    generateError(error, 400);
  }
};

const selectFavoritesPosts = async (AuthUserId) => {
  const [resultado] = await pool.query(
    "SELECT * FROM favorites where userId=?",
    [AuthUserId]
  );

  return resultado;
};

const getFavoriteByPost = async (postId) => {
  const [resultado] = await pool.query(
    "SELECT * FROM favorites where postId=?",
    [postId]
  );


  return resultado
  }

const selectFavoritesPostsById = async (AuthUserId) => {

  const [resultado] = await pool.query("SELECT p.*,u.nickName, u.avatar FROM favorites f  INNER JOIN posts p ON  f.postId = p.Id LEFT JOIN users u ON u.id = p.userId where f.userId=? ", [AuthUserId]);


  return resultado
}

export {
  selectFavoriteByPost,
  saveFavorite,
  dropfavorite,
  selectFavoritesPosts,
  getFavorites,
  getFavoriteByPost,
  selectFavoritesPostsById
};
