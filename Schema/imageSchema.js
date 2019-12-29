var mongoose = require('mongoose');  //import mongoose
// var uniqueValidator = require('mongoose-unique-validator');
//create the schema
var userSchema = mongoose.Schema({ 
  Email:{type:String},
  User:{type:String},
  Image:{type:String},
  Category:{type:String},
  date: { type: String, default: new Date()},
  enterComment: {type: Array, "default" : []},
  likes :{type: Array, "default" : [], index:true},
  
}
)

// userSchema.index({ likes:1 }, { unique: true });
//export and model the schema..
module.exports = mongoose.model('imageSchema',userSchema);