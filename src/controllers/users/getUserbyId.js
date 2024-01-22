import { selectUserById, selectUserAll } from "../../models/users/index.js";
import bcrypt from "bcrypt";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import sharp from "sharp";
import generateError from "../../utils/generateError.js";

const getUserbyId = async (req, res, next) => {

  try {

    const AuthUserId = req.auth.jwtPayLoad.id;
    
    const userId = await selectUserById(AuthUserId)

    if (!userId){
        generateError("No tienes acceso a un perfil que no sea el tuyo")
    }
    const user = await selectUserAll()
    console.log("hola")
    res.status(200).send(user[0]);
    
  } catch (error) {
    next(error);
  }
};

export default getUserbyId;










