import { selectByPostId } from "../../models/news/index.js";



const lsPostById = async (req, res) => {
  try {
    const id = req.params.id;
    const post = await selectByPostId(id);

    res.send(post)

  } catch (error) {
    console.error(`☠   ${error.message}     ☠`);
  }
};

export default lsPostById;