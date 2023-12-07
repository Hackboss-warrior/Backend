// Hacemos las importaciones
import fs from 'fs';
import express from 'express';
import 'dotenv/config'
import useDb from './src/db/useDb.js'

//rutas
import router from "./src/routes/index.js";
//Generamos las variables de entorno
const app = express()
const {PORT} = process.env
app.use(express.json())

useDb()





app.get('/', function(req, res){
    res.send('Hello World')
})

// --> Publicar una nueva noticia - Xavi
//--> Listar una única noticia completa - Xavi

app.use(router);





















app.listen(PORT, ()=>{
    console.log(`Servidor corriendo en el puerto ${PORT}`)
})






// const imagePath = './image/test.jpg';

// const imageBuffer = fs.readFileSync(imagePath);

// const base64Image = imageBuffer.toString('base64');

// const decodedImageBuffer = Buffer.from(base64Image, 'base64');

// fs.writeFileSync('./test/video_decodificada.png', decodedImageBuffer);