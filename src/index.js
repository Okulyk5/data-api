require('dotenv/config');
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');

const { assetScheme, rateScheme } = require('./db');

const port = process.env.PORT || 3000;
const mongoUrl = process.env.MONGODB_URI || 'mongodb://127.0.0.1/data-api';

const Asset = mongoose.model('Asset', assetScheme);
const Rate = mongoose.model('Rate', rateScheme);

const app = express();

app.use(cors('*'));

app.get('/', (req, res) => {
  res.send('API Status: OK');
});

app.use(require('./routes/auth'))
app.use(require('./routes/alerts'))
app.use(require('./routes/data'))


app.get('/assets', async (req, res) => {
  const assets = await Asset.find();
  res.send(assets.map(a => a.symbol));
});

app.get('/rates', async (req, res) => {
  const rates = await Rate.find();
  res.send(rates);
});

mongoose.connect(mongoUrl, { useNewUrlParser: true });

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
