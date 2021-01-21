const Joi = require('@hapi/joi');
const { tweetCreationSchema } = require('./assets/tweetCreation');
const { imagesContentSchema } = require('./assets/imagesContent');

const tweetIdSchema = Joi.string().regex(/^[0-9a-fA-F]{24}$/);

const tweetSchema = {
    userId: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
    tweetCreation: tweetCreationSchema,
    textContent: Joi.string().required(),
    imagesContent: imagesContentSchema
}

const createTweetSchema = {
    ...tweetSchema,
    isAdmin: Joi.boolean()
}

const createProviderTweetSchema = {
    ...tweetSchema,
    apiKeyToken: Joi.string().required()
}

module.exports = {
    tweetIdSchema,
    createTweetSchema,
    createProviderTweetSchema
};