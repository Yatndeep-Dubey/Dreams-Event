const mongoose = require("mongoose");
const { Schema } = mongoose;

const partySchema = new Schema({
  name:  {
    type : String,
    unique : true
  },
  partycode:
  {
    type:String,
    unique:true
  },
  venue:String,
  date:String,
  time:String,
  budget:Number,
  student:[
    {
      name:String,// tellme about this
      contribution:String,//this is email of participant
    }
]

});
module.exports = mongoose.model("party", partySchema)
// your mistake was 
// you can only acces the feilds that are defined in uour schema 
// In previous case i don't know how you stored the student_key and 
// schema change kar diya tha
// ohh, then that fields are actually not existed yes now do the real thing i neeed your one minute only