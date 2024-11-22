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
} */
    
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

            setTimeout(() => animateSequentially(current + step), 1000); // Adjust timing to match your CSS transition
        };

        animateSequentially(currentActiveIndex);
    }

    const sidebarItems = sidebarList.querySelectorAll('li');
    sidebarItems.forEach((item, i) => {
        item.classList.toggle('active', i === index);
    });
} */

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
                    : `translate(-${translateX}%, ${translateY}%)`;
        });
    });

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

    //match timeout to fade transtion between sections
    if(previousSection){
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