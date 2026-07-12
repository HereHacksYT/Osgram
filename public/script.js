async function testReels() {
    const container = document.querySelector('.reels-container');
    try {
        const response = await fetch('/api/reels');
        const data = await response.json();
        
        // Ekrana API'den gelen veriyi ham olarak yazdırıp ne eksik bakıyoruz
        container.innerHTML = `<pre style="color: white; word-wrap: break-word; white-space: pre-wrap; padding: 20px;">${JSON.stringify(data, null, 2)}</pre>`;
    } catch (error) {
        container.innerHTML = `<p style="color: red; padding: 20px;">Hata: ${error.message}</p>`;
    }
}
window.addEventListener('DOMContentLoaded', testReels);
