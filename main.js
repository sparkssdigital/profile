// main.js

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');

  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const icon = mobileMenuBtn.querySelector('i');
      if (icon) {
        if (navLinks.classList.contains('active')) {
          icon.classList.remove('fa-bars');
          icon.classList.add('fa-times');
        } else {
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        }
      }
    });
  }

  // Active Link State Management based on current URL
  const currentPath = window.location.pathname;
  const navItems = document.querySelectorAll('.nav-links a');

  navItems.forEach(link => {
    // Basic logic to add 'active' class (assuming simple file structure)
    if (link.getAttribute('href') !== '#' && currentPath.includes(link.getAttribute('href'))) {
      link.classList.add('active');
    } else if (currentPath === '/' || currentPath.endsWith('index.html')) {
      if (link.getAttribute('href') === 'index.html' || link.getAttribute('href') === '/') {
        link.classList.add('active');
      }
    }
  });


  // ========== STATS COUNTER ANIMATION ==========
  const statNumbers = document.querySelectorAll('.hero-stat-number');

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const finalValue = target.textContent;
        const numericValue = parseInt(finalValue.replace(/\D/g, ''));
        const suffix = finalValue.replace(/\d/g, '');

        let currentValue = 0;
        const duration = 2000;
        const step = numericValue / (duration / 16);

        const counter = setInterval(() => {
          currentValue += step;
          if (currentValue >= numericValue) {
            target.textContent = finalValue;
            clearInterval(counter);
          } else {
            target.textContent = Math.floor(currentValue) + suffix;
          }
        }, 16);

        statsObserver.unobserve(target);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(stat => {
    statsObserver.observe(stat);
  });


  // Intersection Observer for Scroll Animations
  const faders = document.querySelectorAll('.fade-in');

  const appearOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
  };

  const appearOnScroll = new IntersectionObserver(function (entries, observer) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        return;
      } else {
        entry.target.classList.add('appear');
        observer.unobserve(entry.target);
      }
    });
  }, appearOptions);

  faders.forEach(fader => {
    appearOnScroll.observe(fader);
  });
});
