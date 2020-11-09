require('dotenv/config');
const axios = require('axios');
const mongoose = require('mongoose');

const { assetScheme } = require('./db');

const defiApiKey = process.env.DEFI_API_KEY;
const mongoUrl = process.env.MONGODB_URI || 'mongodb://127.0.0.1/data-api';

const Asset = mongoose.model('Asset', assetScheme);

const main = async () => {
  await mongoose.connect(mongoUrl, { useNewUrlParser: true });

  // Fetch assets
  const res1 = await axios.get('https://public.defipulse.com/api/GetLendingTokens', {
    params: {
      'api-key': defiApiKey,
    },
  });
  const assetsSymbols = res1.data;
  await Asset.deleteMany({});
  await Asset.insertMany(assetsSymbols.map((symbol) => new Asset({ symbol })));

  await mongoose.connection.close();
};

main().catch((error) => {
  mongoose.connection.close();
  console.error('FATAL ERROR:', error);
});
