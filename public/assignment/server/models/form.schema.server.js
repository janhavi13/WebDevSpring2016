var mongoose=require("mongoose");


var Fields=require("/field.schema.server.js");

module.exports =function(){
    var formSchema  =mongoose.Schema(
        {userId:String,
            title:String,
            fields:[{label:String,
                type:String,
                placeholder:String,
                options:[
                    {label:String,
                        value:String}
                ]
            }],
            created:[Date],
        updated:[Date]},{collection :'form'});
    return formSchema;


};



