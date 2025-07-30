// TruePath Data Centers - Improved Main JavaScript

// Navigation scroll effects
let lastScrollY = window.scrollY;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScrollY = window.scrollY;
});

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger?.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 100;
            const targetPosition = target.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Form handling
const investorForm = document.getElementById('investor-form');
const formResponse = document.getElementById('form-response');

investorForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(investorForm);
    const data = Object.fromEntries(formData);
    
    // Simulate form submission
    try {
        // In production, this would send to your backend
        console.log('Form data:', data);
        
        // Show success message
        investorForm.style.display = 'none';
        formResponse.style.display = 'block';
        
        // Reset form after 5 seconds
        setTimeout(() => {
            investorForm.reset();
            investorForm.style.display = 'block';
            formResponse.style.display = 'none';
        }, 5000);
        
    } catch (error) {
        console.error('Form submission error:', error);
        alert('There was an error submitting the form. Please try again.');
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-on-scroll');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements
document.addEventListener('DOMContentLoaded', () => {
    // Add animation classes to elements
    const animateElements = [
        '.feature-card',
        '.stat-card',
        '.team-card',
        '.process-step',
        '.cta-card'
    ];
    
    animateElements.forEach(selector => {
        document.querySelectorAll(selector).forEach((el, index) => {
            el.style.opacity = '0';
            el.classList.add(`animate-delay-${(index % 3) + 1}`);
            observer.observe(el);
        });
    });
    
    // Hero stats animation
    const heroStats = document.querySelectorAll('.hero-stat');
    heroStats.forEach((stat, index) => {
        stat.style.opacity = '0';
        stat.style.animation = `fadeInUp 0.8s ease ${0.5 + index * 0.1}s forwards`;
    });
});

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        if (element.dataset.prefix) {
            element.textContent = element.dataset.prefix + Math.floor(current);
        } else {
            element.textContent = Math.floor(current);
        }
        
        if (element.dataset.suffix) {
            element.textContent += element.dataset.suffix;
        }
    }, 16);
}

// Trigger counter animations when stats section is visible
const statsSection = document.querySelector('.stats-section');
if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate stat numbers
                document.querySelectorAll('.stat-number').forEach(stat => {
                    const value = stat.textContent;
                    if (value.includes('MW')) {
                        stat.dataset.suffix = 'MW';
                        animateCounter(stat, parseInt(value));
                    } else if (value.includes('B')) {
                        stat.dataset.prefix = '$';
                        stat.dataset.suffix = 'B';
                        animateCounter(stat, parseFloat(value) * 10) / 10;
                    } else if (value.includes('%')) {
                        stat.dataset.suffix = '%';
                        animateCounter(stat, parseInt(value));
                    }
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statsObserver.observe(statsSection);
}

// Add parallax effect to hero background
const heroBg = document.querySelector('.hero-bg-effect');
const heroImageOverlay = document.querySelector('.hero-image-overlay');

window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const rate = scrolled * -0.5;
    
    if (heroBg) {
        heroBg.style.transform = `translateY(${rate}px)`;
    }
    
    if (heroImageOverlay) {
        heroImageOverlay.style.transform = `translateY(${rate * 0.3}px)`;
    }
});

// Add hover effects to team cards
document.querySelectorAll('.team-card').forEach(card => {
    card.addEventListener('mouseenter', (e) => {
        const avatar = card.querySelector('.team-avatar');
        if (avatar) {
            avatar.style.transform = 'scale(1.1)';
        }
    });
    
    card.addEventListener('mouseleave', (e) => {
        const avatar = card.querySelector('.team-avatar');
        if (avatar) {
            avatar.style.transform = 'scale(1)';
        }
    });
});

// Progressive image loading
function loadImage(img) {
    const src = img.getAttribute('data-src');
    if (!src) return;
    
    const tempImg = new Image();
    tempImg.onload = () => {
        img.src = src;
        img.classList.add('loaded');
    };
    tempImg.src = src;
}

// Lazy load images
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            loadImage(entry.target);
            imageObserver.unobserve(entry.target);
        }
    });
}, { rootMargin: '50px' });

document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
});