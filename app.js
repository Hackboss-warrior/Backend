// Hacemos las importaciones
import fs from 'fs';
import express from 'express';
import 'dotenv/config'
import getPool from './src/db/pool.js';
import useDb from './src/db/useDb.js';
import bcrypt from 'bcrypt';

//Generamos las variables de entorno
const app = express()
const {PORT} = process.env
const pool = await getPool()

app.use(express.json());

//La mierda de crear la base de datos en Node
useDb();

import { insertUser, selectUserByEmail, selectUserByNickName } from './src/models/users/index.js';

app.post('/register', async (req, res) => {
    try {
        const{name, firstName, nickName, email, password, DOB} = req.body
        const userWithSameEmail = await selectUserByEmail(email)
        const userWithSameNickName = await selectUserByNickName(nickName)
        if (userWithSameEmail || userWithSameNickName){
            console.log("El nickname o el email ya estan registrados");
            return
        }
        const hashedPassword = bcrypt.hashSync(password, 10)

        const insertId = await insertUser({ name, firstName, nickName, email, hashedPassword, DOB })
        res.status(201).send({message: "Te has registrado máquina ✔️", 
        data: {id: insertId, name, firstName, nickName, email, DOB}
        })
    } catch (error) {
        console.log("Se ha producido un error en el registro de usuario")
    }
})

app.listen(PORT, ()=>{
    console.log(`Servidor corriendo en el puerto ${PORT}`)
})





// const imagePath = './image/test.jpg';

// const imageBuffer = fs.readFileSync(imagePath);

// const base64Image = imageBuffer.toString('base64');

// const decodedImageBuffer = Buffer.from(base64Image, 'base64');

// fs.writeFileSync('./test/video_decodificada.png', decodedImageBuffer);