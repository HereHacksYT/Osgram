const feed = document.getElementById("feed");

let loading = false;

async function loadVideos() {
    if (loading) return;
    loading = true;

    try {
        const res = await fetch("/api/videos");
        const videos = await res.json();

        videos.forEach(video => {
            const id = video.id.videoId;

            const card = document.createElement("div");
            card.className = "video";

            card.innerHTML = `
                <iframe
                    src="https://www.youtube.com/embed/${id}?autoplay=0&mute=1&playsinline=1"
                    title="${video.snippet.title}"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowfullscreen>
                </iframe>

                <div class="info">
                    <h3>${video.snippet.title}</h3>
                    <p>${video.snippet.channelTitle}</p>
                </div>
            `;

            feed.appendChild(card);
        });

    } catch (err) {
        console.error(err);
    }

    loading = false;
}

loadVideos();

window.addEventListener("scroll", () => {
    if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 600
    ) {
        loadVideos();
    }
});