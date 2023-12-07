import express from 'express';
import bcrypt from 'bcrypt';
import { selectUserByEmail, selectUserByNickName } from '../../models/users.js';

const app = express()
app.use(express.json())

app.post('/register', async (req, res) => {
    try {
        const{name, firstName, nickName, email, password, DOB } = req.body()
        const userWithSameEmail = await selectUserByEmail(email)
        const userWithSameNickName = await selectUserBynickName(nickName)
        if (userWithSameEmail || userWithSameNickName){
            console.log("El nickname o el email ya estan registrados");
        }
        res.status(201).send({mensaje: "Como vacilar a Omar"})
    } catch (error) {
        console.log("Se ha producido un error en el registro de usuario")
    }
})
  