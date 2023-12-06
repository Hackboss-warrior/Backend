// Hacemos las importaciones
import fs from 'fs';
import express from 'express';
import 'dotenv/config'

//Generamos las variables de entorno
const app = express()
const {PORT} = process.env

app.get('/', function(req, res){
    res.send('Hello World')
})

app.listen(PORT, ()=>{
    console.log(`Servidor corriendo en el puerto ${PORT}`)
})






// const imagePath = './image/test.jpg';

// const imageBuffer = fs.readFileSync(imagePath);

// const base64Image = imageBuffer.toString('base64');

// const decodedImageBuffer = Buffer.from(base64Image, 'base64');

// fs.writeFileSync('./test/video_decodificada.png', decodedImageBuffer);