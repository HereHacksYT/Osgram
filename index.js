const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

// İNATÇI TARAYICILAR İÇİN DOĞRUDAN AÇIK HIZLI STANDART DİKEY TEST VİDEOLARI
const REELS_POOL = [
    {
        video_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        username: 'oyuncu_osman',
        caption: 'Siber şehirde harika bir akşam! 🎮🔥 #cyberpunk #neon'
    },
    {
        video_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
        username: 'dogasever',
        caption: 'Doğanın muhteşem renkleri ve huzur 🌲✨ #nature #shorts'
    },
    {
        video_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
        username: 'lezzet_dunyasi',
        caption: 'Güne kahve içmeden başlayamayanlar? ☕️🥞 #coffee #morning'
    },
    {
        video_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
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
