
import {
  selectFavoriteByPost,
  saveFavorite,
  dropfavorite,
  selectFavoritesPosts,
  getFavorites
} from "../../models/news/index.js";

const insertFavorite = async (req, res, next) => {
  try {
    const AuthUserId = req.auth.jwtPayLoad.id;
    let postId = req.params.id;
    const selectPost = await selectFavoriteByPost(postId, AuthUserId);

    if (selectPost === undefined) {
      await saveFavorite(postId, AuthUserId);
      // res.status(200).send('Has almacenado en favoritos 👍')
    } else {
      await dropfavorite(postId, AuthUserId);
      // res.status(200).send('borrado de favoritos👍')
    }
  } catch (error) {
    next(error);
  } finally {
    const favs = await getFavorites();
    res.status(200).send(favs);
  }
};

const selectFavorites = async (req, res, next) => {

  try {
    const AuthUserId = req.auth.jwtPayLoad.id;
    const favoritos = await selectFavoritesPosts(AuthUserId);
    res.send(favoritos);
  } catch (error) {
    next(error);
  }

};

export { selectFavorites, insertFavorite}
