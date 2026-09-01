document.addEventListener('DOMContentLoaded', async () => {
  await loadProjects();
});

async function loadProjects() {
  const container = document.getElementById('projects-container');
  if (!container) return;

  let projects;

  try {
    projects = await DataLoader.loadAndCache('projects.json');
  } catch (error) {
    console.warn('Could not load projects from DataLoader, using direct fetch fallback.', error);
    try {
      const response = await fetch('data/projects.json');
      if (!response.ok) throw new Error('Failed to load projects');
      projects = await response.json();
    } catch (e) {
      console.warn('Direct fetch also failed, using fallback data.', e);
      projects = DataLoader.getFallback('projects.json');
    }
  }

  renderProjects(projects);

  setTimeout(() => {
    document.querySelectorAll('#projects-container .reveal').forEach(el => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      }, { threshold: 0.1 });
      observer.observe(el);
    });
  }, 100);
}

function renderProjects(projects) {
  const container = document.getElementById('projects-container');
  if (!container) return;

  if (!projects || projects.length === 0) {
    container.innerHTML = `
      <div class="col-12 text-center py-5">
        <p class="text-muted">No projects found.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = projects.map(project => `
    <div class="col-lg-3 col-md-6 col-12 reveal">
      <div class="card project-card h-100 border-0 shadow hover-lift">
        <div class="overflow-hidden img-hover-zoom">
          <img src="${project.image}" alt="${project.title}" class="card-img-top" loading="lazy">
        </div>
        <div class="card-body bg-dark d-flex flex-column">
          <h5 class="card-title text-info fw-bold">${project.title}</h5>
          <p class="card-text text-muted flex-grow-1">${project.description}</p>
          <div class="mb-3">
            ${project.technologies.map(tech => `<span class="badge badge-accent me-1 mb-1">${tech}</span>`).join('')}
          </div>
          ${renderProjectLinks(project)}
        </div>
      </div>
    </div>
  `).join('');
}

function isValidUrl(url) {
  if (!url || typeof url !== 'string') return false;
  const trimmed = url.trim();
  if (!trimmed) return false;
  try {
    const parsed = new URL(trimmed);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

function renderProjectLinks(project) {
  const buttons = [];

  if (isValidUrl(project.live)) {
    buttons.push(`<a href="${project.live}" class="btn btn-primary btn-sm flex-fill" target="_blank" rel="noopener">Live Demo</a>`);
  }

  if (isValidUrl(project.github)) {
    buttons.push(`<a href="${project.github}" class="btn btn-outline btn-sm flex-fill" target="_blank" rel="noopener"><i class="bi bi-github"></i> GitHub</a>`);
  }

  if (buttons.length === 0) {
    return '';
  }

  return `<div class="d-flex gap-2 mt-auto">${buttons.join('')}</div>`;
}