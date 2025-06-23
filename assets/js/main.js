// ===== VARIÁVEIS GLOBAIS =====
const body = document.body;
const themeToggle = document.querySelector('.theme-toggle');
const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('nav');
const navLinks = document.querySelectorAll('.nav-link');
const backToTopBtn = document.querySelector('.back-to-top');
const currentYear = document.getElementById('current-year');
const downloadCvBtn = document.getElementById('download-cv');

// ===== DARK MODE TOGGLE =====
function toggleDarkMode() {
  body.classList.toggle('dark-mode');
  const isDarkMode = body.classList.contains('dark-mode');

  // Salva preferência no localStorage
  localStorage.setItem('darkMode', isDarkMode ? 'enabled' : 'disabled');

  // Atualiza ícone
  themeToggle.innerHTML = isDarkMode
    ? '<i class="fas fa-sun"></i>'
    : '<i class="fas fa-moon"></i>';
}

// Verifica se já existe tema salvo
const savedTheme = localStorage.getItem('theme');

// Se não tiver nada salvo, define como claro
if (!savedTheme) {
  document.documentElement.setAttribute('data-theme', 'light');
  localStorage.setItem('theme', 'light');
} else {
  document.documentElement.setAttribute('data-theme', savedTheme);
}

// Função para alternar entre claro e escuro
function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
}

// Se você tiver um botão com id 'theme-toggle'
document.getElementById('theme-toggle')?.addEventListener('click', toggleTheme);

themeToggle.addEventListener('click', toggleDarkMode);

// ===== MENU MOBILE =====
function toggleMenu() {
  nav.classList.toggle('active');
  hamburger.innerHTML = nav.classList.contains('active')
    ? '<i class="fas fa-times"></i>'
    : '<i class="fas fa-bars"></i>';
}

hamburger.addEventListener('click', toggleMenu);

// Fecha menu ao clicar em um link
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (nav.classList.contains('active')) toggleMenu();
  });
});

// ===== CURSOR PERSONALIZADO =====
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

if (cursor && cursorFollower) {
  document.addEventListener('mousemove', (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;

    // Delay para o follower
    setTimeout(() => {
      cursorFollower.style.left = `${e.clientX}px`;
      cursorFollower.style.top = `${e.clientY}px`;
    }, 100);
  });

  // Efeito hover em elementos interativos
  const hoverElements = document.querySelectorAll(
    'a, button, .project-card, .repo-card, .profile-img, input[type="submit"], .social-link'
  );

  hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('active');
      cursorFollower.classList.add('active');
    });

    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('active');
      cursorFollower.classList.remove('active');
    });
  });
}

// ===== BARRA DE HABILIDADES =====
function animateSkills() {
  const skills = [
    { name: 'JavaScript', level: 90 },
    { name: 'HTML/CSS', level: 85 },
    { name: 'React', level: 80 },
    { name: 'Node.js', level: 75 },
    { name: 'UI/UX', level: 70 }
  ];

  const skillsContainer = document.getElementById('skills-container');

  if (skillsContainer) {
    skillsContainer.innerHTML = skills.map(skill => `
      <div class="skill-item">
        <div class="skill-info">
          <span class="skill-name">${skill.name}</span>
          <span class="skill-percent">${skill.level}%</span>
        </div>
        <div class="bar">
          <div class="progress" style="width: 0" data-width="${skill.level}"></div>
        </div>
      </div>
    `).join('');

    // Anima as barras após um delay
    setTimeout(() => {
      document.querySelectorAll('.progress').forEach(progress => {
        progress.style.width = `${progress.dataset.width}%`;
      });
    }, 500);
  }
}

// ===== BOTÃO "VOLTAR AO TOPO" =====
function handleScroll() {
  if (window.scrollY > 300) {
    backToTopBtn.classList.add('show');
  } else {
    backToTopBtn.classList.remove('show');
  }
}

backToTopBtn.addEventListener('click', (e) => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== DOWNLOAD DO CURRÍCULO =====
if (downloadCvBtn) {
  downloadCvBtn.addEventListener('click', (e) => {
    e.preventDefault();
    // Simula o download (substitua pelo link real)
    const link = document.createElement('a');
    link.href = 'assets/pdf/curriculo.pdf';
    link.download = 'Curriculo-SeuNome.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
}

// ===== ANIMAÇÃO AO ROLAR A PÁGINA =====
function initScrollAnimation() {
  const sections = document.querySelectorAll('.section');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
      }
    });
  }, { threshold: 0.1 });

  sections.forEach(section => {
    observer.observe(section);
  });
}

// ===== INICIALIZAÇÃO =====
document.addEventListener('DOMContentLoaded', () => {
  // Atualiza ano no footer
  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  animateSkills();
  initScrollAnimation();
  window.addEventListener('scroll', handleScroll);
});

// ===== FILTRO DE PROJETOS =====
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const projectSearch = document.querySelector('.projects-search');

if (filterButtons.length && projectCards.length) {
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Ativa botão selecionado
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const filter = button.dataset.filter;

      // Filtra projetos
      projectCards.forEach(card => {
        const tags = card.dataset.tags;
        if (filter === 'all' || tags.includes(filter)) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Busca de projetos
  if (projectSearch) {
    projectSearch.addEventListener('input', () => {
      const searchTerm = projectSearch.value.toLowerCase();

      projectCards.forEach(card => {
        const title = card.querySelector('.project-title').textContent.toLowerCase();
        const description = card.querySelector('.project-description').textContent.toLowerCase();
        const tags = card.dataset.tags.toLowerCase();

        if (title.includes(searchTerm) || description.includes(searchTerm) || tags.includes(searchTerm)) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  }
}
