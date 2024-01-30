const express = require("express");
const { check, validationResult } = require("express-validator");
const ROUT = express.Router();

const auth_middleware = require("../Authentication/authMiddleware");
const UserModel = require("../../Database/UserModel");
const ClassroomModel = require("../../Database/ClassroomModel");

// @ Authenticate User & Get Token | POST api/login
ROUT.post(
    "/",
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
            return res.status(400).json({ msg: "Classroom not found!" });
        }

        if (classroom.joinedStudentsId?.includes(user.id)) {
            return res.status(400).json({ msg: "Already joined classroom" });
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

module.exports = ROUT;
