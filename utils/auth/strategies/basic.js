const passport = require('passport');
const { BasicStrategy } = require('passport-http');
const Boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

const UsersServices = require('../../../services/users');

passport.use(
    new BasicStrategy(async function(email, password, cb) {
        const usersServices = new UsersServices();
        try {
            const user = await usersServices.getUser({ email });

            !user && cb(Boom.unauthorized(), false);

            !(await bcrypt.compare(password, user.password)) && cb(Boom.unauthorized(), false)

            delete user.password;

            return cb(null, user);
        } catch (error) {
            return cb(error)
        }
    })
)