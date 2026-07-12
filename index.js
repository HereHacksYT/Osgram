const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

// WEB SİTENDE DOĞRUDAN OYNATILABİLEN YOUTUBE SHORTS/VİDEO HAVUZU
const REELS_POOL = [
    { youtube_id: 'tPe8bOOn0aE', username: 'kesif_zamani', caption: 'Muhteşem doğa manzarası! 🏔️✨ #shorts #travel' },
    { youtube_id: '9YfFv9S63b4', username: 'oyuncu_osman', caption: 'Geleceğin teknolojisi ve oyunlar! 🎮🔥 #gaming' },
    { youtube_id: '3_gA_rre7Yg', username: 'lezzet_duragi', caption: 'Hızlı ve pratik efsane tarif! 🥞☕️ #food' },
    { youtube_id: 'jNQXAC9IVRw', username: 'teknoloji_merkezi', caption: 'Yeni setup kurulumu bitti! 💻🚀 #setup' },
    { youtube_id: 'ScMzIvxBSi4', username: 'eglence_adresi', caption: 'Günün en komik anları! 😂 test yayını #fun' }
];

// Fisher-Yates Karıştırma Algoritması
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
    res.json({ items: shuffledReels });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Sunucu aktif! OsGram YouTube gömülü modda.`);
});
