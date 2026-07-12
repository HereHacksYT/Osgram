const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

// İNTERNETTE SORUNSUZ ÇALIŞAN EVRENSEL REELS VİDEO HAVUZU (5 VİDEO)
const REELS_POOL = [
    {
        video_url: 'https://vjs.zencdn.net/v/oceans.mp4',
        username: 'gezgin_osman',
        caption: 'Okyanusun derinliklerinden harika bir dikey kesit! 🌊🐋 #nature #shorts'
    },
    {
        video_url: 'https://media.w3.org/2010/05/sintel/trailer_hd.mp4',
        username: 'animasyon_dunyasi',
        caption: 'Efsanevi kısa film test yayını başladı! 🎬🔥 #animation'
    },
    {
        video_url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        username: 'kesif_zamani',
        caption: 'Ateşin muhteşem dansı ve doğanın gücü! 🔥✨ #nature'
    },
    {
        video_url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
        username: 'macera_ruhu',
        caption: 'Kaçış planı hazır, yeni yollar bizi bekler! ⛰️🚗 #travel'
    },
    {
        video_url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
        username: 'hiz_tutkusu',
        caption: 'Rüzgarı hisset, anın tadını çıkar! 🏍️💨 #joyride'
    }
];

// Diziyi rastgele karıştırmak için Fisher-Yates Algoritması
function shuffle(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}

app.get('/api/reels', (req, res) => {
    // Havuzun orijinal halini bozmamak için kopyasını oluşturup karıştırıyoruz
    const shuffledReels = shuffle([...REELS_POOL]);
    res.json({
        items: shuffledReels
    });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Sunucu aktif! OsGram rastgele Reels modunda.`);
});
