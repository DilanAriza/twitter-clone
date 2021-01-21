const Joi = require('@hapi/joi');

const imagesContentIdSchema = Joi.string().regex(/^[0-9a-fA-F]{24}$/);

const imagesContentSchema = {
    order: Joi.number().required(),
    url: Joi.string().required(),
    alt: Joi.string().required()
}

module.exports = {
    imagesContentIdSchema,
    imagesContentSchema
};