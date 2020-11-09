const mongoose = require (mongoose);

const assetScheme = new mongoose.Schema({
  symbol: String,
});

module.exports = {
  assetScheme,
};
