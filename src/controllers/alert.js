const b = require('../services/alerts')
const h = require('../handlers')

exports.postAlert = async (req, res) => {
	try {
		let data = await b.newBasic(req.body)
		res.status(201).json(data)
	} catch (e) {
		h.error(res, e)
	}
}

exports.patchAlert = async (req, res) => {
	try {
		let data = await b.updateBasic(req.params, req.body)
		h.response(res, data)
	} catch (e) {
		h.error(res, e)
	}
}

exports.deleteAlert = async (req, res) => {
	try {
		let data = await b.deleteBasic(req.params, req.query)
		h.response(res, data)
	} catch (e) {
		h.error(res, e)
	}
}

exports.getAlert = async (req, res) => {
	try {
		let data = await b.getBasic(req.params, req.query)
		h.response(res, data)
	} catch (e) {
		h.error(res, e)
	}
}
