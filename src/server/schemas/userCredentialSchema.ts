import { Joi } from "express-validation";

const userCredentialSchema = {
  body: Joi.object({
    name: Joi.string().required(),
    firstName: Joi.string().required(),
    secondName: Joi.any().allow(null, ""),
    userName: Joi.string().required(),
    destinations: Joi.array(),
    password: Joi.string().required(),
    repeatedPassword: Joi.string().required().valid(Joi.ref("password")),
  }),
};

export default userCredentialSchema;
