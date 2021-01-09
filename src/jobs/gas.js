const axios = require('axios');
const mongoose = require('mongoose');

const defiApiKey = process.env.RECON_DEFI_PULSE_API_KEY;
const mongoUrl = process.env.KEYFI_MONGODB_URI || 'mongodb://127.0.0.1/data-api';

const Gas = require('../db/models/Gas');

const main = async () => {
  await mongoose.connect(mongoUrl, { useNewUrlParser: true });

    console.log(`Check Gas Rates`);

    const { data, status } = await axios.get(
      'https://data-api.defipulse.com/api/v1/egs/api/ethgasAPI.json',
      {
        params: {
          'api-key': defiApiKey,
        },
      },
    );

    if (status !== 200) {
      throw new Error(`Bad response from defi: status=${status}`);
    }

    await Gas.create(data);

  await mongoose.connection.close();
};

main().catch(async (error) => {
  console.error('FATAL ERROR:', error);
  await mongoose.connection.close();
  process.exit(1);
}).then(() => {
  console.log('Done!');
});
