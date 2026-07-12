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

        container.innerHTML = ''; // Eski kırık tasarımları temizle

        items.forEach(item => {
            if (item.video_url) {
                const card = document.createElement('div');
                card.className = 'reels-card';
                
                // iPhone Safari için zorunlu kılınan tüm oynatma parametreleri eklendi
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

                // Karta dokunulduğunda sesi aç/kapat yapıyoruz (Böylece iPhone engeline takılmıyor)
                card.addEventListener('click', function() {
                    if (videoElement.muted) {
                        videoElement.muted = false; // Sesi aç
                    } else {
                        videoElement.muted = true; // Sessize al
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
                // Ekrana geldiği an arkada sessizce kesin başlatıyoruz
                video.muted = true;
                video.play().catch(err => console.log("Oynatma bekleniyor:", err));
            } else {
                // Ekrandan çıkınca durdur ve başa sar
                video.pause();
                video.currentTime = 0;
            }
        });
    }, { threshold: 0.6 });

    videos.forEach(video => observer.observe(video));
}

window.addEventListener('DOMContentLoaded', loadReels);
