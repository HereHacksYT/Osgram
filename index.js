const express = require("express");
const axios = require("axios");
const path = require("path");

const app = express();

const API_KEY = "AIzaSyBxbUuZhEbWOaoGeLiNyyCRHDQlvVP-iYQ";

app.use(express.static(path.join(__dirname, "public")));

app.get("/api/videos", async (req, res) => {
    try {
        const queries = [
            "komik shorts",
            "komik video shorts",
            "minecraft shorts türkçe",
            "roblox shorts türkçe",
            "pubg shorts türkçe",
            "valorant shorts türkçe",
            "brawl stars shorts türkçe",
            "mobil oyun shorts türkçe",
            "eğlenceli shorts türkçe",
            "meme shorts türkçe"
        ];

        const q = queries[Math.floor(Math.random() * queries.length)];

        const response = await axios.get(
            "https://www.googleapis.com/youtube/v3/search",
            {
                params: {
                    key: API_KEY,
                    part: "snippet",
                    type: "video",
                    q,
                    maxResults: 15,
                    videoDuration: "short",
                    videoEmbeddable: true,
                    regionCode: "TR",
                    relevanceLanguage: "tr",
                    order: "date",
                    safeSearch: "moderate"
                }
            }
        );

        res.json(response.data.items);

    } catch (err) {
        console.error(err.response?.data || err.message);
        res.status(500).json({ error: "YouTube API Error" });
    }
});

app.listen(3000, () => {
    console.log("Server: http://localhost:3000");
});