// Enhanced Components Loader with better error handling
class ComponentsLoader {
    constructor() {
        this.components = {};
        this.init();
    }

    async init() {
        try {
            await this.loadComponents();
            this.renderComponents();
            this.initializeComponents();
        } catch (error) {
            console.error('Components loader initialization failed:', error);
            this.loadFallbackComponents();
        }
    }

    async loadComponents() {
        const components = ['header', 'footer'];
        const basePath = this.getBasePath();
        
        for (const component of components) {
            try {
                const componentPath = `${basePath}components/${component}.html`;
                console.log(`Loading component from: ${componentPath}`);
                
                const response = await fetch(componentPath);
                
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status} - ${response.statusText}`);
                }
                
                this.components[component] = await response.text();
                console.log(`✅ ${component} component loaded successfully`);
                
            } catch (error) {
                console.warn(`❌ Failed to load ${component} component:`, error);
                this.components[component] = this.getFallbackComponent(component);
            }
        }
    }

    getBasePath() {
        // Determine the base path based on current page location
        const currentPath = window.location.pathname;
        if (currentPath.includes('/') && !currentPath.endsWith('/')) {
            return './';
        }
        return '';
    }

    getFallbackComponent(component) {
        const components = {
            header: `
                <header id="header">
                    <div class="container header-container">
                        <div class="logo">
                            <a href="./index.html">
                                <img src="./images/Trustwaveit2.png" alt="Trustwave IT Solutions" onerror="this.style.display='none'" />
                                <span style="font-size: 1.8rem; color: #1a3a8f; font-weight: 700; margin-left: 10px;">Trustwave<span style="color: #ff6b35;">IT</span></span>
                            </a>
                        </div>
                        <div class="mobile-toggle">
                            <i class="fas fa-bars"></i>
                        </div>
                        <ul class="nav-menu">
                            <li><a href="./index.html">Home</a></li>
                            <li><a href="./index.html#services">Services</a></li>
                            <li><a href="./index.html#about">About</a></li>
                            <li><a href="./index.html#projects">Projects</a></li>
                            <li><a href="./index.html#blog">Blog</a></li>
                            <li><a href="./index.html#contact">Contact</a></li>
                            <li><a href="tel:+917203008431" class="btn">Call Now</a></li>
                        </ul>
                    </div>
                </header>
            `,
            footer: `
                <footer>
                    <div class="container">
                        <div class="footer-content">
                            <div class="footer-column">
                                <h3>Trustwave IT Solutions</h3>
                                <p>Providing reliable IT solutions and support to businesses across India. Your trusted partner for all technology needs.</p>
                                <div class="social-links">
                                    <a href="#"><i class="fab fa-facebook-f"></i></a>
                                    <a href="https://instagram.com/trustwaveitsolutions" target="_blank"><i class="fab fa-instagram"></i></a>
                                    <a href="#"><i class="fab fa-twitter"></i></a>
                                    <a href="#"><i class="fab fa-linkedin-in"></i></a>
                                </div>
                            </div>
                            <div class="footer-column">
                                <h3>Quick Links</h3>
                                <ul class="footer-links">
                                    <li><a href="./index.html">Home</a></li>
                                    <li><a href="./index.html#services">Services</a></li>
                                    <li><a href="./index.html#about">About Us</a></li>
                                    <li><a href="./index.html#projects">Projects</a></li>
                                    <li><a href="./index.html#blog">Blog</a></li>
                                </ul>
                            </div>
                            <div class="footer-column">
                                <h3>Services</h3>
                                <ul class="footer-links">
                                    <li><a href="./cctv_installation_service.html">CCTV Installation</a></li>
                                    <li><a href="./Networking_and_labsetup.html">Networking</a></li>
                                    <li><a href="./computer_hardware_repair.html">Hardware Repair</a></li>
                                    <li><a href="./Software_and_Website_Development.html">Software Solutions</a></li>
                                </ul>
                            </div>
                            <div class="footer-column">
                                <h3>Contact Us</h3>
                                <ul class="contact-info-list">
                                    <li>
                                        <i class="fas fa-phone"></i>
                                        <div>
                                            <p>+91 7203008431</p>
                                        </div>
                                    </li>
                                    <li>
                                        <i class="fas fa-envelope"></i>
                                        <div>
                                            <p>trustwaveitsolutions@gmail.com</p>
                                        </div>
                                    </li>
                                    <li>
                                        <i class="fas fa-map-marker-alt"></i>
                                        <div>
                                            <p>Vadodara, Gujarat, India</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="footer-bottom">
                            <p>&copy; 2023 Trustwave IT Solutions. All Rights Reserved.</p>
                        </div>
                    </div>
                </footer>
            `
        };
        return components[component] || '<div>Component not found</div>';
    }

    loadFallbackComponents() {
        console.log('Loading fallback components...');
        this.components = {
            header: this.getFallbackComponent('header'),
            footer: this.getFallbackComponent('footer')
        };
        this.renderComponents();
        this.initializeComponents();
    }

    renderComponents() {
        const headerContainer = document.getElementById('header-container');
        const footerContainer = document.getElementById('footer-container');

        if (headerContainer && this.components.header) {
            headerContainer.innerHTML = this.components.header;
            console.log('✅ Header rendered');
        } else {
            console.error('❌ Header container not found or header content missing');
        }

        if (footerContainer && this.components.footer) {
            footerContainer.innerHTML = this.components.footer;
            console.log('✅ Footer rendered');
        } else {
            console.error('❌ Footer container not found or footer content missing');
        }
    }

    initializeComponents() {
        this.initializeMobileMenu();
        this.initializeScrollEffects();
    }

    initializeMobileMenu() {
        const mobileToggle = document.querySelector(".mobile-toggle");
        const navMenu = document.querySelector(".nav-menu");

        if (mobileToggle && navMenu) {
            mobileToggle.addEventListener("click", () => {
                navMenu.classList.toggle("active");
                const icon = mobileToggle.querySelector("i");
                if (icon) {
                    icon.classList.toggle("fa-bars");
                    icon.classList.toggle("fa-times");
                }
            });
            console.log('✅ Mobile menu initialized');
        }

        // Close mobile menu when clicking on a link
        document.querySelectorAll(".nav-menu a").forEach((link) => {
            link.addEventListener("click", () => {
                if (navMenu) navMenu.classList.remove("active");
                if (mobileToggle) {
                    const icon = mobileToggle.querySelector("i");
                    if (icon) {
                        icon.classList.add("fa-bars");
                        icon.classList.remove("fa-times");
                    }
                }
            });
        });
    }

    initializeScrollEffects() {
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
        });
    }
}

// Initialize components loader with error handling
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Initializing Components Loader...');
    new ComponentsLoader();
});

// Fallback: If components still don't load after 3 seconds, use fallback
setTimeout(() => {
    const headerContainer = document.getElementById('header-container');
    const footerContainer = document.getElementById('footer-container');
    
    if (headerContainer && headerContainer.innerHTML.trim() === '') {
        console.warn('⚠️ Header still empty after 3 seconds, using fallback');
        const fallbackLoader = new ComponentsLoader();
        fallbackLoader.loadFallbackComponents();
    }
}, 3000);