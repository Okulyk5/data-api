const mongoose = require('mongoose')

const rateSchema = new mongoose.Schema({

	asset: String,
	assetPrice: Number,
	platform: String,
	rate: Number,
	borrowRate: Number,
	totalSupply: Number

}, {
	timestamps: true
})

const Rate = mongoose.model('Rate', rateSchema)

module.exports = Rate
