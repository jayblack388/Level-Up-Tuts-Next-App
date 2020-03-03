import mongoose from 'mongoose';

const connectDB = handler => async (req, res) => {
	try {
		if (mongoose.connections[0].readyState !== 1) {
			await mongoose.connect(process.env.MONGODB_URI, {
				useCreateIndex: true,
				useFindAndModify: false,
				useNewUrlParser: true,
				useUnifiedTopology: true,
			});
		}
		return handler(req, res);
	} catch (error) {
		console.log('error:', error);
	}
};

const db = mongoose.connection;
if (db) {
	db.once('open', () => {
		console.log('🚀  Connected to MongoDB');
	});
}

export default connectDB;
