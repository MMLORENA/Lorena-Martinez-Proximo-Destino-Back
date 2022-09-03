import { Joi } from "express-validation";

const loginCredentialSchema = {
  body: Joi.object({
    userName: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

export default loginCredentialSchema;
