// Data for dynamic content
const skillsData = [
  {
    name: "HTML5",
    icon: "fab fa-html5",
    description: "Semantic markup and modern web standards",
    level: 95,
  },
  {
    name: "CSS3",
    icon: "fab fa-css3-alt",
    description: "Advanced styling, animations, and responsive design",
    level: 90,
  },
  {
    name: "JavaScript",
    icon: "fab fa-js-square",
    description: "ES6+, DOM manipulation, and modern frameworks",
    level: 88,
  },
  {
    name: "PHP",
    icon: "fab fa-php",
    description: "Server-side development and API creation",
    level: 92,
  },
  {
    name: "Laravel",
    icon: "fab fa-laravel",
    description: "Full-stack web application development",
    level: 90,
  },
  {
    name: "MySQL",
    icon: "fas fa-database",
    description: "Database design, optimization, and management",
    level: 85,
  },
  {
    name: "Git",
    icon: "fab fa-git-alt",
    description: "Version control and collaborative development",
    level: 88,
  },
  {
    name: "API Development",
    icon: "fas fa-code",
    description: "RESTful APIs and microservices architecture",
    level: 92,
  },
];

const projectsData = [
  {
    title: "KodaPay",
    type: "Fintech",
    description:
      "Send money in dollars, receive in your local currency effortlessly with KodaPay. Say goodbye to exchange rate worries and hello to seamless international transactions.",
    technologies: ["PHP", "Laravel", "MySQL", "API", "Payment Gateway"],
    links: [{ text: "API Documentation", url: "#", type: "secondary" }],
  },
  {
    title: "AdClickGoPPC System",
    type: "Web Application",
    description:
      "Optimize your online presence with Adclickgo.org. Streamline ad management and maximize revenue effortlessly with our advanced advertising solutions.",
    technologies: ["PHP", "Laravel", "JavaScript", "MySQL", "Bootstrap"],
    links: [
      { text: "View Project", url: "https://adclickgo.org", type: "primary" },
    ],
  },
  {
    title: "P2P Trading Platform",
    type: "Cryptocurrency",
    description:
      "A platform that enables users to trade Payoneer or PayPal funds to crypto via a P2P system. Features secure transactions and real-time exchange rates.",
    technologies: ["PHP", "Laravel", "WebSocket", "API", "Blockchain"],
    links: [{ text: "Under NDA", url: "#", type: "secondary" }],
  },
  {
    title: "Host Am",
    type: "Web Hosting",
    description:
      "Free static web hosting platform that allows signup via GitHub and enables users to deploy static sites. Features a custom-built file manager.",
    technologies: ["PHP", "Laravel", "GitHub API", "File System", "Docker"],
    links: [
      {
        text: "View Project",
        url: "https://hostam.laravel.cloud",
        type: "primary",
      },
    ],
  },
  {
    title: "Smart Home API",
    type: "IoT System",
    description:
      "An API-based system that connects Alexa, Google Home, mobile app, and web app together. Implements OAuth and a fine-tuned AI model.",
    technologies: ["PHP", "Laravel", "OAuth", "AI/ML", "IoT", "WebSocket"],
    links: [{ text: "Under NDA", url: "#", type: "secondary" }],
  },
  {
    title: "Drivon",
    type: "Multi-Vendor Marketplace",
    description:
      "This is an e-commerce platform that allows users to buy and sell products. It features a multi-vendor system, secure payment processing, and a user-friendly interface. Mobile app with database structure, API development and payment processing.",
    technologies: [
      "PHP",
      "Laravel",
      "OAuth",
      "Stripe",
      "WebSocket",
      "Mobile API",
    ],
    links: [
      { text: "View Project", url: "https://drivon.org", type: "primary" },
    ],
  },
];

const certificatesData = [
  {
    title: "HTML Certificate",
    description: "Certification in theoretical understanding of HTML",
    image: "assets/image/certificates/html.png",
  },
  {
    title: "CSS Certificate",
    description: "Certification in theoretical understanding of CSS",
    image: "assets/image/certificates/css.png",
  },
  {
    title: "JavaScript Certificate",
    description: "Certification in hands-on experience with JavaScript",
    image: "assets/image/certificates/javascript.png",
  },
  {
    title: "jQuery Certificate",
    description: "Certification in hands-on experience with jQuery",
    image: "assets/image/certificates/jquery.png",
  },
  {
    title: "PHP Certificate",
    description: "Certification in PHP programming and development",
    image: "assets/image/certificates/php.png",
  },
  {
    title: "MySQL Certificate",
    description: "Certification in database management with MySQL",
    image: "assets/image/certificates/sql.png",
  },
  {
    title: "Laravel Certificate",
    description: "Certification in Laravel framework development",
    image: "assets/image/certificates/laravel.png",
  },
  {
    title: "Java Certificate",
    description: "Certification in Java programming and development",
    image: "assets/image/certificates/java.jpg",
  },
];

// Particle animation
class ParticleSystem {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.particles = [];
    this.mouse = { x: 0, y: 0 };

    this.resize();
    this.init();
    this.animate();

    window.addEventListener("resize", () => this.resize());
    canvas.addEventListener("mousemove", (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  init() {
    this.particles = [];
    const particleCount = Math.min(
      60,
      Math.floor((this.canvas.width * this.canvas.height) / 12000)
    );

    for (let i = 0; i < particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.3 + 0.1,
      });
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.particles.forEach((particle, i) => {
      // Update position
      particle.x += particle.vx;
      particle.y += particle.vy;

      // Wrap around edges
      if (particle.x < 0) particle.x = this.canvas.width;
      if (particle.x > this.canvas.width) particle.x = 0;
      if (particle.y < 0) particle.y = this.canvas.height;
      if (particle.y > this.canvas.height) particle.y = 0;

      // Draw particle
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(37, 99, 235, ${particle.opacity})`;
      this.ctx.fill();

      // Draw connections
      this.particles.slice(i + 1).forEach((otherParticle) => {
        const dx = particle.x - otherParticle.x;
        const dy = particle.y - otherParticle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 120) {
          this.ctx.beginPath();
          this.ctx.moveTo(particle.x, particle.y);
          this.ctx.lineTo(otherParticle.x, otherParticle.y);
          this.ctx.strokeStyle = `rgba(37, 99, 235, ${
            0.2 * (1 - distance / 120)
          })`;
          this.ctx.lineWidth = 1;
          this.ctx.stroke();
        }
      });

      // Mouse interaction
      const mouseDistance = Math.sqrt(
        (this.mouse.x - particle.x) ** 2 + (this.mouse.y - particle.y) ** 2
      );

      if (mouseDistance < 150) {
        const force = (150 - mouseDistance) / 150;
        particle.vx += (particle.x - this.mouse.x) * force * 0.0005;
        particle.vy += (particle.y - this.mouse.y) * force * 0.0005;
      }

      // Apply friction
      particle.vx *= 0.995;
      particle.vy *= 0.995;
    });

    requestAnimationFrame(() => this.animate());
  }
}

// DOM Content Loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize particle system
  const canvas = document.getElementById("particles-canvas");
  if (canvas) {
    new ParticleSystem(canvas);
  }

  // Populate skills
  populateSkills();

  // Populate projects
  populateProjects();

  // Populate certificates
  populateCertificates();

  // Initialize navigation
  initNavigation();

  // Initialize scroll effects
  initScrollEffects();

  // Initialize modal
  initModal();

  // Initialize animations
  initAnimations();
});

// Populate Skills
function populateSkills() {
  const skillsGrid = document.getElementById("skills-grid");
  if (!skillsGrid) return;

  skillsGrid.innerHTML = skillsData
    .map(
      (skill) => `
        <div class="skill-card">
            <div class="skill-icon">
                <i class="${skill.icon}"></i>
            </div>
            <div class="skill-content">
                <h3 class="skill-name">${skill.name}</h3>
                <p class="skill-description">${skill.description}</p>
                <div class="skill-level">
                    <div class="skill-level-label">
                        <span>Proficiency</span>
                        <span>${skill.level}%</span>
                    </div>
                    <div class="skill-progress">
                        <div class="skill-progress-bar" style="width: ${skill.level}%"></div>
                    </div>
                </div>
            </div>
        </div>
    `
    )
    .join("");
}

// Populate Projects
function populateProjects() {
  const projectsGrid = document.getElementById("projects-grid");
  if (!projectsGrid) return;

  projectsGrid.innerHTML = projectsData
    .map(
      (project) => `
        <div class="project-card">
            <div class="project-header">
                <h3 class="project-title">${project.title}</h3>
                <span class="project-type">${project.type}</span>
            </div>
            <div class="project-content">
                <p class="project-description">${project.description}</p>
                <div class="project-tech">
                    ${project.technologies
                      .map((tech) => `<span class="tech-tag">${tech}</span>`)
                      .join("")}
                </div>
                <div class="project-links">
                    ${project.links
                      .map(
                        (link) => `
                        <a href="${link.url}" class="project-link ${
                          link.type
                        }" ${link.url !== "#" ? 'target="_blank"' : ""}>
                            ${link.text}
                            ${
                              link.url !== "#"
                                ? '<i class="fas fa-external-link-alt"></i>'
                                : ""
                            }
                        </a>
                    `
                      )
                      .join("")}
                </div>
            </div>
        </div>
    `
    )
    .join("");
}

// Populate Certificates
function populateCertificates() {
  const certificatesGrid = document.getElementById("certificates-grid");
  if (!certificatesGrid) return;

  certificatesGrid.innerHTML = certificatesData
    .map(
      (cert) => `
        <div class="certificate-card" onclick="openCertificateModal('${cert.image}')">
            <img src="${cert.image}" alt="${cert.title}" class="certificate-image">
            <div class="certificate-content">
                <h3 class="certificate-title">${cert.title}</h3>
                <p class="certificate-description">${cert.description}</p>
            </div>
        </div>
    `
    )
    .join("");
}

// Navigation
function initNavigation() {
  const navbar = document.getElementById("navbar");
  const navToggle = document.getElementById("nav-toggle");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  // Mobile menu toggle
  navToggle.addEventListener("click", () => {
    navToggle.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  // Close mobile menu when clicking on a link
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navToggle.classList.remove("active");
      navMenu.classList.remove("active");
    });
  });

  // Smooth scrolling for navigation links
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    });
  });

  // Active navigation highlighting
  window.addEventListener("scroll", () => {
    let current = "";
    const sections = document.querySelectorAll(".section, .hero");

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.clientHeight;

      if (
        window.scrollY >= sectionTop &&
        window.scrollY < sectionTop + sectionHeight
      ) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });
}

// Scroll Effects
function initScrollEffects() {
  const navbar = document.getElementById("navbar");
  const backToTop = document.getElementById("back-to-top");

  window.addEventListener("scroll", () => {
    // Navbar background on scroll
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    // Back to top button
    if (window.scrollY > 300) {
      backToTop.classList.add("visible");
    } else {
      backToTop.classList.remove("visible");
    }
  });

  // Back to top functionality
  backToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

// Modal
function initModal() {
  const modal = document.getElementById("certificate-modal");
  const modalClose = document.querySelector(".modal-close");

  modalClose.addEventListener("click", closeCertificateModal);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeCertificateModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeCertificateModal();
    }
  });
}

function openCertificateModal(imageSrc) {
  const modal = document.getElementById("certificate-modal");
  const certificateImage = document.getElementById("certificate-image");

  certificateImage.src = imageSrc;
  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeCertificateModal() {
  const modal = document.getElementById("certificate-modal");
  modal.classList.remove("active");
  document.body.style.overflow = "auto";
}

// Animations
function initAnimations() {
  // Intersection Observer for fade-in animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in-up");

        // Animate skill progress bars
        if (entry.target.classList.contains("skill-card")) {
          const progressBar = entry.target.querySelector(".skill-progress-bar");
          if (progressBar) {
            setTimeout(() => {
              progressBar.style.width = progressBar.style.width;
            }, 300);
          }
        }
      }
    });
  }, observerOptions);

  // Observe elements for animation
  const animateElements = document.querySelectorAll(
    ".section-title, .project-card, .certificate-card, .stat-card, .about-text, .contact-info, .skill-card, .highlight-item"
  );
  animateElements.forEach((el) => observer.observe(el));
}

// Utility functions for easy content management
function addProject(project) {
  projectsData.push(project);
  populateProjects();
}

function addCertificate(certificate) {
  certificatesData.push(certificate);
  populateCertificates();
}

function addSkill(skill) {
  skillsData.push(skill);
  populateSkills();
}

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Apply throttling to scroll events
const throttledScrollHandler = throttle(() => {
  const navbar = document.getElementById("navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

  const backToTop = document.getElementById("back-to-top");
  if (window.scrollY > 300) {
    backToTop.classList.add("visible");
  } else {
    backToTop.classList.remove("visible");
  }
}, 16);

// Replace the scroll event listener with throttled version
window.addEventListener("scroll", throttledScrollHandler);

// Preload images for better performance
function preloadImages() {
  const imageUrls = certificatesData.map((cert) => cert.image);
  imageUrls.forEach((url) => {
    const img = new Image();
    img.src = url;
  });
}

// Initialize preloading
document.addEventListener("DOMContentLoaded", preloadImages);

// Error handling for failed image loads
document.addEventListener(
  "error",
  (e) => {
    if (e.target.tagName === "IMG") {
      e.target.src = "assets/image/other/code-typing-animate.svg";
    }
  },
  true
);

// Accessibility improvements
document.addEventListener("keydown", (e) => {
  if (
    e.key === "Tab" &&
    !e.shiftKey &&
    document.activeElement === document.body
  ) {
    const mainContent =
      document.querySelector("main") || document.querySelector("#about");
    if (mainContent) {
      mainContent.focus();
      e.preventDefault();
    }
  }
});

// Add focus management for modal
function trapFocus(element) {
  const focusableElements = element.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  element.addEventListener("keydown", (e) => {
    if (e.key === "Tab") {
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    }
  });

  firstElement.focus();
}

// Enhanced modal functionality with focus trapping
function openCertificateModalEnhanced(imageSrc) {
  const modal = document.getElementById("certificate-modal");
  const certificateImage = document.getElementById("certificate-image");

  certificateImage.src = imageSrc;
  modal.classList.add("active");
  document.body.style.overflow = "hidden";

  // Trap focus within modal
  trapFocus(modal);
}

// Update the global function
window.openCertificateModal = openCertificateModalEnhanced;

// Smooth reveal animations for elements
function revealOnScroll() {
  const reveals = document.querySelectorAll(".fade-in-up");

  reveals.forEach((reveal) => {
    const windowHeight = window.innerHeight;
    const elementTop = reveal.getBoundingClientRect().top;
    const elementVisible = 150;

    if (elementTop < windowHeight - elementVisible) {
      reveal.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  revealOnScroll(); // Check for elements in view on load
});
