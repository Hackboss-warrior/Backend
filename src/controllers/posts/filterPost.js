import { filterPostByTags } from "../../models/news/index.js";
import generateError from "../../utils/generateError.js";

const filterPost = async (req, res, next) => {
    try {
        const { etiqueta } = req.body;
        const consulta = await filterPostByTags({ etiqueta })

        console.log(consulta)

        res.send(`Okey`)

    } catch (error) { 
        next(error)
    }
};

export default filterPost;