// sidebar.js
import { translations } from './language.js';
import {setCurrentIndex } from './state.js';
import { sections, showSlide } from './slides.js';

const sidebarList = document.getElementById('sidebar-list');

// Update the sidebar items with the appropriate active item
export function updateSidebar(section, activeIndex = 0) {
    sidebarList.innerHTML = ''; // Clear the sidebar list

    const sidebarItems = translations.sidebar?.[section] || sections[section];
    sidebarItems.forEach((slide, index) => {
        const li = document.createElement('li');
        li.textContent = slide;
        li.dataset.slide = index; // Store the slide index

        li.classList.toggle('active', index === activeIndex);

        li.addEventListener('click', () => {
            setCurrentIndex(index);
            showSlide(index, section);
        });
        sidebarList.appendChild(li);
    });
}

