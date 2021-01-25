const MongoLib = require('../lib/mongo');
const { keysCollectionContentCreation } = require('../utils/collections_keys/contentCreation');

class ContentCreation {
    constructor() {
        this.collectionSingleTweet = 'tweets_single';
        this.collectionRetweet = 'tweets_re';
        this.collectionQuotedTweet = 'tweets_quoted';
        this.mongoDB = new MongoLib();
        this.varsCollections = {...keysCollectionContentCreation };
    }

    async createContent({ collection, tweet }) {
        var collectionSelected = this.varsCollections[collection];
        const tweetCreated = await this.mongoDB.create(collectionSelected, tweet);
        return tweetCreated;
    }
}

module.exports = ContentCreation;