const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

// ASLA PATLAMAYAN GARANTİ DİKEY VİDEO LİNKLERİ
const REELS_POOL = [
    {
        video_url: 'https://assets.mixkit.co/videos/preview/mixkit-girl-in-neon-sign-in-a-futuristic-city-42217-large.mp4',
        username: 'oyuncu_osman',
        caption: 'Siber şehirde harika bir akşam! 🎮🔥 #cyberpunk #neon'
    },
    {
        video_url: 'https://assets.mixkit.co/videos/preview/mixkit-tree-with-yellow-flowers-in-a-field-51984-large.mp4',
        username: 'dogasever',
        caption: 'Doğanın muhteşem renkleri ve huzur 🌲✨ #nature #shorts'
    },
    {
        video_url: 'https://assets.mixkit.co/videos/preview/mixkit-holding-a-cup-of-hot-coffee-42301-large.mp4',
        username: 'lezzet_dunyasi',
        caption: 'Güne kahve içmeden başlayamayanlar? ☕️🥞 #coffee #morning'
    },
    {
        video_url: 'https://assets.mixkit.co/videos/preview/mixkit-waves-crashing-on-rocks-from-above-51978-large.mp4',
        username: 'gezgin_rotasi',
        caption: 'Dalgaların yukarıdan muhteşem görünüşü ☁️⛰️ #travel #reels'
    }
];

app.get('/api/reels', (req, res) => {
    res.json({
        items: REELS_POOL,
        nextToken: "devam-et"
    });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Sunucu aktif! OsGram ayakta.`);
});
