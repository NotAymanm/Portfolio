export function loadParticles(){
    particlesJS.load('particles-js', 'JSON/particles.json', function() {
        console.log('Particles.js config loaded successfully!');
    });
}