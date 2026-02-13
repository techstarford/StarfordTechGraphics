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

// ===== CALENDAR DATA (12 items, all free) =====
const calendars = {
    1: {
        id: 1,
        title: "Modern Business Calendar 2025",
        subtitle: "Professional yearly calendar for corporate use",
        description: "This sophisticated business calendar for 2025 features a clean, professional design perfect for corporate offices...",
        designDetails: "Grid-based layout with optimal spacing, serif + sans-serif typefaces, muted color palette.",
        materialsSpecs: "Print-ready with bleed marks, CMYK, 100gsm matte paper recommended.",
        designInspiration: "Mid-century modern + Swiss typography, Bauhaus principles.",
        practicalApplications: "Office wall, meeting rooms, corporate gifts.",
        thumbnailUrl: "../../assets/images/calendars/Calendar design template 2024.jpg",
        fullImageUrl: "../../assets/images/calendars/Calendar design template 2024.jpg",
        calendarType: "Yearly Calendar",
        category: "business",
        categories: ["yearly", "business"],
        fileFormats: ["PDF", "PSD", "AI", "PNG", "JPG"],
        dimensions: "A4 (8.27×11.69 in) | 2480×3508 px",
        orientation: "portrait",
        downloadCount: 3245,
        likes: 942,
        calendarYear: "2025",
        paperSize: "A4, US Letter",
        printReady: "Yes",
        colors: ["#2C3E50", "#3498DB", "#ECF0F1", "#95A5A6", "#27AE60"],
        colorNames: ["Midnight Blue", "Peter River", "Clouds", "Concrete", "Nephritis"],
        tags: ["business", "corporate", "yearly", "2025", "minimal"],
        features: ["All major holidays", "Ample notes space", "Color-coded weekends", "Quarterly overviews", "Print-ready"]
    },
    2: {
        id: 2,
        title: "Minimal Monthly Planner",
        subtitle: "Clean design for personal organization",
        description: "A beautifully minimal monthly planner designed for personal productivity...",
        designDetails: "Two-page spread with calendar grid and notes section, delicate color palette.",
        materialsSpecs: "Digital and print, 90-120gsm paper.",
        designInspiration: "Scandinavian minimalism, Japanese stationery.",
        practicalApplications: "Students, professionals, bullet journal integration.",
        thumbnailUrl: "../../assets/images/calendars/minimal-monthly-planner-thumb.jpg",
        fullImageUrl: "../../assets/images/calendars/minimal-monthly-planner-full.jpg",
        calendarType: "Monthly Planner",
        category: "personal",
        categories: ["monthly", "personal"],
        fileFormats: ["PDF", "PNG", "JPG"],
        dimensions: "A5 (5.83×8.27 in) | 1748×2480 px",
        orientation: "portrait",
        downloadCount: 7842,
        likes: 4215,
        calendarYear: "Undated",
        paperSize: "A5, Half Letter",
        printReady: "Yes",
        colors: ["#ECF0F1", "#BDC3C7", "#2C3E50", "#7F8C8D", "#FFFFFF"],
        colorNames: ["Clouds", "Silver", "Midnight Blue", "Asbestos", "White"],
        tags: ["minimal", "personal", "monthly", "clean"],
        features: ["Generous writing space", "Notes section", "Year-at-a-glance", "Undated"]
    },
    3: {
        id: 3,
        title: "Academic Year Calendar",
        subtitle: "2024-2025 school year with holidays",
        description: "Comprehensive academic calendar for schools and universities...",
        designDetails: "Color-coded days, exam periods, icons for activities.",
        materialsSpecs: "Print-ready with bleed, optimized for school printing.",
        designInspiration: "Educator input, color psychology.",
        practicalApplications: "K-12, colleges, tutoring centers.",
        thumbnailUrl: "../../assets/images/calendars/academic-year-calendar-thumb.jpg",
        fullImageUrl: "../../assets/images/calendars/academic-year-calendar-full.jpg",
        calendarType: "Academic Calendar",
        category: "academic",
        categories: ["yearly", "academic"],
        fileFormats: ["PDF", "PSD", "AI", "PNG"],
        dimensions: "Tabloid (11×17 in) | 3300×5100 px",
        orientation: "landscape",
        downloadCount: 2876,
        likes: 854,
        calendarYear: "2024-2025",
        paperSize: "Tabloid, A3",
        printReady: "Yes",
        colors: ["#3498DB", "#2ECC71", "#F1C40F", "#9B59B6", "#E74C3C"],
        colorNames: ["Peter River", "Emerald", "Sun Flower", "Amethyst", "Alizarin"],
        tags: ["academic", "school", "education", "yearly"],
        features: ["Complete academic year", "Holidays", "Exam periods", "Customizable"]
    },
    4: {
        id: 4,
        title: "Weekly Productivity Planner",
        subtitle: "Task management and goal tracking",
        description: "A comprehensive weekly planner combining time blocking, task lists, habit tracking...",
        designDetails: "Two-page weekly spread, time blocks 6AM-10PM, priority matrix.",
        materialsSpecs: "Digital + print, interactive PDF fields.",
        designInspiration: "GTD, time blocking, agile planning.",
        practicalApplications: "Project managers, freelancers, students.",
        thumbnailUrl: "../../assets/images/calendars/weekly-productivity-planner-thumb.jpg",
        fullImageUrl: "../../assets/images/calendars/weekly-productivity-planner-full.jpg",
        calendarType: "Weekly Planner",
        category: "business",
        categories: ["weekly", "business"],
        fileFormats: ["PDF", "PNG", "JPG"],
        dimensions: "US Letter (8.5×11 in) | 2550×3300 px",
        orientation: "landscape",
        downloadCount: 5543,
        likes: 2310,
        calendarYear: "Undated",
        paperSize: "US Letter, A4",
        printReady: "Yes",
        colors: ["#2C3E50", "#3498DB", "#27AE60", "#F39C12", "#E74C3C"],
        colorNames: ["Midnight Blue", "Peter River", "Nephritis", "Orange", "Alizarin"],
        tags: ["productivity", "weekly", "planner", "tasks", "goals"],
        features: ["Time blocking", "Priority tasks", "Habit tracker", "Goal setting", "Weekly review"]
    },
    // ... (continue for calendars 5-12 with similar structure – for brevity, full data in attached file)
    5: { /* Creative Wall Calendar */ id:5, title:"Creative Wall Calendar", subtitle:"Artistic design for home or office", category:"personal", categories:["wall","monthly","personal"], orientation:"portrait", downloadCount:4231, likes:1876, calendarYear: "Undated",
        paperSize: "US Letter, A4",
        printReady: "Yes",
        colors: ["#2C3E50", "#3498DB", "#27AE60", "#F39C12", "#E74C3C"],
        colorNames: ["Midnight Blue", "Peter River", "Nephritis", "Orange", "Alizarin"],
        tags: ["productivity", "weekly", "planner", "tasks", "goals"],
        features: ["Time blocking", "Priority tasks", "Habit tracker", "Goal setting", "Weekly review"] },

    6: { /* Corporate Desk Calendar */ 
        id:6, title:"Corporate Desk Calendar", subtitle:"Executive style with meeting notes", category:"business", categories:["desk","monthly","business"], orientation:"portrait", downloadCount:2456, likes:789,
        calendarYear: "Undated",
        paperSize: "US Letter, A4",
        printReady: "Yes",
        colors: ["#2C3E50", "#3498DB", "#27AE60", "#F39C12", "#E74C3C"],
        colorNames: ["Midnight Blue", "Peter River", "Nephritis", "Orange", "Alizarin"],
        tags: ["productivity", "weekly", "planner", "tasks", "goals"],
        features: ["Time blocking", "Priority tasks", "Habit tracker", "Goal setting", "Weekly review"]
    },
    
     7: { /* Family Planner */ id:7, title:"Family Planner Calendar", subtitle:"Color-coded for multiple family members", category:"personal", categories:["monthly","personal","family"], orientation:"landscape", downloadCount:3321, likes:1567,
        calendarYear: "Undated",
        paperSize: "US Letter, A4",
        printReady: "Yes",
        colors: ["#2C3E50", "#3498DB", "#27AE60", "#F39C12", "#E74C3C"],
        colorNames: ["Midnight Blue", "Peter River", "Nephritis", "Orange", "Alizarin"],
        tags: ["productivity", "weekly", "planner", "tasks", "goals"],
        features: ["Time blocking", "Priority tasks", "Habit tracker", "Goal setting", "Weekly review"]
    },
    
     8: { /* Fitness & Health Tracker */ id:8, title:"Fitness & Health Tracker", subtitle:"Workout and meal planning calendar", category:"personal", categories:["weekly","personal","health"], orientation:"portrait", downloadCount:3189, likes:1234,
        calendarYear: "Undated",
        paperSize: "US Letter, A4",
        printReady: "Yes",
        colors: ["#2C3E50", "#3498DB", "#27AE60", "#F39C12", "#E74C3C"],
        colorNames: ["Midnight Blue", "Peter River", "Nephritis", "Orange", "Alizarin"],
        tags: ["productivity", "weekly", "planner", "tasks", "goals"],
        features: ["Time blocking", "Priority tasks", "Habit tracker", "Goal setting", "Weekly review"]
    },
    
     9: { /* Project Management Calendar */ id:9, title:"Project Management Calendar", subtitle:"Gantt chart style with milestones", category:"business", categories:["monthly","business","project"], orientation:"landscape", downloadCount:2678, likes:876,
        calendarYear: "Undated",
        paperSize: "US Letter, A4",
        printReady: "Yes",
        colors: ["#2C3E50", "#3498DB", "#27AE60", "#F39C12", "#E74C3C"],
        colorNames: ["Midnight Blue", "Peter River", "Nephritis", "Orange", "Alizarin"],
        tags: ["productivity", "weekly", "planner", "tasks", "goals"],
        features: ["Time blocking", "Priority tasks", "Habit tracker", "Goal setting", "Weekly review"]
    },
    
     10: { /* Floral Design Calendar */ id:10, title:"Floral Design Calendar", subtitle:"Beautiful botanical illustrations", category:"personal", categories:["wall","monthly","personal"], orientation:"portrait", downloadCount:4543, likes:1987,
        calendarYear: "Undated",
        paperSize: "US Letter, A4",
        printReady: "Yes",
        colors: ["#2C3E50", "#3498DB", "#27AE60", "#F39C12", "#E74C3C"],
        colorNames: ["Midnight Blue", "Peter River", "Nephritis", "Orange", "Alizarin"],
        tags: ["productivity", "weekly", "planner", "tasks", "goals"],
        features: ["Time blocking", "Priority tasks", "Habit tracker", "Goal setting", "Weekly review"]
    },
    
     11: { /* Student Academic Planner */ id:11, title:"Student Academic Planner", subtitle:"Class schedule and assignment tracker", category:"academic", categories:["weekly","academic","student"], orientation:"portrait", downloadCount:5987, likes:2345,
        calendarYear: "Undated",
        paperSize: "US Letter, A4",
        printReady: "Yes",
        colors: ["#2C3E50", "#3498DB", "#27AE60", "#F39C12", "#E74C3C"],
        colorNames: ["Midnight Blue", "Peter River", "Nephritis", "Orange", "Alizarin"],
        tags: ["productivity", "weekly", "planner", "tasks", "goals"],
        features: ["Time blocking", "Priority tasks", "Habit tracker", "Goal setting", "Weekly review"]
    },
    
     12: { /* Professional Quarterly Planner */ id:12, title:"Professional Quarterly Planner", subtitle:"Business quarter planning with goals", category:"business", categories:["monthly","business","quarterly"], orientation:"landscape", downloadCount:1876, likes:654,
        calendarYear: "Undated",
        paperSize: "US Letter, A4",
        printReady: "Yes",
        colors: ["#2C3E50", "#3498DB", "#27AE60", "#F39C12", "#E74C3C"],
        colorNames: ["Midnight Blue", "Peter River", "Nephritis", "Orange", "Alizarin"],
        tags: ["productivity", "weekly", "planner", "tasks", "goals"],
        features: ["Time blocking", "Priority tasks", "Habit tracker", "Goal setting", "Weekly review"]
    },
};

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











// ===== GLOBAL VARIABLES =====
let likedCalendars = JSON.parse(localStorage.getItem('likedCalendars')) || [];
let downloadTriggered = JSON.parse(localStorage.getItem('downloadTriggered')) || [];

// ===== RENDER PROJECTS GRID =====
function renderProjectsGrid(filterCategory = 'all', filterOrientation = 'all', sortBy = 'newest') {
    const grid = document.getElementById('projectsGrid');
    if (!grid) return;

    let filtered = Object.values(calendars).filter(cal => {
        if (filterCategory !== 'all' && !cal.categories.includes(filterCategory)) return false;
        if (filterOrientation !== 'all' && cal.orientation !== filterOrientation) return false;
        return true;
    });

    // Sorting
    if (sortBy === 'popular') filtered.sort((a,b) => b.likes - a.likes);
    else if (sortBy === 'downloads') filtered.sort((a,b) => b.downloadCount - a.downloadCount);
    else if (sortBy === 'az') filtered.sort((a,b) => a.title.localeCompare(b.title));
    else if (sortBy === 'za') filtered.sort((a,b) => b.title.localeCompare(a.title));
    else filtered.sort((a,b) => b.id - a.id); // newest

    grid.innerHTML = filtered.map(cal => {
        const isLiked = likedCalendars.includes(cal.id);
        const likeCount = isLiked ? cal.likes + 1 : cal.likes;
        const badgeText = cal.categories[0].charAt(0).toUpperCase() + cal.categories[0].slice(1); // e.g., "Yearly"

        return `
        <div class="project-card" data-id="${cal.id}" data-category="${cal.categories.join(' ')}" data-orientation="${cal.orientation}">
            <div class="project-badge">${badgeText}</div>
            <div class="project-img">
                <img src="${cal.thumbnailUrl}" alt="${cal.title}" loading="lazy">
            </div>
            <div class="project-info">
                <h3>${cal.title}</h3>
                <p>${cal.subtitle}</p>
                <div class="project-meta">
                    <span class="project-price free">FREE</span>
                    <div class="project-stats">
                        <span class="project-likes">
                            <i class="fas fa-heart like-icon ${isLiked ? 'active' : ''}" data-id="${cal.id}"></i>
                            <span class="like-count" data-id="${cal.id}">${likeCount}</span>
                        </span>
                        <span class="project-downloads">
                            <i class="fas fa-download"></i>
                            <span class="download-count" data-id="${cal.id}">${cal.downloadCount}</span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
        `;
    }).join('');

    // Attach like event listeners
    document.querySelectorAll('.project-likes .like-icon').forEach(icon => {
        icon.addEventListener('click', function(e) {
            e.stopPropagation();
            const id = parseInt(this.dataset.id);
            handleLike(id);
        });
    });

    // Attach card click to open modal
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', function(e) {
            if (!e.target.classList.contains('like-icon') && !e.target.closest('.project-likes')) {
                const id = parseInt(this.dataset.id);
                openModal(id);
            }
        });
    });
}

// ===== HANDLE LIKE =====
function handleLike(calId) {
    const calendar = calendars[calId];
    if (!calendar) return;

    const wasLiked = likedCalendars.includes(calId);
    if (wasLiked) {
        likedCalendars = likedCalendars.filter(id => id !== calId);
        calendar.likes -= 1;
        calendar.downloadCount -= 1; // also decrease download
    } else {
        likedCalendars.push(calId);
        calendar.likes += 1;
        calendar.downloadCount += 1; // increase both
    }
    localStorage.setItem('likedCalendars', JSON.stringify(likedCalendars));

    // Update UI
    const likeIcons = document.querySelectorAll(`.project-likes .like-icon[data-id="${calId}"]`);
    const likeCounts = document.querySelectorAll(`.like-count[data-id="${calId}"]`);
    const downloadCounts = document.querySelectorAll(`.download-count[data-id="${calId}"]`);

    likeIcons.forEach(icon => icon.classList.toggle('active', !wasLiked));
    likeCounts.forEach(el => el.textContent = wasLiked ? calendar.likes : calendar.likes + 1);
    downloadCounts.forEach(el => el.textContent = wasLiked ? calendar.downloadCount : calendar.downloadCount + 1);
}

// ===== MODAL FUNCTIONS =====
let currentCalendarId = null;
const modal = document.getElementById('calendarModal');
function openModal(id) {
    const cal = calendars[id];
    if (!cal) return;
    currentCalendarId = id;

    // Populate basic info
    document.getElementById('modalImage').src = cal.thumbnailUrl;
    document.getElementById('modalTitle').textContent = cal.title;
    document.getElementById('modalSubtitle').textContent = cal.subtitle;
    document.getElementById('modalDescription').textContent = cal.description;
    document.getElementById('designDetails').textContent = cal.designDetails;
    document.getElementById('materialsSpecs').textContent = cal.materialsSpecs;
    document.getElementById('designInspiration').textContent = cal.designInspiration;
    document.getElementById('practicalApplications').textContent = cal.practicalApplications;
    document.getElementById('calendarType').textContent = cal.calendarType;
    document.getElementById('fileFormat').textContent = cal.fileFormats.join(', ');
    document.getElementById('dimensions').textContent = cal.dimensions;
    document.getElementById('downloadCount').textContent = cal.downloadCount.toLocaleString();
    document.getElementById('orientation').textContent = cal.orientation.charAt(0).toUpperCase() + cal.orientation.slice(1);
    document.getElementById('calendarYear').textContent = cal.calendarYear;
    document.getElementById('paperSize').textContent = cal.paperSize;
    document.getElementById('printReady').textContent = cal.printReady;
    document.getElementById('modalFullImage').src = cal.fullImageUrl;
    document.getElementById('modalFullImage').className = `modal-full-image ${cal.orientation}`;

    // Price (always FREE)
    document.getElementById('modalPrice').innerHTML = '<span class="price-free">FREE</span>';

    // Format badges
    const formatBadges = document.getElementById('formatBadges');
    formatBadges.innerHTML = cal.fileFormats.map(f => `<span class="format-badge">${f}</span>`).join('');

    // Color palette
    const colorPalette = document.getElementById('colorPalette');
    colorPalette.innerHTML = cal.colors.map((c, i) => `
        <div class="color" style="background-color: ${c};" title="${cal.colorNames[i]}"></div>
    `).join('');

    // Tags
    document.getElementById('tagsContainer').innerHTML = cal.tags.map(t => `<span class="tag">${t}</span>`).join('');

    // Features
    const featuresList = document.getElementById('featuresList');
    featuresList.innerHTML = cal.features.map(f => `<li>${f}</li>`).join('');

    // Related designs
    generateRelatedDesigns(id, cal.category);

    // Modal like button state
    const modalLikeBtn = document.getElementById('modalLikeBtn');
    const modalLikeCount = document.getElementById('modalLikeCount');
    const isLiked = likedCalendars.includes(id);
    modalLikeBtn.classList.toggle('active', isLiked);
    modalLikeCount.textContent = isLiked ? cal.likes + 1 : cal.likes;

    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
    currentCalendarId = null;
}

function generateRelatedDesigns(currentId, category) {
    const container = document.getElementById('relatedDesigns');
    const related = Object.values(calendars)
        .filter(c => c.id !== currentId && c.category === category)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);
    
    container.innerHTML = related.map(c => `
        <div class="related-item" data-id="${c.id}">
            <img src="${c.thumbnailUrl}" alt="${c.title}">
            <div class="related-overlay"><span>${c.title}</span></div>
        </div>
    `).join('');

    container.querySelectorAll('.related-item').forEach(item => {
        item.addEventListener('click', () => openModal(parseInt(item.dataset.id)));
    });
}

// ===== FILTER & SORT =====
function applyFilters() {
    const activeFilterBtn = document.querySelector('.filter-btn.active');
    const category = activeFilterBtn ? activeFilterBtn.dataset.filter : 'all';
    const orientation = document.getElementById('orientationFilter').value;
    const sort = document.getElementById('sortFilter').value;
    renderProjectsGrid(category, orientation, sort);
}

// ===== DOWNLOAD SIMULATION =====
function downloadTemplate(calId) {
    const cal = calendars[calId];
    if (!cal) return;
    alert(`Downloading "${cal.title}" template.\n(ZIP file would be downloaded from /assets/downloads/calendar-${calId}.zip)`);
    cal.downloadCount += 1;
    localStorage.setItem(`download_${calId}`, Date.now());
    document.querySelectorAll(`.download-count[data-id="${calId}"]`).forEach(el => {
        el.textContent = cal.downloadCount;
    });
    document.getElementById('downloadCount').textContent = cal.downloadCount.toLocaleString();
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', function() {
    // Starfield
    new StarfieldAnimation();

    // AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({ duration: 800, once: true, offset: 100 });
    }

    // Initial render
    renderProjectsGrid();

    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            applyFilters();
        });
    });

    // Filter selects
    ['categoryFilter', 'orientationFilter', 'sortFilter'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('change', applyFilters);
    });

    // Load more (simulate)
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
            this.disabled = true;
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-plus"></i> Load More Calendars';
                this.disabled = false;
                alert('More calendars would be loaded dynamically in production.');
            }, 1000);
        });
    }

    // Modal close
    document.getElementById('closeModal').addEventListener('click', closeModal);
    document.querySelector('.modal-overlay').addEventListener('click', function(e) {
        if (e.target === this) closeModal();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
    });

    // Modal actions
    document.getElementById('modalLikeBtn').addEventListener('click', function() {
        if (!currentCalendarId) return;
        handleLike(currentCalendarId);
        const cal = calendars[currentCalendarId];
        const isLiked = likedCalendars.includes(currentCalendarId);
        this.classList.toggle('active', isLiked);
        document.getElementById('modalLikeCount').textContent = isLiked ? cal.likes + 1 : cal.likes;
    });

    document.getElementById('modalDownloadBtn').addEventListener('click', function() {
        if (currentCalendarId) downloadTemplate(currentCalendarId);
    });

    document.getElementById('downloadTemplateBtn').addEventListener('click', function() {
        if (currentCalendarId) downloadTemplate(currentCalendarId);
    });

    document.getElementById('previewBtn').addEventListener('click', function() {
        if (currentCalendarId) window.open(calendars[currentCalendarId].fullImageUrl, '_blank');
    });

    document.getElementById('customizeBtn').addEventListener('click', function() {
        alert('Online editor coming soon!');
    });

    // Mobile nav, auth, etc. (from first template – simplified)
    // ... (include full mobile nav toggle, user dropdown, auth modal handlers – as in first template's JS)
    // For brevity, assumed to be similar to first template; will be fully functional in final deliverable.

    // Back to top
    const backToTop = document.getElementById('backToTop');
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) backToTop.classList.add('active');
        else backToTop.classList.remove('active');
    });
    backToTop.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Newsletter
    document.getElementById('newsletterForm').addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for subscribing! You\'ll receive monthly calendar templates.');
        e.target.reset();
    });
});




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



// DOM ELEMENTS ===== AUTH MODAL HANDLERS =====
const authModal = document.getElementById('authModal');
const closeAuthModal = document.getElementById('closeAuthModal');
const loginBtn = document.getElementById('loginBtn');
const signupBtn = document.getElementById('signupBtn');
const userBtn = document.getElementById('userBtn');
const userDropdown = document.getElementById('userDropdown');
const overlay = document.getElementById('overlay');
const authTabs = document.querySelectorAll('.auth-tab');
const authForms = document.querySelectorAll('.auth-form');

// Open modal
if (loginBtn) {
    loginBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openAuthModal('login');
    });
}
if (signupBtn) {
    signupBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openAuthModal('signup');
    });
}

function openAuthModal(type = 'login') {
    authModal.classList.add('active');
    overlay.classList.add('active');
    document.body.classList.add('no-scroll');
    switchAuthTab(type);
}

// Close modal
if (closeAuthModal) {
    closeAuthModal.addEventListener('click', closeAuthModalFunc);
}
overlay.addEventListener('click', closeAuthModalFunc);
function closeAuthModalFunc() {
    authModal.classList.remove('active');
    overlay.classList.remove('active');
    document.body.classList.remove('no-scroll');
}

// Tab switching
authTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const tabId = tab.getAttribute('data-tab');
        switchAuthTab(tabId);
    });
});
function switchAuthTab(tabId) {
    authTabs.forEach(t => t.classList.remove('active'));
    authForms.forEach(f => f.classList.remove('active'));
    document.querySelector(`.auth-tab[data-tab="${tabId}"]`).classList.add('active');
    document.getElementById(`${tabId}Form`).classList.add('active');
}

// User dropdown
if (userBtn) {
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

// Form submissions (simple simulation)
document.getElementById('loginForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Login successful (demo)');
    closeAuthModalFunc();
});
document.getElementById('signupForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Account created! (demo)');
    closeAuthModalFunc();
});