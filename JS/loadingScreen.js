export function loadingScreen(){
    window.addEventListener('load', () => {
        const progressBar = document.querySelector('.progress');
        const loadingScreen = document.getElementById('loading-screen');
        const images = document.images; // Get all images on the page
        const totalAssets = images.length;
        let loadedAssets = 0;
    
        if (totalAssets === 0) {
            // If there are no images, directly complete the loading screen
            progressBar.style.width = '100%';
            setTimeout(() => {
                loadingScreen.style.opacity = '0';
                setTimeout(() => loadingScreen.style.display = 'none', 1000); //remove after fade
            }, 500); //Delay hiding the loading screen by 0.5 seconds
            return;
        }
    
        // Track image load events
        for (let i = 0; i < totalAssets; i++) {
            const img = images[i];
            img.onload = img.onerror = () => {
                loadedAssets++;
                const progress = (loadedAssets / totalAssets) * 100;
                progressBar.style.width = progress + '%';

                if (progress >= 100) {
                    setTimeout(() => {
                        loadingScreen.style.opacity = '0';
                        setTimeout(() => loadingScreen.style.display = 'none', 1000); //remove after fade
                    }, 500); // Delay hiding the loading screen by 0.5 seconds
                }
            };
        }
    });
}