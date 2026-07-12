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
            // youtube_id varsa çalıştır
            const videoId = item.youtube_id || 'tPe8bOOn0aE';
            
            const card = document.createElement('div');
            card.className = 'reels-card';
            
            // iPhone'da kilitlenmeyen YouTube Player Iframe yapısı
            card.innerHTML = `
                <iframe 
                    src="https://www.youtube.com/embed/${videoId}?autoplay=0&mute=0&controls=0&loop=1&playlist=${videoId}&modestbranding=1&rel=0&playsinline=1"
                    style="width: 100%; height: 100%; border: none;"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    allowfullscreen
                ></iframe>
                <div class="reels-overlay">
                    <h3>@${item.username}</h3>
                    <p>${item.caption}</p>
                </div>
            `;

            container.appendChild(card);
        });

    } catch (error) {
        console.error("Hata:", error);
    } finally {
        isLoading = false;
    }
}

// Sayfa ilk açıldığında yükle
window.addEventListener('DOMContentLoaded', loadReels);

// Aşağı kaydırdıkça yeni videolar ekleme (Sonsuz kaydırma)
document.querySelector('.reels-container').addEventListener('scroll', function() {
    if ((this.scrollTop + this.clientHeight) >= this.scrollHeight - 500) {
        loadReels();
    }
});
