const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

// ASLA ENGELENMEYEN VE SİYAH EKRANDA KALMAYAN YOUTUBE SHORTS HAVUZU
const REELS_POOL = [
    {
        youtube_id: 'tPe8bOOn0aE', // Değişik eğlenceli dikey videolar
        username: 'kesif_zamani',
        caption: 'Bu manzaraya karşı kiminle olmak isterdin? 🏔️✨ #shorts #travel'
    },
    {
        youtube_url: '9YfFv9S63b4',
        username: 'oyuncu_osman',
        caption: 'Geleceğin teknolojisi şimdiden hazır! 🎮🔥 #cyberpunk #gaming'
    },
    {
        youtube_id: '3_gA_rre7Yg',
        username: 'lezzet_duragi',
        caption: 'Hızlı ve pratik efsane tarif! 🥞☕️ #food #cooking'
    },
    {
        youtube_id: 'jNQXAC9IVRw',
        username: 'teknoloji_merkezi',
        caption: 'Kurulumu tamamladık, sizce nasıl olmuş? 💻🔥 #setup #pc'
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
    console.log(`Sunucu aktif! OsGram YouTube Shorts modunda.`);
});
