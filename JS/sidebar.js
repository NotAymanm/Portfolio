// sidebar.js
import { translations } from './language.js';
import { currentSection, currentIndex, setCurrentIndex, setCurrentSection } from './state.js';
import { sections } from './slides.js';

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

/* export function showSlide(index, section) {
    const slides = document.querySelectorAll('.slide');
    let startIndex;

    switch (section) {
        case 'about':
            startIndex = 0;
            break;
        case 'work':
            startIndex = sections.about.length;
            break;
        case 'projects':
            startIndex = sections.about.length + sections.work.length;
            break;
        default:
            startIndex = 0;
    }

    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === startIndex + index);

        if(i < startIndex + index){
            slide.style.transform = 'translateY(-100%)';
        }
        else if( i == startIndex + index) {
            slide.style.transform = 'translateY(0)';
        }
        else{
            slide.style.transform = 'translateY(100%)';
        }
    });

    const sidebarItems = sidebarList.querySelectorAll('li');
    sidebarItems.forEach((item, i) => {
        item.classList.toggle('active', i === index);
    });
} */

export function showSlide(index, section) {
    console.log(section)
    const slides = document.querySelectorAll(`.${section}`);

    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);

        if(i < index){
            slide.style.transform = 'translateY(-100%)';
        }
        else if( i == index) {
            slide.style.transform = 'translateY(0)';
        }
        else{
            slide.style.transform = 'translateY(100%)';
        }
    });

    const sidebarItems = sidebarList.querySelectorAll('li');
    sidebarItems.forEach((item, i) => {
        item.classList.toggle('active', i === index);
    });
}
    

export function handleSectionChange(section) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
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

    document.querySelectorAll('.navbar .nav-left li a').forEach(item => {
        const itemSection = item.getAttribute('href').substring(1);
        item.classList.toggle('active', itemSection === section);
    });
}