require('dotenv/config');
const axios = require('axios');
const mongoose = require('mongoose');

const { assetScheme, rateScheme } = require('./db');

const defiApiKey = process.env.DEFI_API_KEY;
const mongoUrl = process.env.MONGODB_URI || 'mongodb://127.0.0.1/data-api';
const investAmount = 1000;

const Asset = mongoose.model('Asset', assetScheme);
const Rate = mongoose.model('Rate', rateScheme);

const main = async () => {
  await mongoose.connect(mongoUrl, { useNewUrlParser: true });

  // Refetch assets
  await Asset.deleteMany({});

  // const res1 = await axios.get('https://public.defipulse.com/api/GetLendingTokens', {
  //   params: {
  //     'api-key': defiApiKey,
  //   },
  // });
  // const assetsSymbols = res1.data;
  const assetSymbols = [
    "ETH",
    "WBTC",
    "LINK",
    "BAT",
    "USDC",
    "DAI",
    "TUSD",
    "USDT",
    "SUSD"
  ]
  await Asset.insertMany(assetsSymbols.map((symbol) => new Asset({ symbol })));

  // Refetch rates for all symbols
  await Rate.deleteMany({});

  for (const symbol of assetsSymbols) {
    console.log(`Process asset: '${symbol}'`);

    const { data } = await axios.get('https://public.defipulse.com/api/GetRates', {
      params: {
        token: symbol,
        amount: investAmount,
        'api-key': defiApiKey,
      },
    });

    await Rate.insertMany(Object.values(data.rates).map(
      (platform) => new Rate({
        asset: data.token.name,
        assetPrice: data.token.price,
        platform: platform.name,
        rate: platform.lend.rate,
        borrowRate: platform.borrow.rate,
        totalSupply: platform.supply,
      }),
    ));
  }

  await mongoose.connection.close();
};

main().catch((error) => {
  mongoose.connection.close();
  console.error('FATAL ERROR:', error);
});
