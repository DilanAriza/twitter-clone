const Joi = require('@hapi/joi');
const { tweetCreationSchema } = require('./assets/tweetCreation');
const { imagesContentSchema } = require('./assets/imagesContent');

const quotedTweetIdSchema = Joi.string().regex(/^[0-9a-fA-F]{24}$/);

const quotedTweetSchema = {
    userId: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
    tweetSingleId: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
    tweetCreation: tweetCreationSchema,
    imagesContent: imagesContentSchema,
    textContent: Joi.string().required(),
}

const createQuotedTweetSchema = {
    ...quotedTweetSchema
}

module.exports = {
    quotedTweetIdSchema,
    createQuotedTweetSchema
};