const w = require('../services/wallet')
const h = require('../handlers')

exports.getWalletTxList = async (req, res) => {
	try {
		let data = await w.getWalletTxList(req.params, req.query)
		h.response(res, data)
	} catch (e) {
		h.error(res, e)
	}
}

exports.getWalletTokenTx = async (req, res) => {
	try {
		let data = await w.getWalletTokenTx(req.params, req.query)
		h.response(res, data)
	} catch (e) {
		h.error(res, e)
	}
}
