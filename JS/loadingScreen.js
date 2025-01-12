export function loadingScreen(){
    window.addEventListener('load', () => {
        const progressBar = document.querySelector('.progress');
        const loadingScreen = document.getElementById('loading-screen');

        const images = document.images; // Get all images on the page

        // Get sources elements of all videos map them to parent vidoe element and remove duplicates.
        const sourceElements = document.querySelectorAll('video source');
        const videos = [...new Set([...sourceElements].map(source => source.parentElement))];
        
        const totalAssets = images.length + videos.length;
        let loadedAssets = 0;

        // Debug info
        // console.log(images);
        // console.log(videos);
        // console.log('Total images:', images.length);
        // console.log('Total videos:', videos.length);

        function updateProgress(assetType, assetSrc){
            loadedAssets++;
            const progress = (loadedAssets / totalAssets) * 100;
            progressBar.style.width = `${progress}%`;

            // console.log(`Loaded ${assetType}: ${assetSrc}`);
            // console.log(`Progress: ${loadedAssets}/${totalAssets}`);

            if(loadedAssets >= totalAssets) {
                setTimeout(() => {
                    loadingScreen.style.opacity = '0';
                    setTimeout(() => loadingScreen.style.display = 'none', 1000); //remove after fade
                }, 500); //Delay hiding the loading screen by 0.5 seconds
            }
        }
    
        if (totalAssets === 0) {
            // If there are no images, directly complete the loading screen
            progressBar.style.width = '100%';
            setTimeout(() => {
                loadingScreen.style.opacity = '0';
                setTimeout(() => loadingScreen.style.display = 'none', 1000); //remove after fade
            }, 500); //Delay hiding the loading screen by 0.5 seconds
            return;
        }
    
        // Track image loading
        for(const img of images) {
            if(img.complete) {
                updateProgress('image', img.src);
            }
            else {
                img.addEventListener('load', () => updateProgress('image', img.src));
                img.addEventListener('error', () => {
                    console.error('Failed to load image:', img.src);
                    updateProgress('image', img.src);
                });
            }
        }

        // Track video loading
        for(const video of videos) {
            if(video.readyState >= 4) {
                updateProgress('video', video.currentSrc);
            }
            else{
                video.addEventListener('loadeddata', () => {
                    if(video.readyState >= 4) {
                        updateProgress('video', video.currentSrc);
                    }
                });
                video.addEventListener('error', () => {
                    console.error('Failed to load video:', video.currentSrc);
                    updateProgress('video', video.currentSrc);
                });
            }
        }
    });
}