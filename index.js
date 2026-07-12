const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

// Kesintisiz, kota sınırı olmayan harika dikey dikey Reels test videoları havuzu
const REELS_POOL = [
    {
        video_url: 'https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c05d043d15d5d994eaae6c3c7e09cbcc&profile_id=165&oauth2_token_id=57447761',
        username: 'dogasever',
        caption: 'Doğanın huzuru ve muhteşem akarsular 🌲✨ #nature #shorts'
    },
    {
        video_url: 'https://player.vimeo.com/external/434045526.sd.mp4?s=c1b24d8fbfbb4af2f0ccad2ee5d60df64db0c3d9&profile_id=165&oauth2_token_id=57447761',
        username: 'oyuncu_osman',
        caption: 'Cyberpunk esintili sokaklar ve harika dikey çekim! 🎮🔥 #cyberpunk #neon'
    },
    {
        video_url: 'https://player.vimeo.com/external/403816912.sd.mp4?s=784c2bc02e6a9ee82b8a7db3ee1509fa8454238b&profile_id=165&oauth2_token_id=57447761',
        username: 'lezzet_dunyasi',
        caption: 'Sabah kahvesini böyle hazırlayanlar burada mı? ☕️🥞 #coffee #morning'
    },
    {
        video_url: 'https://player.vimeo.com/external/538964283.sd.mp4?s=6a63442491a13b652875151b14a938c20164e292&profile_id=165&oauth2_token_id=57447761',
        username: 'gegin_rotasi',
        caption: 'Bulutların üzerindeki muhteşem dağ manzarası ☁️⛰️ #travel #reels'
    }
];

app.get('/api/reels', (req, res) => {
    // Sayfa aşağı kaydırıldıkça döngüye girip videoları sonsuza kadar döndürmek için
    res.json({
        items: REELS_POOL,
        nextToken: "devam-et" // Sonsuz kaydırmayı tetikleyecek sahte token
    });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Sunucu aktif! OsGram ayakta.`);
});
