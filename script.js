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
  const shouldPauseForUser = v.hasAttribute('data-respect-reduced-motion') && (
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
    navigator.connection?.saveData
  );
  if (shouldPauseForUser) {
    v.pause();
    return;
  }
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
    const menuLinks = Array.from(mobileMenu.querySelectorAll('a'));
    const setMenuOpen = (open, returnFocus = false) => {
      mobileMenu.classList.toggle('open', open);
      mobileMenu.toggleAttribute('inert', !open);
      mobileMenu.setAttribute('aria-hidden', String(!open));
      hamburger.setAttribute('aria-expanded', String(open));
      hamburger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      document.body.classList.toggle('nav-menu-open', open);

      const bars = hamburger.querySelectorAll('span');
      bars[0].style.transform = open ? 'translateY(7px) rotate(45deg)' : '';
      bars[1].style.opacity = open ? '0' : '';
      bars[2].style.transform = open ? 'translateY(-7px) rotate(-45deg)' : '';

      if (open) menuLinks[0]?.focus();
      if (!open && returnFocus) hamburger.focus();
    };

    hamburger.addEventListener('click', () => {
      setMenuOpen(!mobileMenu.classList.contains('open'));
    });

    menuLinks.forEach(link => link.addEventListener('click', () => setMenuOpen(false)));

    document.addEventListener('keydown', event => {
      if (!mobileMenu.classList.contains('open')) return;
      if (event.key === 'Escape') {
        event.preventDefault();
        setMenuOpen(false, true);
        return;
      }
      if (event.key !== 'Tab' || !menuLinks.length) return;
      const first = menuLinks[0];
      const last = menuLinks[menuLinks.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
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
      desc: 'Record vocals or instruments in a professionally treated space built for clarity, comfort and focused performances. An experienced engineer stays with you through setup, takes and file delivery.',
      features: [
        'Acoustically treated live room & vocal booth',
        'Industry-standard microphones & preamps',
        'Real-time monitoring with zero-latency headphones',
        'Experienced engineer guiding every take',
        'Recorded, edited & session files delivered',
      ],
      price: '<div class="svc-price-row-single"><div class="svc-price-main">₹1,200<span class="svc-price-unit">/hour</span></div><div class="svc-price-badge">Soundproofed Booth · Engineer Included</div></div>',
      cta: 'Check Availability',
      href: 'https://wa.me/919619192992?text=Hi%2C%20I%27d%20like%20to%20check%20availability%20for%20a%20recording%20session%20at%20Youkeo%20Studios.%0APreferred%20date%2Ftime%3A%20',
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
        'Revision scope confirmed before work begins',
      ],
      price: '<div class="svc-price-row-single"><div class="svc-price-main">₹12,000<span class="svc-price-unit">/song</span></div><div class="svc-price-badge">Custom Beat · Arrangement · Sound Design</div></div>',
      cta: 'Send an Idea',
      href: 'https://wa.me/919619192992?text=Hi%2C%20I%27d%20like%20to%20discuss%20music%20production%20at%20Youkeo%20Studios.%0ASong%20idea%20%2F%20genre%3A%20',
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
      href: 'https://wa.me/919619192992?text=Hi%2C%20I%27d%20like%20to%20discuss%20mixing%20and%20mastering%20at%20Youkeo%20Studios.%0AWhat%20I%20have%3A%20',
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
    let svcTrigger    = null;
    let svcInerted    = [];

    function openServiceOverlay(key, trigger) {
      const d = serviceData[key];
      if (!d) return;
      svcTrigger = trigger || document.activeElement;
      svcLabel.textContent   = d.label;
      svcTitle.textContent   = d.title;
      svcDesc.textContent    = d.desc;
      svcFeatures.innerHTML  = d.features.map(f => `<li>${f}</li>`).join('');
      svcPrice.innerHTML     = d.price;
      svcCta.textContent     = d.cta;
      svcCta.href            = d.href;
      svcCta.target          = '_blank';
      svcCta.rel             = 'noopener';
      svcCta.onclick         = () => {
        gtag('event', 'contact_click', { method: 'whatsapp', service: key, location: 'service_overlay', page: 'home' });
        trackWhatsApp();
      };
      svcInerted = [...document.body.children].filter(el => el !== svcBackdrop && el.tagName !== 'SCRIPT' && !el.inert);
      svcInerted.forEach(el => { el.inert = true; });
      svcBackdrop.inert = false;
      svcBackdrop.classList.add('open');
      svcBackdrop.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      requestAnimationFrame(() => svcClose.focus());
      gtag('event', 'service_overlay_open', { service: key, page: 'home' });
    }

    function closeServiceOverlay() {
      if (!svcBackdrop.classList.contains('open')) return;
      const returnTarget = svcTrigger && document.contains(svcTrigger) ? svcTrigger : null;
      svcBackdrop.classList.remove('open');
      svcBackdrop.setAttribute('aria-hidden', 'true');
      svcBackdrop.inert = true;
      svcInerted.forEach(el => { el.inert = false; });
      svcInerted = [];
      document.body.style.overflow = '';
      if (returnTarget) returnTarget.focus();
      svcTrigger = null;
    }

    document.querySelectorAll('.studio-service__trigger[data-service]').forEach(trigger => {
      trigger.addEventListener('click', () => {
        gtag('event', 'service_card_click', { service: trigger.dataset.service, page: 'home' });
        openServiceOverlay(trigger.dataset.service, trigger);
      });
    });

    svcClose.addEventListener('click', closeServiceOverlay);
    svcCta.addEventListener('click', closeServiceOverlay);
    svcBackdrop.addEventListener('click', e => { if (e.target === svcBackdrop) closeServiceOverlay(); });
    svcBackdrop.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        e.preventDefault();
        closeServiceOverlay();
        return;
      }
      if (e.key !== 'Tab') return;
      const focusable = [...svcBackdrop.querySelectorAll('button:not([disabled]), a[href]')];
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    });
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
  let lightboxTrigger = null;

  function openLightbox(url, trigger) {
    const isYouTube = /youtube\.com|youtu\.be/.test(url);
    const isVimeo   = /vimeo\.com/.test(url);
    lightboxTrigger = trigger || document.activeElement;

    vlIframe.classList.remove('active');
    vlVideo.classList.remove('active');

    if (isYouTube) {
      const id = url.match(/(?:v=|youtu\.be\/)([^&?/]+)/)?.[1];
      vlIframe.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1`;
      vlIframe.classList.add('active');
    } else if (isVimeo) {
      const id = url.match(/vimeo\.com\/(\d+)/)?.[1];
      vlIframe.src = `https://player.vimeo.com/video/${id}?autoplay=1`;
      vlIframe.classList.add('active');
    } else {
      vlVideo.src = url;
      vlVideo.classList.add('active');
      vlVideo.play().catch(() => {});
    }

    lightbox.inert = false;
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => vlClose.focus());
  }

  function closeLightbox() {
    if (!lightbox || !lightbox.classList.contains('open')) return;
    const returnTarget = lightboxTrigger && document.contains(lightboxTrigger) ? lightboxTrigger : null;
    lightbox.classList.remove('open');
    if (returnTarget) returnTarget.focus();
    lightbox.setAttribute('aria-hidden', 'true');
    lightbox.inert = true;
    vlIframe.src = '';
    vlVideo.pause();
    vlVideo.src = '';
    document.body.style.overflow = '';
    lightboxTrigger = null;
  }

  /* Only open lightbox if user didn't drag */
  if (lightbox) {
    document.querySelectorAll('.t-video-card').forEach(card => {
      card.addEventListener('click', () => {
        if (!slider || !slider._dragged) openLightbox(card.dataset.video, card);
      });
      card.addEventListener('keydown', event => {
        if (event.key !== 'Enter' && event.key !== ' ') return;
        event.preventDefault();
        if (!slider || !slider._dragged) openLightbox(card.dataset.video, card);
      });
    });
    document.querySelectorAll('.track-listen[data-video]').forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (el.dataset.video) openLightbox(el.dataset.video, el);
      });
    });
    vlClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
    lightbox.addEventListener('keydown', e => {
      if (e.key !== 'Tab') return;
      const focusable = [...lightbox.querySelectorAll('button:not([disabled]), iframe, video[controls]')]
        .filter(el => getComputedStyle(el).display !== 'none');
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    });
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


  document.querySelectorAll('.rec-review-toggle').forEach(button => {
    button.addEventListener('click', () => {
      const expanded = button.getAttribute('aria-expanded') !== 'true';
      const review = document.getElementById(button.getAttribute('aria-controls'));
      const excerpt = button.parentElement.querySelector('.rec-review-excerpt');
      review.hidden = !expanded;
      excerpt.hidden = expanded;
      button.setAttribute('aria-expanded', String(expanded));
      button.textContent = expanded ? 'Show less' : 'Read full review';
    });
  });

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

  /* ─── Studio tour: reveal cards and play visible footage ── */
  const studioTour = document.getElementById('studio-tour');

  if (studioTour) {
    const studioCards = [...studioTour.querySelectorAll('.studio-explore__card')];
    const studioVideos = [...studioTour.querySelectorAll('video.studio-explore__media')];
    const reduceStudioMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches || navigator.connection?.saveData;

    if (!reduceStudioMotion) {
      studioTour.classList.add('studio-explore--enhanced');
      const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      }, { threshold: 0.16, rootMargin: '0px 0px -6% 0px' });

      studioCards.forEach(card => revealObserver.observe(card));

      const mediaObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) entry.target.play().catch(() => {});
          else entry.target.pause();
        });
      }, { threshold: 0.2, rootMargin: '12% 0px 12% 0px' });

      studioVideos.forEach(video => {
        video.muted = true;
        const setOffset = () => {
          const offset = Number(video.dataset.offset || 0);
          if (Number.isFinite(offset) && video.duration > offset) video.currentTime = offset;
        };
        if (video.readyState >= 1) setOffset();
        else video.addEventListener('loadedmetadata', setOffset, { once: true });
        mediaObserver.observe(video);
      });
    } else {
      studioVideos.forEach(video => video.pause());
    }
  }

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
        history.replaceState(null, '', link.getAttribute('href'));
      }
    });
  });

});
