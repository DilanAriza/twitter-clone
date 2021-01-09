// Modules
const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
const Boom = require('@hapi/boom');

// Services
const UsersService = require('../../../services/users');

// Config
const { config } = require('../../../config');

passport.use(
    new Strategy({
            secretOrKey: config.authJwtSecret,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        },

        async function(tokenPayload, cb) {
            const usersService = new UsersService();

            try {
                const user = await usersService.getUser({ email: tokenPayload.email });

                if (!user) {
                    return cb(Boom.unauthorized(), false)
                }

                delete user.password;
                cb(null, {...user, scopes: tokenPayload.scopes })
            } catch (error) {
                return cb(error)
            }
        }
    )
)