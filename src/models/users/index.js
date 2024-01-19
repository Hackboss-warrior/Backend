// En models/users ubicamos todas las querys utilizadas para la creación, gestión y eliminación de usuarios en nuestra base de datos. p.e. insert into users...
import selectUserByEmail from "./SelectEmailUsers.js";
import selectUserByNickName from "./SelectNickNameUsers.js";
import insertUser from "./insertUser.js";
import { selectUser, selectgetUserById} from "./selectUser.js";
import editUser from "./editUser.js"
import insertForm from "./insertContactForm.js";

export { selectUserByEmail, selectUserByNickName, insertUser, selectUser, selectgetUserById, editUser,insertForm };
