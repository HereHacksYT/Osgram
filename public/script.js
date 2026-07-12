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
            if (item.video_url) {
                const card = document.createElement('div');
                card.className = 'reels-card';
                
                // preload="metadata" yaparak videonun ilk karesini tarayıcıya çektiriyoruz
                card.innerHTML = `
                    <video 
                        src="${item.video_url}" 
                        loop 
                        playsinline 
                        webkit-playsinline
                        preload="metadata"
                        style="width: 100%; height: 100%; object-fit: cover;"
                    ></video>
                    <div class="play-button"></div>
                    <div class="reels-overlay">
                        <h3>@${item.username}</h3>
                        <p>${item.caption}</p>
                    </div>
                `;
                
                const videoElement = card.querySelector('video');
                const playBtn = card.querySelector('.play-button');

                // Karta dokunulduğunda oynat/durdur yap ve butonu gizle/göster
                card.addEventListener('click', function() {
                    if (videoElement.paused) {
                        // Oynatırken sesi açıyoruz (unmute) çünkü artık kullanıcı kendi başlattı!
                        videoElement.muted = false; 
                        videoElement.play()
                            .then(() => {
                                playBtn.style.opacity = '0'; // Oynarken butonu gizle
                            })
                            .catch(err => console.log("Oynatma hatası:", err));
                    } else {
                        videoElement.pause();
                        playBtn.style.opacity = '1'; // Durunca butonu geri getir
                    }
                });

                container.appendChild(card);
            }
        });

        initObserver();

    } catch (error) {
        console.error("Hata:", error);
    } finally {
        isLoading = false;
    }
}

function initObserver() {
    const videos = document.querySelectorAll('video');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const video = entry.target;
            const playBtn = video.parentElement.querySelector('.play-button');
            
            // Eğer kullanıcı videodan uzaklaşırsa (aşağı/yukarı kaydırırsa) videoyu otomatik durdur
            if (!entry.isIntersecting) {
                video.pause();
                video.currentTime = 0;
                if (playBtn) playBtn.style.opacity = '1'; // Butonu tekrar göster
            } else {
                // Yeni kaydırılan video ekrana geldiğinde direkt durur halde beklesin
                const allCards = document.querySelectorAll('.reels-card');
                const currentCard = video.parentElement;
                const index = Array.from(allCards).indexOf(currentCard);
                
                // Sonsuz kaydırma tetikleyicisi
                if (index >= allCards.length - 2) {
                    loadReels(); 
                }
            }
        });
    }, { threshold: 0.5 });

    videos.forEach(video => observer.observe(video));
}

window.addEventListener('DOMContentLoaded', loadReels);
