import express from "express";
import validateAuth from "../middlewares/validateAuth.js";
import { login, register, patchUser, getAllUser, getUserbyId } from "../controllers/users/index.js";

// Creamos el enrutador de express

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.patch("/user", validateAuth, patchUser);
router.get('/user', validateAuth, getAllUser);
router.get('/profile', validateAuth, getUserbyId)

export default router;
