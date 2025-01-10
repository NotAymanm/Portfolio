let activeParticleInstances = {};

export const sectionParticles = {
    about: [
        { containerId: 'intro-particles', configPath: 'JSON/intro-particles.json' },
        { containerId: 'education-particles', configPath: 'JSON/education-particles.json' }
    ],
    work: [
        // { containerId: 'work-particles', configPath: 'JSON/work-partilces.json' }
    ],
    projects: [
        // { containerId: 'projects-particles', configPath: 'JSON/projects-particles.json' }
    ]
};

export function loadParticles(sectionParticlesConfig) {
    sectionParticlesConfig.forEach(({ containerId, configPath }) => {
        if (activeParticleInstances[containerId]) {
            console.log(`${containerId} particles are already loaded.`);
            return;
        }

        particlesJS.load(containerId, configPath, function () {
            console.log(`${containerId} particles config loaded successfully!`);
            activeParticleInstances[containerId] = true;
        });
    });
}

export function unloadParticles(){
    // Destroy particles
    if (window.pJSDom && window.pJSDom.length > 0) {
        window.pJSDom.forEach((instance) => instance.pJS.fn.vendors.destroypJS());
        window.pJSDom = [];
        console.log('Particles.js instances destroyed successfully!');
    }
    activeParticleInstances ={};
}

