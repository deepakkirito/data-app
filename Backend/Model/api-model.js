const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const dataSchema = new Schema({
    temperature:Number,
    batteryLevel:Number,    
    timeStamp:String
});

module.exports = mongoose.model('data', dataSchema);