const mongoose = require('mongoose');
const dbConnect = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log(`MongoDB connected successfully: ${conn.connection.host}`);
    } catch (err) {
        console.log(err.message);
        process.exit(1);
    }
};

dbConnect();