(function () {
  'use strict';

  /* ============================================================
     SCROLL PROGRESS
     ============================================================ */
  const progressBar = document.getElementById('scroll-progress');
  function updateProgress() {
    const s   = document.documentElement;
    const pct = (s.scrollTop / (s.scrollHeight - s.clientHeight)) * 100;
    if (progressBar) progressBar.style.width = Math.min(pct, 100) + '%';
  }
  window.addEventListener('scroll', updateProgress, { passive: true });

  /* ============================================================
     REVEAL (IntersectionObserver)
     ============================================================ */
  const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  if ('IntersectionObserver' in window) {
    const ro = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('revealed'); ro.unobserve(e.target); }
      }),
      { threshold: 0.1, rootMargin: '0px 0px -36px 0px' }
    );
    revealEls.forEach(el => ro.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('revealed'));
  }

  /* ============================================================
     COUNTER ANIMATION
     ============================================================ */
  function animateCounter(el, target, ms) {
    const start = performance.now();
    (function tick(now) {
      const p = Math.min((now - start) / ms, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(ease * target) + (p < 1 ? '' : '+');
      if (p < 1) requestAnimationFrame(tick);
    })(start);
  }

  const counterEls = document.querySelectorAll('[data-count]');
  if (counterEls.length && 'IntersectionObserver' in window) {
    const co = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          animateCounter(e.target, parseInt(e.target.dataset.count, 10), 1400);
          co.unobserve(e.target);
        }
      }),
      { threshold: 0.5 }
    );
    counterEls.forEach(el => co.observe(el));
  }

  /* ============================================================
     ACTIVE NAV (scrollspy)
     ============================================================ */
  const sections = document.querySelectorAll('section[id], header[id]');
  const navLinks = document.querySelectorAll('[data-nav]');
  const NAV_H    = 80;

  function updateNav() {
    let cur = '';
    sections.forEach(s => { if (s.getBoundingClientRect().top <= NAV_H + 50) cur = s.id; });
    navLinks.forEach(a => a.classList.toggle('active-nav', a.getAttribute('href') === '#' + cur));
  }
  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();

  /* ============================================================
     SMOOTH SCROLL
     ============================================================ */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const collapse = document.getElementById('navbars');
      if (collapse && collapse.classList.contains('show')) {
        bootstrap.Collapse.getInstance(collapse)?.hide();
      }
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - (NAV_H - 8), behavior: 'smooth' });
    });
  });

  /* ============================================================
     THEME  — syncs both data-theme AND data-bs-theme
     ============================================================ */
  const htmlEl  = document.documentElement;
  const toggles = [
    document.getElementById('themeToggle'),
    document.getElementById('themeToggleMobile'),
  ].filter(Boolean);

  function sc(n, v, d) {
    const t = new Date(); t.setTime(t.getTime() + d * 86400000);
    document.cookie = n + '=' + v + ';expires=' + t.toUTCString() + ';path=/';
  }

  function applyTheme(mode) {
    htmlEl.setAttribute('data-theme',    mode);
    htmlEl.setAttribute('data-bs-theme', mode);   // ← Bootstrap dark mode
    localStorage.setItem('theme', mode);
    sc('theme', mode, 365);
  }

  (function () {
    const gc = n => document.cookie.split(';').map(c=>c.trim()).find(c=>c.startsWith(n+'='))?.split('=')[1]||null;
    let s = localStorage.getItem('theme') || gc('theme') || 'dark';
    if (!['light','dark'].includes(s)) s = 'dark';
    applyTheme(s);
  })();

  toggles.forEach(btn => btn.addEventListener('click', () => {
    applyTheme(htmlEl.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
  }));

  /* ============================================================
     COPY EMAIL
     ============================================================ */
  const copyBtn = document.getElementById('copyEmailBtn');
  if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
      const email = 'frankemmanuel249@gmail.com';
      try {
        await navigator.clipboard.writeText(email);
        const orig = copyBtn.innerHTML;
        copyBtn.innerHTML = '<i class="fa-solid fa-check me-2"></i>Copied!';
        copyBtn.classList.add('btn-success');
        copyBtn.classList.remove('btn-ghost');
        setTimeout(() => {
          copyBtn.innerHTML = orig;
          copyBtn.classList.remove('btn-success');
          copyBtn.classList.add('btn-ghost');
        }, 1800);
      } catch { window.location.href = 'mailto:' + email; }
    });
  }

  /* ============================================================
     PROJECT FILTERS
     ============================================================ */
  const filterBtns   = document.querySelectorAll('.filter-btn');
  const projectItems = document.querySelectorAll('.project-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;

      projectItems.forEach(item => {
        const tags    = (item.getAttribute('data-tags') || '').split(' ');
        const visible = filter === 'all' || tags.includes(filter);

        if (visible) {
          item.style.display = '';
          requestAnimationFrame(() => item.classList.remove('proj-hidden'));
        } else {
          item.classList.add('proj-hidden');
          item.addEventListener('transitionend', function handler() {
            if (item.classList.contains('proj-hidden')) item.style.display = 'none';
            item.removeEventListener('transitionend', handler);
          });
        }
      });
    });
  });

  /* ============================================================
     PROJECT CARD — whole card clickable (delegates to Details btn)
     ============================================================ */
  document.querySelectorAll('.js-card').forEach(card => {
    card.addEventListener('click', e => {
      // If click was on an external link (.js-ext), let browser handle it
      if (e.target.closest('.js-ext')) return;
      // If click was on the Details button itself, Bootstrap handles it — do nothing
      if (e.target.closest('.js-details')) return;
      // Otherwise, programmatically click the Details button
      const detailsBtn = card.querySelector('.js-details');
      if (detailsBtn) detailsBtn.click();
    });
  });

  /* ============================================================
     PROJECT MODAL — populate from PROJECTS data
     ============================================================ */
  const PROJECTS = {
    solextrade: {
      title: 'SolexTrade',
      icon:  'fa-solid fa-chart-line',
      stack: 'Laravel · React Native · MySQL · Redis · Webhooks · RBAC',
      desc:  'Full-stack trading & investment platform with wallets, admin controls, webhook-driven payments, and a React Native mobile app.',
      link:  '#',
      features: [
        'User wallet — deposit, withdraw, transaction history',
        'Webhook-driven payment verification (Paystack / Flutterwave)',
        'Comprehensive RBAC admin dashboard & analytics',
        'React Native mobile app with real-time updates',
        'Background queue jobs for payouts & notifications',
        'Rate limiting, fraud detection, 2FA hooks',
      ],
      role: [
        'Architected the full Laravel REST API',
        'Designed wallet, escrow & transaction models',
        'Built webhook signature verification layer',
        'Implemented RBAC admin panel & reporting',
        'Integrated React Native app to backend',
        'Set up CI/CD & zero-downtime AWS deployment',
      ],
    },

    gatepass: {
      title: 'GatePass.ng',
      icon:  'fa-solid fa-ticket',
      stack: 'Laravel · Paystack · QR Codes · MySQL · Analytics',
      desc:  'Event ticketing backend with secure payments, QR ticket issuance, gate validation, and live event analytics.',
      link:  'https://gatepass.ng',
      features: [
        'Event pages + ticket tiers (free / paid / VIP)',
        'Secure payment flow + verified webhook callbacks',
        'QR code generation & scanning gate validation',
        'Real-time admin analytics dashboard',
        'Anti-fraud & rate-limiting patterns',
      ],
      role: [
        'Designed backend architecture and database schema',
        'Built payment + webhook verification layer',
        'Implemented QR ticket issuing & gate-scan workflow',
        'Optimised queries and Redis caching strategy',
        'Shipped production-ready AWS deployment',
      ],
    },

    forex_dashboard: {
      title: 'Forex Analytics Dashboard',
      icon:  'fa-solid fa-chart-candlestick',
      stack: 'Laravel · Python · MT5 · MySQL · Chart.js',
      desc:  'Real-time forex analytics platform with MT5 data pipelines, AI-powered trade signals, and a clean performance dashboard.',
      link:  '#',
      features: [
        'MT5 live data pipeline integration',
        'AI-powered trade signal scoring',
        'Interactive charts & full trade history',
        'Real-time performance & drawdown reporting',
        'Secure auth & role-based user management',
        'Automated Telegram + email notification system',
      ],
      role: [
        'Built Laravel backend & authentication system',
        'Integrated Python MT5 data bridge via REST',
        'Designed chart-heavy analytics dashboard',
        'Implemented automated notification pipelines',
        'Built report export features',
      ],
    },

    wippay_mobile: {
      title: 'WipPay Mobile',
      icon:  'fa-brands fa-react',
      stack: 'React Native · Expo · Laravel API · Secure Auth Flows',
      desc:  'Mobile fintech app built with Expo — auth, wallet deposits/withdrawals, notifications, polished UI connected to a Laravel backend.',
      link:  'https://coder-frank.github.io',
      features: [
        'Multi-screen navigation with guarded routes',
        'Auth flows (register / login / OTP / reset)',
        'Wallet deposit & withdrawal screens',
        'API integration with robust error handling',
        'Push notifications via FCM',
        'Smooth, consistent UI component library',
      ],
      role: [
        'Built all React Native UI screens and flow logic',
        'Integrated Laravel endpoints with clean service layer',
        'Implemented session/token refresh patterns',
        'Designed scalable screen routing architecture',
        'Focused on UX polish and crash stability',
      ],
    },

    resaleplaza: {
      title: 'ResalePlaza',
      icon:  'fa-solid fa-store',
      stack: 'Laravel · Wallet / Escrow · Multi-vendor · RBAC',
      desc:  'Multi-vendor e-commerce backend with wallet escrow, disputes handling, vendor order splitting, and admin moderation.',
      link:  '#',
      features: [
        'Vendor order splitting + item mapping',
        'Wallet escrow — release on buyer confirmation',
        'Disputes workflow handled by support team',
        'Admin product verification & moderation panel',
        'Full RBAC (buyer / vendor / support / admin)',
      ],
      role: [
        'Designed wallet and escrow architecture',
        'Built vendor split ordering and payout flows',
        'Implemented admin verification workflows',
        'Handled compliance-oriented data integrity rules',
      ],
    },

    adclickgo: {
      title: 'Adclickgo',
      icon:  'fa-solid fa-bullseye',
      stack: 'Laravel · MySQL · Redis · Analytics Dashboard',
      desc:  'Ad tracking platform for campaigns, smart redirects, analytics, and payout workflows — optimised with Redis caching.',
      link:  '#',
      features: [
        'Campaign tracking with smart redirects',
        'Analytics dashboards + reporting',
        'Redis caching for high-throughput tracking',
        'Payout workflows and admin tooling',
        'Fraud controls and validation checks',
      ],
      role: [
        'Designed core tracking and reporting models',
        'Implemented Redis caching strategy for performance',
        'Built admin tooling and payout logic',
        'Worked on data integrity and monitoring',
      ],
    },

    hostam: {
      title: 'HostAm',
      icon:  'fa-solid fa-cloud',
      stack: 'Laravel · AWS S3 · File Manager · GitHub OAuth',
      desc:  'Static hosting platform where users create projects, manage files in a cPanel-style UI, and deploy via GitHub.',
      link:  '#',
      features: [
        'User projects with isolated S3 storage',
        'Modern file manager (upload / rename / move / delete)',
        'GitHub OAuth connect + deploy workflows',
        'Usage tracking + analytics per project',
        'Resumable upload support',
      ],
      role: [
        'Designed project storage and file operation layer',
        'Implemented upload flows with progress tracking',
        'Built authentication and project isolation logic',
        'Integrated GitHub OAuth workflow',
      ],
    },

    studyhub: {
      title: 'StudyHub',
      icon:  'fa-solid fa-graduation-cap',
      stack: 'Laravel · AI Workflows · Study Tools · Email',
      desc:  'Study platform with resources, notes, progress tracking, and an AI assistant to generate personalised learning flows.',
      link:  '#',
      features: [
        'Study resources + notes management',
        'Progress tracking per topic and goal',
        'AI assistant — generate personalised learning paths',
        'Admin content moderation tools',
        'Email / notification flows for reminders',
      ],
      role: [
        'Designed backend models for resources and tracking',
        'Built REST API endpoints for all core workflows',
        'Integrated LLM API for AI study assistant',
        'Implemented notification & email patterns',
      ],
    },
  };

  const projectModal = document.getElementById('projectModal');
  if (projectModal) {
    projectModal.addEventListener('show.bs.modal', event => {
      // relatedTarget is the .js-details <button> with data-project
      const btn  = event.relatedTarget;
      const key  = btn?.dataset?.project;
      const data = key ? PROJECTS[key] : null;
      if (!data) return;

      document.getElementById('projectModalTitle').innerHTML =
        `<i class="fa-solid fa-circle-info me-2"></i>${data.title}`;
      document.getElementById('projectModalIcon').innerHTML =
        `<i class="${data.icon}"></i>`;
      document.getElementById('projectModalStack').textContent = data.stack;
      document.getElementById('projectModalDesc').textContent  = data.desc;

      const featList = document.getElementById('projectModalFeatures');
      const roleList = document.getElementById('projectModalRole');
      featList.innerHTML = '';
      roleList.innerHTML = '';

      data.features.forEach(f => { const li = document.createElement('li'); li.textContent = f; featList.appendChild(li); });
      data.role.forEach(r    => { const li = document.createElement('li'); li.textContent = r; roleList.appendChild(li); });

      const linkEl = document.getElementById('projectModalLink');
      if (data.link && data.link !== '#') {
        linkEl.setAttribute('href', data.link);
        linkEl.style.display = '';
      } else {
        linkEl.style.display = 'none';
      }
    });
  }

})();
