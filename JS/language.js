// language.js
import { updateSidebar } from './sidebar.js';
import { currentIndex, currentSection } from './state.js';

export let translations = {}; // Store translations globally

// Helper function to access nested properties in JSON
function getNestedTranslation(obj, key) {
    return key.split('.').reduce((o, i) => (o ? o[i] : null), obj);
}

// Load language and update translations
export async function loadLanguage(lang) {
    const response = await fetch(`/JSON/${lang}.json`);
    translations = await response.json(); // Store translations for later use

    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        const translation = getNestedTranslation(translations, key);
        if (translation) {
            element.textContent = translation;
        }
    });

    updateSidebar(currentSection, currentIndex);
}

export function translationClick() {
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
}