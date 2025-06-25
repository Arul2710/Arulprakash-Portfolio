// ===== Toggle Navbar for Mobile =====
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
  menuIcon.classList.toggle('bx-x');
  navbar.classList.toggle('active');
};

// ===== Scroll Section Active Link + Sticky Header =====
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
  let header = document.querySelector('header');
  header.classList.toggle('sticky', window.scrollY > 100);

  sections.forEach(sec => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 150;
    let height = sec.offsetHeight;
    let id = sec.getAttribute('id');

    if (top >= offset && top < offset + height) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
      });
    }
  });

  // Close navbar after click or scroll
  menuIcon.classList.remove('bx-x');
  navbar.classList.remove('active');
};

// ===== Scroll Reveal Animations =====
ScrollReveal({
  distance: '80px',
  duration: 2000,
  delay: 200
});

ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
ScrollReveal().reveal('.home-img, .services-container, .Project-box, .contact form', { origin: 'bottom' });
ScrollReveal().reveal('.home-content h1, .about-img', { origin: 'left' });
ScrollReveal().reveal('.home-content p, .about-content', { origin: 'right' });

// ===== Typed Text Animation =====
const typed = new Typed('.multiple-text', {
  strings: ['Junior Web Developer', 'Frontend Developer', 'Full Stack Developer'],
  typeSpeed: 100,
  backSpeed: 100,
  backDelay: 1000,
  loop: true
});

// Initialize EmailJS with your User ID
(function() {
  emailjs.init("YQprJfOCBef-vl-Nq"); 
})();
document.getElementById('contactForm').addEventListener('submit', function(event) {
  event.preventDefault();
  
  const form = event.target;
  const alertBox = document.getElementById('formAlert');
  
  // Show loading state
  const submitBtn = form.querySelector('button[type="submit"]');
  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending...';
  
  // Send email using EmailJS
  emailjs.sendForm('service_Arul2710', 'template_i14w539', form)
    .then(function() {
      // Success message
      alertBox.textContent = '✅ Message sent successfully! I will contact you soon.';
      alertBox.className = 'alert success';
      alertBox.style.display = 'block';
      
      // Reset form
      form.reset();
      
      // Scroll to alert
      alertBox.scrollIntoView({ behavior: 'smooth' });
    }, function(error) {
      // Error message
      alertBox.textContent = '❌ Failed to send message. Please try again later or contact me directly at your@email.com';
      alertBox.className = 'alert error';
      alertBox.style.display = 'block';
      
      console.error('Email sending failed:', error);
    })
    .finally(() => {
      // Reset button state
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Message';
    });
});