const Joi = require('@hapi/joi');

const userIdSchema = Joi.string().regex(/^[0-9a-fA-F]{24}$/);

const nameUserInformationSchema = Joi.string().max(30).required();
const phoneNumberUserInformationSchema = Joi.number().required();
const emailUserInformationSchema = Joi.string().email().required();
const verifiedUserInformationSchema = Joi.boolean().default(false).required();;
const tweetsSecuredUserInformationSchema = Joi.boolean().default(false).required();;
const accountCreationUserInformationSchema = Joi.object().default({ date: null, hour: null, country: null }).required();
const countryUserInformationSchema = Joi.string().default('Narnia').required();;
const languageUserInformationSchema = Joi.string().default('es').required();;
const genderUserInformationSchema = Joi.string().default('female').required();;
const birthdateUserInformationSchema = Joi.string().default('Null').required();;
const ageUserInformationSchema = Joi.number().default(18).required().required();;

const userInformationSchema = {
    name: nameUserInformationSchema,
    phoneNumber: phoneNumberUserInformationSchema,
    email: emailUserInformationSchema,
    verified: verifiedUserInformationSchema,
    tweetsSecured: tweetsSecuredUserInformationSchema,
    accountCreation: accountCreationUserInformationSchema,
    country: countryUserInformationSchema,
    language: languageUserInformationSchema,
    gender: genderUserInformationSchema,
    birthdate: birthdateUserInformationSchema,
    age: ageUserInformationSchema
}

const createUserInformationSchema = {
    ...userInformationSchema,
    isAdmin: Joi.boolean().default(false)
}

const createProviderUserInformationSchema = {
    ...userInformationSchema,
    apiKeyToken: Joi.string().required()
}

const updateUserInformationSchema = {
    name: nameUserInformationSchema,
    phoneNumber: phoneNumberUserInformationSchema,
    email: emailUserInformationSchema,
    verified: verifiedUserInformationSchema,
    tweetsSecured: tweetsSecuredUserInformationSchema,
    accountCreation: accountCreationUserInformationSchema,
    country: countryUserInformationSchema,
    language: languageUserInformationSchema,
    gender: genderUserInformationSchema,
    birthdate: birthdateUserInformationSchema,
    age: ageUserInformationSchema
}

module.exports = {
    userIdSchema,
    createUserInformationSchema,
    createProviderUserInformationSchema,
    updateUserInformationSchema
};