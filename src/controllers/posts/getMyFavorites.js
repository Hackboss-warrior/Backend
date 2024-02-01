////////////////////////////////////////////////////////////////

import {  getFavorites, selectAllInteracts, selectFavoritesPostsById } from "../../models/news/index.js";

/////////////////////////////
const selectFavoritesByToken = async (req, res, next) => {
    try {
        const authUserId = req.auth.jwtPayLoad.id;
        const postsFavorites = await selectFavoritesPostsById(authUserId);
        console.log(postsFavorites, "FAVORITESpost");
       
        
        const likes = await selectAllInteracts();
        const favs = await getFavorites();
        res.send(
            [postsFavorites,likes, favs]
        );

    } catch (error) {
        next(error);
    }
};


export default selectFavoritesByToken 
