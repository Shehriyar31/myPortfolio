// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initializeApp();
});

// Main initialization function
function initializeApp() {
    initializeLoading();
    initializeNavigation();
    initializeTypingEffect();
    initializeScrollAnimations();
    initializeSkillBars();
    initializeCounters();
    initializeProjectFilters();
    initializeProjectModals();
    initializeContactForm();
    initializeBackToTop();
    initializeIntersectionObserver();
}

// Loading Screen
function initializeLoading() {
    const loadingScreen = document.getElementById('loading-screen');
    
    window.addEventListener('load', function() {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }, 1000);
    });
}

// Navigation
function initializeNavigation() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Active navigation link based on scroll position
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = targetSection.offsetTop - navbarHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Typing Effect
function initializeTypingEffect() {
    const typingText = document.getElementById('typing-text');
    const phrases = [
        'Full Stack Developer',
        'Frontend Specialist',
        'Backend Engineer',
        'UI/UX Enthusiast',
        'Problem Solver'
    ];
    
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function typeEffect() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            typingText.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingText.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }
        
        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            typingSpeed = 2000; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 500; // Pause before next phrase
        }
        
        setTimeout(typeEffect, typingSpeed);
    }
    
    typeEffect();
}

// Scroll Animations
function initializeScrollAnimations() {
    const animateElements = document.querySelectorAll('.hero-text, .hero-image, .about-text, .about-images, .section-header');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('hero-text') || entry.target.classList.contains('about-text')) {
                    entry.target.classList.add('fade-in-left');
                } else if (entry.target.classList.contains('hero-image') || entry.target.classList.contains('about-images')) {
                    entry.target.classList.add('fade-in-right');
                } else {
                    entry.target.classList.add('fade-in');
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animateElements.forEach(element => {
        observer.observe(element);
    });
}

// Skill Bars Animation
function initializeSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const targetWidth = progressBar.getAttribute('data-width');
                
                setTimeout(() => {
                    progressBar.style.width = targetWidth + '%';
                }, 200);
                
                skillObserver.unobserve(progressBar);
            }
        });
    }, {
        threshold: 0.5
    });
    
    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });
}

// Counter Animation
function initializeCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const increment = target / 50;
                let current = 0;
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        counter.textContent = target;
                        clearInterval(timer);
                    } else {
                        counter.textContent = Math.ceil(current);
                    }
                }, 40);
                
                counterObserver.unobserve(counter);
            }
        });
    }, {
        threshold: 0.5
    });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// Project Filters
function initializeProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.transform = 'scale(1)';
                        card.style.opacity = '1';
                    }, 10);
                } else {
                    card.style.transform = 'scale(0.8)';
                    card.style.opacity = '0';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Project Modals
function initializeProjectModals() {
    const modal = document.getElementById('project-modal');
    const modalBody = document.getElementById('modal-body');
    const closeModal = document.querySelector('.modal-close');
    const projectLinks = document.querySelectorAll('[data-project]');
    
    const projectDetails = {
        1: {
            title: 'E-commerce Platform',
            description: 'A comprehensive e-commerce solution built with modern technologies, featuring user authentication, product management, shopping cart functionality, and secure payment processing.',
            technologies: ['React', 'Node.js', 'MongoDB', 'Stripe API', 'JWT Authentication', 'Redux'],
            features: [
                'User registration and authentication',
                'Product catalog with search and filtering',
                'Shopping cart and wishlist functionality',
                'Secure payment processing with Stripe',
                'Order tracking and history',
                'Admin dashboard for inventory management',
                'Responsive design for all devices',
                'Real-time inventory updates'
            ],
            challenges: 'The main challenge was implementing real-time inventory management and ensuring secure payment processing while maintaining optimal performance.',
            github: 'https://github.com/example/ecommerce-platform',
            live: 'https://ecommerce-demo.example.com'
        },
        2: {
            title: 'Task Management App',
            description: 'A collaborative project management tool that enables teams to organize tasks, track progress, and communicate effectively in real-time.',
            technologies: ['Vue.js', 'Socket.io', 'Express.js', 'PostgreSQL', 'JWT', 'Vuex'],
            features: [
                'Real-time collaboration and updates',
                'Drag-and-drop task management',
                'Team member assignment and notifications',
                'Project timelines and deadlines',
                'File attachments and comments',
                'Progress tracking and reporting',
                'Mobile-responsive interface',
                'Integration with popular tools'
            ],
            challenges: 'Implementing real-time synchronization across multiple users while maintaining data consistency was the primary technical challenge.',
            github: 'https://github.com/example/task-manager',
            live: 'https://taskmanager-demo.example.com'
        },
        3: {
            title: 'Weather Dashboard',
            description: 'An intuitive weather application providing detailed forecasts, interactive maps, and personalized weather alerts for multiple locations.',
            technologies: ['React Native', 'OpenWeather API', 'Google Maps API', 'Redux', 'AsyncStorage'],
            features: [
                'Current weather conditions',
                '7-day detailed forecasts',
                'Interactive weather maps',
                'Location-based weather alerts',
                'Favorite locations management',
                'Offline data caching',
                'Beautiful weather animations',
                'Push notifications for severe weather'
            ],
            challenges: 'Optimizing API calls to provide real-time weather data while managing offline functionality and battery consumption.',
            github: 'https://github.com/example/weather-app',
            live: 'https://weather-demo.example.com'
        },
        4: {
            title: 'Social Media API',
            description: 'A robust RESTful API backend for a social media platform with comprehensive features for user interaction, content management, and real-time messaging.',
            technologies: ['Node.js', 'Express.js', 'MongoDB', 'JWT', 'Socket.io', 'Redis'],
            features: [
                'User authentication and authorization',
                'Post creation, editing, and deletion',
                'Real-time messaging system',
                'Friend/follower management',
                'Content moderation tools',
                'Image and video upload handling',
                'Rate limiting and security measures',
                'Comprehensive API documentation'
            ],
            challenges: 'Designing a scalable architecture that handles high concurrent users while maintaining data security and implementing efficient caching strategies.',
            github: 'https://github.com/example/social-api',
            live: 'https://api-demo.example.com'
        }
    };
    
    projectLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const projectId = this.getAttribute('data-project');
            const project = projectDetails[projectId];
            
            if (project) {
                modalBody.innerHTML = `
                    <div class="modal-project-details">
                        <h2>${project.title}</h2>
                        <p class="project-modal-description">${project.description}</p>
                        
                        <div class="modal-section">
                            <h3>Technologies Used</h3>
                            <div class="modal-tech-tags">
                                ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                            </div>
                        </div>
                        
                        <div class="modal-section">
                            <h3>Key Features</h3>
                            <ul class="feature-list">
                                ${project.features.map(feature => `<li>${feature}</li>`).join('')}
                            </ul>
                        </div>
                        
                        <div class="modal-section">
                            <h3>Challenges & Solutions</h3>
                            <p>${project.challenges}</p>
                        </div>
                        
                        <div class="modal-actions">
                            <a href="${project.github}" target="_blank" class="btn btn-secondary">
                                <i class="fab fa-github"></i> View Code
                            </a>
                            <a href="${project.live}" target="_blank" class="btn btn-primary">
                                <i class="fas fa-external-link-alt"></i> Live Demo
                            </a>
                        </div>
                    </div>
                `;
                
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    closeModal.addEventListener('click', closeModalFunction);
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModalFunction();
        }
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModalFunction();
        }
    });
    
    function closeModalFunction() {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Contact Form
function initializeContactForm() {
    const form = document.getElementById('contact-form');
    const inputs = form.querySelectorAll('input, textarea');
    
    // Form validation
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            clearError(this);
        });
    });
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        inputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });
        
        if (isValid) {
            submitForm(form);
        }
    });
    
    function validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        const errorElement = document.getElementById(fieldName + '-error');
        
        clearError(field);
        
        if (!value) {
            showError(field, `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`);
            return false;
        }
        
        if (fieldName === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                showError(field, 'Please enter a valid email address');
                return false;
            }
        }
        
        if (fieldName === 'message' && value.length < 10) {
            showError(field, 'Message must be at least 10 characters long');
            return false;
        }
        
        return true;
    }
    
    function showError(field, message) {
        const errorElement = document.getElementById(field.name + '-error');
        errorElement.textContent = message;
        field.style.borderColor = '#ff4444';
    }
    
    function clearError(field) {
        const errorElement = document.getElementById(field.name + '-error');
        errorElement.textContent = '';
        field.style.borderColor = '';
    }
    
    function submitForm(form) {
        const submitBtn = form.querySelector('button[type="submit"]');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnIcon = submitBtn.querySelector('i');
        
        // Show loading state
        submitBtn.disabled = true;
        btnText.textContent = 'Sending...';
        btnIcon.className = 'fas fa-spinner fa-spin';
        
        // Simulate form submission (replace with actual form submission logic)
        setTimeout(() => {
            // Success state
            btnText.textContent = 'Message Sent!';
            btnIcon.className = 'fas fa-check';
            
            // Reset form
            form.reset();
            
            // Reset button after delay
            setTimeout(() => {
                submitBtn.disabled = false;
                btnText.textContent = 'Send Message';
                btnIcon.className = 'fas fa-paper-plane';
            }, 2000);
            
            // Show success message
            showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
        }, 2000);
    }
}

// Back to Top Button
function initializeBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Intersection Observer for animations
function initializeIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationDelay = '0.1s';
                entry.target.style.animationFillMode = 'forwards';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.project-card, .skill-item, .tech-item, .contact-item');
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add notification styles if not already present
    if (!document.querySelector('.notification-styles')) {
        const styles = document.createElement('style');
        styles.className = 'notification-styles';
        styles.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                background: var(--bg-secondary);
                color: var(--text-primary);
                padding: var(--spacing-md);
                border-radius: var(--border-radius);
                border-left: 4px solid var(--primary-gradient);
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
                z-index: 3000;
                display: flex;
                align-items: center;
                justify-content: space-between;
                max-width: 400px;
                animation: slideInRight 0.3s ease;
            }
            
            .notification-success {
                border-left-color: #4CAF50;
            }
            
            .notification-content {
                display: flex;
                align-items: center;
                gap: var(--spacing-sm);
            }
            
            .notification-close {
                background: none;
                border: none;
                color: var(--text-secondary);
                cursor: pointer;
                padding: var(--spacing-xs);
                margin-left: var(--spacing-md);
            }
            
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(styles);
    }
    
    document.body.appendChild(notification);
    
    // Close notification
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', function() {
        notification.style.animation = 'slideInRight 0.3s ease reverse';
        setTimeout(() => {
            notification.remove();
        }, 300);
    });
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideInRight 0.3s ease reverse';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }
    }, 5000);
}

// Utility function for smooth scrolling
function smoothScrollTo(target, duration = 1000) {
    const targetPosition = target.offsetTop - 80;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;
    
    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }
    
    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }
    
    requestAnimationFrame(animation);
}

// Additional modal styles
const modalStyles = `
    .modal-project-details h2 {
        font-size: 2rem;
        margin-bottom: var(--spacing-lg);
        background: var(--text-gradient);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }
    
    .project-modal-description {
        color: var(--text-secondary);
        margin-bottom: var(--spacing-xl);
        line-height: 1.8;
    }
    
    .modal-section {
        margin-bottom: var(--spacing-xl);
    }
    
    .modal-section h3 {
        font-size: 1.3rem;
        margin-bottom: var(--spacing-md);
        color: var(--text-primary);
    }
    
    .modal-tech-tags {
        display: flex;
        flex-wrap: wrap;
        gap: var(--spacing-xs);
    }
    
    .feature-list {
        list-style: none;
        padding: 0;
    }
    
    .feature-list li {
        padding: var(--spacing-xs) 0;
        color: var(--text-secondary);
        position: relative;
        padding-left: var(--spacing-lg);
    }
    
    .feature-list li::before {
        content: '✓';
        position: absolute;
        left: 0;
        color: #ff9800;
        font-weight: bold;
    }
    
    .modal-actions {
        display: flex;
        gap: var(--spacing-md);
        margin-top: var(--spacing-xl);
        flex-wrap: wrap;
    }
`;

// Add modal styles to head
const styleSheet = document.createElement('style');
styleSheet.textContent = modalStyles;
document.head.appendChild(styleSheet);

// Performance optimization: Lazy loading for images
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Call lazy loading if needed
// initializeLazyLoading();
