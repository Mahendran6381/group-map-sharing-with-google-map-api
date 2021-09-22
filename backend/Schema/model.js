let mongoose = require('mongoose')
let location = mongoose.Schema({
    name:String,
    lan:Number,
    lon:Number,
    date:Date
})
module.exports = mongoose.model('location',location)