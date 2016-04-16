var mongoose=require("mongoose");

module.exports =function(){
    var fieldSchema  =mongoose.Schema(
           {label:String,
               type: {
                   type: String,
                   enum : ['TEXT', 'TEXTAREA', 'EMAIL', 'PASSWORD', 'OPTIONS', 'DATE', 'RADIOS', 'CHECKBOXES'],
               },
            placeholder:String,
            options:[{label:String,
                value:String}]});
    return fieldSchema;


};
