export function loadParticles() {
    //TODO: Load particles per section
    particlesJS.load('intro-particles', 'JSON/particles.json', function () {
        console.log('Particles.js config loaded successfully!');
    });

    particlesJS.load('education-particles', 'JSON/leafs.json', function () {
        console.log('Particles.js config loaded successfully!');
    });

    dynamicText();
    
}

export function dynamicText(){
    //dynamic text
    const words = ["mobile apps.", "websites.", "3D models.", "apps.", "logos.", "everything."];
    let index = 0;
    const textElement = document.getElementById("dynamic-text");

    function animateWords() {
        textElement.classList.remove("brush-stroke");
        setTimeout(() => {
            textElement.textContent = words[index];
            textElement.classList.add("brush-stroke");
            index = (index + 1) % words.length;
        }, 200);
    }

    setInterval(animateWords, 3000); // Change every 3 seconds
}

export function unloadParticles(){
    // Destroy particles
    if (window.pJSDom && window.pJSDom.length > 0) {
        window.pJSDom.forEach((instance) => instance.pJS.fn.vendors.destroypJS());
        window.pJSDom = [];
        console.log('Particles.js instances destroyed successfully!');
    }
}