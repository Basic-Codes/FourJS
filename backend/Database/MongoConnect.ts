const mongoose = require("mongoose");
const config = require("config");

const DB_URI = config.get("mongoURI");
const DB_Local_URI = config.get("mongoLocalURI");

const connectDB = async () => {
    try {
        await mongoose.connect(DB_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
        });

        console.log("Mongo Connected");
    } catch (err) {
        console.log(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
