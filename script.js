// Toggle navigation menu visibility on hamburger click
function toggleMenu() {
  const nav = document.querySelector('nav[role="navigation"]');
  if (!nav) {
    console.error('Navigation element not found!');
    return;
  }
  nav.classList.toggle('active');
}

// Smooth scrolling for nav links
function smoothScroll() {
  const links = document.querySelectorAll('nav[role="navigation"] a[href^="#"]');
  links.forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

// Filter projects by category
function filterProjects(category) {
  const projects = document.querySelectorAll('.project');
  projects.forEach(project => {
    const projectCategories = project.getAttribute('data-category').split(' ');
    if (category === 'all' || projectCategories.includes(category)) {
      project.style.display = 'block';
    } else {
      project.style.display = 'none';
    }
  });
}

// Open lightbox modal with project image
function openLightbox(imageSrc, altText) {
  const lightbox = document.getElementById('lightbox-modal');
  const lightboxImage = document.getElementById('lightbox-image');
  if (!lightbox || !lightboxImage) {
    console.error('Lightbox elements not found!');
    return;
  }
  lightboxImage.src = imageSrc;
  lightboxImage.alt = altText;
  lightbox.style.display = 'flex';
  document.body.style.overflow = 'hidden'; // prevent background scroll
}

// Close lightbox modal
function closeLightbox() {
  const lightbox = document.getElementById('lightbox-modal');
  if (!lightbox) return;
  lightbox.style.display = 'none';
  document.body.style.overflow = 'auto';
}

// Validate contact form inputs
function validateForm() {
  const form = document.querySelector('#contact form');
  if (!form) {
    console.error('Contact form not found!');
    return false;
  }

  const name = form.elements['name'];
  const email = form.elements['email'];
  const message = form.elements['message'];
  let valid = true;

  // Clear previous errors
  form.querySelectorAll('.error-message').forEach(el => el.remove());

  function showError(input, message) {
    valid = false;
    const error = document.createElement('div');
    error.className = 'error-message';
    error.style.color = 'red';
    error.style.fontSize = '0.9em';
    error.textContent = message;
    input.parentNode.insertBefore(error, input.nextSibling);
  }

  if (!name.value.trim()) {
    showError(name, 'Name is required.');
  }

  if (!email.value.trim()) {
    showError(email, 'Email is required.');
  } else {
    // Basic email regex check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value.trim())) {
      showError(email, 'Please enter a valid email address.');
    }
  }

  if (!message.value.trim()) {
    showError(message, 'Message cannot be empty.');
  }

  return valid;
}

// Handle form submission
function handleFormSubmit(event) {
  event.preventDefault();
  if (validateForm()) {
    // Example success feedback — replace with actual submission logic if needed
    alert('Thank you for contacting us! We will get back to you soon.');
    event.target.reset();
  }
}

// Attach event listeners and initialize features on DOM load
document.addEventListener('DOMContentLoaded', () => {
  // Hamburger menu toggle
  const navToggle = document.getElementById('nav-toggle');
  if (navToggle) {
    navToggle.addEventListener('click', toggleMenu);
  }

  // Smooth scrolling nav links
  smoothScroll();

  // Project filter buttons
  const filterButtons = document.querySelectorAll('.filter-button');
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const category = button.getAttribute('data-filter');
      filterProjects(category);
      // Optional: update active filter button styles
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
    });
  });

  // Lightbox open on project image click
  const projectImages = document.querySelectorAll('.project img');
  projectImages.forEach(img => {
    img.addEventListener('click', () => {
      openLightbox(img.src, img.alt);
    });
  });

  // Lightbox close on modal click (outside image)
  const lightbox = document.getElementById('lightbox-modal');
  if (lightbox) {
    lightbox.addEventListener('click', e => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });
  }

  // Contact form submission
  const contactForm = document.querySelector('#contact form');
  if (contactForm) {
    contactForm.addEventListener('submit', handleFormSubmit);
  }
});
