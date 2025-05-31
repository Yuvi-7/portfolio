"use strict";

// element toggle function
const elementToggleFunc = function (elem) {
  elem.classList.toggle("active");
};

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () {
  elementToggleFunc(sidebar);
});

// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
};

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {
  testimonialsItem[i].addEventListener("click", function () {
    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector(
      "[data-testimonials-title]"
    ).innerHTML;
    modalText.innerHTML = this.querySelector(
      "[data-testimonials-text]"
    ).innerHTML;

    testimonialsModalFunc();
  });
}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);

// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () {
  elementToggleFunc(this);
});

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);
  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {
  for (let i = 0; i < filterItems.length; i++) {
    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }
  }
};

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {
  filterBtn[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
}

// contact form variables
// Load environment variables from .env file
// dotenv.config();
// Initialize EmailJS with your user ID

const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// Validation configurations
const VALIDATION_RULES = {
  fullname: {
    min: 2,
    max: 50,
    pattern: /^[a-zA-Z\s]*$/
  },
  email: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  },
  message: {
    min: 10,
    max: 500
  }
};

// Enhanced notification system
function showNotification(message, type = 'success') {
  var notification = document.getElementById("notification");
  notification.textContent = message;
  notification.className = `notification ${type}`;
  notification.style.backgroundColor = type === 'success' ? "#00C896" : "#ff4444";
  notification.classList.add("show");

  setTimeout(() => {
    notification.classList.remove("show");
    notification.classList.add("hide");
  }, 5000);
}

// Validate single input
function validateInput(input) {
  const { name, value } = input;
  const rules = VALIDATION_RULES[name];
  
  if (!rules) return true;

  if (rules.min && value.length < rules.min) {
    return `${name.charAt(0).toUpperCase() + name.slice(1)} must be at least ${rules.min} characters`;
  }
  
  if (rules.max && value.length > rules.max) {
    return `${name.charAt(0).toUpperCase() + name.slice(1)} must be less than ${rules.max} characters`;
  }
  
  if (rules.pattern && !rules.pattern.test(value)) {
    return `Please enter a valid ${name}`;
  }

  return true;
}

// Validate all inputs
function validateForm() {
  let isValid = true;
  let firstError = null;

  formInputs.forEach(input => {
    const validationResult = validateInput(input);
    const errorElement = input.parentElement.querySelector('.error-message');
    
    if (validationResult !== true) {
      isValid = false;
      if (!firstError) firstError = validationResult;
      
      if (!errorElement) {
        const error = document.createElement('div');
        error.className = 'error-message';
        error.textContent = validationResult;
        input.parentElement.appendChild(error);
      } else {
        errorElement.textContent = validationResult;
      }
      
      input.classList.add('error');
    } else {
      if (errorElement) {
        errorElement.remove();
      }
      input.classList.remove('error');
    }
  });

  return { isValid, firstError };
}

// Add input event listeners for real-time validation
formInputs.forEach(input => {
  input.addEventListener("input", () => {
    const { isValid } = validateForm();
    formBtn.disabled = !isValid;
    formBtn.style.opacity = isValid ? "1" : "0.7";
  });
});

// Enhanced form submission
document.addEventListener("DOMContentLoaded", function () {
  // Initialize EmailJS with your public key
  (function() {
    emailjs.init("qz0QT2bu89a1nvbTR");
  })();

  const form = document.querySelector("[data-form]");
  if (!form) return; // Guard clause for null form

  let isSubmitting = false;

  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    if (isSubmitting) return;

    const { isValid, firstError } = validateForm();
    if (!isValid) {
      showNotification(firstError, 'error');
      return;
    }

    const submitBtn = form.querySelector("button[type='submit']");
    const originalBtnText = submitBtn.innerHTML;

    try {
      isSubmitting = true;
      submitBtn.disabled = true;
      formInputs.forEach(input => input.disabled = true);
      submitBtn.innerHTML = '<ion-icon name="sync-outline" class="spin"></ion-icon><span>Sending...</span>';

      // Prepare the template parameters
      const templateParams = {
        from_name: form.querySelector('[name="fullname"]').value,
        from_email: form.querySelector('[name="email"]').value,
        message: form.querySelector('[name="message"]').value,
        to_name: 'Yuvraj', // Your name
        reply_to: form.querySelector('[name="email"]').value,
      };

      // Send email using EmailJS
      const response = await emailjs.send(
        "service_2rqll94", // Your EmailJS service ID
        "template_c5qnzds", // Your EmailJS template ID
        templateParams
      );

      if (response.status === 200) {
        showNotification("Message sent successfully! I'll get back to you soon.");
        form.reset();
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error("Error sending email:", error);
      showNotification(
        "Failed to send message. Please try again later or contact directly via email.", 
        'error'
      );
    } finally {
      isSubmitting = false;
      submitBtn.disabled = false;
      formInputs.forEach(input => input.disabled = false);
      submitBtn.innerHTML = originalBtnText;
    }
  });
});

// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }
  });
}

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
