// Modules
const express = require('express');
const passport = require('passport');
const ContentCreationService = require('../services/contentCreation');

//Schemas
const {
    createTweetSchema,
    tweetIdSchema,
} = require('../utils/schemas/tweetSingle');

//Validations and middlewares
const validationHandler = require('../utils/middleware/validationHandler');
const scopesValidationHandler = require('../utils/middleware/scopesValidationHandler');

//Cache response middlewares
const cacheResponse = require('../utils/cacheResponse');

//Time middlewares
const {
    FIVE_MINUTES_IN_SECONDS,
    SIXTY_MINUTES_IN_SECONDS
} = require('../utils/time');

// JWT Strategy
require('../utils/auth/strategies/jwt');

function contentCreationApi(app) {

    //Config the router
    const router = express.Router();
    app.use('/api/content/creation', router);

    //Initial instance for the services
    const contentCreation = new ContentCreationService();

    router.post(
        '/single',
        passport.authenticate('jwt', { session: false }),
        scopesValidationHandler(['create:tweet']),
        validationHandler(createTweetSchema),
        async function(req, res, next) {

            //Find the content in body
            const { body: tweet } = req;

            try {

                //Creating content data 
                const createdTweetId = await contentCreation.createContent({ collection: 'sin', tweet });

                //response with user data
                res.status(201).json({
                    data: createdTweetId,
                    message: 'Tweet created successfully'
                })
            } catch (error) {
                next(error)
            }
        }
    )
}

module.exports = contentCreationApi;