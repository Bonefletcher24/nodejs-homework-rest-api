const Joi = require('joi');

const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

const validateContact = (req, res, next) => {
  const { error } = contactSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: `missing required ${error.details[0].context.key} field` });
  }
  next();
};

const validateUpdateContact = (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: 'missing fields' });
  }
  next();
};

module.exports = { validateContact, validateUpdateContact };
