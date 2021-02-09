// Modules
const express = require('express');
const passport = require('passport');
const FavoriteTweetService = require('../services/favoriteTweet');

//Schemas
const { createfavoriteTweetSchema } = require('../utils/schemas/favoriteTweet');

//Validations and middlewares
const validationHandler = require('../utils/middleware/validationHandler');
const scopesValidationHandler = require('../utils/middleware/scopesValidationHandler');

// JWT Strategy
require('../utils/auth/strategies/jwt');

//Functions
const {
    organizedDataToDate
} = require('../utils/functions/organizedData');



// PRINCIPAL STRATEGY
function favoriteTweetApi(app) {

    //Config the router
    const router = express.Router();
    app.use('/api/content/favorite', router);

    //Initial instance for the services
    const favoriteTweetService = new FavoriteTweetService();

    router.get(
        '/',
        async function(req, res, next) {

            const { tags } = req.query;

            try {

                //Get all tweets from collections
                const allFavoriteTweet = await favoriteTweetService.getFavoriteTweets({ tags });

                // Organized the data, prepare send to client
                const dataOrganizedAllFavoriteTweet = organizedDataToDate(allFavoriteTweet, "favoriteTweetCreation", "date");

                //Send response to client
                res.status(200).json({
                    data: {
                        dataOrganizedAllFavoriteTweet
                    },
                    message: 'favs listed'
                })

            } catch (error) {
                next(error)
            }
        }
    )

    router.post(
        '/',
        passport.authenticate('jwt', { session: false }),
        scopesValidationHandler(['create:favorite']),
        validationHandler(createfavoriteTweetSchema),
        async function(req, res, next) {

            //Find the content in body
            const { body: favoriteTweet } = req;

            //Verify the session, the user is required 
            if (favoriteTweet.userId === ("" + req.user._id + "")) {

                try {

                    //Creating content data 
                    const createdFavoriteTweetId = await favoriteTweetService.createFavoriteTweet({ favoriteTweet });

                    //response with user data
                    res.status(201).json({
                        data: createdFavoriteTweetId,
                        message: 'Favorite Tweet created successfully'
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


module.exports = favoriteTweetApi;