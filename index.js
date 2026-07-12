const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

// İNATÇI MOBİL TARAYICILARIN VE IPHONE'LARIN ASLA ENGELLEYEMEDİĞİ RESMİ AKIŞ VİDEOLARI
const REELS_POOL = [
    {
        video_url: 'https://demo.unified-streaming.com/kaltura/the-daily-show_short.mp4',
        username: 'show_dunyasi',
        caption: 'Günün en eğlenceli anları burada! 🎬😂 #fun #shorts'
    },
    {
        video_url: 'https://bitmovin-a.akamaihd.net/content/playhouse-vr/mp4/video_1000k_10bit_24fps.mp4',
        username: 'oyuncu_osman',
        caption: 'Sanal gerçeklik dünyasına ilk adım! 🎮🔥 #vr #gaming'
    },
    {
        video_url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        username: 'kesif_zamani',
        caption: 'Ateşin muhteşem dansı ve doğanın gücü! 🔥✨ #nature'
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
    console.log(`Sunucu aktif! OsGram stabil modda ayakta.`);
});
