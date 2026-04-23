// Shared site components: nav scroll behavior, mobile menu, scroll reveal, footer year
document.addEventListener('DOMContentLoaded', () => {
  // --- Nav scroll ---
  const nav = document.querySelector('.site-nav');
  if (nav) {
    const update = () => {
      nav.classList.toggle('nav--top', window.scrollY < 60);
      nav.classList.toggle('nav--scrolled', window.scrollY >= 60);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
  }

  // --- Mobile menu ---
  const toggle = document.querySelector('.nav-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileClose = document.querySelector('.mobile-close');
  if (toggle && mobileMenu) {
    toggle.addEventListener('click', () => mobileMenu.classList.add('open'));
    mobileClose?.addEventListener('click', () => mobileMenu.classList.remove('open'));
    mobileMenu.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => mobileMenu.classList.remove('open'))
    );
  }

  // --- Scroll reveal ---
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(el => io.observe(el));
  }

  // --- Simple parallax ---
  const parallaxEls = document.querySelectorAll('[data-parallax]');
  if (parallaxEls.length) {
    const onScroll = () => {
      const sy = window.scrollY;
      parallaxEls.forEach(el => {
        const speed = parseFloat(el.dataset.parallax) || 0.15;
        const rect = el.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const offset = (center - window.innerHeight / 2) * speed;
        el.style.transform = `translateY(${offset}px)`;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // --- Hero carousel (click a thumb to swap hero image) ---
  const carousel = document.getElementById('heroCarousel');
  const thumbs = document.querySelectorAll('.hero-thumb');
  if (carousel && thumbs.length) {
    const slides = carousel.querySelectorAll('.hero-slide');
    thumbs.forEach(thumb => {
      thumb.addEventListener('click', () => {
        const i = Number(thumb.dataset.index);
        slides.forEach((s, idx) => s.classList.toggle('is-active', idx === i));
        thumbs.forEach((t, idx) => t.classList.toggle('is-active', idx === i));
      });
    });
  }

  // --- Footer year ---
  const yearEl = document.querySelector('.footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
