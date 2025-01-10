// events.js
import { loadLanguage } from './language.js';
import { navigateSlides, handleSectionChange } from './slides.js';

export function setupEventListeners() {
    
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
    

    const languageSelector = document.getElementById('language-selector');
    const en = document.getElementById('en');
    const fr = document.getElementById('fr');

    languageSelector.addEventListener('click', (e) => {
        if (e.target.id === 'en' || e.target.id === 'fr') {
            if (e.target.classList.contains('selected')) return;

            en.classList.toggle('selected');
            fr.classList.toggle('selected');

            loadLanguage(e.target.id);
        }
    });

    document.querySelectorAll('.navbar .nav-left li a').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const section = e.target.getAttribute('href').substring(1);
            handleSectionChange(section);
        });
    });

    
    let scrollLocked = false;
    window.addEventListener('wheel', (e) => {
        e.preventDefault();

        // Check if scrolling is locked
        if (!scrollLocked) {
            // Determine the direction and execute navigateSlides instantly
            const direction = e.deltaY > 0 ? 'down' : 'up';
            navigateSlides(direction);

            // Lock further scrolling for 1 second
            scrollLocked = true;
            setTimeout(() => {
                scrollLocked = false;
            }, 1000);
        }
    });

    
    //adjust width of navbar
    //keeps the navigation bar at the top of the tab
    function adjustNavbar() {
        const navbarHeight = 146.53;
        const navbarWidth = 1522.66;
        const offset =  400;
        const navbarGivenHeight = 130;
        const multiplier = navbarWidth / navbarHeight;
        const baseWidth = navbarGivenHeight * multiplier; // Calculate base width
        const windowWidth = window.innerWidth;
        
        const targetElement = document.querySelector('.navbar ul');
        if (windowWidth <= baseWidth) {
            let adjustedOffset = windowWidth * (offset / baseWidth);
            let adjustedWidth = windowWidth - adjustedOffset;
            targetElement.style.width = `${adjustedWidth}px`;

            let adjustedHeight = windowWidth / multiplier;
            targetElement.style.height = `${adjustedHeight}px`;
        } else {
            targetElement.style.width = ''; // Reset to default width if needed
            targetElement.style.height = ''; // Reset to default height if needed
        }
    }
    window.addEventListener('resize', adjustNavbar);
    adjustNavbar();

    // Add event listeners to the job sections
    document.querySelectorAll('.job-section').forEach((section) => {
        section.addEventListener('mouseenter', () => {
            // Get the full height of the content
            const contentHeight = section.scrollHeight;
            // console.log(contentHeight);
            section.style.maxHeight = `${contentHeight}px`;
        });
    
        section.addEventListener('mouseleave', () => {
            // Collapse back to the original height
            section.style.maxHeight = '190px';
        });
    });


    // Add event listeners for video items
    const video = document.getElementById("video");
    const toggleSoundButton = document.getElementById("toggleSound");
    const playPauseButton = document.getElementById("playPause");

    toggleSoundButton.addEventListener("click", () => {
        video.muted = !video.muted;
        toggleSoundButton.textContent = video.muted ? "Unmute" : "Mute";
    });
    playPauseButton.addEventListener("click", () => {
    if (video.paused || video.ended) {
        video.play();
        playPauseButton.textContent = "Pause";
    } else {
        video.pause();
        playPauseButton.textContent = "Play";
    }
    });


}