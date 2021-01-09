const mongoose = require('mongoose')

const assetSchema = new mongoose.Schema({ 
	
	symbol: String

}, {
	timestamps: true
})

const Asset = mongoose.model('Asset', assetSchema)

module.exports = Asset
