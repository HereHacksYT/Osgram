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
                
                card.innerHTML = `
                    <video 
                        src="${item.video_url}" 
                        loop 
                        playsinline 
                        webkit-playsinline
                        preload="auto"
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

                card.addEventListener('click', function() {
                    if (videoElement.paused) {
                        videoElement.muted = false;
                        videoElement.play()
                            .then(() => {
                                playBtn.style.opacity = '0';
                            })
                            .catch(err => {
                                console.log("Hata:", err);
                                // Eğer oynatamazsa sessize alıp tekrar dene (iOS için kesin çözüm)
                                videoElement.muted = true;
                                videoElement.play().then(() => {
                                    playBtn.style.opacity = '0';
                                });
                            });
                    } else {
                        videoElement.pause();
                        playBtn.style.opacity = '1';
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
            
            if (!entry.isIntersecting) {
                video.pause();
                video.currentTime = 0;
                if (playBtn) playBtn.style.opacity = '1';
            } else {
                const allCards = document.querySelectorAll('.reels-card');
                const currentCard = video.parentElement;
                const index = Array.from(allCards).indexOf(currentCard);
                
                if (index >= allCards.length - 2) {
                    loadReels(); 
                }
            }
        });
    }, { threshold: 0.5 });

    videos.forEach(video => observer.observe(video));
}

window.addEventListener('DOMContentLoaded', loadReels);
