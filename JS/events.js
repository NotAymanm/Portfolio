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
    window.addEventListener('wheel', (e) => {
        e.preventDefault();

        // Check if scrolling is locked
        if (!scrollLocked) {
            // Determine the direction and execute navigateSlides instantly
            const direction = e.deltaY > 0 ? 'down' : 'up';
            navigateSlides(direction);

            // Lock further scrolling for 1 second
            const maxAnimationDuration = 1000;
            scrollLocked = true;
            setTimeout(() => {
                scrollLocked = false;
            }, maxAnimationDuration);
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
            section.style.maxHeight = '190px';
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