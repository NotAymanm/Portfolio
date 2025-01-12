import { setCurrentSection, setCurrentIndex } from './state.js';
import { handleSectionChange, showSlide } from './slides.js';

export function navbarItemClick(){
    document.querySelectorAll('.navbar .nav-left li a').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const section = e.target.getAttribute('href').substring(1);

            // Reset to first slide of new section
            setCurrentSection(section);
            setCurrentIndex(0);
            handleSectionChange(section);
            showSlide(0, section);
        });
    });
}


export function navbarSizeAdjust(){
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
}
    