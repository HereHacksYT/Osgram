let currentToken = ''; 
let isLoading = false;  

async function loadReels() {
    if (isLoading) return; 
    isLoading = true;

    const container = document.querySelector('.reels-container');
    
    try {
        const response = await fetch(`/api/reels?token=${currentToken}`);
        const data = await response.json();
        
        const items = data.items || [];
        currentToken = data.nextToken; // Yeni token'ı hafızaya al

        // --- İŞTE BURASI SİHRİ YAPIYOR ---
        // Eğer bu sayfa boş geldiyse ama sonraki sayfa için token varsa otomatik sonraki sayfayı yükle
        if (items.length === 0 && currentToken) {
            isLoading = false; // Kilidi aç
            loadReels(); // Sonraki sayfaya geç
            return;
        }

        if (items.length === 0 && !currentToken) {
            if(container.children.length === 0) {
                container.innerHTML = "<p style='color:white; text-align:center; padding-top:50px;'>Hiç video bulunamadı.</p>";
            }
            return;
        }

        items.forEach(item => {
            // API'den video linkini bulabilecek tüm alternatif yolları deniyoruz
            const videoUrl = item.video_url || 
                             (item.video_versions && item.video_versions[0]?.url) ||
                             item.video_link;
            
            if (videoUrl) {
                // Eğer ekranımızda ham veri yazısı kaldıysa onu temizleyelim
                if(container.innerHTML.includes('{')) {
                    container.innerHTML = '';
                }

                const card = document.createElement('div');
                card.className = 'reels-card';
                
                card.innerHTML = `
                    <video src="${videoUrl}" loop muted playsinline></video>
                    <div class="reels-overlay">
                        <h3>@${item.user?.username || 'instagram_user'}</h3>
                        <p>${item.caption?.text || ''}</p>
                    </div>
                `;
                
                // Tıklayınca oynat/durdur
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
        console.error("Reels yüklenirken hata:", error);
    } finally {
        isLoading = false;
    }
}

function initObserver() {
    const videos = document.querySelectorAll('video');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.play().catch(err => console.log("Otomatik oynatma engellendi:", err));
                
                // Sonsuz Kaydırma
                const allCards = document.querySelectorAll('.reels-card');
                const currentCard = entry.target.parentElement;
                const index = Array.from(allCards).indexOf(currentCard);
                
                if (index >= allCards.length - 3 && currentToken) {
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
