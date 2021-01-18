// Modules
const express = require('express');
const passport = require('passport');
const UserInformationService = require('../services/userInformation');

//Schemas
const {
    userIdSchema,
    createUserInformationSchema,
    updateUserInformationSchema
} = require('../utils/schemas/userInformation');

//Validations and middlewares
const validationHandler = require('../utils/middleware/validationHandler');
const scopesValidationHandler = require('../utils/middleware/scopesValidationHandler');
const getReqInformation = require('../utils/middleware/getInformation');

//Cache response middlewares
const cacheResponse = require('../utils/cacheResponse');

//Time middlewares
const {
    FIVE_MINUTES_IN_SECONDS,
    SIXTY_MINUTES_IN_SECONDS
} = require('../utils/time');

// JWT Strategy
require('../utils/auth/strategies/jwt');

function userInformationApi(app) {

    //Config the router
    const router = express.Router();
    app.use('/api/user/information', router);

    //Initial instance for the services 
    const userInformationService = new UserInformationService();

    router.get(
        '/:email',
        passport.authenticate('jwt', { session: false }),
        scopesValidationHandler(['edit:personal']),
        async function(req, res, next) {

            //Asing the cache response
            cacheResponse(req, FIVE_MINUTES_IN_SECONDS);
            //Find the email in params
            const { email } = req.params;

            try {

                //Verify the session, the user is required 
                if (email === req.user.email) {

                    //Getting user data
                    const userInformation = await userInformationService.getUserInformation({ email });

                    //response with data
                    res.status(200).json({
                        data: userInformation,
                        message: 'user information retrieved'
                    });
                } else {
                    next(new Error("No have permisions to modify data"));
                }

            } catch (error) {
                next(error)
            }
        }
    )

    router.post(
        '/',
        passport.authenticate('jwt', { session: false }),
        scopesValidationHandler(['edit:personal']),
        validationHandler(createUserInformationSchema),
        async function(req, res, next) {
            const { body: userInformation } = req;

            try {

                //Verify the session, the user is required 
                if (userInformation.email === req.user.email) {

                    // creating the query to verify the user data is exist
                    const email = userInformation.email;
                    const userIformationIsExist = await userInformationService.getUserInformation({ email });

                    if (userIformationIsExist) {
                        next(new Error("The data is a ready exist"));
                    } else {

                        //Creating user data
                        const createdUserInformationId = await userInformationService.createUserInformation({ userInformation });

                        //response with user data1
                        res.status(201).json({
                            data: createdUserInformationId,
                            message: 'User Information created'
                        });
                    }

                } else {
                    next(new Error("No have permisions to modify data"));
                }

            } catch (error) {
                next(error);
            }
        }
    )
}

module.exports = userInformationApi;