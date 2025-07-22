const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email:{
        type:String,
        require:true
    },
    password: {
        type:String,
        require: true
    },
      fcmToken:{
    type: String,
    default: null
  }
},{timestamps:true});
 
module.exports = mongoose.model('User',userSchema);