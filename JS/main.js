//main.js
import { loadLanguage } from './language.js';
import { updateSidebar, showSlide, handleSectionChange } from './sidebar.js';
import { setupEventListeners } from './events.js';
import { currentSection, currentIndex } from './state.js';

document.addEventListener('DOMContentLoaded', () => {
    loadLanguage('en'); // Load default language
    updateSidebar(currentSection, currentIndex); // Set the sidebar for the default section
    showSlide(currentIndex, currentSection); // Show the first slide of the default section
    handleSectionChange(currentSection); // Set default active state in navbar
    setupEventListeners(); // Set up event listeners for navigation
});
