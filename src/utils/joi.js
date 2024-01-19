import Joi from "joi";
import generateError from "./generateError.js";

// Registro de usuario

const registerValidation = ({
  name,
  firstName,
  BIO,
  nickName,
  email,
  password,
  DOB,
}) => {
  const schema = Joi.object().keys({
    name: Joi.string().required(),
    firstName: Joi.string(),
    BIO: Joi.string().max(200),
    nickName: Joi.string().min(4).max(16).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(20).required(),
    DOB: Joi.date().required(),
  });
  const validation = schema.validate({
    name,
    firstName,
    BIO,
    nickName,
    email,
    password,
    DOB,
  });
  if (validation.error) {
    generateError(validation.error.message, 400);
  }
};
// Modificación de usuario
const editUserValidation = ({
  name,
  firstName,
  BIO,
  nickName,
  email,
  password,
  DOB,
}) => {
  const schema = Joi.object().keys({
    name: Joi.string(),
    firstName: Joi.string(),
    BIO: Joi.string().max(200),
    nickName: Joi.string().min(4).max(16),
    email: Joi.string().email(),
    password: Joi.string().min(6).max(20),
    DOB: Joi.date(),
  });
  const validation = schema.validate({
    name,
    firstName,
    BIO,
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

const editPostValidation = ({ title, topic, body, tags }) => {
  const schema = Joi.object().keys({
    title: Joi.string().min(2).max(30),
    topic: Joi.string().min(2).max(100),
    body: Joi.string().max(600),
    tags: Joi.object(),
  });

  const validation = schema.validate({ title, topic, body, tags });

  if (validation.error) {
    generateError(validation.error.message, 400);
  }
};
const createContactMessageValidation = ({ subject,email,body }) => {
  const schema = Joi.object().keys({
    subject: Joi.string().min(2).max(30),
    email: Joi.string().min(2).max(100),
    body: Joi.string().max(600),
     });

  const validation = schema.validate({ subject,email,body});

  if (validation.error) {
    generateError(validation.error.message, 400);
  }
};



export { createPostValidation, registerValidation, editUserValidation, editPostValidation ,createContactMessageValidation};
