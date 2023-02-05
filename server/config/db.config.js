
const mongoose = require('mongoose')
const connectDB = async (mongoURL) => {
	try {
		await mongoose.connect(
			mongoURL,
			{
				useCreateIndex: true,
				useNewUrlParser: true,
				useUnifiedTopology: true,
				useFindAndModify: false
			}
		)

		console.log('MongoDB connected')
	} catch (error) {
		console.log(error.message)
		process.exit(1)
	}
}
module.exports = connectDB