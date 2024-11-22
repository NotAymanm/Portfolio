export function loadParticles(){
    //TODO: Load particles per section
    particlesJS.load('particles-js', 'JSON/particles.json', function() {
        console.log('Particles.js config loaded successfully!');
    });
}