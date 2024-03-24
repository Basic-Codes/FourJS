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

ROUT.get("/get", auth_middleware, async (req, res) => {
    try {
        const user = await UserModel.findById(req.user).select("-password");

        if (!req.query.code) {
            return res
                .status(400)
                .json({ msg: "classroom code is empty", X: req.query });
        }

        const classroom = await ClassroomModel.findOne({
            code: req.query.code,
        });

        if (!classroom) {
            return res
                .status(400)
                .json({ msg: "Invalid classroom code.", X: req.query });
        }

        const teacher = await UserModel.findById(classroom.teacherId).select(
            "-password"
        );

        res.json({
            classroom,
            teacher,
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ error: err.message });
    }
});

ROUT.get("/list", auth_middleware, async (req, res) => {
    try {
        const user = await UserModel.findById(req.user).select("-password");

        let classrooms = null;

        if (user?.isTeacher) {
            classrooms = await ClassroomModel.find({ teacherId: req.user });
            classrooms = classrooms?.map((item) => {
                return {
                    classroom: item,
                    teacher: user,
                };
            });
        } else {
            // NOTE: Bad Code
            classrooms = await ClassroomModel.find();
            classrooms = classrooms.filter((item) =>
                item.joinedStudentsId?.includes(user.id)
            );
            classrooms = await Promise.all(
                classrooms?.map(async (item) => {
                    const teacher = await UserModel.findById(
                        item.teacherId
                    ).select("-password");

                    return {
                        classroom: item,
                        teacher: teacher,
                    };
                })
            );
        }

        res.json({
            classrooms,
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ error: err.message });
    }
});

ROUT.post(
    "/add",
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
                teacher: user,
            });
        } catch (err) {
            console.log(err.message);
            res.status(500).json({ error: err.message });
        }
    }
);

ROUT.post(
    "/join",
    [auth_middleware, [check("code", "Code can't be empty.").exists()]],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let { code } = req.body;

        const user = await UserModel.findById(req.user);

        if (user?.isTeacher) {
            return res
                .status(400)
                .json({ msg: "Teachers are not allowed to join classroom." });
        }

        const classroom = await ClassroomModel.findOne({ code });

        if (!classroom) {
            return res.status(200).json({ msg: "Classroom not found!" });
        }

        if (classroom.joinedStudentsId?.includes(user.id)) {
            return res.status(200).json({ msg: "Already joined this class" });
        }

        classroom.joinedStudentsId.push(user.id);
        classroom.save();

        const teacher = await UserModel.findById(classroom.teacherId).select(
            "-password"
        );

        try {
            res.json({
                classroom: classroom,
                teacher: teacher,
            });
        } catch (err) {
            console.log(err.message);
            res.status(500).json({ error: err.message });
        }
    }
);

ROUT.post(
    "/create-session",
    [auth_middleware, [check("code", "Code can't be empty.").exists()]],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let { code } = req.body;

        const user = await UserModel.findById(req.user);

        if (!user?.isTeacher) {
            return res
                .status(400)
                .json({ msg: "Students are not allowed to create session." });
        }

        const classroom = await ClassroomModel.findOne({ code });

        if (!classroom) {
            return res.status(400).json({ msg: "Classroom not found!" });
        }

        classroom.currentSessionCode = generateRandomCode();
        classroom.save();

        const teacher = await UserModel.findById(classroom.teacherId).select(
            "-password"
        );

        try {
            res.json({
                classroom: classroom,
                teacher: teacher,
            });
        } catch (err) {
            console.log(err.message);
            res.status(500).json({ error: err.message });
        }
    }
);

module.exports = ROUT;
