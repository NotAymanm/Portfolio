// state.js
export let currentSection = 'about';
export let currentIndex = 0;

export function setCurrentSection(section) {
    currentSection = section;
}

export function setCurrentIndex(index) {
    currentIndex = index;
}