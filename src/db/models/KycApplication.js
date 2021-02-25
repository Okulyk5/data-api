const mongoose = require('mongoose');

const KycApplicationSchema = new mongoose.Schema({
	address: {
		type: String,
		unique: true,
	},
	status: {
		type: String,
		enum: ['pending', 'completed', 'rejected'],
	},
}, {
	timestamps: true,
});

KycApplicationSchema.index({ address: 1, status: 1 });

const KycApplication = mongoose.model('KycApplication', KycApplicationSchema);

module.exports = KycApplication;
