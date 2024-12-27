const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");

const PORT = 5000;

const app = express();
app.use(express.json()); // JSON isteklerini parse etme

dotenv.config(); // .env dosyası ayarlarını yükleme

// MongoDB Bağlantısı
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to DB!");
    } catch (error) {
        console.error("MongoDB bağlantı hatası:", error);
    }
};

app.use(cors()); // CORS politikalarını yapılandırma

// Router Import ve Kullanımı
const authRoutes = require("./router/auth.js");
app.use("/api/users", authRoutes);

// Sunucu Başlatma
app.listen(PORT, () => {
    connect();
    console.log(`Server ${PORT} 'unda Çalıştı!`);
});

// Ana Route
app.get("/", (req, res) => {
    res.send("Author : Harun Dursun! and Kerem Havlucu!");
});

// Doğru export
module.exports = app;
                                                                                