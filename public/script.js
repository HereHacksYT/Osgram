let isLoading = false;  

async function loadReels() {
    if (isLoading) return; 
    isLoading = true;

    const container = document.querySelector('.reels-container');
    if (!container) return;
    
    try {
        const response = await fetch('/api/reels');
        const data = await response.json();
        const items = data.items || [];

        items.forEach(item => {
            const videoId = item.youtube_id;
            if (videoId) {
                const card = document.createElement('div');
                card.className = 'reels-card';
                
                // YouTube oynatıcısını sitemize gömüyoruz
                // playsinline=1 ve videoId playlist olarak eklenince döngüye girer
                card.innerHTML = `
                    <div class="iframe-wrapper">
                        <iframe 
                            src="https://www.youtube.com/embed/${videoId}?autoplay=0&controls=1&loop=1&playlist=${videoId}&modestbranding=1&rel=0&playsinline=1"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowfullscreen
                        ></iframe>
                    </div>
                    <div class="reels-overlay">
                        <h3>@${item.username}</h3>
                        <p>${item.caption}</p>
                    </div>
                `;

                container.appendChild(card);
            }
        });

    } catch (error) {
        console.error("Hata oluştu:", error);
    } finally {
        isLoading = false;
    }
}

// İlk açılışta yükle
window.addEventListener('DOMContentLoaded', loadReels);

// Sonsuz kaydırma mekanizması
document.querySelector('.reels-container').addEventListener('scroll', function() {
    if ((this.scrollTop + this.clientHeight) >= this.scrollHeight - 600) {
        loadReels();
    }
});
