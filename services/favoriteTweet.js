const MongoLib = require('../lib/mongo');
const { keysCollectionContentCreation } = require('../utils/collections_keys/contentCreation');

class ContentCreation {
    constructor() {
        this.collectionFavoriteTweet = 'favorite_tweet';
        this.mongoDB = new MongoLib();
    }

    async createFavoriteTweet({ favoriteTweet }) {
        const tweetCreated = await this.mongoDB.create(this.collectionFavoriteTweet, favoriteTweet);
        return tweetCreated;
    }

    async getFavoriteTweets({ tags }) {
        const query = tags && { tags: { $in: tags } };
        const contents = await this.mongoDB.getAll(this.collectionFavoriteTweet, query);
        return contents || [];
    }
}

module.exports = ContentCreation;