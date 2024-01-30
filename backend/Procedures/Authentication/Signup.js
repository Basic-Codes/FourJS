const express = require("express");
const { check, validationResult } = require("express-validator");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const ROUT = express.Router();

const UserModel = require("../../Database/UserModel");

// @ POST name,email,password ---> REGISTER USER "/api/users"
ROUT.post(
    "/",
    [
        check("name", "Name cannot be empty.").not().isEmpty(),
        check("email", "Enter valid emial.").isEmail(),
        check("password", "Please enter valid password.").isLength({ min: 3 }),
    ],
    async (req, res) => {
        // ---------- Check for validation Errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // if errors are not empty, that means it has errors
            return res.status(400).json({ errors: errors.array() });
        }

        let { name, email, password } = req.body;

        try {
            // ---------- See if user exist | with email
            let user = await UserModel.findOne({ email });

            if (user) {
                return res.status(400).json({ msg: "User already exist" });
                // used return cz there is another res below
            }

            // ---------- Encrypt Password
            const salt = await bcryptjs.genSalt(10);
            password = await bcryptjs.hash(password, salt);

            newUser = new UserModel({
                name,
                email,
                password,
            });
            await newUser.save();

            // ---------- Return the json web "TOKEN"
            const payload = {
                user: newUser.id,
            };
            jwt.sign(
                payload,
                process.env.JWT_SECRET,
                { expiresIn: 36000 },
                (err, token) => {
                    if (err) throw err;
                    res.json({
                        user: {
                            id: newUser.id,
                            name: newUser.name,
                            email: newUser.email,
                            isTeacher: newUser.isTeacher,
                        },
                        token: token,
                    });
                }
            );
        } catch (err) {
            console.log(err.message);
            res.status(500).json({ error: err.message });
        }
    }
);

module.exports = ROUT;
