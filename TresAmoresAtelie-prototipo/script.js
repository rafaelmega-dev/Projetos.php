/* =============================================
   TRES AMORES ATELIÊ — script.js
   Interactive functionality — FIXED v2
   ============================================= */

(function () {
  'use strict';

  const WA_NUMBER = '5500000000000';

const galleryData = [
    { emoji: '🎂', title: 'Bolo de Brigadeiro', desc: 'Nossos bolos artesanais de brigadeiro.', bg: 'linear-gradient(135deg,#fce4ec,#f48fb1)' },
    { emoji: '🍫', title: 'Bolo de Prestígio', desc: 'Bolo de Prestígio com coco e chocolate.', bg: 'linear-gradient(135deg,#fff3e0,#ffcc80)' },
    { emoji: '🥥', title: 'Bolo de Coco', desc: 'Bolo de coco cremoso.', bg: 'linear-gradient(135deg,#e8eaf6,#9fa8da)' },
    { emoji: '🍋', title: 'Bolo de Limão', desc: 'Bolo leve de limão siciliano.', bg: 'linear-gradient(135deg,#e0f2f1,#80cbc4)' },
    { emoji: '🍫', title: 'Bolo de Cenoura', desc: 'Cenoura com cobertura de chocolate.', bg: 'linear-gradient(135deg,#fce4ec,#f8bbd0)' },
    { emoji: '🍰', title: 'Bolo de Chocolate', desc: 'Chocolate úmido com brigadeiro.', bg: 'linear-gradient(135deg,#f3e5f5,#e1bee7)' },
  ];

  const header          = document.getElementById('header');
  const navBurger       = document.getElementById('navBurger');
  const navList         = document.getElementById('navList');
  const menuTabs        = document.querySelectorAll('.menu__tab');
  const menuGrids       = document.querySelectorAll('.menu__grid');
  const galleryItems    = document.querySelectorAll('.gallery__item');
  const modal           = document.getElementById('galleryModal');
  const modalBackdrop   = document.getElementById('modalBackdrop');
  const modalContent    = document.getElementById('modalContent');
  const modalClose      = document.getElementById('modalClose');
  const modalPrev       = document.getElementById('modalPrev');
  const modalNext       = document.getElementById('modalNext');
  const petalsContainer = document.getElementById('petals');

  let currentGalleryIndex = 0;

  /* --- Activate CSS reveal system --- */
  document.body.classList.add('js-loaded');

  /* --- Scroll Reveal --- */
  const revealEls = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

  function revealOnScroll() {
    const vp = window.innerHeight * 0.93;
    revealEls.forEach(el => {
      if (!el.classList.contains('revealed') && el.getBoundingClientRect().top < vp) {
        el.classList.add('revealed');
      }
    });
  }

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('revealed'); io.unobserve(e.target); } });
    }, { threshold: 0.06, rootMargin: '0px 0px -10px 0px' });
    revealEls.forEach(el => io.observe(el));
  }

  revealOnScroll();
  setTimeout(revealOnScroll, 120);
  setTimeout(revealOnScroll, 600);
  window.addEventListener('scroll', revealOnScroll, { passive: true });

  /* --- Header style on scroll --- */
  function onScroll() {
    header && (window.scrollY > 60 ? header.classList.add('scrolled') : header.classList.remove('scrolled'));
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* --- Smooth scroll --- */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - ((header ? header.offsetHeight : 70) + 16);
      window.scrollTo({ top, behavior: 'smooth' });
      navList && navList.classList.remove('open');
      navBurger && navBurger.classList.remove('open');
    });
  });

  /* --- Mobile hamburger --- */
  if (navBurger) {
    navBurger.addEventListener('click', () => {
      navBurger.classList.toggle('open');
      navList.classList.toggle('open');
    });
    document.addEventListener('click', e => {
      if (header && !header.contains(e.target)) {
        navBurger.classList.remove('open');
        navList.classList.remove('open');
      }
    });
  }

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      navBurger && navBurger.classList.remove('open');
      navList   && navList.classList.remove('open');
      closeModal();
    }
  });

  /* --- Menu tabs --- */
  menuTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      menuTabs.forEach(t => t.classList.remove('active'));
      menuGrids.forEach(g => {
        g.classList.add('hidden');
        g.querySelectorAll('.reveal-up').forEach(el => el.classList.remove('revealed'));
      });
      tab.classList.add('active');
      const grid = document.getElementById('cat-' + tab.dataset.cat);
      if (grid) {
        grid.classList.remove('hidden');
        setTimeout(() => {
          grid.querySelectorAll('.reveal-up').forEach((el, i) => setTimeout(() => el.classList.add('revealed'), i * 100));
        }, 30);
      }
    });
  });

  window.addEventListener('load', () => {
    const firstGrid = document.getElementById('cat-cakes');
    if (firstGrid) {
      firstGrid.querySelectorAll('.reveal-up').forEach((el, i) => setTimeout(() => el.classList.add('revealed'), 400 + i * 120));
    }
  });

  /* --- WhatsApp order buttons --- */
  document.addEventListener('click', e => {
    const btn = e.target.closest('.btn--whatsapp');
    if (btn && btn.dataset.product) {
      const msg = encodeURIComponent('Olá! Gostaria de encomendar ' + btn.dataset.product + ' do site.');
      window.open('https://wa.me/' + WA_NUMBER + '?text=' + msg, '_blank');
    }
  });

  /* --- Gallery modal --- */
  function openModal(idx) {
    currentGalleryIndex = idx;
    renderModal();
    modal && modal.classList.add('open');
    modalBackdrop && modalBackdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal && modal.classList.remove('open');
    modalBackdrop && modalBackdrop.classList.remove('open');
    document.body.style.overflow = '';
  }

  function renderModal() {
    const item = galleryData[currentGalleryIndex];
    if (!item || !modalContent) return;
    modalContent.innerHTML =
      '<div class="modal__slide" style="background:' + item.bg + '">' +
        '<span>' + item.emoji + '</span>' +
        '<h3>' + item.title + '</h3>' +
        '<p>' + item.desc + '</p>' +
      '</div>';
  }

  galleryItems.forEach(item => item.addEventListener('click', () => openModal(parseInt(item.dataset.index, 10))));
  if (modalClose)    modalClose.addEventListener('click', closeModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);
  if (modalPrev)     modalPrev.addEventListener('click', () => { currentGalleryIndex = (currentGalleryIndex - 1 + galleryData.length) % galleryData.length; renderModal(); });
  if (modalNext)     modalNext.addEventListener('click', () => { currentGalleryIndex = (currentGalleryIndex + 1) % galleryData.length; renderModal(); });

  document.addEventListener('keydown', e => {
    if (!modal || !modal.classList.contains('open')) return;
    if (e.key === 'ArrowLeft')  { currentGalleryIndex = (currentGalleryIndex - 1 + galleryData.length) % galleryData.length; renderModal(); }
    if (e.key === 'ArrowRight') { currentGalleryIndex = (currentGalleryIndex + 1) % galleryData.length; renderModal(); }
  });

  let touchStartX = 0;
  if (modalContent) {
    modalContent.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
    modalContent.addEventListener('touchend', e => {
      const diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 40) {
        currentGalleryIndex = diff > 0 ? (currentGalleryIndex + 1) % galleryData.length : (currentGalleryIndex - 1 + galleryData.length) % galleryData.length;
        renderModal();
      }
    }, { passive: true });
  }

  /* --- Floating petals --- */
  const PETALS = ['🌸', '🌺', '✨', '🌷', '💮', '🌹'];
  let petalCount = 0;
  let petalInterval = null;

  function spawnPetal() {
    if (!petalsContainer || petalCount >= 12) return;
    const p = document.createElement('div');
    p.className = 'petal';
    p.textContent = PETALS[Math.floor(Math.random() * PETALS.length)];
    const dur = 6 + Math.random() * 8;
    const del = Math.random() * 3;
    p.style.cssText = 'left:' + (Math.random()*100) + '%;font-size:' + (0.8+Math.random()*0.8) + 'rem;animation-duration:' + dur + 's;animation-delay:' + del + 's;';
    petalsContainer.appendChild(p);
    petalCount++;
    setTimeout(() => { p.parentNode && p.parentNode.removeChild(p); petalCount--; }, (dur + del) * 1000 + 500);
  }

  petalInterval = setInterval(spawnPetal, 1200);
  for (let i = 0; i < 5; i++) setTimeout(spawnPetal, i * 500);

  const heroSec = document.getElementById('home');
  if (heroSec && 'IntersectionObserver' in window) {
    new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) { if (!petalInterval) petalInterval = setInterval(spawnPetal, 1200); }
      else { clearInterval(petalInterval); petalInterval = null; }
    }, { threshold: 0.1 }).observe(heroSec);
  }

  /* --- Active nav link --- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__link');
  function setActiveLink() {
    let current = '';
    sections.forEach(s => { if (window.scrollY >= s.offsetTop - (header ? header.offsetHeight : 70) - 60) current = s.id; });
    navLinks.forEach(l => {
      l.style.color = l.style.fontWeight = '';
      if (l.getAttribute('href') === '#' + current) { l.style.color = 'var(--color-rose-deep)'; l.style.fontWeight = '500'; }
    });
  }
  window.addEventListener('scroll', setActiveLink, { passive: true });
  setActiveLink();

  /* --- About pillar hover --- */
  document.querySelectorAll('.about__pillar').forEach(p => {
    p.addEventListener('mouseenter', () => { p.style.background = 'var(--color-rose)'; });
    p.addEventListener('mouseleave', () => { p.style.background = 'var(--color-blush)'; });
  });

})();