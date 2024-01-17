import { selectUserByAuthToken } from "../../models/users/index.js";

const userById = async (req, res, next) => {
    try {
        const AuthUserId = req.auth.jwtPayLoad.id;
        const myUser = await selectUserByAuthToken(AuthUserId);
        res.send(myUser)

    } catch (error) {
        next(error)
    }
};


export  {userById}