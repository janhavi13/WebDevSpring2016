module.exports = function(mongoose) {

    // use mongoose to declare a movie schema
    var SongSchema = mongoose.Schema({
        songUrl: String,
        title: String,
        poster: String,
        // ids of users that like this movie
        likes: [String],
        userLikes: [
            {username: String}
        ],
        // store movie documents in this collection
    }, {collection: 'songs'});

    return SongSchema;

};