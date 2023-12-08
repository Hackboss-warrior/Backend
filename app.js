// Hacemos las importaciones
import fs from "fs";
import express from "express";
import "dotenv/config";
import useDb from "./src/db/useDb.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Importamos las rutas
import userRoutes from "./src/routes/index.js";

// Importamos los modelos de usuario
import {
  insertUser,
  selectUser,
  selectUserByEmail,
  selectUserByNickName,
} from "./src/models/users/index.js";

// Importamos los controladores de usuario
import { login, register } from "./src/controllers/users/index.js";

// importamos los middlewares
import { notFound, handleError } from "./src/middlewares/index.js";

//Recuperamos las variables de entorno
let { PORT, TOKEN_SECRET, DURATION, ATTEMPTS } = process.env;

// Definimos la variable app para utilizar los métodos de express a través de ella
const app = express();

// Generamos los middlewares
app.use(express.json());

// Apuntamos a la base de datos que queremos utilizar.
useDb();

// Ruta con todos los endpoints de usuario modularizados
app.use(userRoutes);

//app.post("/register", register);

// Endopoint registro de usuario (sin modularizar)
/*
app.post("/register", async (req, res) => {
  try {
    const { name, firstName, nickName, email, password, DOB } = req.body;
    const userWithSameEmail = await selectUserByEmail(email);
    const userWithSameNickName = await selectUserByNickName(nickName);
    if (userWithSameEmail || userWithSameNickName) {
      console.log("El nickname o el email ya estan registrados");
      return;
    }
    const hashedPassword = bcrypt.hashSync(password, 10);

    const insertId = await insertUser({
      name,
      firstName,
      nickName,
      email,
      hashedPassword,
      DOB,
    });
    res.status(201).send({
      message: "Te has registrado máquina ✔️",
      data: { id: insertId, name, firstName, nickName, email, DOB },
    });
  } catch (error) {
    console.log("Se ha producido un error:", error);
    res.sendStatus(500).json({ message: "Error interno del servidor" });
  }
});
*/

// Endpoint de usuario para loguearse sin modularizar
/*
app.post("/login", async (req, res) => {
  try {
    let { email, nickName, password } = req.body;

    const user = await selectUser(email, nickName, password);

    user.forEach((data) => {
      if (
        (data.email === email || data.nickName === nickName) &&
        bcrypt.compareSync(password, data.passwordHash)
      ) {
        const jwtPayLoad = { id: data.id };

        let token = jwt.sign(
          {
            jwtPayLoad,
            nickName: data.nickName,
          },
          TOKEN_SECRET,
          { expiresIn: "5d" }
        );

        res.status(200).json({
          message: "Bienvenido al sitio web",
          token,
        });
        exit;
      }
    });
    console.log("Credenciales inválidas");
    res.status(401).json({ message: "Credenciales inválidas" });
  } catch (error) {
    console.log("Se ha producido un error:", error);
    res.sendStatus(500).json({ message: "Error interno del servidor" });
  }
});
*/

// Implementamos los middlewares de gestión de errores y de ruta no encontrada
app.use(notFound);
app.use(handleError);

// Activación del puerto con express

// app.listen(PORT, () => {
//     console.log(`Servidor corriendo en el puerto ${PORT}`);
// });

// función controladora de la escucha del puerto, en caso de que este ocupada probará 4 veces y si no hay resultado pasará a probar escuchar en el puerto 5000
function startServer() {
  const server = app.listen(PORT);

  server.on("listening", () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
  });

  server.on("error", async (error) => {
    if (error.code === "EADDRINUSE") {
      console.log(`El puerto ${PORT} ya está en uso`);
      server.close();

      if (ATTEMPTS > 0) {
        ATTEMPTS -= 1;
        console.log(
          `Intentando reiniciar el servidor en el puerto ${PORT}. Intentos restantes: ${ATTEMPTS}`
        );

        if (ATTEMPTS === 0) {
          PORT = 5000;
        }

        setTimeout(() => {
          startServer();
        }, DURATION);
      } else {
        console.log(
          "No quedan más intentos. Servidor apagándose. Por favor verifique que el puerto no esté ocupado por otra aplicación antes de ejecutar"
        );
        process.exit();
      }
    } else {
      console.error("Ocurrió un error al intentar iniciar el servidor:", error);
    }
  });
}

startServer();

// const imagePath = './image/test.jpg';

// const imageBuffer = fs.readFileSync(imagePath);

// const base64Image = imageBuffer.toString('base64');

// const decodedImageBuffer = Buffer.from(base64Image, 'base64');

// fs.writeFileSync('./test/video_decodificada.png', decodedImageBuffer);
