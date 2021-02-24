const kycService = require('../services/kyc');
const h = require('../handlers');

exports.applyForKeyfiAccess = async (req, res) => {
	try {
		let data = await kycService.applyForKeyfiAccess(req.params, req.query);
		h.response(res, data);
	} catch (e) {
		h.error(res, e);
	}
};
