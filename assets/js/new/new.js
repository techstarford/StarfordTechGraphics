// ===== STARFIELD ANIMATION =====
class StarfieldAnimation {
    constructor() {
        this.canvas = document.getElementById('starCanvas');
        this.ctx = null;
        this.stars = [];
        this.colors = ['#4361ee', '#4cc9f0', '#b5179e', '#f9c74f'];
        this.animationId = null;
        this.resizeTimeout = null;
        
        this.init();
    }

    init() {
        if (!this.canvas) {
            console.warn('Star canvas not found');
            return;
        }

        this.ctx = this.canvas.getContext('2d');
        this.setupCanvas();
        this.createStars();
        this.startAnimation();
        this.setupResizeHandler();
    }

    setupCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createStars() {
        this.stars = [];
        
        // const starCount = Math.min(300, Math.floor((window.innerWidth * window.innerHeight) / 3300));
        const starCount = Math.min(400, Math.floor((window.innerWidth * window.innerHeight) / 2500));

        for (let i = 0; i < starCount; i++) {
            this.stars.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 3 + 3,
                color: this.colors[Math.floor(Math.random() * this.colors.length)],
                speedX: (Math.random() - 0.5) * 0.2,
                speedY: (Math.random() - 0.5) * 0.2,
                opacity: Math.random() * 0.8 + 0.2,
                twinkleSpeed: Math.random() * 0.02 + 0.01,
                twinkleOffset: Math.random() * Math.PI * 2
            });
        }
    }

    drawStar(x, y, points, outerRadius, innerRadius, color, opacity) {
        this.ctx.save();
        this.ctx.translate(x, y);
        this.ctx.beginPath();
        this.ctx.globalAlpha = opacity;
        
        for (let i = 0; i < points * 2; i++) {
            const radius = i % 2 === 0 ? outerRadius : innerRadius;
            const angle = (Math.PI * i) / points;
            this.ctx.lineTo(
                Math.cos(angle) * radius,
                Math.sin(angle) * radius
            );
        }
        
        this.ctx.closePath();
        this.ctx.fillStyle = color;
        this.ctx.fill();
        this.ctx.restore();
    }

    animate = () => {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        const time = Date.now() * 0.001;
        
        this.stars.forEach(star => {
            // Move stars
            star.x += star.speedX;
            star.y += star.speedY;
            
            // Wrap around edges
            if (star.x < -50) star.x = this.canvas.width + 50;
            if (star.x > this.canvas.width + 50) star.x = -50;
            if (star.y < -50) star.y = this.canvas.height + 50;
            if (star.y > this.canvas.height + 50) star.y = -50;
            
            // Twinkle effect with sine wave
            star.opacity = 0.3 + Math.sin(time * star.twinkleSpeed + star.twinkleOffset) * 0.3;
            
            // Draw star
            const points = Math.floor(Math.random() * 2) + 4; // 4-5 points
            const outerRadius = star.size;
            const innerRadius = star.size * 0.4;
            
            this.drawStar(star.x, star.y, points, outerRadius, innerRadius, star.color, star.opacity);
        });
        
        this.animationId = requestAnimationFrame(this.animate);
    }

    startAnimation() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        this.animate();
    }

    setupResizeHandler() {
        window.addEventListener('resize', () => {
            clearTimeout(this.resizeTimeout);
            this.resizeTimeout = setTimeout(() => {
                this.setupCanvas();
                this.createStars();
            }, 250);
        });
    }
}

// ===== DOM Elements =====
const mobileNavToggle = document.querySelectorAll('.mobile-nav-toggle');
const mobileNav = document.getElementById('mobile-nav');
const overlay = document.getElementById('overlay');
const userBtn = document.getElementById('userBtn');
const userDropdown = document.getElementById('userDropdown');
const loginBtn = document.getElementById('loginBtn');
const signupBtn = document.getElementById('signupBtn');
const authModal = document.getElementById('authModal');
const closeAuthModal = document.getElementById('closeAuthModal');
const authTabs = document.querySelectorAll('.auth-tab');
const authForms = document.querySelectorAll('.auth-form');
const backToTop = document.getElementById('backToTop');
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');
const newsletterForm = document.getElementById('newsletterForm');
const currentYear = document.getElementById('currentYear');

// YouTube Popup Elements
const youtubePopup = document.getElementById('youtubePopup');
const closeYoutubePopup = document.getElementById('closeYoutubePopup');
const subscribeBtn = document.getElementById('subscribeBtn');
const viewChannelBtn = document.getElementById('viewChannelBtn');

// ===== Search Data =====
const searchData = [
    { title: "Business Flyer", category: "Flyers", url: "./templates/flyers/business-flyers.html", tags: ["flyer", "business", "marketing"] },
    { title: "Logo Design", category: "Logos", url: "./templates/logos/index.html", tags: ["logo", "branding", "identity"] },
    { title: "Social Media Post", category: "Social Media", url: "./templates/social-media/index.html", tags: ["social media", "instagram", "facebook"] },
    { title: "Business Card", category: "Business Cards", url: "./templates/business-cards/index.html", tags: ["business card", "contact", "networking"] },
    { title: "Calendar 2024", category: "Calendars", url: "./templates/calendars/index.html", tags: ["calendar", "2024", "planner"] },
    { title: "Poster Design", category: "Posters", url: "./templates/posters/index.html", tags: ["poster", "event", "advertisement"] },
    { title: "Wedding Invitation", category: "Flyers", url: "./templates/flyers/wedding-invitation.html", tags: ["wedding", "invitation", "event"] },
    { title: "Real Estate Flyer", category: "Flyers", url: "./templates/flyers/real-estate.html", tags: ["real estate", "property", "house"] },
    { title: "Restaurant Menu", category: "Print Design", url: "./templates/print-design/menu.html", tags: ["menu", "restaurant", "food"] },
    { title: "YouTube Thumbnail", category: "Social Media", url: "./templates/social-media/youtube-thumbnail.html", tags: ["youtube", "thumbnail", "video"] }
];

// ===== Template Data =====
const templateData = [
    {
        id: 1,
        title: "Ultimate Business Bundle",
        description: "Complete set of business templates including logos, cards, letterheads, and presentations.",
        price: "Free",
        rating: 5.0,
        reviews: 128,
        badge: "Bestseller",
        image: "./assets/images/photos/ultimate-business-bundle.jpeg",
        link: "./templates/business-bundle.html"
    },
    {
        id: 2,
        title: "Social Media Pack 2025",
        description: "200+ templates for Instagram posts, stories, Facebook covers, and Twitter headers.",
        price: "Free",
        rating: 4.9,
        reviews: 87,
        badge: "New",
        image: "./assets/images/photos/youtube thumbnail image.jpg",
        link: "./templates/social-media/index.html"
    },
    {
        id: 3,
        title: "Birthday Flyer Templates",
        description: "Clean and modern birthday flyer template designs for all occasions.",
        price: "Free",
        rating: 4.8,
        reviews: 156,
        badge: null,
        image: "./assets/images/photos/birthday-flyer.jpg",
        link: "./templates/flyers/birthday.html"
    },
    {
        id: 4,
        title: "Wedding Invitation Suite",
        description: "Elegant wedding invitations with matching RSVP cards, programs, and menus.",
        price: "Free",
        rating: 4.9,
        reviews: 64,
        badge: "Limited",
        image: "./assets/images/photos/giveaway-party-flyer-design.jpg",
        link: "./templates/wedding-invitations.html"
    },
    {
        id: 5,
        title: "2026 Calendar Collection",
        description: "Beautifully designed wall, desk, and planner calendars for 2026.",
        price: "Free",
        rating: 4.7,
        reviews: 93,
        badge: null,
        image: "./assets/images/photos/calendar-design-template-2024-shafin.jpg",
        link: "./templates/calendars/index.html"
    }
];

const serviceData = [
    {
        id: 1,
        title: "Brand Identity",
        description: "Create a memorable brand with our comprehensive identity packages including logo design, color schemes, and typography.",
        icon: "fas fa-palette",
        features: ["Logo Design", "Brand Guidelines", "Business Cards", "Stationery Design"],
        link: "./templates/logos/index.html",
        bgImage: "./assets/images/photos/brand-identity-bg.jpg"
    },
    {
        id: 2,
        title: "Print Design",
        description: "High-quality print materials that make an impression, from business collateral to large format printing.",
        icon: "fas fa-print",
        features: ["Brochures & Flyers", "Posters & Banners", "Magazine Layouts", "Annual Reports"],
        link: "./templates/flyers/index.html",
        bgImage: "./assets/images/photos/print-design-bg.jpg"
    },
    {
        id: 3,
        title: "Digital Design",
        description: "Engaging digital assets optimized for web and social media to boost your online presence.",
        icon: "fas fa-laptop-code",
        features: ["Social Media Graphics", "Web Banners", "Email Templates", "Digital Ads"],
        link: "./templates/social-media/index.html",
        bgImage: "./assets/images/photos/digital-design-bg.jpg"
    },
    {
        id: 4,
        title: "Packaging Design",
        description: "Eye-catching packaging that stands out on shelves and communicates your product's value.",
        icon: "fas fa-box-open",
        features: ["Product Labels", "Box & Bag Design", "Retail Displays", "Prototyping"],
        link: "./templates/packaging.html",
        bgImage: "./assets/images/photos/packaging-bg.jpg"
    },
    {
        id: 5,
        title: "Social Media Design",
        description: "Intuitive and beautiful user interfaces that enhance user experience and drive engagement.",
        icon: "fas fa-mobile-alt",
        features: ["Website Design", "Mobile App Design", "User Flows", "Prototyping"],
        link: "./templates/social-media/index.html",
        bgImage: "./assets/images/photos/social-media-bg.jpg"
    },
    {
        id: 6,
        title: "Motion Graphics",
        description: "Dynamic animated content that brings your brand to life and captures attention.",
        icon: "fas fa-film",
        features: ["Animated Logos", "Explainer Videos", "Social Media Ads", "Presentation Graphics"],
        link: "./motion-graphics.html",
        bgImage: "./assets/images/photos/motion-graphics-bg.jpg"
    }
];

const portfolioData = [
    {
        id: 1,
        title: "Cosmetics Branding",
        description: "Complete brand identity for an organic food startup including logo, packaging, and marketing materials.",
        category: "Branding",
        image: "./assets/images/flyers/antidandruff -shampoo.jpg",
        link: "./templates/cosmetics-branding.html"
    },
    {
        id: 2,
        title: "Tech Startup Flyer",
        description: "Modern Tech advertising flyer design with custom illustrations",
        category: "Digital Design",
        image: "./assets/images/flyers/new-week-flyer.jpg",
        link: "./templates/tech-startup-flyer.html"
    },
    {
        id: 3,
        title: "Political flyer Design",
        description: "Modern political campaign flyer design.",
        category: "Advertisement",
        image: "./assets/images/flyers/political-flyer-design-02.jpg",
        link: "./templates/skincare-packaging.html"
    },
    {
        id: 4,
        title: "Birthday Flyer Design",
        description: "Social media graphics and ads for a fitness app launch campaign across multiple platforms.",
        category: "Digital Design",
        image: "./assets/images/flyers/Claire_001 BirrthDay flyer.jpg",
        link: "./templates/birthday-flyer.html"
    },
    {
        id: 5,
        title: "Tourism Flyer",
        description: "Corporate tourism flyer with custom infographics and data visualization for a financial firm.",
        category: "Digital Design",
        image: "./assets/images/flyers/tourism-flyer-design.jpg",
        link: "./templates/tourism-flyer.html"
    },
    {
        id: 6,
        title: "Modern Calendar",
        description: "2026 calendar design for a tech firm.",
        category: "Digital Design",
        image: "./assets/images/calendars/calendar-design-template-2024-shafin.jpg",
        link: "./templates/calendar-design.html"
    }
];

const toolsData = [
    { name: "Adobe Photoshop", icon: "fas fa-adobephotoshop" },
    { name: "Adobe Illustrator", icon: "fab fa-adobe" },
    { name: "Adobe InDesign", icon: "fab fa-adobe" },
    { name: "Figma", icon: "fab fa-figma" },
    { name: "Blender", icon: "fas fa-cube" },
    { name: "Sketch", icon: "fab fa-sketch" },
    { name: "After Effects", icon: "fas fa-film" },
    { name: "Procreate", icon: "fas fa-paint-brush" }
];

// ===== Initialize when DOM is loaded =====
document.addEventListener('DOMContentLoaded', function() {
    // Initialize starfield animation FIRST
    const starfield = new StarfieldAnimation();
    
    // Set current year in footer
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }
    
    // Load template data
    loadTemplates();
    
    // Load services
    loadServices();
    
    // Load portfolio items
    loadPortfolio();
    
    // Load tools
    loadTools();
    
    // Initialize AOS
    AOS.init({
        duration: 200,
        easing: 'ease-in-out',
        once: true,
        offset: 0,
        delay: 0,
        mirror: false,
        anchorPlacement: 'top-bottom',
    });
    
    // Initialize Slick slider
    initializeSlider();
    
    // Setup YouTube Popup
    setupYouTubePopup();
});

// ===== YouTube Popup Functions =====
function setupYouTubePopup() {
    if (!youtubePopup) return;
    
    // Show YouTube popup after delay
    setTimeout(() => {
        youtubePopup.classList.add('active');
        overlay.classList.add('active');
    }, 5000);

    // Close YouTube Popup
    if (closeYoutubePopup) {
        closeYoutubePopup.addEventListener('click', hideYoutubePopup);
    }

    // Subscribe Button
    if (subscribeBtn) {
        subscribeBtn.addEventListener('click', () => {
            alert('Redirecting to YouTube to subscribe to our channel!');
            window.open('https://www.youtube.com/channel/UC_x5XG1OV2P6uZZ5FSM9Ttw', '_blank');
            hideYoutubePopup();
        });
    }

    // View Channel Button
    if (viewChannelBtn) {
        viewChannelBtn.addEventListener('click', () => {
            window.open('https://www.youtube.com/@starford.tech7', '_blank');
            hideYoutubePopup();
        });
    }

    // Close popup when clicking outside
    document.addEventListener('click', (e) => {
        if (youtubePopup.classList.contains('active') && 
            !youtubePopup.contains(e.target)) {
            hideYoutubePopup();
        }
    });
}

function hideYoutubePopup() {
    if (youtubePopup) {
        youtubePopup.classList.remove('active');
    }
    if (overlay) {
        overlay.classList.remove('active');
    }
}

// ===== Load Templates =====
function loadTemplates() {
    const slider = document.querySelector('.featured-slider');
    if (!slider) return;
    
    slider.innerHTML = templateData.map(template => `
        <a href="${template.link}" class="featured-slide">
            <div class="featured-card">
                <div class="featured-img">
                    <img src="${template.image}" alt="${template.title}" loading="lazy">
                    ${template.badge ? `<div class="featured-badge">${template.badge}</div>` : ''}
                </div>
                <div class="featured-content">
                    <h3>${template.title}</h3>
                    <p>${template.description}</p>
                    <div class="featured-meta">
                        <span class="featured-price">${template.price}</span>
                        <span class="featured-rating">
                            <i class="fas fa-star"></i> ${template.rating} (${template.reviews})
                        </span>
                    </div>
                </div>
            </div>
        </a>
    `).join('');
}

// ===== Load Services =====
function loadServices() {
    const servicesGrid = document.querySelector('.services-grid');
    if (!servicesGrid) return;
    
    servicesGrid.innerHTML = serviceData.map(service => `
        <div class="service-card" data-aos="">
            <div class="service-icon-container">
                <div class="service-icon-bg">
                    <img src="${service.bgImage}" alt="${service.title}" loading="lazy">
                </div>
                <div class="service-icon">
                    <i class="${service.icon}"></i>
                </div>
            </div>
            <h3>${service.title}</h3>
            <p>${service.description}</p>
            <ul class="service-features">
                ${service.features.map(feature => `
                    <li><i class="fas fa-check"></i> ${feature}</li>
                `).join('')}
            </ul>
            <a href="${service.link}" class="btn">View Templates</a>
        </div>
    `).join('');
}

// ===== Load Portfolio Items =====
function loadPortfolio() {
    const portfolioGrid = document.querySelector('.portfolio-grid');
    if (!portfolioGrid) return;
    
    portfolioGrid.innerHTML = portfolioData.map(item => `
        <div class="portfolio-item" data-aos="">
            <div class="portfolio-img">
                <img src="${item.image}" alt="${item.title}" loading="lazy">
                <span class="portfolio-category">${item.category}</span>
            </div>
            <div class="portfolio-content">
                <h3>${item.title}</h3>
                <p>${item.description}</p>
                <a href="${item.link}" class="btn btn-outline">View Template</a>
            </div>
        </div>
    `).join('');
}

// ===== Load Tools =====
function loadTools() {
    const toolsGrid = document.querySelector('.tools-grid');
    if (!toolsGrid) return;
    
    toolsGrid.innerHTML = toolsData.map(tool => `
        <div class="tool-card" data-aos="">
            <div class="tool-icon"><i class="${tool.icon}"></i></div>
            <h3>${tool.name}</h3>
        </div>
    `).join('');
}

// ===== Initialize Slick Slider =====
function initializeSlider() {
    if (typeof $ !== 'undefined' && $('.featured-slider').length) {
        $('.featured-slider').slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 4000,
            arrows: true,
            dots: true,
            responsive: [
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 2
                    }
                },
                {
                    breakpoint: 576,
                    settings: {
                        slidesToShow: 1
                    }
                }
            ]
        });
    }
}

// ===== Mobile Navigation Toggle =====
if (mobileNavToggle.length > 0) {
    mobileNavToggle.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
            toggle.setAttribute('aria-expanded', !isExpanded);
            if (mobileNav) mobileNav.classList.toggle('active');
            if (overlay) overlay.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });
    });
}

// ===== Close mobile menu when clicking on overlay =====
if (overlay) {
    overlay.addEventListener('click', () => {
        if (mobileNavToggle.length > 0) {
            mobileNavToggle.forEach(toggle => {
                toggle.setAttribute('aria-expanded', 'false');
            });
        }
        if (mobileNav) mobileNav.classList.remove('active');
        overlay.classList.remove('active');
        document.body.classList.remove('no-scroll');
    });
}

// ===== Mobile dropdown toggle =====
const mobileDropdownToggles = document.querySelectorAll('.mobile-dropdown-toggle');
if (mobileDropdownToggles.length > 0) {
    mobileDropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            const dropdown = toggle.nextElementSibling;
            const icon = toggle.querySelector('i');
            
            dropdown.classList.toggle('active');
            if (dropdown.classList.contains('active')) {
                icon.classList.remove('fa-chevron-down');
                icon.classList.add('fa-chevron-up');
            } else {
                icon.classList.remove('fa-chevron-up');
                icon.classList.add('fa-chevron-down');
            }
        });
    });
}

// ===== User Button Dropdown =====
if (userBtn && userDropdown) {
    userBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        userDropdown.classList.toggle('active');
    });

    // Close user dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!userBtn.contains(e.target) && !userDropdown.contains(e.target)) {
            userDropdown.classList.remove('active');
        }
    });
}

// ===== Auth Modal =====
if (loginBtn && authModal) {
    loginBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openAuthModal('login');
    });
}

if (signupBtn && authModal) {
    signupBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openAuthModal('signup');
    });
}

if (closeAuthModal) {
    closeAuthModal.addEventListener('click', closeModal);
}

function openAuthModal(type = 'login') {
    if (authModal) {
        authModal.classList.add('active');
    }
    if (overlay) {
        overlay.classList.add('active');
    }
    document.body.classList.add('no-scroll');
    switchTab(type);
}

function closeModal() {
    if (authModal) {
        authModal.classList.remove('active');
    }
    if (overlay) {
        overlay.classList.remove('active');
    }
    document.body.classList.remove('no-scroll');
}

// ===== Auth Tabs =====
if (authTabs.length > 0) {
    authTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabId = tab.getAttribute('data-tab');
            switchTab(tabId);
        });
    });
}

function switchTab(tabId) {
    // Remove active class from all tabs
    if (authTabs.length > 0) {
        authTabs.forEach(tab => {
            tab.classList.remove('active');
            if (tab.getAttribute('data-tab') === tabId) {
                tab.classList.add('active');
            }
        });
    }
    
    // Hide all forms
    if (authForms.length > 0) {
        authForms.forEach(form => {
            form.classList.remove('active');
            if (form.id === `${tabId}Form`) {
                form.classList.add('active');
            }
        });
    }
}

// ===== Form submissions =====
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');

if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = loginForm.querySelector('input[type="email"]').value;
        const password = loginForm.querySelector('input[type="password"]').value;
        
        simulateAuth('login', email, password);
    });
}

if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = signupForm.querySelector('input[type="text"]').value;
        const email = signupForm.querySelector('input[type="email"]').value;
        const password = signupForm.querySelectorAll('input[type="password"]')[0].value;
        
        simulateAuth('signup', email, password, name);
    });
}

function simulateAuth(type, email, password, name = '') {
    const submitBtn = type === 'login' 
        ? loginForm.querySelector('button[type="submit"]')
        : signupForm.querySelector('button[type="submit"]');
    
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Processing...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        if (type === 'login') {
            alert(`Successfully logged in as ${email}`);
            if (userBtn) {
                userBtn.innerHTML = `<i class="fas fa-user-circle"></i><span>${email.split('@')[0]}</span>`;
            }
        } else {
            alert(`Account created for ${name}! Welcome to Starford Tech Graphics.`);
            if (userBtn) {
                userBtn.innerHTML = `<i class="fas fa-user-circle"></i><span>${name}</span>`;
            }
        }
        
        closeModal();
        
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        if (type === 'login') {
            loginForm.reset();
        } else {
            signupForm.reset();
        }
    }, 1500);
}

// ===== Search Functionality =====
if (searchInput) {
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const searchTerm = searchInput.value.trim();
            if (searchTerm) {
                performSearch(searchTerm);
            }
        }
    });
    
    const searchIcon = document.querySelector('.search-box i');
    if (searchIcon) {
        searchIcon.addEventListener('click', () => {
            const searchTerm = searchInput.value.trim();
            if (searchTerm) {
                performSearch(searchTerm);
            }
        });
    }
}

function performSearch(searchTerm) {
    const searchTerms = [
        'logo', 'flyer', 'business card', 'social media', 'poster', 'calendar',
        'mockup', 'brand identity', 'print design', 'digital design',
        'packaging', 'ui/ux', 'motion graphics', 'graphic design', 'template'
    ];
    
    if (searchTerms.some(term => searchTerm.toLowerCase().includes(term))) {
        alert(`Searching for: "${searchTerm}"\n\nThis would show relevant templates in a real implementation.`);
        searchInput.value = '';
    } else {
        alert(`No templates found for "${searchTerm}". Try searching for: logo, flyer, business card, social media, etc.`);
    }
} 

// ===== Newsletter Subscription =====
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input').value;
        
        const submitBtn = newsletterForm.querySelector('button');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Subscribing...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            alert(`Thank you for subscribing with ${email}! You'll receive our weekly design resources.`);
            newsletterForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 1000);
    });
}

// ===== Back to Top Button =====
if (backToTop) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('active');
            
            const header = document.getElementById('header');
            if (header) {
                if (window.pageYOffset > 100) {
                    header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
                    header.style.height = '70px';
                } else {
                    header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
                    header.style.height = '80px';
                }
            }
        } else {
            backToTop.classList.remove('active');
        }
    });

    backToTop.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== Desktop dropdown functionality =====
const desktopDropdowns = document.querySelectorAll('.nav-links > li.dropdown');
desktopDropdowns.forEach(dropdown => {
    dropdown.addEventListener('mouseenter', () => {
        const menu = dropdown.querySelector('.dropdown-menu');
        if (menu) {
            menu.style.opacity = '1';
            menu.style.visibility = 'visible';
            menu.style.transform = 'translateY(0)';
        }
    });
    
    dropdown.addEventListener('mouseleave', () => {
        const menu = dropdown.querySelector('.dropdown-menu');
        if (menu) {
            menu.style.opacity = '0';
            menu.style.visibility = 'hidden';
            menu.style.transform = 'translateY(10px)';
        }
    });
});

// ===== Smooth scrolling for anchor links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            if (mobileNav && mobileNav.classList.contains('active')) {
                mobileNav.classList.remove('active');
                overlay.classList.remove('active');
                document.body.classList.remove('no-scroll');
            }
        }
    });
});

// ===== Handle window resize for starfield =====
window.addEventListener('resize', () => {
    // The StarfieldAnimation class already handles resize
    // This is just for any additional resize handling
});