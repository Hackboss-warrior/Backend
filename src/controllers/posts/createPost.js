import {insertPost,selectByPostId} from "../../models/news/index.js";

const createPost = async (req, res) => {
    try {
        const{title,files,topic,body,tags,userId} = req.body;
  
        const x = await insertPost({title,files,topic,body,tags,userId});
         
        res.send(title)
      
       
       console.log(`😁llegamos hasta aqui y probablemente de ha creado el post`);

    } catch (error) {
        console.error(`☠ Hubo un problema con la publicación de su Noticia ☠ , error: ${error.message}`);
    }
}




export default createPost