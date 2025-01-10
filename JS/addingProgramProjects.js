//addingProgramProjects.js
const projects = [
    {
        title: "Portfolio Website",
        description: "Portfolio website project is designed to showcase my professional background, skills, and projects in a  visually engaging and interactive manner. The portfolio serves as a platform to highlight my achievements, technical expertise, and personal branding.",
        image: "/Images/Projects/portfolio.png",
        github: "https://www.github.com/NotAymanm/Portfolio",
        icons: [
            "/Images/LogoIcons/HTML5.svg",
            "/Images/LogoIcons/CSS3.svg",
            "/Images/LogoIcons/js.svg",
            "/Images/LogoIcons/Git.svg"
        ]
    },
    {
        title: "Quest Game",
        description: "The Quest Game project is designed to create an interactive, turn-based game experience where players navigate challenges using cards and strategy. This project emphasizes modular design, efficient backend processing, and a dynamic, visually appealing frontend for an engaging user experience.",
        image: "/Images/Projects/Quest Game.png",
        github: "https://github.com/NotAymanm/Quest-Game",
        icons: [
            "/Images/LogoIcons/Java.svg",
            "/Images/LogoIcons/cucumber.svg",
            "/Images/LogoIcons/Selenium.jpg",
            "/Images/LogoIcons/Git.svg",
            "/Images/LogoIcons/HTML5.svg",
            "/Images/LogoIcons/CSS3.svg",
            "/Images/LogoIcons/js.svg"
        ]
    },
    {
        title: "Direct Neurofeedback Device Simulator",
        description: "Developed a simulated feedback-enabled EEG device designed to monitor brain activity and provide therapeutic interventions. The project integrated software, and user interface components to deliver real-time feedback and session management. Comprehensive design documentation supported the development, ensuring alignment with user requirements and system specifications.",
        image: "/Images/Projects/EEG.png",
        github: "https://github.com/Umar-J/Neureset-Feedback-EEG-Device",
        icons: [
            "/Images/LogoIcons/C++.svg",
            "/Images/LogoIcons/Qt.svg",
            "/Images/LogoIcons/Git.svg"
        ]
    },
    {
        title: "BrighterSpace (School Tracker)",
        description: "BrighterSpace is a task and schedule management app built with React Native and Expo. It integrates dynamic task handling, a visually interactive calendar, and custom animations to enhance user engagement. The app features personalized notifications and supports multi-screen navigation for a seamless user experience. Designed for students, it includes task prioritization and coursework tracking, leveraging an intuitive UI and efficient database operations.",
        image: "/Images/Projects/BrighterSpace.png",
        github: "https://github.com/NotAymanm/BrighterSpace",
        icons: [
            "/Images/LogoIcons/react native.svg",
            "/Images/LogoIcons/SQLite.svg",
            "/Images/LogoIcons/expo go.svg"
        ]
    },
];

// Populate the project grid dynamically
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