const mongoose = require('mongoose');

const assetScheme = new mongoose.Schema({
  symbol: String,
});

const rateScheme = new mongoose.Schema({
  asset: String,
  assetPrice: Number,
  platform: String,
  rate: Number,
  borrowRate: Number,
  totalSupply: Number,
});

module.exports = {
  assetScheme,
  rateScheme,
};
