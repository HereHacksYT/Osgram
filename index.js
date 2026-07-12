const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

// SADECE DİKEY SHORTS VİDEOLARI (Hepsi 9:16)
const SHORTS_POOL = [
    { youtube_id: 'tPe8bOOn0aE', username: 'fun_tube', caption: 'Gülme garantili Shorts! 😂 #fun #shorts' },
    { youtube_id: 'ScMzIvxBSi4', username: 'eglence_dunyasi', caption: 'Şu hareket efsane! ⚡️ #challenge' },
    { youtube_id: 'jNQXAC9IVRw', username: 'tech_shorts', caption: 'İnanılmaz bir teknoloji hilesi! 💻 #tech' },
    { youtube_id: '3_gA_rre7Yg', username: 'yemek_keyfi', caption: 'İştah kabartan tarifler! 🥞 #foodie' },
    { youtube_id: '9YfFv9S63b4', username: 'oyun_vakti', caption: 'Oyun dünyasından komik anlar! 🎮 #gaming' },
    { youtube_id: 'hM8J2uXW5J0', username: 'hayvanlar_alemi', caption: 'Çok tatlı bir kedi! 🐱 #cute' },
    { youtube_id: 'P9-k9S6Wz-k', username: 'komedi_dukkani', caption: 'İzleyince güleceksin! 😂 #funny' },
    { youtube_id: 'W_9p8o3Z-sQ', username: 'spor_gunlugu', caption: 'Spor yaparken motivasyon! 💪 #fitness' },
    { youtube_id: 'R_9p8o3Z-wA', username: 'gezi_notlari', caption: 'Dünyanın en güzel yeri! 🌍 #travel' },
    { youtube_id: 'K_9p8o3Z-xZ', username: 'dans_pist', caption: 'Mükemmel dans performansı! 💃 #dance' }
];

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

app.get('/api/reels', (req, res) => {
    // Sürekli farklı gelsin diye her seferinde karıştırıyoruz
    res.json({ items: shuffle([...SHORTS_POOL]) });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`OsGram Shorts modunda çalışıyor!`);
});
