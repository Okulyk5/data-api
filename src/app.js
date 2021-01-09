const express = require('express')
const bodyParser = require('body-parser')
const logger = require('morgan')

require('./db/mongoose')

const app = express()

app.set('port', 8080)
app.use(logger('dev'))
app.use(bodyParser.json({limit: '50mb'}))
app.use(bodyParser.urlencoded({limit: '50mb', extended: true }))
app.set('trust proxy', 1)

app.get('/', (req, res) => {
  res.send('API Status: OK');
});

// app.use(require('./routes/auth'))
// app.use(require('./routes/alerts'))
app.use(require('./routes/data'))
app.use(require('./routes/gas'))
app.use(require('./routes/wallet'))



app.listen(app.get('port'), () => console.log('KeyFi API is running on PORT %d in %s MODE', app.get('port'), app.get('env')))

module.exports = app
