const skills = [
  { logo: "./assets/logo/html.png", width: "50", name: "HTML", category: "Frontend", proficiency: 95 },
  { logo: "./assets/logo/css.png", width: "50", name: "CSS", category: "Frontend", proficiency: 90 },
  { logo: "./assets/logo/js.png", width: "50", name: "JavaScript", category: "Frontend", proficiency: 95 },
  { logo: "./assets/logo/react.png", width: "50", name: "React JS", category: "Frontend", proficiency: 95 },
  { logo: "./assets/logo/next.png", width: "50", name: "Next JS", category: "Frontend", proficiency: 90 },
  { logo: "./assets/logo/ts.png", width: "50", name: "TypeScript", category: "Frontend", proficiency: 85 },
  { logo: "./assets/logo/bootstrap.png", width: "50", name: "Bootstrap", category: "Frontend", proficiency: 90 },
  { logo: "./assets/logo/mui.png", width: "50", name: "Material UI", category: "Frontend", proficiency: 85 },
  { logo: "./assets/logo/redux.png", width: "50", name: "Redux", category: "State Management", proficiency: 90 },
  { logo: "./assets/logo/github.png", width: "50", name: "Github", category: "Version Control", proficiency: 90 },
  { logo: "./assets/logo/electron.png", width: "50", name: "Electron JS", category: "Desktop", proficiency: 85 },
  { logo: "./assets/logo/firebase.png", width: "35", name: "Firebase", category: "Backend", proficiency: 80 },
];

// Enhanced skill list population with animations
const populateSkills = () => {
  const skillList = document.querySelector(".resume .skills-list");
  if (!skillList) return;
  
  skillList.innerHTML = '';
  
  skills.forEach((skill, index) => {
    const li = document.createElement('li');
    li.style.animationDelay = `${index * 0.1}s`;
    
    li.innerHTML = `
      <img src="${skill.logo}" width="${skill.width}" alt="${skill.name}" />
      <span class="tooltiptext">
        ${skill.name}<br>
        <small>${skill.category}</small><br>
        <div class="skill-progress">
          <div class="skill-progress-bar" style="width: ${skill.proficiency}%"></div>
        </div>
      </span>
    `;
    
    // Add hover animations
    li.addEventListener('mouseenter', (e) => {
      const img = e.currentTarget.querySelector('img');
      img.style.transform = 'scale(1.2) rotate(5deg)';
    });
    
    li.addEventListener('mouseleave', (e) => {
      const img = e.currentTarget.querySelector('img');
      img.style.transform = 'scale(1) rotate(0deg)';
    });
    
    // Add floating animation
    li.style.animation = `fadeInUp 0.5s ease forwards ${index * 0.1}s`;
    
    skillList.appendChild(li);
  });
};

// Initialize skills with stagger effect
window.addEventListener('load', () => {
  populateSkills();
  
  // Add scroll reveal animation to skills section in resume
  const skillSection = document.querySelector('.resume .skill');
  if (skillSection) {
    skillSection.style.opacity = '0';
    skillSection.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
      skillSection.style.transition = 'all 0.5s ease';
      skillSection.style.opacity = '1';
      skillSection.style.transform = 'translateY(0)';
    }, 300);
  }
});

// Add this to your existing animations
const style = document.createElement('style');
style.textContent += `
  .skill-progress {
    width: 100%;
    height: 4px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 2px;
    margin-top: 5px;
  }

  .skill-progress-bar {
    height: 100%;
    background: var(--primary-color);
    border-radius: 2px;
    transition: width 1s ease;
  }

  @keyframes skillHover {
    0% { transform: scale(1); }
    50% { transform: scale(1.1) rotate(5deg); }
    100% { transform: scale(1); }
  }
`;
document.head.appendChild(style);

// Element toggle function
const elementToggleFunc = (elem) => elem.classList.toggle("active");

// Sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// Throttle function to limit function calls
const throttle = (func, limit) => {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// Sidebar toggle functionality
sidebarBtn?.addEventListener("click", () => elementToggleFunc(sidebar));

// Page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// Add page switching animation
const switchPage = (targetPage) => {
  const currentPage = document.querySelector(".active[data-page]");
  currentPage?.classList.add("fade-out");
  
  setTimeout(() => {
    pages.forEach((page) => page.classList.remove("active", "fade-out"));
    targetPage.classList.add("active", "fade-in");
  }, 300);
};

// Navigation functionality
navigationLinks.forEach((link) => {
  link.addEventListener("click", function () {
    navigationLinks.forEach((navLink) => navLink.classList.remove("active"));
    this.classList.add("active");
    
    const targetPage = document.querySelector(`[data-page="${this.innerHTML.toLowerCase()}"]`);
    switchPage(targetPage);
  });
});

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.2,
  rootMargin: "50px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate");
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe elements that should animate on scroll
document.querySelectorAll(".service-item, .timeline-item, .project-item").forEach((item) => {
  observer.observe(item);
});

// Contact form functionality
const contactForm = document.querySelector(".form");
const notification = document.querySelector("#notification");

const showNotification = (message, isError = false) => {
  notification.textContent = message;
  notification.classList.add("show");
  notification.style.backgroundColor = isError ? "#ff4444" : "#00C896";
  notification.style.color = "#fff";
  notification.style.padding = "10px 20px";
  notification.style.borderRadius = "5px";
  notification.style.position = "fixed";
  notification.style.top = "20px";
  notification.style.right = "20px";
  notification.style.zIndex = "9999";
  notification.style.transform = "translateY(0)";
  notification.style.transition = "all 0.3s ease";
  
  setTimeout(() => {
    notification.style.transform = "translateY(-100%)";
    setTimeout(() => {
      notification.classList.remove("show");
    }, 300);
  }, 3000);
};

contactForm?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(contactForm);
  const submitBtn = contactForm.querySelector("button[type='submit']");
  const formInputs = contactForm.querySelectorAll("input, textarea");
  
  try {
    submitBtn.disabled = true;
    formInputs.forEach(input => input.disabled = true);
    submitBtn.innerHTML = '<ion-icon name="sync-outline"></ion-icon><span>Sending...</span>';
    submitBtn.style.opacity = "0.7";
    
    // Simulate email sending (replace with your actual EmailJS configuration)
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    showNotification("Message sent successfully!");
    contactForm.reset();
  } catch (error) {
    console.error("Error sending email:", error);
    showNotification("Failed to send message. Please try again.", true);
  } finally {
    submitBtn.disabled = false;
    formInputs.forEach(input => input.disabled = false);
    submitBtn.innerHTML = '<ion-icon name="paper-plane"></ion-icon><span>Send Message</span>';
    submitBtn.style.opacity = "1";
  }
});

// Enable submit button when form is valid
const formInputs = contactForm?.querySelectorAll("[data-form-input]");
formInputs?.forEach(input => {
  input.addEventListener("input", () => {
    const submitBtn = contactForm.querySelector("[data-form-btn]");
    const isValid = Array.from(formInputs).every(input => input.value.trim() !== "");
    submitBtn.disabled = !isValid;
    submitBtn.style.opacity = isValid ? "1" : "0.7";
  });
});

// Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Theme functionality
const initializeTheme = () => {
  const savedTheme = localStorage.getItem('theme') || 'dark';
  document.body.classList.toggle('light-mode', savedTheme === 'light');
  
  // Update meta theme-color
  const metaThemeColor = document.querySelector('meta[name="theme-color"]');
  if (metaThemeColor) {
    metaThemeColor.content = savedTheme === 'light' ? '#ffffff' : '#1e1e1e';
  }
};

const toggleTheme = () => {
  const currentTheme = document.body.classList.contains('light-mode') ? 'light' : 'dark';
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  
  document.body.classList.toggle('light-mode');
  localStorage.setItem('theme', newTheme);
  
  // Update meta theme-color
  const metaThemeColor = document.querySelector('meta[name="theme-color"]');
  if (metaThemeColor) {
    metaThemeColor.content = newTheme === 'light' ? '#ffffff' : '#1e1e1e';
  }
};

// Initialize theme on page load
document.addEventListener('DOMContentLoaded', initializeTheme);

// Smooth reveal animation for sections
const revealSection = (entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('reveal');
      observer.unobserve(entry.target);
    }
  });
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

document.querySelectorAll('section').forEach(section => {
  section.classList.add('hidden');
  sectionObserver.observe(section);
});

// Animate skill icons on hover
document.querySelectorAll('.skills-list li').forEach(skill => {
  skill.addEventListener('mouseenter', (e) => {
    e.target.style.transform = `translateY(-10px) rotate(${Math.random() * 20 - 10}deg)`;
  });
  
  skill.addEventListener('mouseleave', (e) => {
    e.target.style.transform = 'translateY(0) rotate(0)';
  });
});

// Add parallax effect to service items
document.querySelectorAll('.service-item').forEach(item => {
  item.addEventListener('mousemove', (e) => {
    const rect = item.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const xPercent = (x / rect.width - 0.5) * 20;
    const yPercent = (y / rect.height - 0.5) * 20;
    
    item.style.transform = `perspective(1000px) rotateX(${yPercent}deg) rotateY(${xPercent}deg) scale3d(1.05, 1.05, 1.05)`;
  });
  
  item.addEventListener('mouseleave', () => {
    item.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
  });
});

// Add typing effect to the name
const nameElement = document.querySelector('.name');
const originalName = nameElement.textContent;
nameElement.textContent = '';

const typeWriter = (text, element, i = 0) => {
  if (i < text.length) {
    element.textContent += text.charAt(i);
    setTimeout(() => typeWriter(text, element, i + 1), 100);
  }
};

// Start typing effect after a short delay
setTimeout(() => {
  typeWriter(originalName, nameElement);
}, 1000);

// Add magnetic effect to buttons
document.querySelectorAll('.form-btn, .info_more-btn').forEach(button => {
  button.addEventListener('mousemove', (e) => {
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const deltaX = (x - centerX) / centerX;
    const deltaY = (y - centerY) / centerY;
    
    button.style.transform = `translate(${deltaX * 10}px, ${deltaY * 10}px)`;
  });
  
  button.addEventListener('mouseleave', () => {
    button.style.transform = 'translate(0, 0)';
  });
});

// Add ripple effect to clickable elements
const addRippleEffect = (element) => {
  element.addEventListener('click', (e) => {
    const ripple = document.createElement('div');
    ripple.classList.add('ripple');
    
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${e.clientX - rect.left - size/2}px`;
    ripple.style.top = `${e.clientY - rect.top - size/2}px`;
    
    element.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 1000);
  });
};

document.querySelectorAll('button, .service-item, .project-item').forEach(addRippleEffect);

// Add smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Modern scroll animations
const scrollAnimations = () => {
  const elements = document.querySelectorAll('.animate-on-scroll');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        
        // Add custom animations based on data attribute
        const animation = entry.target.dataset.animation;
        if (animation) {
          entry.target.style.animation = animation;
        }
      }
    });
  }, { threshold: 0.1 });
  
  elements.forEach(el => observer.observe(el));
};

// 3D Tilt effect
const tiltEffect = (element) => {
  element.addEventListener('mousemove', (e) => {
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
  });
  
  element.addEventListener('mouseleave', () => {
    element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
  });
};

// Apply tilt effect to cards
document.querySelectorAll('.service-item, .project-item').forEach(tiltEffect);

// Magnetic button effect
const magneticButtons = document.querySelectorAll('.form-btn, .info_more-btn');

magneticButtons.forEach(button => {
  button.addEventListener('mousemove', (e) => {
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const deltaX = (x - centerX) / centerX;
    const deltaY = (y - centerY) / centerY;
    
    button.style.transform = `translate(${deltaX * 10}px, ${deltaY * 10}px)`;
  });
  
  button.addEventListener('mouseleave', () => {
    button.style.transform = 'translate(0, 0)';
  });
});

// Smooth section transitions
const smoothTransition = (target) => {
  target.style.opacity = '0';
  target.style.transform = 'translateY(20px)';
  
  requestAnimationFrame(() => {
    target.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    target.style.opacity = '1';
    target.style.transform = 'translateY(0)';
  });
};

// Apply smooth transitions to sections
document.querySelectorAll('section').forEach(section => {
  section.classList.add('animate-on-scroll');
  section.dataset.animation = 'fadeInUp 0.5s ease forwards';
});

// Initialize animations
scrollAnimations();

// Particle text effect for headings
const createParticleText = (element) => {
  const text = element.textContent;
  element.textContent = '';
  
  [...text].forEach((char, i) => {
    const span = document.createElement('span');
    span.textContent = char;
    span.style.animationDelay = `${i * 0.1}s`;
    span.classList.add('particle-text');
    element.appendChild(span);
  });
};

// Apply particle text effect to headings
document.querySelectorAll('.article-title').forEach(createParticleText);

// Add this CSS to your stylesheet
const style = document.createElement('style');
style.textContent = `
  .particle-text {
    display: inline-block;
    opacity: 0;
    transform: translateY(20px);
    animation: particleIn 0.5s ease forwards;
  }
  
  @keyframes particleIn {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .animate-on-scroll {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.5s ease, transform 0.5s ease;
  }
  
  .animate-on-scroll.animate {
    opacity: 1;
    transform: translateY(0);
  }
`;

document.head.appendChild(style);

// Skill progress animation
const animateSkills = () => {
  const skills = document.querySelectorAll('.skills-list li');
  
  skills.forEach((skill, index) => {
    skill.style.animation = `fadeInUp 0.5s ease forwards ${index * 0.1}s`;
    skill.style.opacity = '0';
    
    skill.addEventListener('mouseenter', () => {
      skill.style.transform = 'scale(1.1) rotate(5deg)';
    });
    
    skill.addEventListener('mouseleave', () => {
      skill.style.transform = 'scale(1) rotate(0)';
    });
  });
};

animateSkills();

// Initialize all animations
window.addEventListener('load', () => {
  scrollAnimations();
  document.body.classList.add('loaded');
});


