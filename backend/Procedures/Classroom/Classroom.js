const express = require("express");
const { check, validationResult } = require("express-validator");
const ROUT = express.Router();

const auth_middleware = require("../Authentication/authMiddleware");
const UserModel = require("../../Database/UserModel");
const ClassroomModel = require("../../Database/ClassroomModel");

function generateRandomCode(length = 6) {
    var characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var code = "";
    for (var i = 0; i < length; i++) {
        var randomIndex = Math.floor(Math.random() * characters.length);
        code += characters[randomIndex];
    }
    return code;
}

// @ Authenticate User & Get Token | POST api/login
ROUT.post(
    "/",
    [auth_middleware, [check("name", "Name can't be empty.").exists()]],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let { name } = req.body;

        const user = await UserModel.findById(req.user);

        if (!user?.isTeacher) {
            return res
                .status(400)
                .json({ msg: "Students are not allowed to create classroom." });
        }

        newClassroom = new ClassroomModel({
            name,
            code: generateRandomCode(),
            teacherId: user?.id,
        });
        await newClassroom.save();

        try {
            res.json({
                classroom: newClassroom,
            });
        } catch (err) {
            console.log(err.message);
            res.status(500).send("error", err.message);
        }
    }
);

module.exports = ROUT;
