// slides.js
import { currentSection, currentIndex, setCurrentIndex, setCurrentSection } from './state.js';
import { updateSidebar } from './sidebar.js';
import { loadParticles, unloadParticles, sectionParticles } from './loadParticles.js';

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


export function showSlide(index, section, sequential = false) {
    const slides = document.querySelectorAll(`.${section}`);
    slides.forEach((slide, i) => {
        // Parent slide transition
        slide.classList.toggle('active', i === index);
        slide.style.transition = 'transform 1s ease-in-out'; // Parent speed
        slide.style.transform =
            i < index
                ? 'translateY(-100%)'
                : i === index
                ? 'translateY(0)'
                : 'translateY(100%)';

        // Handle all child elements dynamically
        const children = slide.querySelectorAll('[data-speed], [data-delay], [data-translate-x], [data-translate-y], [data-origin-x], [data-origin-y]');
        children.forEach(child => {
            const speed = child.dataset.speed || 1; // Default speed: 1s
            const delay = child.dataset.delay || 0; // Default delay: 0s
            const translateX = child.dataset.translateX || '0'; // Default translation on X-axis: 0
            const translateY = child.dataset.translateY || '0'; // Default translation on Y-axis: 0
            const originX = child.dataset.originX || '0'; // Default origin on X-axis
            const originY = child.dataset.originY || '0'; // Default origin on Y-axis

            // Apply transform transition (speed and delay) for child elements
            child.style.transition = `transform ${speed}s ease-in-out ${delay}s`;
            
            // Apply translation to the sub-elements using the specified X and Y amounts
            child.style.transform =
                i < index
                    ? `translate(${translateX}%, -${translateY}%)` // Customize X and Y movement
                    : i === index
                    ? `translate(${originX}%, ${originY}%)` // Reset to origin
                    : `translate(${translateX}%, ${translateY}%)`;
        });
    });

    const sidebarList = document.getElementById('sidebar-list');
    const sidebarItems = sidebarList.querySelectorAll('li');
    sidebarItems.forEach((item, i) => {
        item.classList.toggle('active', i === index);
    });
}
    

export function handleSectionChange(section) {
    const sections = document.querySelectorAll('.section');

    let previousSection = null;

    sections.forEach(section => {
        const sectionId = section.id;
        if(section.classList.contains('active')){
            previousSection = sectionId;
        }
            
        section.classList.remove('active'); // Remove 'active' class from all sections
    })

    // Set the active section
    const activeSection = document.querySelector(`#${section}`);
    if (activeSection) {
        activeSection.classList.add('active'); // Add 'active' class to the selected section
    }

    setCurrentSection(section);
    setCurrentIndex(0);

    updateSidebar(currentSection, currentIndex);
    showSlide(currentIndex, currentSection);

    // Manage particles
    unloadParticles();
    const currentParticles = sectionParticles[currentSection] || [];
    loadParticles(currentParticles);

    //matches timeout to fade transtion between sections
    if(previousSection && previousSection !== currentSection){
        setTimeout(() => {
            resetSlides(previousSection);
        }, 500);
    }

    document.querySelectorAll('.navbar .nav-left li a').forEach(item => {
        const itemSection = item.getAttribute('href').substring(1);
        item.classList.toggle('active', itemSection === section);
    });
}

export function resetSlides(section){
    const slides = document.querySelectorAll(`.${section}`);
    slides.forEach((slide, index) => {
        // Reset all slides to their initial position
        slide.style.transition = 'none'; // Disable transition temporarily
        slide.style.transform = index === 0 ? 'translateY(0)' : 'translateY(100%)';
        slide.classList.remove('active');
    });

    // Reapply transition for future animations
    setTimeout(() => {
        slides.forEach(slide => slide.style.transition = 'transform 1s ease-in-out');
    }, 50);
}











/* export function showSlide(index, section, sequential = false) {
    const slides = document.querySelectorAll(`.${section}`);
    const totalSlides = slides.length;

    if (!sequential) {
        // Direct jump (existing functionality)
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
            slide.style.transform = i < index
                ? 'translateY(-100%)'
                : i === index
                ? 'translateY(0)'
                : 'translateY(100%)';
        });
    } else {
        // Sequential transition
        const currentActiveIndex = [...slides].findIndex(slide =>
            slide.classList.contains('active')
        );
        const step = index > currentActiveIndex ? 1 : -1;

        const animateSequentially = (current) => {
            if (current === index) return;

            slides[current].classList.remove('active');
            slides[current + step].classList.add('active');
            slides[current].style.transform = step === 1 ? 'translateY(-100%)' : 'translateY(100%)';
            slides[current + step].style.transform = 'translateY(0)';

            setTimeout(() => animateSequentially(current + step), 1000); // Adjust timing to match CSS transition
        };

        animateSequentially(currentActiveIndex);
    }

    const sidebarItems = sidebarList.querySelectorAll('li');
    sidebarItems.forEach((item, i) => {
        item.classList.toggle('active', i === index);
    });
} */