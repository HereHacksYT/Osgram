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
        encodedParams.set('username_or_url', 'quran');
        encodedParams.set('amount', '20');
        encodedParams.set('pagination_token', nextToken); 

        const options = {
            method: 'POST',
            url: 'https://instagram-scraper-stable-api.p.rapidapi.com/get_ig_user_reels.php',
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                // Baştaki X- harfini büyük/küçük kontrolü için buraya sabitledim
                'X-RapidAPI-Key': '470a20f40emshd79d5bc169e6302p1afca5jsnec9478b74ac8',
                'X-RapidAPI-Host': 'instagram-scraper-stable-api.p.rapidapi.com'
            },
            data: encodedParams
        };

        const response = await axios.request(options);
        
        // Eğer API'den veri geldiyse direkt gönderiyoruz
        res.json(response.data); 
    } catch (error) {
        // Hata olduğunda sunucu çökmesin, hatayı frontend'e göndersin
        console.error("Sunucu API Hatası:", error.message);
        res.status(500).json({ 
            error: "Instagram API baglantisi basarisiz oldu.", 
            detay: error.message,
            response: error.response ? error.response.data : "Cevap yok"
        });
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Sunucu aktif!`);
});
