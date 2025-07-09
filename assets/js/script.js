// Data for dynamic content
const skillsData = [
  { name: "HTML", icon: "🌐" },
  { name: "CSS", icon: "🎨" },
  { name: "JavaScript", icon: "⚡" },
  { name: "jQuery", icon: "📚" },
  { name: "Bootstrap", icon: "🅱️" },
  { name: "PHP", icon: "🐘" },
  { name: "MySQL", icon: "🗄️" },
  { name: "Laravel", icon: "🔥" },
  { name: "Java", icon: "☕" },
]

const projectsData = [
  {
    title: "KodaPay",
    type: "Fintech",
    description:
      "Send money in dollars, receive in your local currency effortlessly with KodaPay. Say goodbye to exchange rate worries and hello to seamless international transactions.",
    technologies: ["PHP", "Laravel", "MySQL", "API"],
    links: [{ text: "API Documentation", url: "#", type: "primary" }],
  },
  {
    title: "AdClickGoPPC System",
    type: "Web Application",
    description:
      "Optimize your online presence with Adclickgo.org. Streamline ad management and maximize revenue effortlessly with our advanced advertising solutions.",
    technologies: ["PHP", "Laravel", "JavaScript", "MySQL"],
    links: [{ text: "View Project", url: "https://adclickgo.org", type: "primary" }],
  },
  {
    title: "P2P Trading Platform",
    type: "Cryptocurrency",
    description:
      "A platform that enables users to trade Payoneer or PayPal funds to crypto via a P2P system. Features secure transactions and real-time exchange rates.",
    technologies: ["PHP", "Laravel", "API", "WebSocket"],
    links: [{ text: "Under NDA", url: "#", type: "secondary" }],
  },
  {
    title: "Host Am",
    type: "Web Hosting",
    description:
      "Free static web hosting platform that allows signup via GitHub and enables users to deploy static sites. Features a custom-built file manager.",
    technologies: ["PHP", "Laravel", "GitHub API", "File System"],
    links: [{ text: "View Project", url: "https://hostam.laravel.cloud", type: "primary" }],
  },
  {
    title: "Smart Home API",
    type: "IoT System",
    description:
      "An API-based system that connects Alexa, Google Home, mobile app, and web app together. Implements OAuth and a fine-tuned AI model.",
    technologies: ["PHP", "Laravel", "OAuth", "AI/ML", "IoT"],
    links: [{ text: "Under NDA", url: "#", type: "secondary" }],
  },
  {
    title: "Drivon",
    type: "Multi-Vendor Marketplace",
    description:
      "This is an e-commerce platform that allows users to buy and sell products. It features a multi-vendor system, secure payment processing, and a user-friendly interface. Its a mobile app and i was in charge of database structure, api development and payment processing",
    technologies: ["PHP", "Laravel", "OAuth", "Stripe", "WebSocket"],
    links: [{ text: "View Project", url: "https://drivon.org", type: "primary" }],
  },
]

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
    image: "/assets/image/certificates/javascript.png",
  },
  {
    title: "jQuery Certificate",
    description: "Certification in hands-on experience with jQuery",
    image: "/assets/image/certificates/jquery.png",
  },
  {
    title: "PHP Certificate",
    description: "Certification in PHP programming and development",
    image: "/assets/image/certificates/php.png",
  },
  {
    title: "MySQL Certificate",
    description: "Certification in database management with MySQL",
    image: "/assets/image/certificates/sql.png",
  },
  {
    title: "Laravel Certificate",
    description: "Certification in Laravel framework development",
    image: "/assets/image/certificates/laravel.png",
  },
  {
    title: "Java Certificate",
    description: "Certification in Java programming and development",
    image: "/assets/image/certificates/java.jpg",
  },
]

// Particle animation
class ParticleSystem {
  constructor(canvas) {
    this.canvas = canvas
    this.ctx = canvas.getContext("2d")
    this.particles = []
    this.mouse = { x: 0, y: 0 }

    this.resize()
    this.init()
    this.animate()

    window.addEventListener("resize", () => this.resize())
    canvas.addEventListener("mousemove", (e) => {
      this.mouse.x = e.clientX
      this.mouse.y = e.clientY
    })
  }

  resize() {
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight
  }

  init() {
    this.particles = []
    const particleCount = Math.min(80, Math.floor((this.canvas.width * this.canvas.height) / 10000))

    for (let i = 0; i < particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.5 + 0.2,
      })
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

    this.particles.forEach((particle, i) => {
      // Update position
      particle.x += particle.vx
      particle.y += particle.vy

      // Wrap around edges
      if (particle.x < 0) particle.x = this.canvas.width
      if (particle.x > this.canvas.width) particle.x = 0
      if (particle.y < 0) particle.y = this.canvas.height
      if (particle.y > this.canvas.height) particle.y = 0

      // Draw particle
      this.ctx.beginPath()
      this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
      this.ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`
      this.ctx.fill()

      // Draw connections
      this.particles.slice(i + 1).forEach((otherParticle) => {
        const dx = particle.x - otherParticle.x
        const dy = particle.y - otherParticle.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 100) {
          this.ctx.beginPath()
          this.ctx.moveTo(particle.x, particle.y)
          this.ctx.lineTo(otherParticle.x, otherParticle.y)
          this.ctx.strokeStyle = `rgba(0, 170, 255, ${0.3 * (1 - distance / 100)})`
          this.ctx.lineWidth = 1
          this.ctx.stroke()
        }
      })

      // Mouse interaction
      const mouseDistance = Math.sqrt((this.mouse.x - particle.x) ** 2 + (this.mouse.y - particle.y) ** 2)

      if (mouseDistance < 150) {
        const force = (150 - mouseDistance) / 150
        particle.vx += (particle.x - this.mouse.x) * force * 0.001
        particle.vy += (particle.y - this.mouse.y) * force * 0.001
      }

      // Apply friction
      particle.vx *= 0.99
      particle.vy *= 0.99
    })

    requestAnimationFrame(() => this.animate())
  }
}

// DOM Content Loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize particle system
  const canvas = document.getElementById("particles-canvas")
  if (canvas) {
    new ParticleSystem(canvas)
  }

  // Populate skills
  populateSkills()

  // Populate projects
  populateProjects()

  // Populate certificates
  populateCertificates()

  // Initialize navigation
  initNavigation()

  // Initialize scroll effects
  initScrollEffects()

  // Initialize modal
  initModal()

  // Initialize animations
  initAnimations()
})

// Populate Skills
function populateSkills() {
  const skillsTrack = document.getElementById("skills-track")
  if (!skillsTrack) return

  // Create skills twice for seamless loop
  const allSkills = [...skillsData, ...skillsData]

  skillsTrack.innerHTML = allSkills
    .map(
      (skill) => `
        <div class="skill-item">
            <div class="skill-icon">${skill.icon}</div>
            <div class="skill-name">${skill.name}</div>
        </div>
    `,
    )
    .join("")
}

// Populate Projects
function populateProjects() {
  const projectsGrid = document.getElementById("projects-grid")
  if (!projectsGrid) return

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
                    ${project.technologies.map((tech) => `<span class="tech-tag">${tech}</span>`).join("")}
                </div>
                <div class="project-links">
                    ${project.links
                      .map(
                        (link) => `
                        <a href="${link.url}" class="project-link ${link.type}" ${link.url !== "#" ? 'target="_blank"' : ""}>
                            ${link.text}
                            ${link.url !== "#" ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z" /></svg>' : ""}
                        </a>
                    `,
                      )
                      .join("")}
                </div>
            </div>
        </div>
    `,
    )
    .join("")
}

// Populate Certificates
function populateCertificates() {
  const certificatesGrid = document.getElementById("certificates-grid")
  if (!certificatesGrid) return

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
    `,
    )
    .join("")
}

// Navigation
function initNavigation() {
  const navbar = document.getElementById("navbar")
  const navToggle = document.getElementById("nav-toggle")
  const navMenu = document.getElementById("nav-menu")
  const navLinks = document.querySelectorAll(".nav-link")

  // Mobile menu toggle
  navToggle.addEventListener("click", () => {
    navToggle.classList.toggle("active")
    navMenu.classList.toggle("active")
  })

  // Close mobile menu when clicking on a link
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navToggle.classList.remove("active")
      navMenu.classList.remove("active")
    })
  })

  // Smooth scrolling for navigation links
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault()
      const targetId = link.getAttribute("href")
      const targetSection = document.querySelector(targetId)

      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 70
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        })
      }
    })
  })

  // Active navigation highlighting
  window.addEventListener("scroll", () => {
    let current = ""
    const sections = document.querySelectorAll(".section, .hero")

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100
      const sectionHeight = section.clientHeight

      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute("id")
      }
    })

    navLinks.forEach((link) => {
      link.classList.remove("active")
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active")
      }
    })
  })
}

// Scroll Effects
function initScrollEffects() {
  const navbar = document.getElementById("navbar")
  const backToTop = document.getElementById("back-to-top")

  window.addEventListener("scroll", () => {
    // Navbar background on scroll
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled")
    } else {
      navbar.classList.remove("scrolled")
    }

    // Back to top button
    if (window.scrollY > 300) {
      backToTop.classList.add("visible")
    } else {
      backToTop.classList.remove("visible")
    }
  })

  // Back to top functionality
  backToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })
}

// Modal
function initModal() {
  const modal = document.getElementById("certificate-modal")
  const modalClose = document.querySelector(".modal-close")

  modalClose.addEventListener("click", closeCertificateModal)

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeCertificateModal()
    }
  })

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeCertificateModal()
    }
  })
}

function openCertificateModal(imageSrc) {
  const modal = document.getElementById("certificate-modal")
  const certificateImage = document.getElementById("certificate-image")

  certificateImage.src = imageSrc
  modal.classList.add("active")
  document.body.style.overflow = "hidden"
}

function closeCertificateModal() {
  const modal = document.getElementById("certificate-modal")
  modal.classList.remove("active")
  document.body.style.overflow = "auto"
}

// Animations
function initAnimations() {
  // Intersection Observer for fade-in animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in-up")
      }
    })
  }, observerOptions)

  // Observe elements for animation
  const animateElements = document.querySelectorAll(
    ".section-title, .project-card, .certificate-card, .stat, .about-text, .contact-info",
  )
  animateElements.forEach((el) => observer.observe(el))
}

// Utility function to easily add new projects
function addProject(project) {
  projectsData.push(project)
  populateProjects()
}

// Utility function to easily add new certificates
function addCertificate(certificate) {
  certificatesData.push(certificate)
  populateCertificates()
}

// Utility function to easily add new skills
function addSkill(skill) {
  skillsData.push(skill)
  populateSkills()
}

// Example usage:
// addProject({
//     title: 'New Project',
//     type: 'Web Application',
//     description: 'Description of the new project...',
//     technologies: ['HTML', 'CSS', 'JavaScript'],
//     links: [
//         { text: 'View Project', url: 'https://example.com', type: 'primary' }
//     ]
// });

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Apply throttling to scroll events
const throttledScrollHandler = throttle(() => {
  // Navbar background on scroll
  const navbar = document.getElementById("navbar")
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled")
  } else {
    navbar.classList.remove("scrolled")
  }

  // Back to top button
  const backToTop = document.getElementById("back-to-top")
  if (window.scrollY > 300) {
    backToTop.classList.add("visible")
  } else {
    backToTop.classList.remove("visible")
  }
}, 16)

// Replace the scroll event listener with throttled version
window.addEventListener("scroll", throttledScrollHandler)

// Preload images for better performance
function preloadImages() {
  const imageUrls = certificatesData.map((cert) => cert.image)
  imageUrls.forEach((url) => {
    const img = new Image()
    img.src = url
  })
}

// Initialize preloading
document.addEventListener("DOMContentLoaded", preloadImages)

// Add loading states for better UX
function showLoading(element) {
  element.innerHTML = '<div class="loading">Loading...</div>'
}

function hideLoading(element) {
  element.querySelector(".loading")?.remove()
}

// Error handling for failed image loads
document.addEventListener(
  "error",
  (e) => {
    if (e.target.tagName === "IMG") {
      e.target.src = "assets/image/other/code-typing-animate.svg"
    }
  },
  true,
)

// Accessibility improvements
document.addEventListener("keydown", (e) => {
  // Skip to main content with Tab key
  if (e.key === "Tab" && !e.shiftKey && document.activeElement === document.body) {
    const mainContent = document.querySelector("main") || document.querySelector("#about")
    if (mainContent) {
      mainContent.focus()
      e.preventDefault()
    }
  }
})

// Add focus management for modal
function trapFocus(element) {
  const focusableElements = element.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
  )
  const firstElement = focusableElements[0]
  const lastElement = focusableElements[focusableElements.length - 1]

  element.addEventListener("keydown", (e) => {
    if (e.key === "Tab") {
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus()
          e.preventDefault()
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus()
          e.preventDefault()
        }
      }
    }
  })

  firstElement.focus()
}

// Enhanced modal functionality with focus trapping
function openCertificateModalEnhanced(imageSrc) {
  const modal = document.getElementById("certificate-modal")
  const certificateImage = document.getElementById("certificate-image")

  certificateImage.src = imageSrc
  modal.classList.add("active")
  document.body.style.overflow = "hidden"

  // Trap focus within modal
  trapFocus(modal)
}

// Update the global function
window.openCertificateModal = openCertificateModalEnhanced
