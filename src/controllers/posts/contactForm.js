import insertContactForm from "../../models/news/insertContactForm.js"
import { createPostContactValidation } from "../../utils/joi.js";


const postContactForm = async (req, res, next) => {
  try {
   
    const { subject, email, body } = req.body;

    createPostContactValidation({subject, email, body})
    await insertContactForm({ subject, email, body });

    
    res.send("Su consulta ha sido enviada. Seguramente nadie se la va a leer, pero ha sido un buen intento.");
  } catch (error) {
    next(error);
  }
};

export default postContactForm;
