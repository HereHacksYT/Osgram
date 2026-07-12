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

        container.innerHTML = ''; 

        items.forEach(item => {
            if (item.video_url) {
                const card = document.createElement('div');
                card.className = 'reels-card';
                
                // Başlangıçta sessiz uyarı yazısıyla birlikte ekliyoruz
                card.innerHTML = `
                    <video 
                        src="${item.video_url}" 
                        loop 
                        muted 
                        playsinline 
                        webkit-playsinline
                        preload="auto"
                        style="width: 100%; height: 100%; object-fit: cover;"
                    ></video>
                    <div class="mute-warning">🔇 Ses için 1 kez dokun</div>
                    <div class="reels-overlay">
                        <h3>@${item.username}</h3>
                        <p>${item.caption}</p>
                    </div>
                `;
                
                const videoElement = card.querySelector('video');
                const muteTxt = card.querySelector('.mute-warning');

                // Karta dokunulduğunda ses durumunu değiştir
                card.addEventListener('click', function() {
                    if (videoElement.muted) {
                        videoElement.muted = false; // Sesi aç (iPhone artık izin verir)
                        muteTxt.innerHTML = "🔊 Ses Açık";
                        // 1.5 saniye sonra uyarı yazısını tamamen gizle
                        setTimeout(() => {
                            muteTxt.style.opacity = '0';
                        }, 1500);
                    } else {
                        videoElement.muted = true; // Tekrar sessize al
                        muteTxt.innerHTML = "🔇 Ses Kapatıldı";
                        muteTxt.style.opacity = '1';
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
                video.muted = true; // Tarayıcı kuralı gereği sessiz başlatmak zorundayız
                video.play().catch(err => console.log("Oynatılamadı:", err));
            } else {
                video.pause();
                video.currentTime = 0;
                // Kaydırıp gidince üzerindeki ses yazısı görünürlüğünü sıfırla
                const muteTxt = video.parentElement.querySelector('.mute-warning');
                if (muteTxt) {
                    muteTxt.innerHTML = "🔇 Ses için 1 kez dokun";
                    muteTxt.style.opacity = '1';
                }
            }
        });
    }, { threshold: 0.6 });

    videos.forEach(video => observer.observe(video));
}

window.addEventListener('DOMContentLoaded', loadReels);
