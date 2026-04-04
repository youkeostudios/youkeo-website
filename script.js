/* ============================================================
   YOUKEO STUDIOS — Main Script
   ============================================================ */

/* ─── Hero video: force autoplay on mobile ───────────────── */
(function() {
  const v = document.querySelector('.hero-video');
  if (!v) return;
  v.muted = true;
  const tryPlay = () => v.play().catch(() => {});
  tryPlay();
  document.addEventListener('touchstart', tryPlay, { once: true });
  document.addEventListener('touchend',   tryPlay, { once: true });
})();

document.addEventListener('DOMContentLoaded', () => {

  /* ─── NAV: scroll — elevate shadow on scroll ─────────────── */
  const nav = document.getElementById('nav');

  function handleNavScroll() {
    if (window.scrollY > 40) {
      nav.style.boxShadow = '0 8px 48px rgba(0,0,0,0.12)';
    } else {
      nav.style.boxShadow = '0 4px 32px rgba(0,0,0,0.08)';
    }
  }
  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();


  /* ─── NAV: mobile hamburger ──────────────────────────────── */
  const hamburger = document.querySelector('.nav-hamburger');
  const mobileMenu = document.querySelector('.nav-mobile-menu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', isOpen);
      // Animate bars
      const bars = hamburger.querySelectorAll('span');
      if (isOpen) {
        bars[0].style.transform = 'translateY(7px) rotate(45deg)';
        bars[1].style.opacity = '0';
        bars[2].style.transform = 'translateY(-7px) rotate(-45deg)';
      } else {
        bars[0].style.transform = '';
        bars[1].style.opacity = '';
        bars[2].style.transform = '';
      }
    });

    // Close on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        const bars = hamburger.querySelectorAll('span');
        bars[0].style.transform = '';
        bars[1].style.opacity = '';
        bars[2].style.transform = '';
      });
    });
  }


  /* ─── NAV: active link on scroll ────────────────────────── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a, .nav-mobile-menu a');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          const href = link.getAttribute('href');
          if (href === '#' + entry.target.id) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(s => sectionObserver.observe(s));


  /* ─── Service overlay ───────────────────────────────────── */
  const serviceData = {
    recording: {
      label: 'Recording',
      title: 'Vocal & Instrument Recording',
      desc: 'Step into a professionally treated acoustic space built for clarity. No room reflections, no noise — just your performance captured exactly as it should sound. Whether you\'re recording vocals, guitar, or any instrument, our studio gives you the environment to perform at your best.',
      features: [
        'Acoustically treated live room & vocal booth',
        'Industry-standard microphones & preamps',
        'Real-time monitoring with zero-latency headphones',
        'Experienced engineer guiding every take',
        'Recorded, edited & session files delivered',
      ],
      price: 'Starting from <strong>₹800/hr</strong> · ₹1,200/hr for repeat sessions',
      cta: 'Book a Session',
    },
    production: {
      label: 'Music Production',
      title: 'Beat, Arrangement & Full Production',
      desc: 'From a melody hummed into your phone to a fully produced, release-ready track. We handle beat-making, arrangement, instrumentation and production — so your song has the depth, energy and emotion it deserves.',
      features: [
        'Custom beat creation from scratch',
        'Full arrangement & instrumentation',
        'Vocal production & harmonies',
        'Genre-specific sound design',
        'Unlimited revisions until you\'re happy',
      ],
      price: 'Starting from <strong>₹8,000</strong> per track',
      cta: 'Send an Idea',
    },
    promotion: {
      label: 'Release & Promotion',
      title: 'Get Your Music Heard & Playlisted',
      desc: 'Recording a great track is only half the battle. We help you distribute to all major platforms — Spotify, Apple Music, JioSaavn and more — and run targeted Meta Ads to reach real listeners who actually care about your music.',
      features: [
        'Distribution to 150+ streaming platforms',
        'Spotify & Apple Music playlist pitching',
        'Meta Ads campaign setup & management',
        'Weekly performance reports',
        'Artist profile optimisation',
      ],
      price: 'Starting from <strong>₹2,000/mo</strong>',
      cta: 'Launch Your Release',
    },
  };

  const svcBackdrop = document.getElementById('service-overlay');

  if (svcBackdrop) {
    const svcLabel    = svcBackdrop.querySelector('.svc-label');
    const svcTitle    = svcBackdrop.querySelector('.svc-title');
    const svcDesc     = svcBackdrop.querySelector('.svc-desc');
    const svcFeatures = svcBackdrop.querySelector('.svc-features');
    const svcPrice    = svcBackdrop.querySelector('.svc-price');
    const svcCta      = svcBackdrop.querySelector('.svc-cta');
    const svcClose    = svcBackdrop.querySelector('.svc-close');

    function openServiceOverlay(key) {
      const d = serviceData[key];
      if (!d) return;
      svcLabel.textContent   = d.label;
      svcTitle.textContent   = d.title;
      svcDesc.textContent    = d.desc;
      svcFeatures.innerHTML  = d.features.map(f => `<li>${f}</li>`).join('');
      svcPrice.innerHTML     = d.price;
      svcCta.textContent     = d.cta;
      svcBackdrop.classList.add('open');
      svcBackdrop.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }

    function closeServiceOverlay() {
      svcBackdrop.classList.remove('open');
      svcBackdrop.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    document.querySelectorAll('.service-card[data-service]').forEach(card => {
      card.style.cursor = 'pointer';
      card.addEventListener('click', () => openServiceOverlay(card.dataset.service));
    });

    svcClose.addEventListener('click', closeServiceOverlay);
    svcBackdrop.addEventListener('click', e => { if (e.target === svcBackdrop) closeServiceOverlay(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeServiceOverlay(); });
  }

  /* ─── FAQ: accordion ─────────────────────────────────────── */
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answerWrap = item.querySelector('.faq-answer-wrap');
    const icon = item.querySelector('.faq-icon');

    question.addEventListener('click', () => {
      const isOpen = question.classList.contains('open');

      // Close all
      faqItems.forEach(other => {
        const otherQ = other.querySelector('.faq-question');
        const otherWrap = other.querySelector('.faq-answer-wrap');
        const otherIcon = other.querySelector('.faq-icon');
        if (otherQ !== question) {
          otherQ.classList.remove('open');
          otherWrap.style.maxHeight = '0';
          if (otherIcon) otherIcon.textContent = '+';
        }
      });

      // Toggle current
      if (isOpen) {
        question.classList.remove('open');
        answerWrap.style.maxHeight = '0';
        if (icon) icon.textContent = '+';
      } else {
        question.classList.add('open');
        answerWrap.style.maxHeight = answerWrap.scrollHeight + 'px';
        if (icon) icon.textContent = '−';
      }
    });
  });


  /* ─── Video lightbox ────────────────────────────────────── */
  const lightbox = document.getElementById('video-lightbox');
  const vlIframe = lightbox && document.getElementById('vl-iframe');
  const vlVideo  = lightbox && document.getElementById('vl-video');
  const vlClose  = lightbox && document.querySelector('.vl-close');

  function openLightbox(url) {
    const isYouTube = /youtube\.com|youtu\.be/.test(url);
    const isVimeo   = /vimeo\.com/.test(url);

    vlIframe.classList.remove('active');
    vlVideo.classList.remove('active');

    if (isYouTube) {
      const id = url.match(/(?:v=|youtu\.be\/)([^&?/]+)/)?.[1];
      vlIframe.src = `https://www.youtube.com/embed/${id}?autoplay=1`;
      vlIframe.classList.add('active');
    } else if (isVimeo) {
      const id = url.match(/vimeo\.com\/(\d+)/)?.[1];
      vlIframe.src = `https://player.vimeo.com/video/${id}?autoplay=1`;
      vlIframe.classList.add('active');
    } else {
      vlVideo.src = url;
      vlVideo.classList.add('active');
      vlVideo.play();
    }

    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    vlIframe.src = '';
    vlVideo.pause();
    vlVideo.src = '';
    document.body.style.overflow = '';
  }

  /* Only open lightbox if user didn't drag */
  if (lightbox) {
    document.querySelectorAll('.t-video-card').forEach(card => {
      card.addEventListener('click', () => {
        if (!slider || !slider._dragged) openLightbox(card.dataset.video);
      });
    });
    vlClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
  }
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox && closeLightbox(); });

  /* ─── Drag-to-scroll testimonials ───────────────────────── */
  const slider = document.querySelector('.t-masonry');
  let isDown = false, startX, scrollLeft;

  if (slider) {
    slider.addEventListener('mousedown', e => {
      isDown = true;
      slider._dragged = false;
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
      slider.classList.add('is-dragging');
    });
    slider.addEventListener('mouseleave', () => { isDown = false; slider.classList.remove('is-dragging'); });
    slider.addEventListener('mouseup', () => { isDown = false; slider.classList.remove('is-dragging'); });
    slider.addEventListener('mousemove', e => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = x - startX;
      if (Math.abs(walk) > 4) slider._dragged = true;
      slider.scrollLeft = scrollLeft - walk;
    });
  }


  /* ─── Card overlay (Google + WhatsApp) ─────────────────── */
  const cardOverlay = document.getElementById('card-overlay');
  const coInner = cardOverlay && cardOverlay.querySelector('.co-inner');
  const coClose = cardOverlay && cardOverlay.querySelector('.co-close');

  function openCardOverlay(card) {
    coInner.innerHTML = card.outerHTML;
    const text = coInner.querySelector('.t-google-text');
    if (text) { text.style.webkitLineClamp = 'unset'; text.style.display = 'block'; text.style.overflow = 'visible'; }
    const img = coInner.querySelector('.t-wa-img');
    if (img) { img.style.height = 'auto'; img.style.objectFit = 'initial'; }
    cardOverlay.classList.add('open');
    cardOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeCardOverlay() {
    cardOverlay.classList.remove('open');
    cardOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (cardOverlay) {
    document.querySelectorAll('.t-google-card, .t-wa-card').forEach(card => {
      card.addEventListener('click', () => { if (!slider || !slider._dragged) openCardOverlay(card); });
    });
    coClose.addEventListener('click', closeCardOverlay);
    cardOverlay.addEventListener('click', e => { if (e.target === cardOverlay) closeCardOverlay(); });
  }
  document.addEventListener('keydown', e => { if (e.key === 'Escape') { if (lightbox) closeLightbox(); if (cardOverlay) closeCardOverlay(); } });

  /* ─── Smooth scroll for anchor links ────────────────────── */
  /* ─── PRICING PAGE: FAQ accordion ───────────────────────── */
  document.querySelectorAll('.p-faq-item').forEach(item => {
    item.querySelector('.p-faq-q').addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.p-faq-item').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const navH = parseInt(getComputedStyle(document.documentElement)
          .getPropertyValue('--nav-h')) || 72;
        const top = target.getBoundingClientRect().top + window.scrollY - navH;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

});
