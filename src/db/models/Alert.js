const mongoose = require('mongoose')

const alertSchema = new mongoose.Schema({ 
	
	account: String,
	type: String,
	asset: String,
	value: Number,
	notes: String,
	status: Boolean,
	channels: {
		telegram: {
			status: Boolean,
			id: String
		},
		email: {
			status: Boolean,
			address: String
		},
		sms: {
			status: Boolean,
			phone: String
		}
	}

}, {
	timestamps: true
})

const Alert = mongoose.model('Alert', alertSchema)

module.exports = Alert
