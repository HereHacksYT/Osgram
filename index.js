const express = require('express');
const path = require('path');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

// public klasöründeki HTML, CSS ve JS dosyalarını dışarıya açıyoruz
app.use(express.static(path.join(__dirname, 'public')));

// İnternetten gelen token'a göre yeni Reels videolarını çeken endpoint
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
                'X-RapidAPI-Key': '470a20f40emshd79d5bc169e6302p1afca5jsnec9478b74ac8',
                'X-RapidAPI-Host': 'instagram-scraper-stable-api.p.rapidapi.com'
            },
            data: encodedParams
        };

        const response = await axios.request(options);
        
        // Frontend'in kolayca okuyabilmesi için veriyi sadeleştirip gönderiyoruz
        res.json({
            items: response.data.data || response.data.items || [],
            nextToken: response.data.pagination_token || null 
        }); 
    } catch (error) {
        console.error("Reels videoları çekilirken sunucu hatası:", error);
        res.status(500).json({ error: "Videolar yüklenemedi" });
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Osgram sunucusu http://localhost:${PORT} üzerinde aktif!`);
});
