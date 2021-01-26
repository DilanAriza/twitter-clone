const Joi = require('@hapi/joi');
const { tweetCreationSchema } = require('./assets/tweetCreation');
const { imagesContentSchema } = require('./assets/imagesContent');

const singleTweetIdSchema = Joi.string().regex(/^[0-9a-fA-F]{24}$/);

const singleTweetSchema = {
    userId: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
    tweetCreation: tweetCreationSchema,
    textContent: Joi.string().required(),
    imagesContent: imagesContentSchema
}

const createSingleTweetSchema = {
    ...singleTweetSchema
}

module.exports = {
    singleTweetIdSchema,
    createSingleTweetSchema
};