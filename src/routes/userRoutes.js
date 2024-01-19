import express from "express";
import validateAuth from "../middlewares/validateAuth.js";
import { getUserById, login, register, patchUser,contacForm } from "../controllers/users/index.js";



// Creamos el enrutador de express

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.patch("/user", validateAuth, patchUser);
router.get("/profile", validateAuth, getUserById);
//----------------------
router.post("/contact", contacForm);
export default router;
