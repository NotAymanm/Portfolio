//addingProgramProjects.js
// Populate the project grid dynamically
// Fetch the project data from the JSON file
fetch('./JSON/projects.json')
    .then(response => response.json())
    .then(projects => {
        const projectGrid = document.querySelector('.projects-grid');

        projects.forEach(project => {
            const projectItem = document.createElement('div');
            projectItem.classList.add('project-item');

            projectItem.innerHTML = `
                <div class="image-container">
                    <img src="${project.image}" alt="${project.title}" class="project-image">
                    <img src="/SVG/fullscreen.svg" alt="⤢" class="fullscreen-icon">
                </div>
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-icons">
                    ${project.icons.map(icon => `<img src="${icon}" alt="${icon.split('/').pop().split('.')[0]}" class="icon">`).join('')}
                </div>
                <button onclick="window.open('${project.github}', '_blank');" class="github-button">
                    <img src="/Images/LogoIcons/github.svg" alt="Github" class="icon github-icon">
                    Repository
                </button>
            `;

            projectGrid.appendChild(projectItem);
        });
    })
    .catch(error => console.error('Error loading projects:', error));
