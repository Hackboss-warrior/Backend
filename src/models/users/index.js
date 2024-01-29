// En models/users ubicamos todas las querys utilizadas para la creación, gestión y eliminación de usuarios en nuestra base de datos. p.e. insert into users...
import selectUserByEmail from "./SelectEmailUsers.js";
import selectUserByNickName from "./SelectNickNameUsers.js";
import insertUser from "./insertUser.js";
import {selectUser, selectUserById, selectUserAll} from "./selectUser.js";
import { editUser, editUserAdmin } from "./editUser.js"
import { deleteUserById } from "./deleteUser.js";

export { selectUserByEmail, selectUserByNickName, insertUser, selectUser, selectUserById, editUser, selectUserAll, deleteUserById, editUserAdmin };
