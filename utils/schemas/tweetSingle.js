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
    ...tweetSchema
}

module.exports = {
    tweetIdSchema,
    createTweetSchema
};