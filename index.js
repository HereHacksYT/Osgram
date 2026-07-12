const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

// INTERNETTEKI EN UYUMLU VE ASLA ENGELENMEYEN AÇIK KAYNAK DIKEY VİDEOLAR
const REELS_POOL = [
    {
        video_url: 'https://vjs.zencdn.net/v/oceans.mp4', // Evrensel açık test videosu
        username: 'gezgin_osman',
        caption: 'Okyanusun derinliklerinden harika bir dikey kesit! 🌊🐋 #nature #shorts'
    },
    {
        video_url: 'https://media.w3.org/2010/05/sintel/trailer_hd.mp4', // Standart tarayıcı test videosu
        username: 'animasyon_dunyasi',
        caption: 'Efsanevi kısa film test yayını başladı! 🎬🔥 #animation'
    }
];

app.get('/api/reels', (req, res) => {
    res.json({
        items: REELS_POOL
    });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Sunucu aktif! OsGram en uyumlu test modunda.`);
});
