import express from "express";

import { login, register } from "../controllers/users/index.js";

// Creamos el enrutador de express

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

export default router;
