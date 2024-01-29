import express from "express";
import {validateAuth} from "../middlewares/index.js";
import { login, register, patchUser, getAllUser, getUserbyId, deleteUserAdmin, patchUserAdmin } from "../controllers/users/index.js";

// Creamos el enrutador de express

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.patch("/user", validateAuth, patchUser);
router.get('/user', validateAuth, getAllUser);
router.get('/profile', validateAuth, getUserbyId)
router.delete('/user/:id', validateAuth, deleteUserAdmin)
router.patch('/user/:id', validateAuth, patchUserAdmin);

export default router;
