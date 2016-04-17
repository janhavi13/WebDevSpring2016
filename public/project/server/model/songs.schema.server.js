module.exports = function(mongoose) {

    // use mongoose to declare a song schema
    var SongSchema = mongoose.Schema({
        songID:String,
        title: String,
        poster: String,


    }, {collection: 'songs'});


    SongSchema.index({songID:1},{unique:true});

    return SongSchema;

};