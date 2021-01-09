const d = require('../services/data')
const h = require('../handlers')

exports.getDefiRates = async (req, res) => {
	try {
		let data = await d.getDefiRates(req.params, req.query)
		h.response(res, data)
	} catch (e) {
		h.error(res, e)
	}
}

exports.getDefiAssets = async (req, res) => {
	try {
		let data = await d.getDefiAssets(req.params, req.query)
		h.response(res, data)
	} catch (e) {
		h.error(res, e)
	}
}
