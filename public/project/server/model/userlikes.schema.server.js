module.exports = function(mongoose) {


    var UserLikeSchema = mongoose.Schema({
        songID: String,
        title:String,
        poster:String,
        userID: String,
        username: String,
        comment: String,
        created: Date
    }, {collection: 'userlikes'});
    return UserLikeSchema;
};