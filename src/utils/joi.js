import Joi from "joi";
import generateError from "./generateError.js";

// Registro de usuario

const registerValidation = ({
  name,
  firstName,
  nickName,
  email,
  password,
  DOB,
}) => {
  const schema = Joi.object().keys({
    name: Joi.string().required(),
    firstName: Joi.string(),
    nickName: Joi.string().min(4).max(16).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(20).required(),
    DOB: Joi.date().required(),
  });
  const validation = schema.validate({
    name,
    firstName,
    nickName,
    email,
    password,
    DOB,
  });
  if (validation.error) {
    generateError(validation.error.message, 400);
  }
};

//guardar nueva noticia
const createPostValidation = ({ title, topic, body, tags }) => {
  const schema = Joi.object().keys({
    title: Joi.string().min(2).max(30).required(),
    topic: Joi.string().min(2).max(100),
    body: Joi.string().max(600),
    tags: Joi.object(),
  });

  const validation = schema.validate({ title, topic, body, tags });

  if (validation.error) {
    generateError(validation.error.message, 400);
  }
};

export { createPostValidation, registerValidation };
