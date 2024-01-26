const mongoose = require("mongoose");

const UserScheman = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    isTeacher: {
        type: Boolean,
        default: false,
        required: true,
    },
    date: {
        type: String,
        default: Date.now,
    },
});

module.exports = UserCollection = mongoose.model("User", UserScheman);
