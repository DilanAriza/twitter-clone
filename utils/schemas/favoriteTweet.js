const Joi = require('@hapi/joi');
const { tweetCreationSchema } = require('./assets/tweetCreation');

const favoriteTweetId = Joi.string().regex(/^[0-9a-fA-F]{24}$/);

const favoriteTweetSchema = {
    userId: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
    tweetId: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
    favoriteTweetCreation: tweetCreationSchema,
}

const createfavoriteTweetSchema = {
    ...favoriteTweetSchema
}

module.exports = {
    favoriteTweetId,
    createfavoriteTweetSchema
};