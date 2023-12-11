import express from "express";
import validateAuth from "../middlewares/validateAuth.js";
import { login, register, patchUser } from "../controllers/users/index.js";

// Creamos el enrutador de express

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/user", validateAuth, patchUser)

export default router;
