// DEBUG=app:* node scripts/mongo/seedApiKeys.js

const chalk = require('chalk');
const crypto = require('crypto');
const debug = require('debug')('app:scripts:api-keys');
const MongoLib = require('../../lib/mongo');

const userScopes = [
    //Auth | Sign-in or sign-up
    'singin:auth',
    'singup:auth',

    // Write, Delete and read Tweet
    'create:tweet',
    'delete:tweet',
    'read:tweet',

    // Write, Delete and read quote-tweet
    'create:quote-tweet',
    'delete:quote-tweet',
    'read:quote-tweet',

    // Write, Delete and read re-tweet
    'create:re-tweet',
    'delete:re-tweet',
    'read:re-tweet',

    // Edit personal information
    'edit:personal',

    // Favorite or not
    'create:favorite',
    'delete:favorite',

    // Block other perfil
    'create:block-other-perfil',
    'delete:block-other-perfil',
]

const adminScopes = [
    //Auth | Sign-in or sign-up
    'singin:auth',
    'singup:auth',

    // Write, Delete and read Tweet
    'create:tweet',
    'delete:tweet',
    'read:tweet',

    // Write, Delete and read quote-tweet
    'create:quote-tweet',
    'delete:quote-tweet',
    'read:quote-tweet',

    // Write, Delete and read re-tweet
    'create:re-tweet',
    'delete:re-tweet',
    'read:re-tweet',

    // Edit personal information
    'edit:personal',

    // Favorite or not
    'create:favorite',
    'delete:favorite',

    // Block other perfil
    'create:block-other-perfil',
    'delete:block-other-perfil',

    // ADMIN SCOPES

    // Block other perfil
    'create:block-user-account',
    'delete:block-user-account',
    'read:block-user-account',
]

const apiKeys = [{
        token: generateRandomToken(),
        scopes: adminScopes
    },
    {
        token: generateRandomToken(),
        scopes: userScopes
    }
];

function generateRandomToken() {
    const buffer = crypto.randomBytes(32);
    return buffer.toString('hex');
}

async function seedApiKeys() {
    try {

        const mongoDB = new MongoLib();

        const promises = apiKeys.map(async apiKey => {
            await console.log('api-keys', apiKey)
            await mongoDB.create('api-keys', apiKey);
        });

        await Promise.all(promises);
        debug(chalk.green(`${promises.length} api keys have been created succesfully`)); // prettier-ignore
        return process.exit(0);
    } catch (error) {
        debug(chalk.red(error));
        process.exit(1);
    }
}

seedApiKeys();