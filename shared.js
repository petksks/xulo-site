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

  // --- Founder photo carousel (prev/next arrows + dots) ---
  const founder = document.getElementById('founderCarousel');
  if (founder) {
    const slides = founder.querySelectorAll('.story-slide');
    const dots = founder.querySelectorAll('.story-dot');
    const prev = founder.querySelector('.story-arrow--prev');
    const next = founder.querySelector('.story-arrow--next');
    let current = 0;
    const go = (i) => {
      current = (i + slides.length) % slides.length;
      slides.forEach((s, idx) => s.classList.toggle('is-active', idx === current));
      dots.forEach((d, idx) => d.classList.toggle('is-active', idx === current));
    };
    prev?.addEventListener('click', () => go(current - 1));
    next?.addEventListener('click', () => go(current + 1));
    dots.forEach(dot => dot.addEventListener('click', () => go(Number(dot.dataset.index))));
  }

  // --- Gallery carousel prev/next ---
  const galleryTrack = document.querySelector('.gallery-track');
  const galleryPrev = document.querySelector('.gallery-nav--prev');
  const galleryNext = document.querySelector('.gallery-nav--next');
  if (galleryTrack && galleryPrev && galleryNext) {
    const scrollByCard = (dir) => {
      const card = galleryTrack.querySelector('.gallery-card');
      const step = card ? card.getBoundingClientRect().width + 20 : 360;
      galleryTrack.scrollBy({ left: dir * step, behavior: 'smooth' });
    };
    galleryPrev.addEventListener('click', () => scrollByCard(-1));
    galleryNext.addEventListener('click', () => scrollByCard(1));
  }

  // --- Footer year ---
  const yearEl = document.querySelector('.footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
