document.addEventListener('DOMContentLoaded', () => {
    const username = 'GabrielMauss'; // Substitua pelo seu username
    const reposContainer = document.getElementById('github-repos');
    const loadingElement = document.querySelector('.loading');

    // Configurações da API
    const apiUrl = `https://api.github.com/users/${username}/repos?sort=updated&direction=desc`;
    const headers = {
        'Accept': 'application/vnd.github.v3+json'
    };

    // Fetch dos repositórios
    fetch(apiUrl, { headers })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro HTTP: ${response.status}`);
            }
            return response.json();
        })
        .then(repos => {
            // Remove o elemento de loading
            if (loadingElement) {
                loadingElement.remove();
            }

            // Filtra e exibe os repositórios
            const filteredRepos = repos.filter(repo => !repo.fork && repo.name !== "GabrielMauss"); // Remove forks
            displayRepositories(filteredRepos.slice(0, 6)); // Limita a 6 repositórios
        })
        .catch(error => {
            console.error('Erro ao buscar repositórios:', error);
            if (loadingElement) {
                loadingElement.innerHTML = `
                    <i class="fas fa-exclamation-triangle"></i>
                    <p>Não foi possível carregar os repositórios. <a href="https://github.com/${username}" target="_blank">Ver GitHub</a></p>
                `;
            }
        });

    // Exibe os repositórios no HTML
    function displayRepositories(repositories) {
        reposContainer.innerHTML = repositories.map(repo =>  `
            <div class="repo-card">
                <h3 class="repo-name">
                    <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" style="text-decoration: none;">
                        ${repo.name}
                    </a>
                </h3>
                <p class="repo-description">${repo.description || 'Sem descrição disponível.'}</p>
                <div class="repo-stats">
                    <div class="repo-stat">
                        <i class="fas fa-star"></i>
                        <span>${repo.stargazers_count}</span>
                    </div>
                    <div class="repo-stat">
                        <i class="fas fa-code-branch"></i>
                        <span>${repo.forks_count}</span>
                    </div>
                    <div class="repo-stat">
                        <i class="fas fa-circle" style="color: ${getLanguageColor(repo.language)}"></i>
                        <span>${repo.language || 'Vários'}</span>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Cores para linguagens populares (pode ser expandido)
    function getLanguageColor(language) {
        const colors = {
            'JavaScript': '#f1e05a',
            'TypeScript': '#3178c6',
            'Python': '#3572A5',
            'HTML': '#e34c26',
            'CSS': '#563d7c',
            'Java': '#b07219',
            'PHP': '#4F5D95',
            'Ruby': '#701516',
            'C++': '#f34b7d',
            'C#': '#178600',
            'Go': '#00ADD8',
            'Swift': '#ffac45',
            'Kotlin': '#F18E33',
            'Rust': '#dea584'
        };
        return colors[language] || '#cccccc';
    }
});
