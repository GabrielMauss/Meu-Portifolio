document.addEventListener('DOMContentLoaded', () => {
    // Dados das habilidades DIRETAMENTE no JS
    const skillsData = [
        {
            name: "JavaScript",
            level: 90,
            color: "#f1e05a",
            icon: "fab fa-js"
        },
        {
            name: "HTML5",
            level: 95,
            color: "#e34c26",
            icon: "fab fa-html5"
        },
        {
            name: "CSS3",
            level: 85,
            color: "#2965f1",
            icon: "fab fa-css3-alt"
        },
        {
            name: "React",
            level: 80,
            color: "#61dafb",
            icon: "fab fa-react"
        },
        {
            name: "Node.js",
            level: 75,
            color: "#68a063",
            icon: "fab fa-node-js"
        }
    ];

    // Elemento container
    const skillsContainer = document.getElementById('skills-container');

    // Renderização das habilidades
    if (skillsContainer) {
        renderSkills(skillsData);
        animateBars(); // Inicia animação
    } else {
        console.error("Elemento #skills-container não encontrado!");
    }

    // Função para renderizar as habilidades
    function renderSkills(skills) {
        skillsContainer.innerHTML = skills.map(skill => `
            <div class="skill-item">
                <div class="skill-header">
                    <i class="${skill.icon}" style="color: ${skill.color}"></i>
                    <span class="skill-name">${skill.name}</span>
                    <span class="skill-percent">${skill.level}%</span>
                </div>
                <div class="skill-bar">
                    <div class="progress"
                         style="background-color: ${skill.color}; width: 0;"
                         data-level="${skill.level}">
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Função para animar as barras
    function animateBars() {
        const progressBars = document.querySelectorAll('.progress');

        progressBars.forEach(bar => {
            const level = bar.getAttribute('data-level');
            bar.style.width = `${level}%`;
        });
    }
});
