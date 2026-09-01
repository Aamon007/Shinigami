/**
 * animations.js
 * Advanced animation system for the portfolio
 */

document.addEventListener('DOMContentLoaded', () => {
  initParallaxGlow();
  initPageTransitions();
  initLazyAnimations();
});

/**
 * Parallax Glow Effect
 * Creates subtle parallax movement on background glows
 */
function initParallaxGlow() {
  const glows = document.querySelectorAll('.bg-glow');

  if (glows.length === 0) return;

  window.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = e.target.window || window;

    glows.forEach(glow => {
      const rect = glow.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (clientX - centerX) / innerWidth;
      const deltaY = (clientY - centerY) / innerHeight;

      const moveX = deltaX * 20;
      const moveY = deltaY * 20;

      glow.style.setProperty('--glow-x', `${moveX}px`);
      glow.style.setProperty('--glow-y', `${moveY}px`);
    });
  }, { passive: true });
}

/**
 * Smooth page transitions
 * Adds fade transitions between pages
 */
function initPageTransitions() {
  document.querySelectorAll('a[href$=".html"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && !href.startsWith('#') && !href.startsWith('http')) {
        e.preventDefault();
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.3s ease';

        setTimeout(() => {
          window.location.href = href;
        }, 300);
      }
    });
  });
}

/**
 * Lazy load animations
 * Only initializes animations when elements are visible
 */
function initLazyAnimations() {
  const lazyElements = document.querySelectorAll('[data-animate]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const animation = entry.target.getAttribute('data-animate');
        entry.target.classList.add(`animate-${animation}`);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  lazyElements.forEach(el => observer.observe(el));
}
