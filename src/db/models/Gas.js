const mongoose = require('mongoose')

const gasSchema = new mongoose.Schema({  
   
   fast: Number,
   fastest: Number,
   safeLow: Number,
   average: Number,
   block_time: Number,
   blockNum: Number,
   speed: Number,
   safeLowWait: Number,
   avgWait: Number,
   fastWait: Number,
   fastestWait: Number

}, {
	timestamps: true
})

const Gas = mongoose.model('Gas', gasSchema)

module.exports = Gas
