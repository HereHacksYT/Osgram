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
                
                // iPhone Safari için zorunlu video parametreleri eklendi
                card.innerHTML = `
                    <video 
                        src="${item.video_url}" 
                        loop 
                        muted 
                        playsinline 
                        webkit-playsinline
                        preload="auto"
                        style="width: 100%; height: 100%; object-fit: cover; background: #000;"
                    ></video>
                    <div class="reels-overlay">
                        <h3>@${item.username}</h3>
                        <p>${item.caption}</p>
                    </div>
                `;
                
                const videoElement = card.querySelector('video');

                // Ekrana tıklandığında kesin oynatmayı tetikliyoruz
                card.addEventListener('click', function() {
                    if (videoElement.paused) {
                        videoElement.play().catch(err => console.log("Oynatma hatası:", err));
                    } else {
                        videoElement.pause();
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
            if (entry.isIntersecting) {
                video.muted = true;
                
                // Tarayıcıya videoyu yüklemesini emrediyoruz
                video.load(); 
                
                const playPromise = video.play();
                if (playPromise !== undefined) {
                    playPromise.catch(error => {
                        console.log("iOS engelledi, dokunma bekleniyor.");
                    });
                }
                
                const allCards = document.querySelectorAll('.reels-card');
                const currentCard = video.parentElement;
                const index = Array.from(allCards).indexOf(currentCard);
                
                if (index >= allCards.length - 2) {
                    loadReels(); 
                }
            } else {
                video.pause();
                video.currentTime = 0;
            }
        });
    }, { threshold: 0.5 });

    videos.forEach(video => observer.observe(video));
}

window.addEventListener('DOMContentLoaded', loadReels);
