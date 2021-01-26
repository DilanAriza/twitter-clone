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

    async getContents({ collection, tags }) {
        const query = tags && { tags: { $in: tags } };
        var collectionSelected = this.varsCollections[collection];
        const contents = await this.mongoDB.getAll(collectionSelected, query);
        return contents || [];
    }
}

module.exports = ContentCreation;