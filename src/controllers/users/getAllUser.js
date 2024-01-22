import { selectUserById, selectUserAll } from "../../models/users/index.js";
import bcrypt from "bcrypt";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import sharp from "sharp";
import generateError from "../../utils/generateError.js";

const getAllUser = async (req, res, next) => {

  try {
    const AuthUserId = req.auth.jwtPayLoad.id;
    const userID = await selectUserById(AuthUserId)
    if (userID[0].admin !== 'admin'){
        generateError("Que intentas hacer si no eres admin..., tira pa' casa flipao")
    }
    const user = await selectUserAll()
    console.log("hola")
    res.status(200).send(user);
    
  } catch (error) {
    next(error);
  }
};

export default getAllUser;
