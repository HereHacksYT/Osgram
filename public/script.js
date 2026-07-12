let isLoading = false;  

async function loadReels() {
    if (isLoading) return; 
    isLoading = true;

    const container = document.querySelector('.reels-container');
    
    try {
        const response = await fetch('/api/reels');
        const data = await response.json();
        
        const items = data.items || [];

        // Yükleniyor yazısı varsa temizle
        if (container.innerHTML.includes('Yükleniyor')) {
            container.innerHTML = '';
        }

        items.forEach(item => {
            if (item.video_url) {
                const card = document.createElement('div');
                card.className = 'reels-card';
                
                // Video HTML etiketlerini eksiksiz ekliyoruz
                card.innerHTML = `
                    <video src="${item.video_url}" loop muted playsinline></video>
                    <div class="reels-overlay">
                        <h3>@${item.username}</h3>
                        <p>${item.caption}</p>
                    </div>
                `;
                
                // Tıklayınca oynat / durdur
                card.querySelector('video').addEventListener('click', function() {
                    if (this.paused) {
                        this.play();
                    } else {
                        this.pause();
                    }
                });

                container.appendChild(card);
            }
        });

        initObserver();

    } catch (error) {
        console.error("Hata oluştu:", error);
    } finally {
        // İŞTE BURASI DÜZELDİ: Kilitlenmeyi önleyen kritik kısım
        isLoading = false;
    }
}

function initObserver() {
    const videos = document.querySelectorAll('video');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.play().catch(err => console.log("Oynatma engellendi:", err));
                
                const allCards = document.querySelectorAll('.reels-card');
                const currentCard = entry.target.parentElement;
                const index = Array.from(allCards).indexOf(currentCard);
                
                // Son 2 videoya gelince yeni videoları yükle
                if (index >= allCards.length - 2) {
                    loadReels(); 
                }
            } else {
                entry.target.pause();
                entry.target.currentTime = 0;
            }
        });
    }, { threshold: 0.6 });

    videos.forEach(video => observer.observe(video));
}

window.addEventListener('DOMContentLoaded', loadReels);
