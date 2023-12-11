import Joi from "joi";
import generateError from "./generateError.js";

const dataValidation = async (
  name,
  firstName,
  nickName,
  email,
  password,
  DOB
) => {
  const schema = Joi.object().keys({
    name: Joi.string().required(),
    firstName: Joi.string(),
    nickName: Joi.string().min(4).max(20).required(),
    email: Joi.string().email().required(),
    password: Joi.required(),
    DOB: Joi.date().required(),
  });

  const validation = schema.validate(
    name,
    firstName,
    nickName,
    email,
    password,
    DOB
  );

  if (validation !== true) {
    generateError(
      "Los datos introducidos no son válidos, por favor, revísalos",
      400
    );
  }
};

export default dataValidation;
