const mongoose = require('mongoose')

mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)
mongoose.set('useNewUrlParser', true)
mongoose.set('useUnifiedTopology', true)
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/data-api')
mongoose.connection.on('error', (err) => {
	console.error(err)
	console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'))
	process.exit()
})
