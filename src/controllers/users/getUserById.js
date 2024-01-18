import { selectgetUserById } from "../../models/users/index.js";

const getUserById = async (req, res, next) => {
    try {
        const AuthUserId = req.auth.jwtPayLoad.id;
        const myUser = await selectgetUserById(AuthUserId);
//axadir
console.log(myUser[0]);
// axadir variables para el res send
const name = myUser[0].name
const firstName =myUser[0].firstName
const nickName = myUser[0].nickName
const email = myUser[0].email
const DOB = myUser[0].DOB
const BIO = myUser[0].BIO
const avatar = myUser[0].avatar


const resumen = {nickName,email,name,firstName,DOB,BIO,avatar}



        res.send(resumen)

    } catch (error) {
        next(error)
    }
};


export default getUserById 