// sidebar.js
import { translations } from './language.js';
import { setCurrentIndex, setCurrentSection, currentSection, currentIndex, getSectionFromGlobal } from './state.js';
import { sections, showSlide, handleSectionChange } from './slides.js';

const sidebarList = document.getElementById('sidebar-list');

// Update the sidebar items with the appropriate active item
export function updateSidebar() {
    sidebarList.innerHTML = ''; // Clear the sidebar list
    let globalIndex = 0;

    Object.entries(sections).forEach(([section, slides]) => {
        slides.forEach((slideName, index) => {
            const li = document.createElement('li');
            li.textContent = slideName;
            li.dataset.globalIndex = globalIndex;

            const isActive = section === currentSection && index === currentIndex;
            li.classList.toggle('active', isActive);

            li.addEventListener('click', () => {
                const { section: newSection, index: newIndex } =
                    getSectionFromGlobal(sections, parseInt(li.dataset.globalIndex));

                // Update State first
                setCurrentSection(newSection);
                setCurrentIndex(newIndex);
                
                // Then change section and show slide
                handleSectionChange(newSection);
                showSlide(newIndex, newSection);
            });

            sidebarList.appendChild(li);
            globalIndex++;
        });
    });
}
