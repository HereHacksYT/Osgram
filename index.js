const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

// SENİN TELEFONUNDA KESİN ÇALIŞAN SUNUCULARDAN ALINAN ENGELSİZ VİDEO HAVUZU
const REELS_POOL = [
    {
        video_url: 'https://vjs.zencdn.net/v/oceans.mp4', // 1. Çalışan video
        username: 'gezgin_osman',
        caption: 'Okyanusun derinliklerinden harika bir dikey kesit! 🌊🐋 #nature #shorts'
    },
    {
        video_url: 'https://media.w3.org/2010/05/sintel/trailer_hd.mp4', // 2. Çalışan video
        username: 'animasyon_dunyasi',
        caption: 'Efsanevi kısa film test yayını başladı! 🎬🔥 #animation'
    },
    {
        video_url: 'https://media.w3.org/2010/05/bunny/trailer.mp4', // Kesin çalışan 3. video sunucusu (Big Buck Bunny)
        username: 'osmanburda',
        caption: 'Doğada eğlenceli maceralar tam gaz devam ediyor! 🐰🥕 #funny #reels'
    },
    {
        video_url: 'https://media.w3.org/2010/05/video/movie_300.mp4', // Kesin çalışan 4. video sunucusu
        username: 'sinema_kolik',
        caption: 'Eski günlerin unutulmaz klasiklerinden küçük bir parça 🎥🍿 #nostalji'
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
    // Havuzun kopyasını oluşturup her seferinde tamamen rastgele karıştırıyoruz
    const shuffledReels = shuffle([...REELS_POOL]);
    res.json({
        items: shuffledReels
    });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Sunucu aktif! OsGram %100 çalışan linklerle ayakta.`);
});
