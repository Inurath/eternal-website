/* ============================================================
   PREMIUM TEMPLATE - Elara Wellness Clinic
   Shared script for all pages.
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ----------------------------------------------------------
     MOBILE NAV TOGGLE
  ---------------------------------------------------------- */
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  const header = document.querySelector('.site-header');

  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      navLinks.classList.toggle('is-open');
      document.body.style.overflow = expanded ? '' : 'hidden';
    });
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        navLinks.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  /* ----------------------------------------------------------
     STICKY / TRANSPARENT HEADER
     Header starts transparent on home page (no .solid class).
     Becomes opaque after 80px scroll or on inner pages.
  ---------------------------------------------------------- */
  if (header && !header.classList.contains('solid')) {
    const updateHeader = () => {
      if (window.scrollY > 80) {
        header.classList.add('scrolled');
        header.classList.remove('header-transparent');
      } else {
        header.classList.remove('scrolled');
        header.classList.add('header-transparent');
      }
    };
    updateHeader();
    window.addEventListener('scroll', updateHeader, { passive: true });
  }

  /* ----------------------------------------------------------
     SCROLL ANIMATIONS
     Add class="animate" (or animate delay-1..5) to any element.
     It fades up into view when it enters the viewport.
  ---------------------------------------------------------- */
  const animatedEls = document.querySelectorAll('.animate, .animate-fade');
  if (animatedEls.length > 0 && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    animatedEls.forEach(el => observer.observe(el));
  } else {
    // Fallback: make everything visible immediately
    animatedEls.forEach(el => el.classList.add('visible'));
  }

  /* ----------------------------------------------------------
     SMOOTH SCROLL for anchor links
  ---------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        const offset = header ? header.offsetHeight : 0;
        const top = target.getBoundingClientRect().top + window.scrollY - offset - 16;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ----------------------------------------------------------
     BEFORE / AFTER SLIDER
     Markup required:
       <div class="ba-slider" data-ba>
         <div class="ba-after"><div class="ba-after-img">...</div></div>
         <div class="ba-before"><div class="ba-before-img">...</div></div>
         <div class="ba-handle">
           <div class="ba-handle-bar"></div>
           <div class="ba-handle-circle">⇔</div>
         </div>
       </div>
  ---------------------------------------------------------- */
  document.querySelectorAll('[data-ba]').forEach(slider => {
    const before = slider.querySelector('.ba-before');
    const handle = slider.querySelector('.ba-handle');
    if (!before || !handle) return;

    let isDragging = false;

    const setPosition = (clientX) => {
      const rect = slider.getBoundingClientRect();
      const pct = Math.min(Math.max(((clientX - rect.left) / rect.width) * 100, 5), 95);
      before.style.width = pct + '%';
      handle.style.left = pct + '%';
    };

    // Set initial position to 50%
    setPosition(slider.getBoundingClientRect().left + slider.offsetWidth / 2);

    // Mouse events
    handle.addEventListener('mousedown', (e) => { isDragging = true; e.preventDefault(); });
    document.addEventListener('mouseup', () => { isDragging = false; });
    document.addEventListener('mousemove', (e) => { if (isDragging) setPosition(e.clientX); });

    // Touch events
    handle.addEventListener('touchstart', (e) => { isDragging = true; e.preventDefault(); }, { passive: false });
    document.addEventListener('touchend', () => { isDragging = false; });
    document.addEventListener('touchmove', (e) => {
      if (isDragging) setPosition(e.touches[0].clientX);
    }, { passive: true });

    // Also allow dragging anywhere on the slider
    slider.addEventListener('mousedown', (e) => { isDragging = true; setPosition(e.clientX); });
  });

  /* ----------------------------------------------------------
     FAQ ACCORDION
     Markup required:
       <div class="faq-item">
         <button class="faq-question">Question <span class="faq-icon">+</span></button>
         <div class="faq-answer"><div class="faq-answer-inner">Answer text</div></div>
       </div>
  ---------------------------------------------------------- */
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const answer = item.querySelector('.faq-answer');
      const isOpen = item.classList.contains('open');

      // Close all other open items
      document.querySelectorAll('.faq-item.open').forEach(openItem => {
        openItem.classList.remove('open');
        openItem.querySelector('.faq-answer').style.maxHeight = '0';
      });

      // Toggle current item
      if (!isOpen) {
        item.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  /* ----------------------------------------------------------
     NEWSLETTER FORM (basic prevent-default placeholder)
     Wire up to Mailchimp, ConvertKit, or similar in production.
  ---------------------------------------------------------- */
  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = newsletterForm.querySelector('input[type="email"]');
      const btn = newsletterForm.querySelector('.btn');
      if (input && input.value) {
        btn.textContent = 'Subscribed!';
        btn.style.background = '#fff';
        input.value = '';
        input.placeholder = 'Thank you!';
        setTimeout(() => {
          btn.textContent = 'Subscribe';
          input.placeholder = 'your@email.com';
        }, 3000);
      }
    });
  }

});
