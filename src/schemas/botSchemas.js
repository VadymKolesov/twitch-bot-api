import Joi from "joi";

export const startBotSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "Name is required",
    "string.base": "Name must be a string",
  }),

  message: Joi.string().max(500).required().messages({
    "string.max": "Message must contain less than 500 characters",
    "any.required": "Message is required",
    "string.base": "Message must be a string",
  }),

  interval: Joi.number().min(0.1).required().messages({
    "number.base": "Interval must be a number",
    "number.min": "Interval must be at least 0.1 minute",
    "any.required": "Interval is required",
  }),

  token: Joi.string().max(40).required().messages({
    "string.max": "Token must contain less than 40 characters",
    "any.required": "Token is required",
    "string.base": "Token must be a string",
  }),
});

export default { startBotSchema };
