// En routes/index almacenamos las rutas creadas con el enrutador de express de cada una de las identidades con las que vamos a trabajar (posts, users). Para luego llamar a app.use(routes) desde nuestro entry point

import express from "express";

import userRoutes from "./userRoutes.js";

import postRoutes from "./noticeRoutes.js";

const router = express.Router()

router.use(postRoutes);

router.use(userRoutes);

export default router;
