import { filterPostByTags } from "../../models/news/index.js";

const filterPost = async (req, res, next) => {
    try {
        const { etiqueta } = req.body;
        const consulta = await filterPostByTags({ etiqueta })

        res.send(consulta)

    } catch (error) { 
        next(error)
    }
};

export default filterPost;