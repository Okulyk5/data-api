const Gas = require('../db/models/Gas')

exports.getGasRates = async () => {
	let data = await Gas.find({}).sort({_id:-1}).limit(1)
	return data[0] 
}
