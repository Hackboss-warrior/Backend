// Hacemos las importaciones
import express from "express";
import "dotenv/config";
import cors from "cors";
import useDb from "./src/db/useDb.js";
import morgan from "morgan";
import fileUpload from "express-fileupload";
// Importamos las rutas
import router from "./src/routes/index.js";

// importamos los middlewares
import { notFound, handleError } from "./src/middlewares/index.js";

// Definimos la variable app para utilizar los métodos de express a través de ella
const app = express();

// Generamos los middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// Apuntamos a la base de datos que queremos utilizar.
useDb();

// Ruta con todos los endpoints de usuario modularizados
app.use(router);

// Implementamos los middlewares de gestión de errores y de ruta no encontrada
app.use(notFound);
app.use(handleError);

// función controladora de la escucha del puerto, en caso de que este ocupada probará 4 veces y si no hay resultado pasará a probar escuchar en el puerto 5000

// Variable que almacena el número de intentos para conectar al puerto
let ATTEMPTS = process.env.ATTEMPTS;
function startServer() {
  const server = app.listen(process.env.PORT);

  server.on("listening", () => {
    console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
  });

  server.on("error", async (error) => {
    if (error.code === "EADDRINUSE") {
      console.log(`El puerto ${process.env.PORT} ya está en uso`);
      server.close();

      if (ATTEMPTS > 0) {
        ATTEMPTS -= 1;
        console.log(
          `Intentando reiniciar el servidor en el puerto ${process.env.PORT}. Intentos restantes: ${ATTEMPTS}`
        );

        if (ATTEMPTS === 0) {
          process.env.PORT = 5000;
        }

        setTimeout(() => {
          startServer();
        }, process.env.DURATION);
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

