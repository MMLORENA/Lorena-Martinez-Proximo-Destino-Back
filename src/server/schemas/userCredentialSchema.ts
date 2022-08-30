import { Joi } from "express-validation";

const userCredentialSchema = {
  body: Joi.object({
    name: Joi.string().required(),
    firstName: Joi.string().required(),
    secondName: Joi.string(),
    userName: Joi.string().min(5).required(),
    password: Joi.string().min(4).required(),
    destinations: Joi.array(),
  }),
};

export default userCredentialSchema;
