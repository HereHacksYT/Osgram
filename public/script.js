let currentToken = ''; 
let isLoading = false;  

async function loadReels() {
    if (isLoading) return; 
    isLoading = true;

    const container = document.querySelector('.reels-container');
    
    try {
        // Sunucudan token parametresi ile verileri talep ediyoruz
        const response = await fetch(`/api/reels?token=${currentToken}`);
        const data = await response.json();
        
        const items = data.items || [];
        currentToken = data.nextToken; // Bir sonraki sayfanın şifresini kaydet

        if (items.length === 0) return;

        items.forEach(item => {
            // API'den gelen video linkini bulmaya çalışıyoruz
            const videoUrl = item.video_url || (item.video_versions && item.video_versions[0]?.url);
            
            if (videoUrl) {
                const card = document.createElement('div');
                card.className = 'reels-card';
                
                // Videolar sessiz (muted) başlar, Instagram kuralları gereği tarayıcılar sesli otomatik oynatmaya izin vermez
                card.innerHTML = `
                    <video src="${videoUrl}" loop muted playsinline></video>
                    <div class="reels-overlay">
                        <h3>@${item.user?.username || 'osgram_user'}</h3>
                        <p>${item.caption?.text || ''}</p>
                    </div>
                `;
                
                // Videoya tıklayınca oynat/durdur özelliği ekleyelim
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

        // Listeye yeni videolar eklendiği için gözlemciyi yeniliyoruz
        initObserver();

    } catch (error) {
        console.error("Reels listesi yüklenirken hata:", error);
    } finally {
        isLoading = false;
    }
}

function initObserver() {
    const videos = document.querySelectorAll('video');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Ekrana tam giren videoyu oynat
                entry.target.play().catch(err => console.log("Otomatik oynatma engellendi:", err));
                
                // Sonsuz Kaydırma Kontrolü
                const allCards = document.querySelectorAll('.reels-card');
                const currentCard = entry.target.parentElement;
                const index = Array.from(allCards).indexOf(currentCard);
                
                // Kullanıcı sondan 3. videoya geldiyse arkadan yeni sayfayı çek
                if (index >= allCards.length - 3 && currentToken) {
                    loadReels(); 
                }
            } else {
                // Ekrandan çıkan videoyu durdur ve başa sar ki arka planda kasmasın
                entry.target.pause();
                entry.target.currentTime = 0;
            }
        });
    }, { threshold: 0.6 }); // Videonun %60'ı ekrandaysa tetiklenir

    videos.forEach(video => observer.observe(video));
}

// Sayfa ilk yüklendiğinde Reels sistemini çalıştır
window.addEventListener('DOMContentLoaded', loadReels);
