// slides.js
import { currentSection, currentIndex, setCurrentIndex } from './state.js';
import { showSlide } from './sidebar.js';

export const sections = {
    about: ['Intro', 'Education'],
    work: ['Experience 1', 'Experience 2', 'Experience 3'],
    projects: ['Project 1', 'Project 2', 'Project 3']
};

export function navigateSlides(direction) {
    const totalSlides = sections[currentSection].length;

    if (direction === 'down') {
        if ((sections[currentSection].length - 1) == currentIndex) return;
        // Update the index and ensure it wraps around
        setCurrentIndex((currentIndex + 1) % totalSlides);
    } else {
        if (0 == currentIndex) return;
        // Update the index and ensure it wraps around
        setCurrentIndex((currentIndex - 1 + totalSlides) % totalSlides);
    }

    showSlide(currentIndex, currentSection);
}