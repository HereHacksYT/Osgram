const express = require('express');
const app = express();
const path = require('path');
app.use(express.static('public'));

// Bu sistem her seferinde güncel dikey videoları otomatik getirir
app.get('/api/get-reels', async (req, res) => {
    try {
        // Pexels'in ücretsiz dikey video havuzundan rastgele 50 tane çeker (sayfa yenilendikçe değişir)
        const response = await fetch('https://api.pexels.com/videos/popular?per_page=50&orientation=portrait', {
            headers: { Authorization: '563492ad6f91700001000001f357f89762694158a1353e4b7b653761' } // Ücretsiz API Key
        });
        const data = await response.json();
        const videos = data.videos.map(v => ({
            url: v.video_files.find(f => f.width < f.height)?.link || v.video_files[0].link,
            user: v.user.name
        }));
        res.json(videos);
    } catch (e) {
        res.status(500).json({ error: "Video havuzu şu an meşgul." });
    }
});

app.listen(3000, () => console.log('OsGram 1000+ Dikey Video Modunda!'));
