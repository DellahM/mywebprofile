// Set current year in footer
document.getElementById('current-year').textContent = new Date().getFullYear();

// Mobile menu toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navList = document.querySelector('.nav-list');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        navList.classList.toggle('show');
        mobileMenuBtn.classList.toggle('active');
    });
}

// Add mobile menu styles dynamically
const style = document.createElement('style');
style.textContent = `
    .nav-list.show {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 4rem;
        left: 0;
        width: 100%;
        background-color: var(--background);
        padding: 1rem;
        box-shadow: var(--shadow-md);
        border-bottom: 1px solid var(--border);
        z-index: 50;
    }
    
    .mobile-menu-btn.active span:nth-child(1) {
        transform: translateY(8px) rotate(45deg);
    }
    
    .mobile-menu-btn.active span:nth-child(2) {
        opacity: 0;
    }
    
    .mobile-menu-btn.active span:nth-child(3) {
        transform: translateY(-8px) rotate(-45deg);
    }
`;
document.head.appendChild(style);

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Close mobile menu if open
            if (navList.classList.contains('show')) {
                navList.classList.remove('show');
                mobileMenuBtn.classList.remove('active');
            }
            
            // Scroll to target
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Form submission
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Here you would typically send the form data to a server
        // For this example, we'll just log it and show a success message
        console.log({ name, email, subject, message });
        
        // Show success message
        const formButton = contactForm.querySelector('button[type="submit"]');
        const originalText = formButton.textContent;
        
        formButton.textContent = 'Message Sent!';
        formButton.disabled = true;
        
        // Reset form and button after delay
        setTimeout(() => {
            contactForm.reset();
            formButton.textContent = originalText;
            formButton.disabled = false;
        }, 3000);
    });
}

// Scroll reveal animation with IntersectionObserver
const revealElements = document.querySelectorAll('.section-header, .card, .skills-grid, .projects-grid, .contact-content');

const observerOptions = {
  threshold: 0.25,
  rootMargin: '0px 0px -50px 0px'
};

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const element = entry.target;
      
      // Add staggered delays for cards
      const delay = Array.from(element.parentNode.children).indexOf(element) * 0.15;
      
      element.style.transition = `
        opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${delay}s,
        transform 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${delay}s
      `;
      
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
      
      // Unobserve after animation
      observer.unobserve(element);
    }
  });
}, observerOptions);

// Initialize observer for all elements
revealElements.forEach(element => {
  element.style.opacity = '0';
  element.style.transform = 'translateY(20px)';
  element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  revealObserver.observe(element);
});

