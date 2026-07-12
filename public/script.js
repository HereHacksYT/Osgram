async function load() {
    const res = await fetch('/api/get-reels');
    const videos = await res.json();
    const cont = document.getElementById('container');

    videos.forEach(v => {
        const div = document.createElement('div');
        div.className = 'card';
        div.innerHTML = `
            <video src="${v.url}" loop playsinline muted></video>
            <div class="info">@${v.user}</div>
        `;
        cont.appendChild(div);
    });

    // Otomatik oynatma kuralı
    document.querySelectorAll('video').forEach(vid => {
        new IntersectionObserver(entries => {
            entries.forEach(e => e.isIntersecting ? vid.play() : vid.pause());
        }, { threshold: 0.6 }).observe(vid);
        
        // Tıklayınca ses açma
        vid.addEventListener('click', () => { vid.muted = !vid.muted; });
    });
}
load();
