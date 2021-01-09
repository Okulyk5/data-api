const g = require('../services/gas')
const h = require('../handlers')

exports.getGasRates = async (req, res) => {
	try {
		let data = await g.getGasRates(req.params, req.query)
		h.response(res, data)
	} catch (e) {
		h.error(res, e)
	}
}
