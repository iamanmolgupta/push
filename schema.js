var mongoose = require('mongoose');  //import mongoose
//create the schema
var userSchmea = mongoose.Schema({ 
  uname1:{type:String},
  emid:{type:String},
  pass1:{type:String},
  verified: { type: Boolean, default: false}
}
)

//export and model the schema..
module.exports = mongoose.model('userform',userSchmea);