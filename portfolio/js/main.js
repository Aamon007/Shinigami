document.addEventListener('DOMContentLoaded', () => {
  const navbarEl = document.getElementById('navbar');
  const footerEl = document.getElementById('footer');

  if (navbarEl) {
    fetch('partials/navbar.html')
      .then(res => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.text();
      })
      .then(html => {
        navbarEl.innerHTML = html;
        initNavbar();
      })
      .catch(() => {
        navbarEl.innerHTML = getNavbarFallback();
        initNavbar();
      });
  }

  if (footerEl) {
    fetch('partials/footer.html')
      .then(res => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.text();
      })
      .then(html => {
        footerEl.innerHTML = html;
        initBackToTop();
      })
      .catch(() => {
        footerEl.innerHTML = getFooterFallback();
        initBackToTop();
      });
  }

  initScrollReveal();
  initCounters();
  initStickyNavbar();
  initMagneticButtons();
  initTiltEffect();
  initHeroTyped();
});

function getNavbarFallback() {
  return `<nav class="navbar navbar-expand-lg navbar-dark custom-navbar fixed-top">
    <div class="container">
      <a class="navbar-brand fw-bold text-gradient" href="index.html">MIN KHANT ZAW</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto align-items-lg-center">
          <li class="nav-item"><a class="nav-link" href="index.html">Home</a></li>
          <li class="nav-item"><a class="nav-link" href="about.html">About</a></li>
          <li class="nav-item"><a class="nav-link" href="services.html">Services</a></li>
          <li class="nav-item"><a class="nav-link" href="skills.html">Skills</a></li>
          <li class="nav-item"><a class="nav-link" href="portfolio.html">Portfolio</a></li>
          <li class="nav-item"><a class="nav-link" href="contact.html">Contact</a></li>
          <li class="nav-item ms-lg-2">
            <a class="nav-link nav-cta" href="contact.html">Let's Talk</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>`;
}

function getFooterFallback() {
  return `<footer class="py-5 bg-secondary bg-opacity-10">
    <div class="container">
      <div class="row g-4">
        <div class="col-lg-4">
          <h5 class="text-gradient fw-bold mb-3">MIN KHANT ZAW</h5>
          <p class="text-muted">Frontend / Web Developer and IT & Cybersecurity Enthusiast focused on building responsive web applications and practical digital solutions.</p>
          <div class="d-flex gap-3 mt-3">
            <a href="https://github.com/Aamon007" target="_blank" rel="noopener" class="text-info fs-5" aria-label="GitHub"><i class="bi bi-github"></i></a>
          </div>
        </div>
        <div class="col-lg-2 col-md-4">
          <h6 class="fw-bold mb-3 text-uppercase text-info footer-section-title">Quick Links</h6>
          <ul class="list-unstyled">
            <li class="mb-2"><a href="index.html" class="text-muted text-decoration-none">Home</a></li>
            <li class="mb-2"><a href="about.html" class="text-muted text-decoration-none">About</a></li>
            <li class="mb-2"><a href="services.html" class="text-muted text-decoration-none">Services</a></li>
            <li class="mb-2"><a href="portfolio.html" class="text-muted text-decoration-none">Portfolio</a></li>
            <li class="mb-2"><a href="contact.html" class="text-muted text-decoration-none">Contact</a></li>
          </ul>
        </div>
        <div class="col-lg-3 col-md-4">
          <h6 class="fw-bold mb-3 text-uppercase text-info footer-section-title">Services</h6>
          <ul class="list-unstyled">
            <li class="mb-2 text-muted">Frontend Web Development</li>
            <li class="mb-2 text-muted">React UI Development</li>
            <li class="mb-2 text-muted">PHP / MySQL Development</li>
            <li class="mb-2 text-muted">API Integration</li>
            <li class="mb-2 text-muted">Responsive Website Development</li>
            <li class="mb-2 text-muted">IT Support & Troubleshooting</li>
          </ul>
        </div>
        <div class="col-lg-3 col-md-4">
          <h6 class="fw-bold mb-3 text-uppercase text-info footer-section-title">Connect</h6>
          <p class="text-muted mb-2"><i class="bi bi-github me-2 text-info"></i><a href="https://github.com/Aamon007" target="_blank" rel="noopener" class="text-muted text-decoration-none">github.com/Aamon007</a></p>
          <p class="text-muted mb-2"><i class="bi bi-envelope me-2 text-info"></i>Email available upon request</p>
        </div>
      </div>
      <hr class="border-secondary my-4">
      <div class="text-center text-muted">
        <small>&copy; 2024 MIN KHANT ZAW. All rights reserved. Built with HTML, CSS & JavaScript.</small>
      </div>
    </div>
  </footer>

  <a href="#top" class="back-to-top" aria-label="Back to top">
    <i class="bi bi-arrow-up"></i>
  </a>`;
}

function initNavbar() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    }
    link.addEventListener('click', () => {
      const navbarCollapse = document.getElementById('navbarNav');
      if (navbarCollapse && navbarCollapse.classList.contains('show')) {
        const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
        if (bsCollapse) bsCollapse.hide();
      }
    });
  });
}

function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

function initCounters() {
  const counters = document.querySelectorAll('.counter');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
        entry.target.classList.add('counted');
        const target = parseInt(entry.target.getAttribute('data-target'));
        const duration = 2000;
        const start = performance.now();

        function update(now) {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          entry.target.textContent = Math.floor(target * eased);
          if (progress < 1) {
            requestAnimationFrame(update);
          } else {
            entry.target.textContent = target + '+';
          }
        }
        requestAnimationFrame(update);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));
}

function initStickyNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

function initMagneticButtons() {
  const buttons = document.querySelectorAll('.btn-magnetic');
  buttons.forEach(button => {
    button.addEventListener('mousemove', (e) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      button.style.setProperty('--magnetic-x', `${x * 0.15}px`);
      button.style.setProperty('--magnetic-y', `${y * 0.15}px`);
    });
    button.addEventListener('mouseleave', () => {
      button.style.setProperty('--magnetic-x', '0px');
      button.style.setProperty('--magnetic-y', '0px');
    });
  });
}

function initTiltEffect() {
  const cards = document.querySelectorAll('.tilt-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 15;
      const rotateY = (centerX - x) / 15;
      card.style.setProperty('--tilt-x', `${rotateX}deg`);
      card.style.setProperty('--tilt-y', `${rotateY}deg`);
      card.style.setProperty('--tilt-shift', '-8px');
    });
    card.addEventListener('mouseleave', () => {
      card.style.setProperty('--tilt-x', '0deg');
      card.style.setProperty('--tilt-y', '0deg');
      card.style.setProperty('--tilt-shift', '0px');
    });
  });
}

function initBackToTop() {
  const backToTopBtn = document.querySelector('.back-to-top');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  }, { passive: true });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

function initHeroTyped() {
  const el = document.getElementById('hero-typed');
  if (!el) return;

  const HERO_TYPED_WORDS = [
    'Frontend Developer',
    'Ethical Hacker',
    'Web Developer',
    'IT & Cybersecurity Enthusiast',
    'Graphic Designer',
    'Problem Solver',
    'Lifelong Learner'
  ];

  const TYPE_SPEED = 90;
  const DELETE_SPEED = 45;
  const PAUSE_AFTER_TYPE = 1500;
  const PAUSE_AFTER_DELETE = 300;

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function tick() {
    const current = HERO_TYPED_WORDS[wordIndex];

    if (!isDeleting) {
      charIndex++;
      el.textContent = current.slice(0, charIndex);
      if (charIndex === current.length) {
        isDeleting = true;
        setTimeout(tick, PAUSE_AFTER_TYPE);
        return;
      }
      setTimeout(tick, TYPE_SPEED);
    } else {
      charIndex--;
      el.textContent = current.slice(0, charIndex);
      if (charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % HERO_TYPED_WORDS.length;
        setTimeout(tick, PAUSE_AFTER_DELETE);
        return;
      }
      setTimeout(tick, DELETE_SPEED);
    }
  }

  tick();
}
