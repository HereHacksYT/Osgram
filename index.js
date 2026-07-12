const express = require('express');
const path = require('path');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/reels', async (req, res) => {
    try {
        const nextToken = req.query.token || ''; 

        const encodedParams = new URLSearchParams();
        // Kesin Reels videosu çekebilmek için aktif popüler bir hesap veriyoruz
        encodedParams.set('username_or_url', 'pubgmobile');
        encodedParams.set('amount', '20');
        encodedParams.set('pagination_token', nextToken); 

        const options = {
            method: 'POST',
            url: 'https://instagram-scraper-stable-api.p.rapidapi.com/get_ig_user_reels.php',
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'X-RapidAPI-Key': '470a20f40emshd79d5bc169e6302p1afca5jsnec9478b74ac8',
                'X-RapidAPI-Host': 'instagram-scraper-stable-api.p.rapidapi.com'
            },
            data: encodedParams
        };

        const response = await axios.request(options);
        
        res.json({
            items: response.data.data || response.data.items || [],
            nextToken: response.data.pagination_token || null 
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
