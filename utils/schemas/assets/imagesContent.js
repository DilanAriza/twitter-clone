const Joi = require('@hapi/joi');

const imagesContentIdSchema = Joi.string().regex(/^[0-9a-fA-F]{24}$/);

const imagesContentSchema = Joi.array().items(Joi.object().default({
    order: null,
    url: null,
    alt: null
}));

module.exports = {
    imagesContentIdSchema,
    imagesContentSchema
};