// En models/users ubicamos todas las querys utilizadas para la creación, gestión y eliminación de usuarios en nuestra base de datos. p.e. insert into users...
import selectUserByEmail from "./SelectEmailUsers.js";
import selectUserByNickName from "./SelectNickNameUsers.js";
import insertUser from "./insertUser.js";
import {selectUser, selectUserById} from "./selectUser.js";
import editUser from "./editUser.js"

export { selectUserByEmail, selectUserByNickName, insertUser, selectUser, selectUserById, editUser };
