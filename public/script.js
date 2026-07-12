let currentToken = ''; 
let isLoading = false;  

async function loadReels() {
    if (isLoading) return; 
    isLoading = true;

    const container = document.querySelector('.reels-container');
    
    try {
        const response = await fetch(`/api/reels?token=${currentToken}`);
        
        // Eğer sunucu 500 veya başka bir hata kodu döndüyse bunu ekrana bas
        if (!response.ok) {
            const errorData = await response.json();
            container.innerHTML = `<p style='color:red; text-align:center; padding:50px;'>Sunucu Hatası: ${errorData.error || response.statusText}</p>`;
            return;
        }

        const data = await response.json();
        const items = data.items || [];
        currentToken = data.nextToken;

        if (items.length === 0 && currentToken) {
            isLoading = false; 
            loadReels(); 
            return;
        }

        if (items.length === 0 && !currentToken) {
            if(container.children.length === 0 || container.innerHTML.includes('Yükleniyor')) {
                container.innerHTML = "<p style='color:white; text-align:center; padding-top:50px;'>Hiç video bulunamadı.</p>";
            }
            return;
        }

        // Eğer ilk videolar başarıyla geldiyse "Yükleniyor..." yazısını temizle
        if (container.innerHTML.includes('Yükleniyor')) {
            container.innerHTML = '';
        }

        items.forEach(item => {
            const videoUrl = item.video_url || 
                             (item.video_versions && item.video_versions[0]?.url) ||
                             item.video_link;
            
            if (videoUrl) {
                const card = document.createElement('div');
                card.className = 'reels-card';
                
                card.innerHTML = `
                    <video src="${videoUrl}" loop muted playsinline></video>
                    <div class="reels-overlay">
                        <h3>@${item.user?.username || 'instagram_user'}</h3>
                        <p>${item.caption?.text || ''}</p>
                    </div>
                `;
                
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
        // İnternet veya tarayıcı kaynaklı bir hata olursa ekrana bas
        container.innerHTML = `<p style='color:orange; text-align:center; padding-top:50px;'>Bağlantı Hatası: ${error.message}</p>`;
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
