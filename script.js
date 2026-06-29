/* ==========================================================================
   INITIALIZATION & LUCIDE ICONS
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  // Initialize Lucide Icons
  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }

  // Header Scroll Effect
  const header = document.getElementById("main-header");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // Mobile Menu Toggle
  const mobileMenuToggle = document.getElementById("mobile-menu-toggle");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  mobileMenuToggle.addEventListener("click", () => {
    const isExpanded = mobileMenuToggle.getAttribute("aria-expanded") === "true";
    mobileMenuToggle.setAttribute("aria-expanded", !isExpanded);
    mobileMenuToggle.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      mobileMenuToggle.setAttribute("aria-expanded", "false");
      mobileMenuToggle.classList.remove("active");
      navMenu.classList.remove("active");
    });
  });

  // Scroll Progress Bar
  const scrollProgress = document.getElementById("scroll-progress");
  window.addEventListener("scroll", () => {
    const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    scrollProgress.style.width = scrolled + "%";
  });

  // Back to Top Button
  const backToTopBtn = document.getElementById("back-to-top");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.remove("hidden");
    } else {
      backToTopBtn.classList.add("hidden");
    }
  });

  /* ==========================================================================
     CUSTOM GLOW CURSOR TRAIL
     ========================================================================== */
  const cursorGlow = document.getElementById("cursor-glow");
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let glowX = mouseX;
  let glowY = mouseY;

  // Track real mouse position
  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Smooth interpolation for luxurious delay effect
  function updateGlowPosition() {
    const dx = mouseX - glowX;
    const dy = mouseY - glowY;
    
    // Lerp factor: 0.1 means 10% movement per frame
    glowX += dx * 0.08;
    glowY += dy * 0.08;
    
    cursorGlow.style.left = `${glowX}px`;
    cursorGlow.style.top = `${glowY}px`;
    
    requestAnimationFrame(updateGlowPosition);
  }
  updateGlowPosition();

  /* ==========================================================================
     HERO TEXT ROTATOR
     ========================================================================== */
  const roles = [
    "AI Researcher",
    "Deep Learning Enthusiast",
    "Full Stack Developer",
    "Problem Solver"
  ];
  let roleIndex = 0;
  const roleRotator = document.getElementById("role-rotator");

  function rotateRoles() {
    roleRotator.style.opacity = 0;
    roleRotator.style.transform = "translateY(10px)";
    
    setTimeout(() => {
      roleIndex = (roleIndex + 1) % roles.length;
      roleRotator.textContent = roles[roleIndex];
      roleRotator.style.opacity = 1;
      roleRotator.style.transform = "translateY(0)";
    }, 400); // match CSS duration
  }

  // Initialize transition styling on element
  roleRotator.style.transition = "opacity 0.4s ease, transform 0.4s ease";
  setInterval(rotateRoles, 3000);

  /* ==========================================================================
     AMBIENT PARTICLES CANVAS
     ========================================================================== */
  const canvas = document.getElementById("ambient-particles");
  const ctx = canvas.getContext("2d");
  let particlesArray = [];
  const numberOfParticles = 65;

  // Resize canvas
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  // Particle Class
  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 0.5;
      // Very slow movement speeds for subtle ambient flow
      this.speedX = Math.random() * 0.4 - 0.2;
      this.speedY = Math.random() * 0.4 - 0.2;
      this.alpha = Math.random() * 0.5 + 0.1;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      // Wrap-around borders
      if (this.x > canvas.width) this.x = 0;
      else if (this.x < 0) this.x = canvas.width;
      if (this.y > canvas.height) this.y = 0;
      else if (this.y < 0) this.y = canvas.height;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(192, 132, 252, ${this.alpha})`;
      ctx.fill();
    }
  }

  // Populate particles
  function initParticles() {
    particlesArray = [];
    for (let i = 0; i < numberOfParticles; i++) {
      particlesArray.push(new Particle());
    }
  }
  initParticles();

  // Connect particles when close
  function connectParticles() {
    const maxDistance = 120;
    for (let a = 0; a < particlesArray.length; a++) {
      for (let b = a; b < particlesArray.length; b++) {
        const dx = particlesArray[a].x - particlesArray[b].x;
        const dy = particlesArray[a].y - particlesArray[b].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < maxDistance) {
          const opacity = (1 - (distance / maxDistance)) * 0.1;
          ctx.strokeStyle = `rgba(103, 232, 249, ${opacity})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
          ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
          ctx.stroke();
        }
      }
    }
  }

  // Animation Loop
  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particlesArray.length; i++) {
      particlesArray[i].update();
      particlesArray[i].draw();
    }
    connectParticles();
    requestAnimationFrame(animateParticles);
  }
  animateParticles();

  /* ==========================================================================
     SCROLL REVEAL & STATS COUNTERS
     ========================================================================== */
  const revealElements = document.querySelectorAll(".scroll-reveal");
  const statNumbers = document.querySelectorAll(".stat-number, .res-stat-value");

  // Custom function to animate numbers counting up
  function animateValue(obj, start, end, duration) {
    if (isNaN(end)) return;
    let startTimestamp = null;
    const isFloat = end % 1 !== 0; // Check if we need decimals (like 3.30)

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      let currentValue;
      if (isFloat) {
        currentValue = (progress * (end - start) + start).toFixed(2);
      } else {
        currentValue = Math.floor(progress * (end - start) + start);
      }
      
      obj.textContent = currentValue;
      
      // Preserve prefix/suffix if present in dataset
      if (obj.dataset.target) {
        if (obj.dataset.target.includes("+")) {
          obj.textContent += "+";
        } else if (obj.dataset.target.includes("<")) {
          obj.textContent = "< " + obj.textContent;
        }
      }
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }

  // Intersection Observer for revealing elements on scroll
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        
        // If it's a card containing statistics, trigger the count-up animation
        const stats = entry.target.querySelectorAll(".stat-number, .res-stat-value");
        stats.forEach(stat => {
          if (!stat.classList.contains("counted")) {
            stat.classList.add("counted");
            // Extract raw number value
            let targetString = stat.getAttribute("data-target") || stat.textContent;
            let cleanString = targetString.replace(/[^\d.]/g, "");
            let targetVal = parseFloat(cleanString);
            if (!isNaN(targetVal)) {
              animateValue(stat, 0, targetVal, 1500);
            }
          }
        });

        // Unobserve once revealed to optimize performance
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
  });

  revealElements.forEach(element => {
    revealObserver.observe(element);
  });

  /* ==========================================================================
     ACTIVE NAVIGATION LINK HIGHLIGHTING
     ========================================================================== */
  const sections = document.querySelectorAll("section");
  
  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= (sectionTop - 150)) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href").slice(1) === current) {
        link.classList.add("active");
        link.style.color = "var(--text-primary)";
      } else {
        link.style.color = "var(--text-secondary)";
      }
    });
  });

  /* ==========================================================================
     PROJECT FILTER LOGIC
     ========================================================================== */
  const filterBtns = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      // Toggle active button
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const filterValue = btn.getAttribute("data-filter");

      projectCards.forEach(card => {
        const categories = card.getAttribute("data-category").split(" ");
        
        // Setup fade transition
        card.style.opacity = 0;
        card.style.transform = "scale(0.95)";
        
        setTimeout(() => {
          if (filterValue === "all" || categories.includes(filterValue)) {
            card.classList.remove("hide");
            setTimeout(() => {
              card.style.opacity = 1;
              card.style.transform = "scale(1)";
            }, 50);
          } else {
            card.classList.add("hide");
          }
        }, 300);
      });
    });
  });

  /* ==========================================================================
     DEMO MODAL DIALOG (SANDBOX ENVIRONMENT)
     ========================================================================== */
  const modalOverlay = document.getElementById("demo-modal");
  const modalCloseBtn = modalOverlay.querySelector(".modal-close");
  const modalBtnClose = modalOverlay.querySelector(".modal-btn-close");
  const modalProjectTitle = document.getElementById("modal-project-title");
  const modalProjectSlug = document.getElementById("modal-project-slug");
  const demoButtons = document.querySelectorAll(".demo-trigger");
  const sandboxConsole = modalOverlay.querySelector(".sandbox-console");

  function openDemoModal(projectName) {
    modalProjectTitle.textContent = projectName;
    modalProjectSlug.textContent = projectName.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    
    // Clear dynamic logs
    const dynamicLines = sandboxConsole.querySelectorAll(".dynamic-line");
    dynamicLines.forEach(line => line.remove());
    
    modalOverlay.classList.remove("hidden");
    document.body.style.overflow = "hidden"; // Disable background scrolling

    // Simulate progressive log entries for high-tech premium feel
    const simulatedLogs = [
      { text: "✔ Bundling assets and styles...", delay: 600, color: "text-purple" },
      { text: "✔ Compiling scripts and route bundles...", delay: 1200, color: "text-purple" },
      { text: "ℹ Serving client interface on http://localhost:3000", delay: 1800, color: "text-cyan" },
      { text: "[system] Sandbox virtualized successfully. Input simulation ready.", delay: 2400, color: "text-green" }
    ];

    simulatedLogs.forEach(log => {
      setTimeout(() => {
        const p = document.createElement("p");
        p.className = `log-line dynamic-line ${log.color}`;
        p.textContent = log.text;
        sandboxConsole.appendChild(p);
      }, log.delay);
    });
  }

  function closeDemoModal() {
    modalOverlay.classList.add("hidden");
    document.body.style.overflow = ""; // Re-enable background scrolling
  }

  demoButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const projectName = btn.getAttribute("data-project");
      openDemoModal(projectName);
    });
  });

  modalCloseBtn.addEventListener("click", closeDemoModal);
  modalBtnClose.addEventListener("click", closeDemoModal);
  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) {
      closeDemoModal();
    }
  });

  /* ==========================================================================
     CONTACT FORM HANDLING & SIMULATION
     ========================================================================== */
  const contactForm = document.getElementById("contact-form");
  const formResponse = document.getElementById("form-response");

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Visual loading state
    const submitBtn = contactForm.querySelector("button[type='submit']");
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span>Sending Message...</span> <i class="icon-sm" style="animation: spin 1s linear infinite;">⌛</i>`;

    formResponse.className = "form-feedback-message";
    formResponse.textContent = "";

    // Simulate API connection latency
    setTimeout(() => {
      const isSuccess = true; // Simulating success for verification
      
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;

      if (isSuccess) {
        formResponse.classList.add("success");
        formResponse.textContent = "Thank you! Your message was delivered successfully. I will get back to you shortly.";
        contactForm.reset();
      } else {
        formResponse.classList.add("error");
        formResponse.textContent = "Oops! Something went wrong. Please try connecting via LinkedIn or direct email.";
      }
    }, 1500);
  });
});
