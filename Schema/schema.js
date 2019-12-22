var mongoose = require('mongoose');  //import mongoose
//create the schema
var userSchmea = mongoose.Schema({ 
  Username:{type:String},
  Password:{type:String},
  Email:{type:String},
  FirstName:{type:String},
  LastName:{type:String},
  verified: { type: Boolean, default: false}
}
)

//export and model the schema..
module.exports = mongoose.model('reactform',userSchmea);