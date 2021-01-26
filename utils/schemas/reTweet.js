const Joi = require('@hapi/joi');
const { tweetCreationSchema } = require('./assets/tweetCreation');

const reTweetIdSchema = Joi.string().regex(/^[0-9a-fA-F]{24}$/);

const reTweetSchema = {
    userId: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
    tweetSingleId: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
    tweetCreation: tweetCreationSchema,
}

const createReTweetSchema = {
    ...reTweetSchema
}

module.exports = {
    reTweetIdSchema,
    createReTweetSchema
};