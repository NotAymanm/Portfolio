// slides.js

import { currentSection, currentIndex, setCurrentIndex, setCurrentSection, getTotalSlides, getGlobalIndex, getSectionFromGlobal } from './state.js';
import { updateSidebar } from './sidebar.js';
import { loadParticles, unloadParticles, sectionParticles } from './loadParticles.js';

export const sections = {
    about: ['Intro', 'Education'],
    work: ['Experience 1: MicroGPT', /* 'Experience 2', 'Experience 3' */],
    projects: ['Projects', /* '3D Models', 'Other' */]
};

export function navigateSlides(direction) {
    const globalIndex = getGlobalIndex(sections, currentSection, currentIndex);
    const totalSlides = getTotalSlides(sections);

    let newGlobalIndex;
    if (direction === 'down') {
        //if its the last slide in section
        if (globalIndex >= totalSlides - 1) return;
        // Updates the index
        newGlobalIndex = globalIndex + 1;
    } else {
        //if its the first slide in section
        if (globalIndex <= 0) return;
        // Updates the index
        newGlobalIndex = globalIndex - 1;
    }

    const { section, index } = getSectionFromGlobal(sections, newGlobalIndex);

    if (section !== currentSection) {
        handleSectionChange(section);
    }

    setCurrentSection(section);
    setCurrentIndex(index);
    showSlide(currentIndex, section);
}


export function showSlide(index, currentSection) {
    // 1. Get all sections and calculate global indices
    const allSections = Object.entries(sections);
    let globalCurrentIndex = 0;
    let targetGlobalIndex = 0;

    // Calculate target global index
    for (const [section, slides] of allSections) {
        if (section === currentSection) {
            targetGlobalIndex = globalCurrentIndex + index;
            break;
        }
        globalCurrentIndex += slides.length;
    }

    // 2. Reset and process all slides
    globalCurrentIndex = 0;

    for (const [section, _] of allSections) {
        const slides = document.querySelectorAll(`.${section}`);
        
        slides.forEach((slide, i) => {
            const slideGlobalIndex = globalCurrentIndex + i;
            
            // Ensure slide has correct starting position
            slide.classList.toggle('active', i === index);
            slide.style.transition = 'transform 1s ease-in-out';
            
            // Calculate transform based on global position
            if (slideGlobalIndex < targetGlobalIndex) {
                slide.style.transform = 'translateY(-100%)';
            } else if (slideGlobalIndex === targetGlobalIndex) {
                slide.style.transform = 'translateY(0)';
            } else {
                slide.style.transform = 'translateY(100%)';
            }

            // Handle children animations
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
                
                if (slideGlobalIndex < targetGlobalIndex) {
                    child.style.transform = `translate(${translateX}%, -${translateY}%)`;
                } else if (slideGlobalIndex === targetGlobalIndex) {
                    child.style.transform = `translate(${originX}%, ${originY}%)`;
                } else {
                    child.style.transform = `translate(${translateX}%, ${translateY}%)`;
                }
            });
        });
        
        globalCurrentIndex += slides.length;
    }

    // 3. Update sidebar
    const sidebarList = document.getElementById('sidebar-list');
    const sidebarItems = sidebarList.querySelectorAll('li');
    sidebarItems.forEach((item, i) => {
        item.classList.toggle('active', i === targetGlobalIndex);
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

    updateSidebar();

    // Manage particles
    unloadParticles();
    const currentParticles = sectionParticles[section] || [];
    loadParticles(currentParticles);

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