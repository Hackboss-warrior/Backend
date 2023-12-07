
import insertPost from "../../models/news/insertPost.js";
import getPool from "../../db/pool.js";
let pool = await getPool()
const createPost = async (req, res) => {
    try {
        const{title,files,subject,body,tags,userId} = req.body;
         res.send(console.log({title,files,subject,body,tags,userId}))
        
       
       res.send(console.log(`😁llegamos hasta aqui y probablemente de ha creado el post${req.body}`));

    } catch (error) {
        console.error(`☠ Hubo un problema con la publicación de su Noticia ☠ , error: ${error}`);
    }
}





export default createPost