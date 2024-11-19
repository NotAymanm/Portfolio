// events.js
import { loadLanguage } from './language.js';
import { handleSectionChange } from './sidebar.js';
import { navigateSlides } from './slides.js';

export function setupEventListeners() {
    const languageSelector = document.getElementById('language-selector');
    const en = document.getElementById('en');
    const fr = document.getElementById('fr');

    languageSelector.addEventListener('click', function(e) {
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

}