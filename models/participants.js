const mongoose = require("mongoose")
const { Schema } = mongoose;

const participantSchema = new Schema({
  name:String,
  partycode:String,
  mobile:Number,
  time:String,
  contribution:Number,
});
module.exports = mongoose.model("participants", participantSchema)