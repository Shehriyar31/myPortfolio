     // Preloader functionality
        function hidePreloader() {
            const preloader = document.getElementById('preloader');
            const mainContent = document.getElementById('main-content');
            
            preloader.classList.add('hidden');
            mainContent.classList.add('loaded');
            
            // Remove preloader from DOM after animation
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }

        // Simulate loading time and hide preloader
        window.addEventListener('load', () => {
            // Ensure minimum loading time for smooth UX
            setTimeout(hidePreloader, 2800);
        });

        // Fallback - hide preloader after maximum time
        setTimeout(hidePreloader, 2000);
        // Mobile menu toggle
        const menuToggle = document.getElementById('menu-toggle');
        const navMenu = document.getElementById('nav-menu');

        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!menuToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });

        // Close mobile menu on window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    navMenu.classList.remove('active');
                }
            });
        });

        // Form submission
        // document.getElementById('contact-form').addEventListener('submit', function(e) {
        //     e.preventDefault();
            
        //     const submitBtn = this.querySelector('button[type="submit"]');
        //     const originalText = submitBtn.textContent;
            
        //     submitBtn.textContent = 'Sending...';
        //     submitBtn.disabled = true;
            
        //     setTimeout(() => {
        //         submitBtn.textContent = 'Message Sent!';
        //         submitBtn.style.background = 'var(--secondary)';
        //         this.reset();
                
        //         setTimeout(() => {
        //             submitBtn.textContent = originalText;
        //             submitBtn.style.background = 'var(--primary)';
        //             submitBtn.disabled = false;
        //         }, 3000);
        //     }, 2000);
        // });

        // Typing animation for code block
        function startTypingAnimation() {
            const codeLines = document.querySelectorAll('.code-line');
            codeLines.forEach((line, index) => {
                setTimeout(() => {
                    line.style.opacity = '1';
                    line.style.transform = 'translateX(0)';
                }, (index + 1) * 500);
            });
        }

        // Typewriter effect for hero title
        function typewriterEffect() {
            const texts = [
                'Building <span class="gradient-text">Digital</span> Experiences',
                'Creating <span class="gradient-text">Modern</span> Web Apps',
                'Crafting <span class="gradient-text">Beautiful</span> Interfaces',
                'Developing <span class="gradient-text">Innovative</span> Solutions'
            ];
            
            const typewriterElement = document.getElementById('typewriter-text');
            const heroDescription = document.getElementById('hero-description');
            let textIndex = 0;
            let charIndex = 0;
            let isDeleting = false;
            let isPaused = false;
            
            function type() {
                const currentText = texts[textIndex];
                const displayText = currentText.substring(0, charIndex);
                
                typewriterElement.innerHTML = displayText;
                
                if (!isDeleting && charIndex < currentText.length) {
                    charIndex++;
                    setTimeout(type, 50);
                } else if (!isDeleting && charIndex === currentText.length) {
                    if (textIndex === 0 && !isPaused) {
                        // Show description after first text is complete
                        heroDescription.style.transition = 'opacity 0.8s ease';
                        heroDescription.style.opacity = '1';
                        isPaused = true;
                        setTimeout(() => {
                            isDeleting = true;
                            type();
                        }, 2000);
                    } else {
                        setTimeout(() => {
                            isDeleting = true;
                            type();
                        }, 2000);
                    }
                } else if (isDeleting && charIndex > 0) {
                    charIndex--;
                    setTimeout(type, 30);
                } else if (isDeleting && charIndex === 0) {
                    isDeleting = false;
                    textIndex = (textIndex + 1) % texts.length;
                    setTimeout(type, 500);
                }
            }
            
            type();
        }

        // Start animations when page loads
        window.addEventListener('load', () => {
            setTimeout(() => {
                startTypingAnimation();
                typewriterEffect();
            }, 2000); // Start after preloader
        });