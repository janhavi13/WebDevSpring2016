/**
 * Created by janhavi on 4/20/16.
 */

module.exports = function(mongoose) {

    // use mongoose to declare a user schema
    return projectUserRelationSchema = mongoose.Schema({
        follower_userid: String,
        follower_username: String,
        following_userid: String,
        following_username: String
    }, {collection: 'followers'});

};
