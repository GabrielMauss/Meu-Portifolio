document.addEventListener('DOMContentLoaded', () => {
    // Dados dos projetos DIRETAMENTE no JS
    const projectsData = [
        {
            id: 1,
            title: "Landing Page Moderna",
            description: "Uma landing page responsiva com animações CSS.",
            image: "assets/images/projects/project1.png",
            tags: ["web", "design"],
            technologies: ["HTML", "CSS", "JavaScript"],
            demoUrl: "#",
            codeUrl: "#"
        },
        {
            id: 2,
            title: "App de Tarefas",
            description: "Aplicativo mobile com sincronização em nuvem.",
            image: "assets/images/projects/projeto2.jpg",
            tags: ["mobile", "backend"],
            technologies: ["React Native", "Node.js"],
            demoUrl: "#",
            codeUrl: "#"
        }
        // Adicione mais projetos conforme necessário
    ];

    // Elementos DOM
    const projectsGrid = document.getElementById('projects-grid');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const searchInput = document.querySelector('.projects-search');

    // Renderiza projetos
    function renderProjects(projects) {
        projectsGrid.innerHTML = projects.map(project => `
            <div class="project-card" data-tags="${project.tags.join(',')}">
                <img src="${project.image}" alt="${project.title}" class="project-image">
                <div class="project-info">
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-description">${project.description}</p>
                    <div class="project-tags">
                        ${project.technologies.map(tech => `<span class="tag">${tech}</span>`).join('')}
                    </div>
                    <div class="project-links">
                        <a href="${project.demoUrl}" class="project-link" target="_blank">
                            <i class="fas fa-external-link-alt"></i> Demo
                        </a>
                        <a href="${project.codeUrl}" class="project-link" target="_blank">
                            <i class="fab fa-github"></i> Código
                        </a>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Filtra projetos
    function filterProjects(filter) {
        const filtered = filter === 'all'
            ? projectsData
            : projectsData.filter(project => project.tags.includes(filter));
        renderProjects(filtered);
    }

    // Busca projetos
    function searchProjects(term) {
        const results = projectsData.filter(project =>
            project.title.toLowerCase().includes(term) ||
            project.description.toLowerCase().includes(term) ||
            project.technologies.some(tech => tech.toLowerCase().includes(term))
        );
        renderProjects(results);
    }

    // Event Listeners
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            filterProjects(button.dataset.filter);
        });
    });

    searchInput.addEventListener('input', (e) => {
        searchProjects(e.target.value.toLowerCase());
    });

    // Inicialização
    renderProjects(projectsData);
});
