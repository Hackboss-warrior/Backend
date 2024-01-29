// En controllers/users se van a incluir todas las funciones que realizan las acciones de las peticiones relacionadas con la parte de gestión de perfiles de usuario (register,login y editar el usuario)

import login from "./login.js";
import register from "./register.js";
import patchUser from "./patchUser.js";
import getAllUser from "./getAllUser.js"
import getUserbyId from "./getUserbyId.js"
import deleteUserAdmin from "./deleteUserAdmin.js"
import patchUserAdmin from "./patchUserAdmin.js"

export { login, register, patchUser, getAllUser, getUserbyId, deleteUserAdmin, patchUserAdmin };
