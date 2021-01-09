const axios = require('axios');
const mongoose = require('mongoose');

const defiApiKey = process.env.RECON_DEFI_PULSE_API_KEY;
const mongoUrl = process.env.KEYFI_MONGODB_URI || 'mongodb://127.0.0.1/data-api';
const investAmount = 1000;

const Asset = require('../db/models/Asset');
const Rate = require('../db/models/Rate');

const main = async () => {
  await mongoose.connect(mongoUrl, { useNewUrlParser: true });

  // Refetch assets
  // const res1 = await axios.get('https://public.defipulse.com/api/GetLendingTokens', {
  //   params: {
  //     'api-key': defiApiKey,
  //   },
  // });
  // const assetsSymbols = res1.data;
  const assetsSymbols = [
    'ETH',
    'WBTC',
    'LINK',
    'BAT',
    'USDC',
    'DAI',
    'TUSD',
    'USDT',
    'SUSD',
  ];
  await Asset.deleteMany({});
  await Asset.insertMany(assetsSymbols.map((symbol) => new Asset({ symbol })));

  // Refetch rates for all symbols

  for (const symbol of assetsSymbols) {
    console.log(`Process asset: '${symbol}'`);

    const { data, status } = await axios.get(
      'https://public.defipulse.com/api/GetRates',
      {
        params: {
          token: symbol,
          amount: investAmount,
          'api-key': defiApiKey,
        },
      },
    );

    if (status !== 200) {
      throw new Error(`Bad response from defi: status=${status}`);
    }

    await Rate.deleteMany({ asset: symbol });
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

main().catch(async (error) => {
  console.error('FATAL ERROR:', error);
  await mongoose.connection.close();
  process.exit(1);
}).then(() => {
  console.log('Done!');
});
