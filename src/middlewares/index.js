// En la carpeta middlewares ubicaremos todos los middlewares utilizados en el proyecto. Entre ellos encontramos el middleware de gestión de errores, el middleware de ruta no encontrada, etc.

import notFound from "./notFound.js";
import handleError from "./handleError.js";
import validateAuth from "./validateAuth.js";

export { notFound, handleError, validateAuth };
