var mongoose= require ("mongoose");

module.exports = function() {


    var ProjectRelationsSchema = mongoose.Schema({
        songID: String,
        title:String,
        poster:String,
        userID: String,
        username: String,
        comment: String,
        created: Date
    }, {collection: 'userlikes'});
    return ProjectRelationsSchema;
};