const express = require("express");
const { check, validationResult } = require("express-validator");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const path = require("path");
const multer = require("multer");
var fs = require("fs");
const ROUT = express.Router();

// const upload = multer({ dest: "uploads/" });
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        var dir = `uploads/${req.body.code}`;

        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }

        cb(null, dir);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

var upload = multer({ storage: storage });

const auth_middleware = require("../Authentication/authMiddleware");

ROUT.post("/", [upload.single("file"), auth_middleware], async (req, res) => {
    console.log(req.file, req.body);

    try {
        res.json({
            msg: "File Uploaded...",
            success: true,
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ error: err });
    }
});

module.exports = ROUT;
