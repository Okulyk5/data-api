const web3 = require('web3');
const KycApplication = require('../db/models/KycApplication');

const failure = (reason) => ({
  success: false,
  error: reason,
  message: null,
});

const success = (message) => ({
  success: true,
  error: null,
  message,
});

exports.applyForKeyfiAccess = async (params) => {
  const { address } = params;

  if (!web3.utils.isAddress(address)) {
    return failure('address must be correct ethereum address');
  }

  const application = await KycApplication.findOne({ address });
  if (application) {
    return failure(
      `Your application already have '${application.status}' status`,
    );
  }

  await KycApplication.insertMany([{ address, status: 'pending' }]);

  return success('Your application is accepted!');
};

exports.updateAddressStatus = async (params, body) => {
  const { address } = params;
  const { status } = body;

  if (!web3.utils.isAddress(address)) {
    return failure('address must be correct ethereum address');
  }

  const { enumValues } = KycApplication.schema.path('status');
  if (!enumValues.includes(status)) {
    return failure(`'status' must be one of ${enumValues}`);
  }

  await KycApplication.updateOne({ address }, { status });

  return success('Address status updated');
};

exports.getAddresses = async (query) => {
  const { status } = query;
  if (status) {
    return KycApplication.find({ status });
  }

  return KycApplication.find();
};
