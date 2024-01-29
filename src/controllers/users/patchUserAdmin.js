import { selectUserById, editUserAdmin } from "../../models/users/index.js";
import generateError from "../../utils/generateError.js";

const patchUserAdmin = async (req, res, next) => {
    try {
        console.log("ok")

        const AuthUserId = req.auth.jwtPayLoad.id;
        const id = req.params.id;
        const role = req.body.role


        const userID = await selectUserById(AuthUserId)
        if (userID[0].role !== 'admin') {
            generateError("Que intentas hacer si no eres admin..., tira pa' casa flipao", 400)
        }

        await editUserAdmin({id, role});

        res.status(200).send("Has modificado el rol a este usuario");

    } catch (error) {
        next(error);
    }
};

export default patchUserAdmin;
