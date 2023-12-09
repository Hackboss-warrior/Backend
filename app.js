// Hacemos las importaciones
import express from "express";
import "dotenv/config";
import cors from "cors";
import useDb from "./src/db/useDb.js";

// Importamos las rutas
import router from "./src/routes/index.js";

// importamos los middlewares
import { notFound, handleError } from "./src/middlewares/index.js";
import morgan from "morgan";

//Recuperamos las variables de entorno
let { PORT, DURATION, ATTEMPTS } = process.env;

// Definimos la variable app para utilizar los métodos de express a través de ella
const app = express();

// Generamos los middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Apuntamos a la base de datos que queremos utilizar.
useDb();

// Ruta con todos los endpoints de usuario modularizados
app.use(router);

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
