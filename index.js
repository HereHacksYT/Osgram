app.get('/api/reels', async (req, res) => {
    try {
        // Tarayıcıdan bir sonraki sayfa token'ı gelmiş mi diye bakıyoruz
        const nextToken = req.query.token || ''; 

        const encodedParams = new URLSearchParams();
        encodedParams.set('username_or_url', 'quran');
        encodedParams.set('amount', '20');
        encodedParams.set('pagination_token', nextToken); // Token'ı buraya besliyoruz

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
        
        // Hem videoları hem de bir sonraki sayfanın token'ını frontend'e gönderiyoruz
        res.json({
            items: response.data.data || response.data.items || [],
            // API'den dönen yeni token'ın yerini kontrol et (genellikle next_page_token veya pagination_token olur)
            nextToken: response.data.pagination_token || null 
        }); 
    } catch (error) {
        console.error("Hata:", error);
        res.status(500).json({ error: "Videolar yüklenemedi" });
    }
});
