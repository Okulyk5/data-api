const kycService = require('../services/kyc');
const h = require('../handlers');

const authToken = process.env.KYC_ADMIN_TOKEN;
if (!authToken) {
  throw Error('env var KYC_ADMIN_TOKEN is not specified');
}

exports.applyForKeyfiAccess = async (req, res) => {
	try {
		let data = await kycService.applyForKeyfiAccess(req.params);
		h.response(res, data);
	} catch (e) {
		h.error(res, e);
	}
};

exports.updateAddressStatus = async (req, res) => {
	if (req.header('x-api-token') !== authToken) {
		return h.unauthorized();
	}

	try {
		let data = await kycService.updateAddressStatus(req.params, req.body);
		h.response(res, data);
	} catch (e) {
		h.error(res, e);
	}
};

exports.getAddresses = async (req, res) => {
	if (req.header('x-api-token') !== authToken) {
		return h.unauthorized(res);
	}

	try {
		let data = await kycService.getAddresses(req.query);
		h.response(res, data);
	} catch (e) {
		h.error(res, e);
	}
};
