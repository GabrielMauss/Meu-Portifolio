// projects.js
document.addEventListener('DOMContentLoaded', () => {
    // Dados dos projetos (pode ser substituído por uma API)
    const projectsData = [
        {
            id: 1,
            title: "Landing Page Moderna",
            description: "Uma landing page responsiva com design moderno e animações suaves.",
            image: "assets/images/projects/projeto1.jpg",
            tags: ["web", "design"],
            technologies: ["HTML", "CSS", "JavaScript"],
            demoUrl: "#",
            codeUrl: "#"
        },
        {
            id: 2,
            title: "App de Tarefas",
            description: "Aplicativo mobile para gerenciamento de tarefas com sincronização em nuvem.",
            image: "assets/images/projects/projeto2.jpg",
            tags: ["mobile", "backend"],
            technologies: ["React Native", "Node.js", "MongoDB"],
            demoUrl: "#",
            codeUrl: "#"
        },
        {
            id: 3,
            title: "Loja Virtual",
            description: "Plataforma de e-commerce completa com carrinho de compras e pagamento integrado.",
            image: "assets/images/projects/projeto3.jpg",
            tags: ["web", "backend"],
            technologies: ["React", "Express", "PostgreSQL"],
            demoUrl: "#",
            codeUrl: "#"
        },
        {
            id: 4,
            title: "UI Kit Moderno",
            description: "Conjunto de componentes de interface para acelerar o desenvolvimento frontend.",
            image: "assets/images/projects/projeto4.jpg",
            tags: ["design"],
            technologies: ["Figma", "CSS", "Design System"],
            demoUrl: "#",
            codeUrl: "#"
        },
        {
            id: 5,
            title: "API RESTful",
            description: "API robusta com autenticação JWT, documentação Swagger e testes automatizados.",
            image: "assets/images/projects/projeto5.jpg",
            tags: ["backend"],
            technologies: ["Node.js", "Express", "MongoDB"],
            demoUrl: "#",
            codeUrl: "#"
        },
        {
            id: 6,
            title: "Dashboard Analytics",
            description: "Painel administrativo com gráficos interativos e exportação de dados.",
            image: "assets/images/projects/projeto6.jpg",
            tags: ["web"],
            technologies: ["React", "Chart.js", "Styled Components"],
            demoUrl: "#",
            codeUrl: "#"
        }
    ];

    // Elementos DOM
    const projectsGrid = document.getElementById('projects-grid');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const searchInput = document.querySelector('.projects-search');

    // Exibe todos os projetos inicialmente
    displayProjects(projectsData);

    // Filtra projetos por categoria
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove a classe 'active' de todos os botões
            filterButtons.forEach(btn => btn.classList.remove('active'));

            // Adiciona 'active' apenas no botão clicado
            button.classList.add('active');

            const filter = button.dataset.filter;
            filterProjects(filter);
        });
    });

    // Busca projetos por texto
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        searchProjects(searchTerm);
    });

    // Função para exibir projetos
    function displayProjects(projects) {
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

    // Função para filtrar projetos por categoria
    function filterProjects(filter) {
        const allProjects = document.querySelectorAll('.project-card');

        allProjects.forEach(project => {
            const tags = project.dataset.tags;

            if (filter === 'all' || tags.includes(filter)) {
                project.style.display = 'block';
            } else {
                project.style.display = 'none';
            }
        });
    }

    // Função para buscar projetos
    function searchProjects(term) {
        const allProjects = document.querySelectorAll('.project-card');

        allProjects.forEach(project => {
            const title = project.querySelector('.project-title').textContent.toLowerCase();
            const description = project.querySelector('.project-description').textContent.toLowerCase();
            const tags = project.dataset.tags.toLowerCase();

            if (title.includes(term) || description.includes(term) || tags.includes(term)) {
                project.style.display = 'block';
            } else {
                project.style.display = 'none';
            }
        });
    }

    // Inicializa com o filtro 'all' ativo
    filterProjects('all');
});
