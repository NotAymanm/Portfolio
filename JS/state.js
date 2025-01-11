// state.js
export let currentSection = 'about';
export let currentIndex = 0;

export function setCurrentSection(section) {
    currentSection = section;
}

export function setCurrentIndex(index) {
    currentIndex = index;
}

export function getTotalSlides(sections) {
    return Object.values(sections).reduce((sum, arr) => sum + arr.length, 0);
}

export function getGlobalIndex(sections, section, sectionIndex) {
    let globalIndex = 0;
    for (const [key, slides] of Object.entries(sections)) {
        if (key === section) {
            return globalIndex + sectionIndex;
        }
        globalIndex += slides.length;
    }
    return 0;
}

export function getSectionFromGlobal(sections, globalIndex) {
    let count = 0;
    for (const [section, slides] of Object.entries(sections)) {
        if (globalIndex < count + slides.length) {
            return {
                section,
                index: globalIndex - count
            };
        }
        count += slides.length;
    }
    return { section: 'about', index: 0 };
}