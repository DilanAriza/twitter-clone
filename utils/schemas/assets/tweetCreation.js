const Joi = require('@hapi/joi');

const tweetCreationSchema = Joi.object().default({
    date: null,
    hour: null
}).required()

module.exports = {
    tweetCreationSchema
};