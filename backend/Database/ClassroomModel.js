const mongoose = require("mongoose");

const ClassroomScheman = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
        unique: true,
    },
    currentSessionCode: {
        type: String,
        required: false,
        unique: false,
    },
    teacherId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserModel",
    },
    joinedStudentsId: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "UserModel",
        },
    ],
    date: {
        type: String,
        default: Date.now,
    },
});

module.exports = ClassroomCollection = mongoose.model(
    "Classroom",
    ClassroomScheman
);
