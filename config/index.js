require('dotenv').config();
const config = {
    dev: process.env.NODE_ENV !== 'production',
    port: process.env.PORT || 3000,
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
    dbHost: process.env.DB_HOST,
    dbName: process.env.DB_NAME,
    defaultAdminPassword: process.env.DEFAULT_ADMIN_PASSOWRD,
    defaultUserPassword: process.env.DEFAULT_USER_PASSOWRD,
    authJwtSecret: process.env.AUTH_JWT_SECRET,
    publicApiKeyToken: process.env.PUBLIC_API_KEY_TOKEN,
    adminApiKeyTolen: process.env.ADMIN_API_KEY_TOLEN,
};

module.exports = { config };