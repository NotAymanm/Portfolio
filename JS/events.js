// events.js
import { loadLanguage, translationClick } from './language.js';
import { navigateSlides } from './slides.js';
import { loadingScreen } from './loadingScreen.js';
import { navbarItemClick, navbarSizeAdjust } from './navbar.js';

export function setupEventListeners() {
    loadingScreen();

    translationClick();

    navbarItemClick();

    navbarSizeAdjust();

    
    let scrollLocked = false;
    let startY = 0; // To store the starting Y position of a touch
    
    // Function to handle slide navigation
    function handleScroll(direction) {
        if (!scrollLocked) {
            navigateSlides(direction);
    
            // Lock further scrolling for 1 second
            const maxAnimationDuration = 1000;
            scrollLocked = true;
            setTimeout(() => {
                scrollLocked = false;
            }, maxAnimationDuration);
        }
    }
    
    // Desktop scrolling with mouse wheel
    window.addEventListener('wheel', (e) => {
        e.preventDefault();
        const direction = e.deltaY > 0 ? 'down' : 'up';
        handleScroll(direction);
    });
    
    // Touch scrolling for phones
    window.addEventListener('touchstart', (e) => {
        startY = e.touches[0].clientY; // Record the initial touch position
    });
    
    window.addEventListener('touchmove', (e) => {
        if (scrollLocked) return; // Stop if scrolling is locked
        const endY = e.touches[0].clientY;
        const deltaY = endY - startY;
    
        if (Math.abs(deltaY) > 50) { // Adjust the threshold for sensitivity
            const direction = deltaY < 0 ? 'down' : 'up';
            handleScroll(direction);
        }
    });


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
            const isMobile = window.innerWidth <= 768;
            section.style.maxHeight = isMobile ? '100px' : '190px';
        });
    });


    // Add event listeners for video items
    // const video = document.getElementById("video");
    // const toggleSoundButton = document.getElementById("toggleSound");
    // const playPauseButton = document.getElementById("playPause");

    // toggleSoundButton.addEventListener("click", () => {
    //     video.muted = !video.muted;
    //     toggleSoundButton.textContent = video.muted ? "Unmute" : "Mute";
    // });
    // playPauseButton.addEventListener("click", () => {
    // if (video.paused || video.ended) {
    //     video.play();
    //     playPauseButton.textContent = "Pause";
    // } else {
    //     video.pause();
    //     playPauseButton.textContent = "Play";
    // }
    // });


}