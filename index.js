const express = require('express');
const path = require('path');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/reels', async (req, res) => {
    try {
        const nextCursor = req.query.token || ''; 

        const options = {
            method: 'GET',
            url: 'https://instagram-scraper2.p.rapidapi.com/user_medias',
            params: {
                user_id: '25025320', // Instagram resmi hesabının ID'si (Kesin veri döner)
                next_cursor: nextCursor
            },
            headers: {
                'x-rapidapi-key': '470a20f40emshd79d5bc169e6302p1afca5jsnec9478b74ac8',
                'x-rapidapi-host': 'instagram-scraper2.p.rapidapi.com',
                'Content-Type': 'application/json'
            }
        };

        const response = await axios.request(options);
        
        // Yeni API'nin data yapısına göre verileri frontend'e paslıyoruz
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
