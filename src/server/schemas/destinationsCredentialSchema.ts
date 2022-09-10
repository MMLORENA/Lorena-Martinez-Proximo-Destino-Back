import { Joi } from "express-validation";

const createDestinationValidation = {
  body: Joi.object({
    destination: Joi.string().required(),
    image: Joi.string().required(),
    backupImage: Joi.string().required(),
    latitude: Joi.number().required(),
    longitud: Joi.number().required(),
    category: Joi.string().required(),
    firstPlan: Joi.string().required(),
    descriptionFirstPlan: Joi.string().required(),
    secondPlan: Joi.any().allow(null, ""),
    descriptionSecondPlan: Joi.any().allow(null, ""),
    thirdPlan: Joi.any().allow(null, ""),
    descriptionThirdPlan: Joi.any().allow(null, ""),
  }),
};

export default createDestinationValidation;
