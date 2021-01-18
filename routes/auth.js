// Modules
const express = require('express');
const passport = require('passport');
const Boom = require('@hapi/boom');
const jwt = require('jsonwebtoken');

//Validations
const validationHandler = require('../utils/middleware/validationHandler');

//Api Services
const UsersService = require('../services/users');
const ApiKeysService = require('../services/apiKeys');

//Console Messages
const { consoleSuccess } = require('../utils/messages/console/consoleFunctions');

//Schemas
const {
    createUserSchema,
    createProviderUserSchema
} = require('../utils/schemas/users')

// Config 
const { config } = require('../config/index');

// Auth Strategies | Basic strategie
require('../utils/auth/strategies/basic');

function authApi(app) {

    //Config the router
    const router = express.Router();
    app.use('/api/auth', router);

    //Initial instance for the services 
    const usersService = new UsersService();
    const apiKeysService = new ApiKeysService();

    //ROUTES -
    router.post('/sign-in', async(req, res, next) => {
        const { apiKeyToken } = req.body;

        if (!apiKeyToken) {
            next(Boom.unauthorized('apiKeyToken is required'));
        }

        passport.authenticate('basic', function(error, user) {

            try {
                if (error || !user) {
                    next(Boom.unauthorized());
                }

                req.login(user, { session: false }, async function(error) {

                    if (error) {
                        next(error);
                    }

                    const apiKey = await apiKeysService.getApiKey({ token: apiKeyToken });

                    //User finded apikey, if not, the user is not find whit api key in db
                    if (!apiKey) {
                        next(Boom.unauthorized());
                    }

                    // extract data from user
                    const { _id: id, name, email } = user;

                    //create the payload to JWT 
                    const payload = {
                        sub: id,
                        name,
                        email,
                        scopes: apiKey.scopes
                    };

                    //Create JWT
                    const token = jwt.sign(payload, config.authJwtSecret, {
                        expiresIn: '15m'
                    });

                    return res.status(200).json({
                        token,
                        user: { id, name, email }
                    });
                })
            } catch (error) {
                next(error);
            }
        })(req, res, next)

    });

    router.post('/sign-up',
        validationHandler(createUserSchema), async(
            req,
            res,
            next
        ) => {

            // Asing data from body
            const { body: user } = req;

            try {


                // creating the query to verify the user is exist
                const { email } = user;
                const userIsExist = await usersService.getUser({ email })

                //verify user is exist
                if (userIsExist) {
                    next(new Error("The data is a ready exist"));
                } else {

                    //Creatting user
                    const createdUserId = await usersService.createUser({ user })

                    //console success
                    consoleSuccess("Auth - sign-up", "User created", Date.now())

                    //response with user data
                    res.status(201).json({
                        data: createdUserId,
                        message: 'user created'
                    });

                }

            } catch (error) {
                next(error)
            }
        })
}

module.exports = authApi;