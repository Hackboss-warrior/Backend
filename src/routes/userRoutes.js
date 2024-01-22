import express from "express";
import validateAuth from "../middlewares/validateAuth.js";
import { login, register, patchUser, getAllUser } from "../controllers/users/index.js";

// Creamos el enrutador de express

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.patch("/user", validateAuth, patchUser);
router.get('/user', validateAuth, getAllUser)

export default router;
