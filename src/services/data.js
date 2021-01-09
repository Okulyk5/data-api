const Rate = require('../db/models/Rate')
const Asset = require('../db/models/Asset')


exports.getDefiRates = async () => {
	let data = await Rate.find({})
	return data
}

exports.getDefiAssets = async () => {
	let data = await Asset.find()
	return data.map(a => a.symbol)
}



