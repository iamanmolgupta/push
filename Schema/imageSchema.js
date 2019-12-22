var mongoose = require('mongoose');  //import mongoose
//create the schema
var userSchema = mongoose.Schema({ 
  Email:{type:String},
  User:{type:String},
  Image:{type:String},
  Category:{type:String},
  date: { type: String, default: new Date()},
  enterComment: {type: Array, "default" : []}
}
)

//export and model the schema..
module.exports = mongoose.model('imageSchema',userSchema);