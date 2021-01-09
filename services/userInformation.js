const MongoLib = require('../lib/mongo');
const bcrypt = require('bcrypt');

class UserInformationService {
    constructor() {
        this.collection = 'user_information';
        this.mongoDB = new MongoLib();
    }

    async getUserInformation({ email }) {
        const [userInformation] = await this.mongoDB.getAll(this.collection, { email });
        return userInformation;
    }
}

module.exports = UserInformationService;