// Main JavaScript functionality
class TrustwaveApp {
    constructor() {
        this.init();
    }

    init() {
        this.initMobileMenu();
        this.initScrollEffects();
        this.initSmoothScrolling();
        this.initServiceTabs();
        this.initContactForms();
    }

    initMobileMenu() {
        const mobileToggle = document.querySelector(".mobile-toggle");
        const navMenu = document.querySelector(".nav-menu");

        if (mobileToggle && navMenu) {
            mobileToggle.addEventListener("click", () => {
                navMenu.classList.toggle("active");
                const icon = mobileToggle.querySelector("i");
                icon.classList.toggle("fa-bars");
                icon.classList.toggle("fa-times");
            });
        }

        // Close mobile menu when clicking on a link
        document.querySelectorAll(".nav-menu a").forEach((link) => {
            link.addEventListener("click", () => {
                if (navMenu) navMenu.classList.remove("active");
                if (mobileToggle) {
                    mobileToggle.querySelector("i").classList.add("fa-bars");
                    mobileToggle.querySelector("i").classList.remove("fa-times");
                }
            });
        });
    }

    initScrollEffects() {
        // Header scroll effect
        window.addEventListener("scroll", () => {
            const header = document.getElementById("header");
            if (header) {
                if (window.scrollY > 100) {
                    header.classList.add("scrolled");
                } else {
                    header.classList.remove("scrolled");
                }
            }

            // Scroll to top button
            const scrollTop = document.querySelector(".scroll-top");
            if (scrollTop) {
                if (window.scrollY > 300) {
                    scrollTop.classList.add("active");
                } else {
                    scrollTop.classList.remove("active");
                }
            }
        });

        // Scroll to top functionality
        document.querySelector(".scroll-top")?.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        });
    }

    initSmoothScrolling() {
        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
            anchor.addEventListener("click", function (e) {
                const href = this.getAttribute("href");
                
                // Skip if it's just "#" or external link
                if (href === "#" || href.startsWith("http") || href.startsWith("tel") || href.startsWith("mailto")) {
                    return;
                }

                e.preventDefault();
                
                const targetId = href;
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const headerHeight = document.querySelector('header')?.offsetHeight || 0;
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: "smooth",
                    });
                }
            });
        });
    }

    initServiceTabs() {
        const serviceTabs = document.querySelectorAll(".service-tab");
        const serviceContents = document.querySelectorAll(".services-content");

        serviceTabs.forEach((tab) => {
            tab.addEventListener("click", () => {
                const tabId = tab.getAttribute("data-tab");

                // Update active tab
                serviceTabs.forEach((t) => t.classList.remove("active"));
                tab.classList.add("active");

                // Show corresponding content
                serviceContents.forEach((content) => {
                    content.classList.remove("active");
                    if (content.id === `${tabId}-content`) {
                        content.classList.add("active");
                    }
                });
            });
        });
    }

    initContactForms() {
        // Basic form validation and submission
        document.querySelectorAll('form[id="contactForm"]').forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmission(form);
            });
        });
    }

    handleFormSubmission(form) {
        const formData = new FormData(form);
        const formValues = Object.fromEntries(formData.entries());
        
        // Simple validation
        if (!formValues.name || !formValues.email || !formValues.phone) {
            this.showMessage('Please fill in all required fields.', 'error', form);
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formValues.email)) {
            this.showMessage('Please enter a valid email address.', 'error', form);
            return;
        }

        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = 'Sending... <div class="spinner"></div>';
        submitBtn.disabled = true;

        // Simulate form submission
        setTimeout(() => {
            this.showMessage(
                `Thank you ${formValues.name}! Your message has been sent successfully. We will contact you soon.`,
                'success',
                form
            );
            form.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 2000);
    }

    showMessage(text, type, form) {
        let messageDiv = form.querySelector('.form-message');
        if (!messageDiv) {
            messageDiv = document.createElement('div');
            messageDiv.className = 'form-message';
            form.appendChild(messageDiv);
        }
        
        messageDiv.textContent = text;
        messageDiv.className = `form-message ${type}`;
        messageDiv.style.display = 'block';

        // Auto-hide success messages after 5 seconds
        if (type === 'success') {
            setTimeout(() => {
                messageDiv.style.display = 'none';
            }, 5000);
        }
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new TrustwaveApp();
});

// Simple smooth scrolling implementation
function initSimpleSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('header')?.offsetHeight || 0;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL
                history.replaceState(null, null, targetId);
            }
        });
    });
}

// Add this to your existing initialization
document.addEventListener('DOMContentLoaded', () => {
    initSimpleSmoothScroll();
    // ... your other initializations
});