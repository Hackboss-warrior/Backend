import generateError from "../../utils/generateError.js";
import insertFrom from "../../models/users/insertContactForm.js";

const contacForm = async (req, res, next)=>{

const {asunto, email,body} = req.body
console.log(asunto, email,body);
try {
    if (!asunto||!email ||!body) {
        generateError("El todos los campos deben rellenarse", 400);
      }
      console.log("segundo log",asunto, email,body);
     await insertFrom(asunto, email,body)
    
    res.send("Su exposición ha sido subida con el asunto: "+asunto)
} catch (error) {
    next(error)
}

}


export default contacForm