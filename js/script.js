(function () {
  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      if (!id || id === "#") return;
      const el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  // Theme
  function setCookie(n, v, d) {
    const t = new Date();
    t.setTime(t.getTime() + d * 24 * 60 * 60 * 1e3);
    document.cookie = n + "=" + v + ";expires=" + t.toUTCString() + ";path=/";
  }
  function getCookie(n) {
    const s = n + "=";
    const ca = document.cookie.split(";");
    for (let c of ca) {
      c = c.trim();
      if (c.indexOf(s) === 0) return c.substring(s.length);
    }
    return null;
  }

  const htmlEl = document.documentElement;
  const toggles = [
    document.getElementById("themeToggle"),
    document.getElementById("themeToggleMobile"),
  ].filter(Boolean);

  function applyTheme(mode) {
    htmlEl.setAttribute("data-theme", mode);
    localStorage.setItem("theme", mode);
    setCookie("theme", mode, 365);
  }

  (function () {
    let saved = localStorage.getItem("theme") || getCookie("theme") || "dark";
    if (!["light", "dark"].includes(saved)) saved = "light";
    applyTheme(saved);
  })();

  toggles.forEach((btn) => {
    btn.addEventListener("click", () => {
      const mode =
        htmlEl.getAttribute("data-theme") === "dark" ? "light" : "dark";
      applyTheme(mode);
    });
  });

  // Copy email
  const copyBtn = document.getElementById("copyEmailBtn");
  if (copyBtn) {
    copyBtn.addEventListener("click", async () => {
      const email = "frankemmanuel249@gmail.com";
      try {
        await navigator.clipboard.writeText(email);
        const old = copyBtn.innerHTML;
        copyBtn.innerHTML = '<i class="fa-solid fa-check me-2"></i>Copied';
        copyBtn.classList.add("btn-success");
        setTimeout(() => {
          copyBtn.innerHTML = old;
          copyBtn.classList.remove("btn-success");
        }, 1200);
      } catch (e) {
        window.location.href = "mailto:" + email;
      }
    });
  }

  // Project filters
  const filterBtns = document.querySelectorAll(".filter-btn");
  const items = document.querySelectorAll(".project-item");

  function setActive(btn) {
    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
  }

  function matches(tags, filter) {
    if (filter === "all") return true;
    return tags.split(" ").includes(filter);
  }

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.dataset.filter;
      setActive(btn);

      items.forEach((it) => {
        const tags = it.getAttribute("data-tags") || "";
        it.style.display = matches(tags, filter) ? "" : "none";
      });
    });
  });

  // Project modal content
  const PROJECTS = {
    gatepass: {
      title: "GatePass.ng",
      icon: "fa-solid fa-ticket",
      stack: "Laravel • Payments • QR Codes • Analytics • Webhooks",
      desc: "Event ticketing backend with secure payments, ticket issuance, QR validation at the gate, and live event analytics.",
      link: "https://gatepass.ng",
      features: [
        "Event pages + ticket types (free/paid/tiers)",
        "Secure payment flow + verified webhooks",
        "QR code generation + scanning validation",
        "Real-time admin analytics dashboard",
        "Anti-fraud & rate limiting patterns",
      ],
      role: [
        "Designed backend architecture and database models",
        "Built payment + webhook verification layer",
        "Implemented ticket issuing + QR workflows",
        "Optimized queries and caching strategy",
        "Shipped production-ready deployment patterns",
      ],
    },

    wippay_mobile: {
      title: "WipPay Mobile (React Native)",
      icon: "fa-brands fa-react",
      stack: "React Native • Expo • Laravel API • Secure auth flows",
      desc: "Mobile app built with Expo, integrated to Laravel backend for authentication, wallet deposits, withdrawals, and notifications.",
      link: "https://coder-frank.github.io",
      features: [
        "Clean multi-screen navigation + guarded routes",
        "Auth flows (register/login/verification/reset)",
        "Wallet deposit + withdrawal pages",
        "API integration with robust error handling",
        "Smooth UI + consistent components",
      ],
      role: [
        "Built React Native UI screens and flow logic",
        "Integrated Laravel endpoints with clean service layer",
        "Implemented session/token handling patterns",
        "Designed a scalable screen routing approach",
        "Focused on UX polish and stability",
      ],
    },

    adclickgo: {
      title: "Adclickgo",
      icon: "fa-solid fa-bullseye",
      stack: "Laravel • MySQL • Redis • Analytics",
      desc: "Ad tracking platform for campaigns, smart redirects, analytics and payout workflows optimized for speed.",
      link: "#",
      features: [
        "Campaign tracking with redirects",
        "Analytics dashboards + reporting",
        "Caching with Redis for speed",
        "Payout workflows and admin tools",
        "Fraud controls / validation checks",
      ],
      role: [
        "Designed core tracking + reporting models",
        "Implemented caching for performance",
        "Built admin tooling and payout logic",
        "Worked on data integrity and monitoring",
      ],
    },

    resaleplaza: {
      title: "ResalePlaza",
      icon: "fa-solid fa-store",
      stack: "Laravel • Wallet/Escrow • Multi-vendor • RBAC",
      desc: "Multi-vendor e-commerce backend with escrow wallet flows, disputes handling, and vendor order splitting.",
      link: "#",
      features: [
        "Vendor order splitting + order items mapping",
        "Wallet escrow release on confirmation",
        "Disputes workflow handled by support",
        "Admin product verification + moderation",
        "RBAC admin panel structure",
      ],
      role: [
        "Designed wallet and escrow architecture",
        "Built vendor split ordering and payouts",
        "Implemented admin verification workflows",
        "Handled compliance-oriented data rules",
      ],
    },

    hostam: {
      title: "HostAm",
      icon: "fa-solid fa-cloud",
      stack: "Laravel • AWS S3 • File Manager • GitHub OAuth",
      desc: "A static hosting platform where users create projects, manage files in a cPanel-like UI, and deploy via GitHub.",
      link: "#",
      features: [
        "User projects with isolated storage",
        "Modern file manager (upload/progress/rename/move)",
        "GitHub connect + deploy workflows",
        "Usage tracking + analytics",
        "S3-backed file handling",
      ],
      role: [
        "Designed project storage and file operations",
        "Implemented upload flows with progress tracking",
        "Built authentication and project isolation logic",
        "Integrated GitHub auth approach",
      ],
    },

    studyhub: {
      title: "StudyHub",
      icon: "fa-solid fa-graduation-cap",
      stack: "Laravel • AI workflows • Study tools",
      desc: "Study platform with resources, tracking, and an AI assistant to support learning workflows and progress.",
      link: "#",
      features: [
        "Study resources + notes workflow",
        "Progress tracking patterns",
        "AI assistant integration concept",
        "Admin tooling and content moderation",
        "Email/notification flows",
      ],
      role: [
        "Designed backend models for resources and tracking",
        "Built API endpoints for core workflows",
        "Implemented notification/email patterns",
        "Focused on scalable structure",
      ],
    },
  };

  const modal = document.getElementById("projectModal");
  if (modal) {
    modal.addEventListener("show.bs.modal", (event) => {
      const btn = event.relatedTarget;
      const key = btn?.getAttribute("data-project");
      const data = PROJECTS[key] || null;
      if (!data) return;

      document.getElementById("projectModalTitle").innerHTML =
        `<i class="fa-solid fa-circle-info me-2"></i>${data.title}`;

      document.getElementById("projectModalIcon").innerHTML =
        `<i class="${data.icon}"></i>`;

      document.getElementById("projectModalStack").textContent = data.stack;
      document.getElementById("projectModalDesc").textContent = data.desc;

      const featuresEl = document.getElementById("projectModalFeatures");
      const roleEl = document.getElementById("projectModalRole");
      featuresEl.innerHTML = "";
      roleEl.innerHTML = "";

      data.features.forEach((f) => {
        const li = document.createElement("li");
        li.textContent = f;
        featuresEl.appendChild(li);
      });

      data.role.forEach((r) => {
        const li = document.createElement("li");
        li.textContent = r;
        roleEl.appendChild(li);
      });

      const linkEl = document.getElementById("projectModalLink");
      linkEl.setAttribute("href", data.link || "#");
      linkEl.style.display = data.link && data.link !== "#" ? "" : "none";
    });
  }
})();
