// Modules
const express = require('express');
const passport = require('passport');
const ContentCreationService = require('../services/contentCreation');

//Schemas
const { createSingleTweetSchema } = require('../utils/schemas/tweetSingle');
const { createReTweetSchema } = require('../utils/schemas/reTweet');
const { createQuotedTweetSchema } = require('../utils/schemas/quotedTweet');

//Validations and middlewares
const validationHandler = require('../utils/middleware/validationHandler');
const scopesValidationHandler = require('../utils/middleware/scopesValidationHandler');

//Cache response middlewares
const cacheResponse = require('../utils/cacheResponse');

//Time middlewares
const {
    FIVE_MINUTES_IN_SECONDS
} = require('../utils/time');

// JWT Strategy
require('../utils/auth/strategies/jwt');

//Functions
const {
    organizedDataToDate
} = require('../utils/functions/organizedData');



// PRINCIPAL STRATEGY
function contentCreationApi(app) {

    //Config the router
    const router = express.Router();
    app.use('/api/content/creation', router);

    //Initial instance for the services
    const contentCreation = new ContentCreationService();

    router.get(
        '/',
        async function(req, res, next) {
            cacheResponse(res, FIVE_MINUTES_IN_SECONDS);

            const { tags } = req.query;

            try {

                //Get all tweets from collections
                const allSingleTweets = await contentCreation.getContents({ collection: 'sin', tags });
                const allReTweets = await contentCreation.getContents({ collection: 'ret', tags });
                const allQuotedTweets = await contentCreation.getContents({ collection: 'quo', tags });

                // Organized the data, prepare send to client
                const dataorganizedallSingleTweets = organizedDataToDate(allSingleTweets, "tweetCreation", "date");
                const dataorganizedallReTweets = organizedDataToDate(allReTweets, "tweetCreation", "date");
                const dataorganizedallQuotedTweets = organizedDataToDate(allQuotedTweets, "tweetCreation", "date");

                //Send response to client
                res.status(200).json({
                    data: {
                        dataorganizedallSingleTweets,
                        dataorganizedallReTweets,
                        dataorganizedallQuotedTweets
                    },
                    message: 'Contents listed'
                })

            } catch (error) {
                next(error)
            }
        }
    )

    router.get(
        '/:id',
        async function(req, res, next) {
            cacheResponse(res, FIVE_MINUTES_IN_SECONDS);

            const { id } = req.params;

            try {
                console.log(id)

                var dataResult = [];

                //Get all tweets from collections
                const FindedSingleTweets = await contentCreation.getContent({ collection: 'sin', id });
                const FindedReTweets = await contentCreation.getContent({ collection: 'ret', id });
                const FindedQuotedTweets = await contentCreation.getContent({ collection: 'quo', id });

                console.log(FindedSingleTweets)
                console.log(FindedReTweets)
                console.log(FindedQuotedTweets)

                if (typeof FindedSingleTweets[0] !== null && typeof FindedSingleTweets[0] !== 'undefined') {
                    dataResult.push(FindedSingleTweets);
                }

                if (typeof FindedReTweets[0] !== null && typeof FindedReTweets[0] !== 'undefined') {
                    dataResult.push(FindedReTweets);
                }

                if (typeof FindedQuotedTweets[0] !== null && typeof FindedQuotedTweets[0] !== 'undefined') {
                    dataResult.push(FindedQuotedTweets);
                }

                //Send response to client
                res.status(200).json({
                    data: {
                        dataResult
                    },
                    message: 'Contents listed'
                })

            } catch (error) {
                next(error)
            }
        }
    )

    router.post(
        '/single',
        passport.authenticate('jwt', { session: false }),
        scopesValidationHandler(['create:tweet']),
        validationHandler(createSingleTweetSchema),
        async function(req, res, next) {

            //Find the content in body
            const { body: tweet } = req;

            //Verify the session, the user is required 
            if (tweet.userId === ("" + req.user._id + "")) {

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

            } else {
                next(new Error("No have permisions to modify data " + req.user._id));
            }
        }
    )

    router.post(
        '/rt',
        passport.authenticate('jwt', { session: false }),
        scopesValidationHandler(['create:re-tweet']),
        validationHandler(createReTweetSchema),
        async function(req, res, next) {

            //Find the content in body
            const { body: tweet } = req;


            //Verify the session, the user is required 
            if (tweet.userId === ("" + req.user._id + "")) {

                try {

                    //Creating content data 
                    const createdReTweetId = await contentCreation.createContent({ collection: 'ret', tweet });

                    //response with user data
                    res.status(201).json({
                        data: createdReTweetId,
                        message: 're-Tweet created successfully'
                    })
                } catch (error) {
                    next(error)
                }

            } else {
                next(new Error("No have permisions to modify data " + req.user._id));
            }
        }
    )

    router.post(
        '/quoted',
        passport.authenticate('jwt', { session: false }),
        scopesValidationHandler(['create:quote-tweet']),
        validationHandler(createQuotedTweetSchema),
        async function(req, res, next) {

            //Find the content in body
            const { body: tweet } = req;

            //Verify the session, the user is required
            if (tweet.userId === ("" + req.user._id + "")) {

                try {

                    //Creating content data 
                    const createdQuotedTweettId = await contentCreation.createContent({
                        collection: 'quo',
                        tweet
                    });

                    //response with user data
                    res.status(201).json({
                        data: createdQuotedTweettId,
                        message: 'Quoted Tweet created successfully'
                    })
                } catch (error) {
                    next(error)
                }

            } else {
                next(new Error("No have permisions to modify data " + req.user._id));
            }
        }
    )

}


module.exports = contentCreationApi;