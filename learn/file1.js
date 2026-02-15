// ===== STARFIELD ANIMATION =====
class StarfieldAnimation {
    constructor() {
        this.canvas = document.getElementById('starCanvas');
        if (!this.canvas) {
            console.warn('Star canvas not found');
            return;
        }
        this.ctx = this.canvas.getContext('2d');
        this.stars = [];
        this.colors = ['#4361ee', '#4cc9f0', '#b5179e', '#f9c74f'];
        this.animationId = null;
        this.resizeTimeout = null;
        
        this.init();
    }

    init() {
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
            
            // Twinkle effect
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

// YouTube Popup Elements
const youtubePopup = document.getElementById('youtubePopup');
const closeYoutubePopup = document.getElementById('closeYoutubePopup');
const subscribeBtn = document.getElementById('subscribeBtn');
const viewChannelBtn = document.getElementById('viewChannelBtn');

// ===== POPULAR DESIGNS DATA (8 items) =====
let popularItems = [
    { 
        id: 'pop1', 
        title: 'Neon Branding Kit', 
        category: 'Logos', 
        image: './assets/images/photos/brand-identity-bg.jpg', 
        likes: 342, 
        downloads: 1280, 
        badge: 'Hot',
        userLiked: false
    },
    { 
        id: 'pop2', 
        title: 'Business Flyer Bundle', 
        category: 'Flyers', 
        image: './assets/images/flyers/new-week-flyer.jpg', 
        likes: 512, 
        downloads: 2341, 
        badge: 'Trending',
        userLiked: false
    },
    { 
        id: 'pop3', 
        title: 'Social Media Mega Pack', 
        category: 'Social Media', 
        image: './assets/images/photos/social-media-bg.jpg', 
        likes: 278, 
        downloads: 956, 
        badge: 'Popular',
        userLiked: false
    },
    { 
        id: 'pop4', 
        title: 'Minimal Logo Set', 
        category: 'Logos', 
        image: './assets/images/photos/print-design-bg.jpg', 
        likes: 689, 
        downloads: 3400, 
        badge: 'Bestseller',
        userLiked: false
    },
    { 
        id: 'pop5', 
        title: '2026 Calendar Mockups', 
        category: 'Calendars', 
        image: './assets/images/calendars/calendar-design-template-2024-shafin.jpg', 
        likes: 187, 
        downloads: 743, 
        badge: null,
        userLiked: false
    },
    { 
        id: 'pop6', 
        title: 'Corporate Flyer Design', 
        category: 'Flyers', 
        image: './assets/images/flyers/political-flyer-design-02.jpg', 
        likes: 432, 
        downloads: 1632, 
        badge: null,
        userLiked: false
    },
    { 
        id: 'pop7', 
        title: 'Instagram Stories Kit', 
        category: 'Social Media', 
        image: './assets/images/photos/digital-design-bg.jpg', 
        likes: 391, 
        downloads: 2110, 
        badge: 'New',
        userLiked: false
    },
    { 
        id: 'pop8', 
        title: 'Real Estate Flyer', 
        category: 'Flyers', 
        image: './assets/images/flyers/tourism-flyer-design.jpg', 
        likes: 523, 
        downloads: 2980, 
        badge: 'Featured',
        userLiked: false
    }
];

// ===== SEARCH DATA (includes popular items) =====
const searchData = [
    { title: "Business Flyer", category: "Flyers", url: "./templates/flyers/business-flyers.html", img: "./assets/images/flyers/new-week-flyer.jpg" },
    { title: "Logo Design Pack", category: "Logos", url: "./templates/logos/index.html", img: "./assets/images/photos/brand-identity-bg.jpg" },
    { title: "Social Media Kit", category: "Social Media", url: "./templates/social-media/index.html", img: "./assets/images/photos/social-media-bg.jpg" },
    { title: "Calendar 2026", category: "Calendars", url: "./templates/calendars/index.html", img: "./assets/images/calendars/calendar-design-template-2024-shafin.jpg" },
    { title: "Real Estate Flyer", category: "Flyers", url: "./templates/flyers/real-estate.html", img: "./assets/images/flyers/tourism-flyer-design.jpg" },
    { title: "Birthday Flyer", category: "Flyers", url: "./templates/flyers/birthday.html", img: "./assets/images/flyers/Claire_001 BirrthDay flyer.jpg" },
    { title: "Neon Branding Kit", category: "Logos", url: "#", img: "./assets/images/photos/brand-identity-bg.jpg" },
    { title: "Business Flyer Bundle", category: "Flyers", url: "#", img: "./assets/images/flyers/new-week-flyer.jpg" },
    { title: "Social Media Mega Pack", category: "Social Media", url: "#", img: "./assets/images/photos/social-media-bg.jpg" },
    { title: "Minimal Logo Set", category: "Logos", url: "#", img: "./assets/images/photos/print-design-bg.jpg" },
    { title: "2026 Calendar Mockups", category: "Calendars", url: "#", img: "./assets/images/calendars/calendar-design-template-2024-shafin.jpg" },
    { title: "Corporate Flyer Design", category: "Flyers", url: "#", img: "./assets/images/flyers/political-flyer-design-02.jpg" },
    { title: "Instagram Stories Kit", category: "Social Media", url: "#", img: "./assets/images/photos/digital-design-bg.jpg" },
    { title: "Real Estate Flyer", category: "Flyers", url: "#", img: "./assets/images/flyers/tourism-flyer-design.jpg" }
];

// ===== TEMPLATE DATA =====
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

// ===== SERVICE DATA (Design Categories) =====
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

// ===== PORTFOLIO DATA (Recent Designs) =====
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

// ===== TOOLS DATA =====
const toolsData = [
    { name: "Adobe Photoshop", icon: "fab fa-adobe" },
    { name: "Adobe Illustrator", icon: "fab fa-adobe" },
    { name: "Adobe InDesign", icon: "fab fa-adobe" },
    { name: "Figma", icon: "fab fa-figma" },
    { name: "Blender", icon: "fas fa-cube" },
    { name: "Sketch", icon: "fab fa-sketch" },
    { name: "After Effects", icon: "fas fa-film" },
    { name: "Procreate", icon: "fas fa-paint-brush" }
];

// ===== RENDER POPULAR DESIGNS =====
function renderPopularDesigns() {
    const popularGrid = document.getElementById('popularGrid');
    if (!popularGrid) return;
    
    popularGrid.innerHTML = popularItems.map(item => `
        <div class="popular-card" data-id="${item.id}">
            <div class="popular-img">
                <img src="${item.image}" alt="${item.title}" loading="lazy">
                ${item.badge ? `<div class="popular-badge">${item.badge}</div>` : ''}
            </div>
            <div class="popular-content">
                <h3>${item.title}</h3>
                <p><i class="fas fa-tag"></i> ${item.category}</p>
                <div class="popular-stats">
                    <span class="like-btn ${item.userLiked ? 'liked' : ''}" data-id="${item.id}">
                        <i class="fa${item.userLiked ? 's' : 'r'} fa-heart"></i> 
                        <span class="like-count">${item.likes}</span>
                    </span>
                    <span class="download-stat" data-id="${item.id}">
                        <i class="fas fa-download"></i> 
                        <span class="download-count">${item.downloads}</span>
                    </span>
                </div>
                <button class="btn-download download-btn" data-id="${item.id}">
                    <i class="fas fa-download"></i> Download
                </button>
            </div>
        </div>
    `).join('');
}

// ===== LOAD SAVED STATS FROM LOCALSTORAGE =====
function loadSavedStats() {
    const saved = localStorage.getItem('popularStats');
    if (saved) {
        try {
            const savedStats = JSON.parse(saved);
            popularItems = popularItems.map(item => {
                const found = savedStats.find(s => s.id === item.id);
                if (found) {
                    item.likes = found.likes;
                    item.downloads = found.downloads;
                    item.userLiked = found.userLiked || false;
                }
                return item;
            });
        } catch (e) {
            console.error('Error loading saved stats', e);
        }
    }
    renderPopularDesigns();
}

// ===== SAVE STATS TO LOCALSTORAGE =====
function saveStats() {
    const toSave = popularItems.map(({ id, likes, downloads, userLiked }) => ({
        id, likes, downloads, userLiked
    }));
    localStorage.setItem('popularStats', JSON.stringify(toSave));
}

// ===== INITIALIZE INTERACTIVE FEATURES =====
function initInteractive() {
    // Load saved stats
    loadSavedStats();
    
    // Event delegation for likes and downloads
    document.addEventListener('click', (e) => {
        // Handle like button click
        const likeBtn = e.target.closest('.like-btn');
        if (likeBtn) {
            e.preventDefault();
            const id = likeBtn.dataset.id;
            const item = popularItems.find(i => i.id === id);
            if (item) {
                if (item.userLiked) {
                    item.likes -= 1;
                    item.userLiked = false;
                } else {
                    item.likes += 1;
                    item.userLiked = true;
                }
                
                // Update UI
                const card = likeBtn.closest('.popular-card');
                if (card) {
                    const likeSpan = card.querySelector('.like-btn');
                    const countSpan = card.querySelector('.like-count');
                    likeSpan.classList.toggle('liked', item.userLiked);
                    likeSpan.querySelector('i').className = item.userLiked ? 'fas fa-heart' : 'far fa-heart';
                    countSpan.textContent = item.likes;
                }
                
                saveStats();
            }
            return;
        }
        
        // Handle download button click
        const downloadBtn = e.target.closest('.download-btn');
        if (downloadBtn) {
            e.preventDefault();
            const id = downloadBtn.dataset.id;
            const item = popularItems.find(i => i.id === id);
            if (item) {
                item.downloads += 1;
                
                // Update UI
                const card = downloadBtn.closest('.popular-card');
                if (card) {
                    const downloadCount = card.querySelector('.download-count');
                    if (downloadCount) {
                        downloadCount.textContent = item.downloads;
                    }
                }
                
                saveStats();
                alert(`✅ Download started for "${item.title}"! (Demo mode)`);
            }
            return;
        }
    });
}

// ===== SEARCH FUNCTIONALITY =====
function initSearch() {
    if (!searchInput || !searchResults) return;
    
    searchInput.addEventListener('input', function() {
        const term = this.value.trim().toLowerCase();
        
        if (term.length < 2) {
            searchResults.classList.remove('active');
            return;
        }
        
        const matches = searchData.filter(item => 
            item.title.toLowerCase().includes(term) || 
            item.category.toLowerCase().includes(term)
        ).slice(0, 8);
        
        if (matches.length === 0) {
            searchResults.innerHTML = '<div class="search-result-item" style="justify-content: center; color: #666;">No results found</div>';
            searchResults.classList.add('active');
            return;
        }
        
        searchResults.innerHTML = matches.map(m => `
            <div class="search-result-item" data-url="${m.url}">
                <img src="${m.img}" alt="${m.title}" onerror="this.src='./assets/images/icons/starford.png'">
                <div class="search-result-info">
                    <h4>${m.title}</h4>
                    <p>${m.category}</p>
                </div>
            </div>
        `).join('');
        
        searchResults.classList.add('active');
    });
    
    // Close search results when clicking outside
    document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
            searchResults.classList.remove('active');
        }
    });
    
    // Handle click on search result
    searchResults.addEventListener('click', (e) => {
        const item = e.target.closest('.search-result-item');
        if (item) {
            const title = item.querySelector('h4')?.innerText || 'item';
            alert(`🔍 You searched for: ${title}\n\nIn a real implementation, you would be redirected to the template page.`);
            searchInput.value = '';
            searchResults.classList.remove('active');
        }
    });
}

// ===== LOAD TEMPLATES INTO SLIDER =====
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

// ===== LOAD SERVICES =====
function loadServices() {
    const servicesGrid = document.getElementById('servicesGrid');
    if (!servicesGrid) return;
    
    servicesGrid.innerHTML = serviceData.map(service => `
        <div class="service-card" data-aos="fade-up">
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

// ===== LOAD PORTFOLIO ITEMS =====
function loadPortfolio() {
    const portfolioGrid = document.getElementById('portfolioGrid');
    if (!portfolioGrid) return;
    
    portfolioGrid.innerHTML = portfolioData.map(item => `
        <div class="portfolio-item" data-aos="fade-up">
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

// ===== LOAD TOOLS =====
function loadTools() {
    const toolsGrid = document.getElementById('toolsGrid');
    if (!toolsGrid) return;
    
    toolsGrid.innerHTML = toolsData.map(tool => `
        <div class="tool-card" data-aos="fade-up">
            <div class="tool-icon"><i class="${tool.icon}"></i></div>
            <h3>${tool.name}</h3>
        </div>
    `).join('');
}

// ===== INITIALIZE SLICK SLIDER =====
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

// ===== MOBILE NAVIGATION TOGGLE =====
function initMobileNav() {
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
}

// ===== MOBILE DROPDOWN TOGGLE =====
function initMobileDropdown() {
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
}

// ===== USER BUTTON DROPDOWN =====
function initUserDropdown() {
    if (userBtn && userDropdown) {
        userBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            userDropdown.classList.toggle('active');
        });

        document.addEventListener('click', (e) => {
            if (!userBtn.contains(e.target) && !userDropdown.contains(e.target)) {
                userDropdown.classList.remove('active');
            }
        });
    }
}

// ===== AUTH MODAL =====
function initAuthModal() {
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

    if (authTabs.length > 0) {
        authTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const tabId = tab.getAttribute('data-tab');
                switchTab(tabId);
            });
        });
    }

    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            simulateAuth('login');
        });
    }

    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            simulateAuth('signup');
        });
    }
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

function switchTab(tabId) {
    if (authTabs.length > 0) {
        authTabs.forEach(tab => {
            tab.classList.remove('active');
            if (tab.getAttribute('data-tab') === tabId) {
                tab.classList.add('active');
            }
        });
    }
    
    if (authForms.length > 0) {
        authForms.forEach(form => {
            form.classList.remove('active');
            if (form.id === `${tabId}Form`) {
                form.classList.add('active');
            }
        });
    }
}

function simulateAuth(type) {
    setTimeout(() => {
        alert(`✅ ${type === 'login' ? 'Logged in' : 'Account created'} successfully! (Demo mode)`);
        closeModal();
    }, 1000);
}

// ===== YOUTUBE POPUP =====
function initYouTubePopup() {
    if (!youtubePopup) return;
    
    setTimeout(() => {
        youtubePopup.classList.add('active');
        if (overlay) overlay.classList.add('active');
    }, 5000);

    if (closeYoutubePopup) {
        closeYoutubePopup.addEventListener('click', hideYoutubePopup);
    }

    if (subscribeBtn) {
        subscribeBtn.addEventListener('click', () => {
            window.open('https://www.youtube.com/@starford.tech7', '_blank');
            hideYoutubePopup();
        });
    }

    if (viewChannelBtn) {
        viewChannelBtn.addEventListener('click', () => {
            window.open('https://www.youtube.com/@starford.tech7', '_blank');
            hideYoutubePopup();
        });
    }
}

function hideYoutubePopup() {
    if (youtubePopup) {
        youtubePopup.classList.remove('active');
    }
    if (overlay) {
        overlay.classList.remove('active');
    }
}

// ===== NEWSLETTER =====
function initNewsletter() {
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = newsletterForm.querySelector('input').value;
            
            const submitBtn = newsletterForm.querySelector('button');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Subscribing...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert(`✅ Thank you for subscribing with ${email}! (Demo mode)`);
                newsletterForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1000);
        });
    }
}

// ===== BACK TO TOP BUTTON =====
function initBackToTop() {
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
}

// ===== INITIALIZE AOS =====
function initAOS() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 600,
            easing: 'ease-in-out',
            once: true,
            offset: 50
        });
    }
}

// ===== SET CURRENT YEAR IN FOOTER =====
function setCurrentYear() {
    const yearElement = document.querySelector('.footer-bottom p');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.innerHTML = yearElement.innerHTML.replace('2025', currentYear);
    }
}

// ===== DOCUMENT READY =====
document.addEventListener('DOMContentLoaded', function() {
    // Initialize starfield
    new StarfieldAnimation();
    
    // Set current year
    setCurrentYear();
    
    // Load all data sections
    loadTemplates();
    loadServices();
    loadPortfolio();
    loadTools();
    
    // Initialize interactive features
    initInteractive();
    initSearch();
    
    // Initialize UI components
    initMobileNav();
    initMobileDropdown();
    initUserDropdown();
    initAuthModal();
    initYouTubePopup();
    initNewsletter();
    initBackToTop();
    initAOS();
    
    // Initialize slider
    initializeSlider();
    
    // Smooth scrolling for anchor links
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
            }
        });
    });
});

// ===== DESKTOP DROPDOWN FUNCTIONALITY =====
window.addEventListener('load', function() {
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
});