const express = require("express");
const { check, validationResult } = require("express-validator");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const path = require("path");
const multer = require("multer");
var fs = require("fs");
var fsPromise = require("fs").promises;
const ROUT = express.Router();

// const upload = multer({ dest: "uploads/" });
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let dir = `public/uploads/${req.body.code}`;

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

async function getAllFiles(dir, code) {
    let files = await fsPromise.readdir(dir);
    let fileInfos = [];
    let fileNames = [];

    for (let file of files) {
        let filePath = path.join(dir, file);
        let stats = await fsPromise.stat(filePath);

        if (stats.isFile()) {
            fileInfos.push({
                name: file,
                path: filePath,
                size: stats.size,
            });
            fileNames.push(`uploads/${code}/${file}`);
        }
    }

    return fileNames;
}

ROUT.get("/", auth_middleware, async (req, res) => {
    const code = req.query.code;

    let dir = `public/uploads/${code}/`;

    let sessionPpts = [];

    await getAllFiles(dir, code)
        .then((files) => {
            sessionPpts = files;
            console.log("Files:", files);
        })
        .catch((err) => {
            console.error(err);
        });

    try {
        res.json({
            msg: "File loaded...",
            success: true,
            sessionPpts,
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ error: err });
    }
});

module.exports = ROUT;
