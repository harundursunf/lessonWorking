const express = require("express");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const User = require("../models/User");

const router = express.Router();

dotenv.config();

router.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();

        const token = jwt.sign({ userId: newUser._id }, process.env.SECRET_KEY, { expiresIn: '10h' });
        res.status(201).json({ token });
    } catch (error) {
        console.error("Register Error:", error); // Hatayı logla
        res.status(500).json("Bir Hata Oluştu!");
    }
});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const kullanici = await User.findOne({ email });
        if (!kullanici) {
            res.status(400).json("Kullanıcı Bulunamadı!");
        }
        const isMatch = await bcrypt.compare(password, kullanici.password);
        if (!isMatch) {
            res.status(400).json("Şfire Hatalı!");
        }

        const token = jwt.sign(
            {
                userId: kullanici._id
            },
            process.env.SECRET_KEY,
            {
                expiresIn: '1h'
            }
        );
        res.status(200).json({ token });

    } catch (error) {
        res.status(500).json(error);
    }
});
router.get("/getUserInfo/:userId", async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(404).json("Kullanıcı Bulunamadı!");
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json(error);
    }
});


module.exports = router;