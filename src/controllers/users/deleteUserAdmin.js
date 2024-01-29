
import {selectUserById, deleteUserById} from "../../models/users/index.js";
import generateError from "../../utils/generateError.js";

const deleteUserAdmin = async (req, res, next) => {
    try {
        const AuthUserId = req.auth.jwtPayLoad.id;
        const id = req.params.id;

        const userID = await selectUserById(AuthUserId)
        if (userID[0].role !== 'admin') {
            generateError("Que intentas hacer si no eres admin..., tira pa' casa flipao", 400)
        }

        console.log(id)
        await deleteUserById(id);
        res.send(`El usuario ha sido eliminado correctamente`);

    } catch (error) {
        next(error);
    }
};

export default deleteUserAdmin;
