const express = require('express');
const path = require('path');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

// --- VİDEOLARINI ÇEKMEK İSTEDİĞİN INSTAGRAM HESAP ID'LERİ ---
// Buraya istediğin kadar hesap ID'si ekleyebilirsin.
// Şu anki listedekiler: instagram, pubgmobile, fcbarcelona, championsleague
const TARGET_USERS = ['25025320', '6419572620', '21216027', '183742461'];

app.get('/api/reels', async (req, res) => {
    try {
        const nextCursor = req.query.token || ''; 

        // Her istek atıldığında listeden rastgele bir hesap seçiyoruz
        const randomUserId = TARGET_USERS[Math.floor(Math.random() * TARGET_USERS.length)];

        const options = {
            method: 'GET',
            url: 'https://instagram-scraper2.p.rapidapi.com/user_medias',
            params: {
                user_id: randomUserId, // Rastgele seçilen hesap ID'si buraya gidiyor
                next_cursor: nextCursor
            },
            headers: {
                'x-rapidapi-key': '470a20f40emshd79d5bc169e6302p1afca5jsnec9478b74ac8',
                'x-rapidapi-host': 'instagram-scraper2.p.rapidapi.com',
                'Content-Type': 'application/json'
            }
        };

        const response = await axios.request(options);
        
        res.json({
            items: response.data.data || [],
            nextToken: response.data.page_info?.end_cursor || null
        }); 
    } catch (error) {
        console.error("Sunucu API Hatası:", error.message);
        res.status(500).json({ error: "Videolar yuklenemedi." });
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Sunucu aktif!`);
});
