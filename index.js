const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

// SENİN TELEFONUNDA KESİN ÇALIŞAN ALTYAPILARDAN 6'LI REELS HAVUZU
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
        video_url: 'https://media.w3.org/2010/05/bunny/trailer.mp4',
        username: 'osmanburda',
        caption: 'Doğada eğlenceli maceralar tam gaz devam ediyor! 🐰🥕 #funny #reels'
    },
    {
        video_url: 'https://media.w3.org/2010/05/video/movie_300.mp4',
        username: 'sinema_kolik',
        caption: 'Eski günlerin unutulmaz klasiklerinden küçük bir parça 🎥🍿 #nostalji'
    },
    {
        video_url: 'https://vjs.zencdn.net/v/oceans.mp4?v=2', // Farklı parametreyle havuzu büyütüyoruz
        username: 'deniz_meraklisi',
        caption: 'Dalgaların ritmi ruhumuzu dinlendiriyor. 🌊☀️ #sea #relax'
    },
    {
        video_url: 'https://media.w3.org/2010/05/sintel/trailer_hd.mp4?v=2',
        username: 'gamer_tayfa',
        caption: 'Yeni projeler yolda, beklemede kalın! 🎮🚀 #gaming'
    }
];

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
    const shuffledReels = shuffle([...REELS_POOL]);
    res.json({
        items: shuffledReels
    });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Sunucu aktif! OsGram tam ekran modunda.`);
});
