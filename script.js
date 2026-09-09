/* ============================================================
   YOUKEO STUDIOS — Main Script
   ============================================================ */

/* ─── Google Ads Conversion Tracking ────────────────────── */
function trackWhatsApp() {
  gtag('event', 'conversion', {
    'send_to': 'AW-17982763316/enjPCImSjJgcELTi7P5C'
  });
}

function trackPhone() {
  gtag('event', 'conversion', {
    'send_to': 'AW-17982763316/VHX9CIySjJgcELTi7P5C'
  });
}

function trackEmail() {
  gtag('event', 'conversion', {
    'send_to': 'AW-17982763316/fYB9CI-SjJgcELTi7P5C'
  });
}
/* ────────────────────────────────────────────────────────── */

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

  /* Show the floating contact action once the hero CTA scrolls past the header. */
  const whatsappButton = document.getElementById('whatsapp-btn');
  const heroButton = document.querySelector('#hero .hero-cta-group .btn-primary');
  if (whatsappButton && heroButton) {
    whatsappButton.classList.add('whatsapp-delayed');
    whatsappButton.hidden = false;
    const header = document.querySelector('.site-header');
    let whatsappFrame = 0;
    const updateWhatsApp = () => {
      const visibleTop = header ? Math.max(0, header.getBoundingClientRect().bottom) : 0;
      const visible = heroButton.getBoundingClientRect().bottom <= visibleTop;
      whatsappButton.classList.toggle('is-visible', visible);
      whatsappButton.inert = !visible;
    };
    const scheduleWhatsAppUpdate = () => {
      if (whatsappFrame) return;
      whatsappFrame = requestAnimationFrame(() => {
        updateWhatsApp();
        whatsappFrame = 0;
      });
    };
    updateWhatsApp();
    window.addEventListener('scroll', scheduleWhatsAppUpdate, { passive: true });
    window.addEventListener('resize', scheduleWhatsAppUpdate);
    window.addEventListener('pageshow', scheduleWhatsAppUpdate);
    window.addEventListener('load', scheduleWhatsAppUpdate);
    if (document.fonts) document.fonts.ready.then(scheduleWhatsAppUpdate);
  }

  /* ─── NAV: solid background after leaving the top ───────── */
  const siteHeader = document.querySelector('.site-header');
  if (siteHeader) {
    let headerFrame = 0;
    const updateHeader = () => {
      if (headerFrame) return;
      headerFrame = requestAnimationFrame(() => {
        const progress = Math.min(1, window.scrollY / 120);
        siteHeader.style.setProperty('--header-scroll-progress', progress.toFixed(3));
        siteHeader.classList.toggle('is-scrolled', progress > 0.08);
        headerFrame = 0;
      });
    };
    updateHeader();
    window.addEventListener('scroll', updateHeader, { passive: true });
  }

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
      price: '<div class="svc-price-row-single"><div class="svc-price-main">₹1,200<span class="svc-price-unit">/hour</span></div><div class="svc-price-badge">Soundproofed Booth · Engineer Included</div></div>',
      cta: 'Check Availability',
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
      price: '<div class="svc-price-row-single"><div class="svc-price-main">₹12,000<span class="svc-price-unit">/song</span></div><div class="svc-price-badge">Custom Beat · Arrangement · Sound Design</div></div>',
      cta: 'Send an Idea',
    },
    mixing: {
      label: 'Mixing & Mastering',
      title: 'Stereo & Stem Mixing + Streaming Master',
      desc: 'Give your vocals and instruments clarity, power, punch, and spatial depth. Whether recorded at Youkeo or elsewhere, we balance, tune, and master your music so it competes seamlessly on Spotify, Apple Music, and YouTube across all speaker systems.',
      features: [
        'Vocal tuning, time alignment & de-essing',
        'Dynamic balancing, EQ & stereo enhancement',
        'Analog-style warmth & acoustic depth',
        'Streaming-ready master for Spotify & Apple Music',
        '2 revision rounds included',
      ],
      price: '<div class="svc-price-grid-tiers"><div class="svc-tier-col"><div class="svc-tier-name">Master &amp; Polish</div><div class="svc-tier-price">₹2,000</div><div class="svc-tier-sub">Mastering only</div></div><div class="svc-tier-col featured"><div class="svc-tier-name">Stereo Mix &amp; Master</div><div class="svc-tier-price">₹5,000</div><div class="svc-tier-sub">Vocals + beat bounce</div></div><div class="svc-tier-col"><div class="svc-tier-name">Stem Mix &amp; Master</div><div class="svc-tier-price">₹12,000</div><div class="svc-tier-sub">Full multitrack stems</div></div></div>',
      cta: 'Send Stems / Audio',
    },
    promotion: {
      label: 'Release & Promotion',
      title: 'Get Your Music Heard & Playlisted',
      desc: 'Recording a great track is only half the battle. We help you distribute to all major platforms — Spotify, Apple Music, JioSaavn and more — and run paid promotion that brings real listeners, not bot streams. You keep 100% of your royalties.',
      features: [
        '100% royalties retained by you',
        'Distribution to 150+ streaming platforms',
        'Spotify & Apple Music playlist pitching',
        'Paid promotion that reaches real listeners, not bots',
        'Weekly performance reports',
      ],
      price: '<div class="svc-price-row-single"><div class="svc-price-main">₹26,000<span class="svc-price-unit">/package</span></div><div class="svc-price-badge">Consultation Included in Production to Final</div></div>',
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
      svcCta.onclick         = () => gtag('event', 'cta_click', { button_text: d.cta, service: key, location: 'service_overlay', page: 'home' });
      svcBackdrop.classList.add('open');
      svcBackdrop.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      gtag('event', 'service_overlay_open', { service: key, page: 'home' });
    }

    function closeServiceOverlay() {
      svcBackdrop.classList.remove('open');
      svcBackdrop.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    document.querySelectorAll('[data-service]').forEach(card => {
      card.style.cursor = 'pointer';
      card.addEventListener('click', () => {
        gtag('event', 'service_card_click', { service: card.dataset.service, page: 'home' });
        openServiceOverlay(card.dataset.service);
      });
    });

    svcClose.addEventListener('click', closeServiceOverlay);
    svcCta.addEventListener('click', closeServiceOverlay);
    svcBackdrop.addEventListener('click', e => { if (e.target === svcBackdrop) closeServiceOverlay(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeServiceOverlay(); });
  }

  /* ─── Services: Design Switcher (Preview Tool) ───────────── */
  const switchBtns = document.querySelectorAll('.btn-design-switch');
  const serviceLayouts = document.querySelectorAll('.services-layout');

  switchBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.dataset.target;
      switchBtns.forEach(b => b.classList.remove('active'));
      serviceLayouts.forEach(layout => layout.classList.remove('active'));

      btn.classList.add('active');
      const targetEl = document.getElementById(targetId);
      if (targetEl) targetEl.classList.add('active');
    });
  });

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
          otherQ.setAttribute('aria-expanded', 'false');
          otherWrap.style.maxHeight = '0';
          if (otherIcon) otherIcon.textContent = '+';
        }
      });

      // Toggle current
      if (isOpen) {
        question.classList.remove('open');
        question.setAttribute('aria-expanded', 'false');
        answerWrap.style.maxHeight = '0';
        if (icon) icon.textContent = '+';
      } else {
        question.classList.add('open');
        question.setAttribute('aria-expanded', 'true');
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
      card.addEventListener('keydown', event => {
        if (event.key !== 'Enter' && event.key !== ' ') return;
        event.preventDefault();
        if (!slider || !slider._dragged) openLightbox(card.dataset.video);
      });
    });
    document.querySelectorAll('.track-row[data-video], .track-listen[data-video]').forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        const videoUrl = el.dataset.video || el.closest('[data-video]')?.dataset.video;
        if (videoUrl) openLightbox(videoUrl);
      });
    });
    vlClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
  }
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox && closeLightbox(); });

  /* ─── Testimonials: autoplay videos on section view ──────── */
  const testimonialsSection = document.getElementById('testimonials');

  if (testimonialsSection) {
    const videoObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.t-video-cover').forEach(video => {
            video.play().catch(() => {});
          });
        }
      });
    }, { threshold: 0.3 });

    videoObserver.observe(testimonialsSection);
  }

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
