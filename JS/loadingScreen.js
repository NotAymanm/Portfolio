export function loadingScreen(){

    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        loadingScreenAnimation(loadingScreen);
    } else {
        console.error('Loading screen not found!');
    }

    const progressBar = document.querySelector('.progress');

    const imagesSrc = [...document.images].filter(img => img.src); // Get all images on the page

    // Get sources elements of all videos map them to parent vidoe element and remove duplicates.
    const sourceElements = document.querySelectorAll('video source');
    const videosSrc = [...new Set([...sourceElements].map(source => source.parentElement))]
        .filter(video => video.currentSrc);
    
    const images = [...new Set(imagesSrc.map(img => img.src))];
    const videos = [...new Set(videosSrc.map(video => video.currentSrc))];
    const totalAssets = images.length + videos.length;
    let loadedAssets = 0;

    // Debug info
    console.log(images);
    console.log(videos);
    console.log('Total images:', images.length);
    console.log('Total videos:', videos.length);

    function updateProgress(assetType, assetSrc){
        loadedAssets++;
        const progress = (loadedAssets / totalAssets) * 100;
        progressBar.style.width = `${progress}%`;

        console.log(`Loaded ${assetType}: ${assetSrc}`);
        console.log(`Progress: ${loadedAssets}/${totalAssets}`);

        if(loadedAssets >= totalAssets) {
            setTimeout(() => {
                loadingScreen.style.opacity = '0';
                setTimeout(() => loadingScreen.style.display = 'none', 1000); //remove after fade
            }, 500); //Delay hiding the loading screen by 0.5 seconds
        }
    }

    if (totalAssets === 0) {
        // If there are no assets, directly complete the loading screen
        progressBar.style.width = '100%';
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            setTimeout(() => loadingScreen.style.display = 'none', 1000); //remove after fade
        }, 500); //Delay hiding the loading screen by 0.5 seconds
        return;
    }

    // Add load event listeners to each image
    images.forEach(src => {
        const img = imagesSrc.find(img => img.src === src);
        img.addEventListener('load', () => updateProgress('image', img.src));
        img.addEventListener('error', () => updateProgress('image', img.src));
        if (img.complete) {
            img.dispatchEvent(new Event('load'));
        }
    });

    // Add load event listeners to each video
    videos.forEach(src => {
        const video = videosSrc.find(video => video.currentSrc === src);
        video.addEventListener('loadeddata', () => updateProgress('video', video.currentSrc));
        video.addEventListener('error', () => updateProgress('video', video.currentSrc));
        if (video.readyState >= 3) {
            video.dispatchEvent(new Event('loadeddata'));
        }
    });
}

export function loadingScreenAnimation(loadingScreen) {
    const svgObject = loadingScreen.querySelector('.loading-svg');
    const loadingText = loadingScreen.querySelector('.loading-text');

    if(svgObject.contentDocument) {
        handleSVGLoad();
    }
    else {
        svgObject.onload = function() {
            handleSVGLoad();
        };
    }

    function handleSVGLoad() {
        svgObject.classList.add('fade-in');
        
        setTimeout(() => {
            loadingText.classList.add('fade-in');
        }, 300);
    }
}