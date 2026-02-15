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

// Modal Elements
const templateModal = document.getElementById('templateModal');
const closeModalBtn = document.getElementById('closeModalBtn');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalSubtitle = document.getElementById('modalSubtitle');
const modalDescription = document.getElementById('modalDescription');
const modalCategory = document.getElementById('modalCategory');
const modalFileFormat = document.getElementById('modalFileFormat');
const modalDimensions = document.getElementById('modalDimensions');
const modalDownloadCount = document.getElementById('modalDownloadCount');
const modalOrientation = document.getElementById('modalOrientation');
const modalSoftware = document.getElementById('modalSoftware');
const modalPrintReady = document.getElementById('modalPrintReady');
const modalLikesCount = document.getElementById('modalLikesCount');
const modalLikeBtn = document.getElementById('modalLikeBtn');
const modalLikeCount = document.getElementById('modalLikeCount');
const modalDownloadBtn = document.getElementById('modalDownloadBtn');
const modalPopularTag = document.getElementById('modalPopularTag');
const designDetails = document.getElementById('designDetails');
const materialsSpecs = document.getElementById('materialsSpecs');
const designInspiration = document.getElementById('designInspiration');
const practicalApplications = document.getElementById('practicalApplications');
const modalFullImage = document.getElementById('modalFullImage');
const formatBadges = document.getElementById('formatBadges');
const colorPalette = document.getElementById('colorPalette');
const tagsContainer = document.getElementById('tagsContainer');
const featuresList = document.getElementById('featuresList');
const previewBtn = document.getElementById('previewBtn');
const customizeBtn = document.getElementById('customizeBtn');
const downloadTemplateBtn = document.getElementById('downloadTemplateBtn');
const relatedDesigns = document.getElementById('relatedDesigns');

// Popular Designs Button
const popularDesignsBtn = document.getElementById('popularDesignsBtn');

// ===== Template Data with Popular Designs =====
const allTemplates = [
    {
        id: 1,
        title: "Ultimate Business Bundle",
        description: "Complete set of business templates including logos, cards, letterheads, and presentations.",
        category: "Business",
        price: "Free",
        rating: 5.0,
        reviews: 128,
        badge: "Bestseller",
        image: "./assets/images/photos/ultimate-business-bundle.jpeg",
        fullImage: "./assets/images/photos/ultimate-business-bundle-full.jpg",
        link: "./templates/business-bundle.html",
        popular: true,
        likes: 1542,
        downloads: 8765,
        isPopular: true,
        fileFormat: "AI, EPS, PSD, PDF",
        dimensions: "8.5x11 in, A4",
        orientation: "Portrait/Landscape",
        software: "Adobe Illustrator, Photoshop",
        printReady: "Yes, 300 DPI",
        tags: ["business", "corporate", "professional", "bundle"],
        colors: ["#4361ee", "#3a0ca3", "#f72585", "#4cc9f0"],
        features: [
            "Fully editable templates",
            "Print ready files",
            "Includes font links",
            "Help file included",
            "Layer organized"
        ],
        designDetails: "This comprehensive business bundle includes professionally designed templates for all your corporate needs. Each template is crafted with attention to detail and follows modern design trends.",
        materialsSpecs: "High-quality print-ready files at 300 DPI. CMYK color mode for accurate printing. Includes cut marks and bleeds where necessary.",
        designInspiration: "Inspired by modern corporate design trends focusing on clean layouts, professional typography, and brand consistency across all materials.",
        practicalApplications: "Perfect for startups, small businesses, corporate presentations, branding projects, and marketing materials."
    },
    {
        id: 2,
        title: "Social Media Pack 2025",
        description: "200+ templates for Instagram posts, stories, Facebook covers, and Twitter headers.",
        category: "Social Media",
        price: "Free",
        rating: 4.9,
        reviews: 87,
        badge: "New",
        image: "./assets/images/photos/youtube thumbnail image.jpg",
        fullImage: "./assets/images/photos/youtube thumbnail image-full.jpg",
        link: "./templates/social-media/index.html",
        popular: true,
        likes: 2341,
        downloads: 12345,
        isPopular: true,
        fileFormat: "PSD, AI, FIG",
        dimensions: "Various social media sizes",
        orientation: "Square, Landscape, Portrait",
        software: "Photoshop, Illustrator, Figma",
        printReady: "Digital only",
        tags: ["social media", "instagram", "facebook", "twitter", "posts"],
        colors: ["#f72585", "#b5179e", "#4361ee", "#4cc9f0"],
        features: [
            "Optimized for all platforms",
            "Editable text and colors",
            "Organized layers",
            "Free fonts used",
            "Weekly updates"
        ],
        designDetails: "Stay ahead with 2025's hottest social media trends. This pack includes templates for every major platform with attention-grabbing designs that boost engagement.",
        materialsSpecs: "Digital optimized files in RGB color mode. Perfect for web and mobile viewing.",
        designInspiration: "Based on viral social media trends and engagement data to create designs that stop the scroll and encourage interaction.",
        practicalApplications: "Content creators, social media managers, influencers, brands, and digital marketers."
    },
    {
        id: 3,
        title: "Birthday Flyer Templates",
        description: "Clean and modern birthday flyer template designs for all occasions.",
        category: "Flyers",
        price: "Free",
        rating: 4.8,
        reviews: 156,
        badge: null,
        image: "./assets/images/photos/birthday-flyer.jpg",
        fullImage: "./assets/images/photos/birthday-flyer-full.jpg",
        link: "./templates/flyers/birthday.html",
        popular: true,
        likes: 1876,
        downloads: 9876,
        isPopular: true,
        fileFormat: "PSD, AI, PDF",
        dimensions: "8.5x11 in, A5",
        orientation: "Portrait",
        software: "Photoshop, Illustrator",
        printReady: "Yes, 300 DPI",
        tags: ["birthday", "party", "celebration", "flyer"],
        colors: ["#f9c74f", "#f9844a", "#f94144", "#577590"],
        features: [
            "Easy to customize",
            "Print ready",
            "Includes photo placeholders",
            "Free fonts",
            "Multiple color variations"
        ],
        designDetails: "Celebrate in style with these modern birthday flyer templates. Each design features playful elements and customizable sections for your party details.",
        materialsSpecs: "Print-ready files at 300 DPI with CMYK color. Includes bleed and cut marks for professional printing.",
        designInspiration: "Inspired by modern party culture and celebration aesthetics with bright colors and dynamic layouts.",
        practicalApplications: "Birthday parties, milestone celebrations, children's parties, corporate events, and social gatherings."
    },
    {
        id: 4,
        title: "Wedding Invitation Suite",
        description: "Elegant wedding invitations with matching RSVP cards, programs, and menus.",
        category: "Wedding",
        price: "Free",
        rating: 4.9,
        reviews: 64,
        badge: "Limited",
        image: "./assets/images/photos/giveaway-party-flyer-design.jpg",
        fullImage: "./assets/images/photos/giveaway-party-flyer-design-full.jpg",
        link: "./templates/wedding-invitations.html",
        popular: true,
        likes: 2156,
        downloads: 6543,
        isPopular: true,
        fileFormat: "AI, PSD, PDF",
        dimensions: "5x7 in, A6",
        orientation: "Portrait/Landscape",
        software: "Illustrator, Photoshop",
        printReady: "Yes, 300 DPI",
        tags: ["wedding", "invitation", "elegant", "romantic"],
        colors: ["#d4af37", "#f8f0e3", "#9c89b8", "#b8f2e6"],
        features: [
            "Full wedding suite",
            "Elegant typography",
            "Editable text",
            "Matching envelope design",
            "RSVP cards included"
        ],
        designDetails: "Create unforgettable wedding memories with our elegant invitation suite. Each element is thoughtfully designed to match your special day's aesthetic.",
        materialsSpecs: "High-quality print files with elegant paper texture overlays. CMYK color mode for accurate gold foil simulation.",
        designInspiration: "Inspired by classic romance, botanical elements, and timeless elegance with modern touches.",
        practicalApplications: "Weddings, engagement parties, anniversary celebrations, formal events, and romantic occasions."
    },
    {
        id: 5,
        title: "2026 Calendar Collection",
        description: "Beautifully designed wall, desk, and planner calendars for 2026.",
        category: "Calendars",
        price: "Free",
        rating: 4.7,
        reviews: 93,
        badge: null,
        image: "./assets/images/photos/calendar-design-template-2024-shafin.jpg",
        fullImage: "./assets/images/photos/calendar-design-template-2024-shafin-full.jpg",
        link: "./templates/calendars/index.html",
        popular: true,
        likes: 1432,
        downloads: 5432,
        isPopular: true,
        fileFormat: "AI, PSD, PDF, INDD",
        dimensions: "11x17 in, A3",
        orientation: "Portrait/Landscape",
        software: "Illustrator, InDesign, Photoshop",
        printReady: "Yes, 300 DPI",
        tags: ["calendar", "2026", "planner", "wall calendar"],
        colors: ["#4361ee", "#3a0ca3", "#f72585", "#4cc9f0", "#f9c74f"],
        features: [
            "Holidays marked",
            "Editable dates",
            "Multiple layouts",
            "Printable PDF included",
            "Free for commercial use"
        ],
        designDetails: "Plan ahead with our stunning 2026 calendar collection. Featuring modern layouts and beautiful design elements for every month.",
        materialsSpecs: "Print-ready files at 300 DPI. Includes both RGB and CMYK versions for digital and print use.",
        designInspiration: "Inspired by modern minimalism and functional design with artistic elements that make planning beautiful.",
        practicalApplications: "Home decor, office planning, gift giving, project planning, and personal organization."
    },
    {
        id: 6,
        title: "Real Estate Flyer Pack",
        description: "Professional real estate flyer templates for listings, open houses, and property marketing.",
        category: "Real Estate",
        price: "Free",
        rating: 4.9,
        reviews: 178,
        badge: "Trending",
        image: "./assets/images/photos/real-estate-flyer.jpg",
        fullImage: "./assets/images/photos/real-estate-flyer-full.jpg",
        link: "./templates/flyers/real-estate.html",
        popular: true,
        likes: 1987,
        downloads: 8765,
        isPopular: true,
        fileFormat: "PSD, AI, PDF",
        dimensions: "8.5x11 in",
        orientation: "Portrait",
        software: "Photoshop, Illustrator",
        printReady: "Yes, 300 DPI",
        tags: ["real estate", "property", "flyer", "listing"],
        colors: ["#2b2d42", "#8d99ae", "#edf2f4", "#ef233c"],
        features: [
            "Photo ready layouts",
            "Agent info sections",
            "Property details area",
            "QR code ready",
            "Multiple color options"
        ],
        designDetails: "Sell properties faster with these professional real estate flyers. Clean layouts highlight property features and agent information effectively.",
        materialsSpecs: "High-quality print files with spot UV ready layers. CMYK color for accurate printing.",
        designInspiration: "Based on successful real estate marketing materials that convert leads into sales.",
        practicalApplications: "Real estate agents, property listings, open houses, broker events, and property marketing."
    },
    {
        id: 7,
        title: "Restaurant Menu Template",
        description: "Beautiful restaurant menu designs for cafes, bistros, and fine dining establishments.",
        category: "Print Design",
        price: "Free",
        rating: 4.8,
        reviews: 145,
        badge: "Popular",
        image: "./assets/images/photos/restaurant-menu.jpg",
        fullImage: "./assets/images/photos/restaurant-menu-full.jpg",
        link: "./templates/print-design/menu.html",
        popular: true,
        likes: 1654,
        downloads: 7654,
        isPopular: true,
        fileFormat: "AI, PSD, PDF",
        dimensions: "8.5x11 in, 11x17 in",
        orientation: "Portrait/Landscape",
        software: "Illustrator, Photoshop",
        printReady: "Yes, 300 DPI",
        tags: ["menu", "restaurant", "food", "cafe"],
        colors: ["#f8f0e3", "#b5838d", "#6d6875", "#e5989b"],
        features: [
            "Price list included",
            "Food photography ready",
            "Special sections",
            "Editable text",
            "Foldable designs"
        ],
        designDetails: "Elevate your restaurant's brand with our professionally designed menu templates. Each layout is crafted to showcase your culinary offerings beautifully.",
        materialsSpecs: "Print-ready files with appropriate bleeds for professional printing. Includes both single and double-sided options.",
        designInspiration: "Inspired by culinary arts, restaurant branding, and dining experience design.",
        practicalApplications: "Restaurants, cafes, bistros, food trucks, catering services, and hospitality businesses."
    },
    {
        id: 8,
        title: "YouTube Channel Kit",
        description: "Complete branding pack for YouTubers including thumbnails, banners, and end screens.",
        category: "Social Media",
        price: "Free",
        rating: 4.9,
        reviews: 234,
        badge: "Hot",
        image: "./assets/images/photos/youtube-kit.jpg",
        fullImage: "./assets/images/photos/youtube-kit-full.jpg",
        link: "./templates/social-media/youtube-kit.html",
        popular: true,
        likes: 2765,
        downloads: 10987,
        isPopular: true,
        fileFormat: "PSD, AI, FIG",
        dimensions: "YouTube optimized",
        orientation: "Landscape",
        software: "Photoshop, Illustrator, Figma",
        printReady: "Digital only",
        tags: ["youtube", "thumbnail", "banner", "channel art"],
        colors: ["#ff0000", "#282828", "#ffffff", "#065fd4"],
        features: [
            "Click-worthy thumbnails",
            "Channel art templates",
            "End screen designs",
            "Watermark included",
            "Branding guide"
        ],
        designDetails: "Grow your YouTube channel with our complete branding kit. Designed to increase click-through rates and create a professional channel presence.",
        materialsSpecs: "Digital optimized files in RGB color mode. Perfect dimensions for all YouTube platforms.",
        designInspiration: "Based on top-performing YouTube channels and viewer engagement data.",
        practicalApplications: "YouTubers, content creators, video marketers, influencers, and digital media professionals."
    }
];

// Filter templates for popular designs (top 8 by likes)
const popularTemplates = allTemplates
    .filter(template => template.popular)
    .sort((a, b) => b.likes - a.likes)
    .slice(0, 8);

const templateData = allTemplates.slice(0, 5); // For featured section

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
    { name: "Adobe Photoshop", icon: "fab fa-adobe" },
    { name: "Adobe Illustrator", icon: "fab fa-adobe" },
    { name: "Adobe InDesign", icon: "fab fa-adobe" },
    { name: "Figma", icon: "fab fa-figma" },
    { name: "Blender", icon: "fas fa-cube" },
    { name: "Sketch", icon: "fab fa-sketch" },
    { name: "After Effects", icon: "fas fa-film" },
    { name: "Procreate", icon: "fas fa-paint-brush" }
];

// Search Data
const searchData = allTemplates.map(template => ({
    title: template.title,
    category: template.category,
    url: template.link,
    image: template.image,
    tags: template.tags
}));

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
    
    // Load popular designs
    loadPopularDesigns();
    
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
    
    // Setup modal close events
    setupModalEvents();
    
    // Setup popular designs button
    if (popularDesignsBtn) {
        popularDesignsBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const popularSection = document.getElementById('popular-designs');
            if (popularSection) {
                popularSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
});

// ===== Load Popular Designs =====
function loadPopularDesigns() {
    const popularGrid = document.getElementById('popularGrid');
    if (!popularGrid) return;
    
    popularGrid.innerHTML = popularTemplates.map(template => `
        <div class="popular-card" data-id="${template.id}" onclick="openTemplateModal(${template.id})">
            <div class="card-img">
                <img src="${template.image}" alt="${template.title}" loading="lazy">
                <div class="popular-badge-top">
                    <i class="fas fa-fire"></i> Popular
                </div>
                <div class="popular-stats">
                    <span class="popular-stat">
                        <i class="fas fa-heart"></i> ${formatNumber(template.likes)}
                    </span>
                    <span class="popular-stat downloads">
                        <i class="fas fa-download"></i> ${formatNumber(template.downloads)}
                    </span>
                </div>
            </div>
            <div class="popular-card-content">
                <h3>${template.title}</h3>
                <p>${template.description.substring(0, 60)}...</p>
                <div class="popular-card-footer">
                    <span class="popular-category">${template.category}</span>
                    <span class="popular-price free">FREE</span>
                </div>
            </div>
        </div>
    `).join('');
}

// Format numbers with commas
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// ===== Open Template Modal =====
function openTemplateModal(templateId) {
    const template = allTemplates.find(t => t.id === templateId);
    if (!template) return;
    
    // Populate modal with template data
    modalImage.src = template.image;
    modalImage.alt = template.title;
    modalTitle.textContent = template.title;
    modalSubtitle.textContent = template.category;
    modalDescription.textContent = template.description;
    modalCategory.textContent = template.category;
    modalFileFormat.textContent = template.fileFormat;
    modalDimensions.textContent = template.dimensions;
    modalDownloadCount.textContent = formatNumber(template.downloads);
    modalOrientation.textContent = template.orientation;
    modalSoftware.textContent = template.software;
    modalPrintReady.textContent = template.printReady;
    modalLikesCount.textContent = formatNumber(template.likes);
    modalLikeCount.textContent = formatNumber(template.likes);
    
    // Set popular tag if applicable
    if (template.isPopular) {
        modalPopularTag.style.display = 'flex';
    } else {
        modalPopularTag.style.display = 'none';
    }
    
    // Set detailed descriptions
    designDetails.textContent = template.designDetails || "Professionally designed template with attention to detail and modern aesthetics.";
    materialsSpecs.textContent = template.materialsSpecs || "High-quality print-ready files at 300 DPI. CMYK color mode for accurate printing.";
    designInspiration.textContent = template.designInspiration || "Inspired by modern design trends and user experience best practices.";
    practicalApplications.textContent = template.practicalApplications || "Perfect for various applications including marketing, branding, and personal projects.";
    
    // Set full image
    modalFullImage.src = template.fullImage || template.image;
    modalFullImage.alt = template.title;
    
    // Set format badges
    if (template.fileFormat) {
        const formats = template.fileFormat.split(', ');
        formatBadges.innerHTML = formats.map(format => 
            `<span class="format-badge">${format}</span>`
        ).join('');
    }
    
    // Set color palette
    if (template.colors) {
        colorPalette.innerHTML = template.colors.map(color => 
            `<div class="color-item" style="background: ${color};" title="${color}"></div>`
        ).join('');
    }
    
    // Set tags
    if (template.tags) {
        tagsContainer.innerHTML = template.tags.map(tag => 
            `<span class="tag">#${tag}</span>`
        ).join('');
    }
    
    // Set features
    if (template.features) {
        featuresList.innerHTML = template.features.map(feature => 
            `<li>${feature}</li>`
        ).join('');
    }
    
    // Load related designs
    loadRelatedDesigns(template);
    
    // Show modal
    templateModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// ===== Load Related Designs =====
function loadRelatedDesigns(currentTemplate) {
    if (!relatedDesigns) return;
    
    const related = allTemplates
        .filter(t => t.id !== currentTemplate.id && t.category === currentTemplate.category)
        .slice(0, 4);
    
    if (related.length === 0) {
        // If no related in same category, show other popular ones
        related.push(...allTemplates.filter(t => t.id !== currentTemplate.id).slice(0, 4));
    }
    
    relatedDesigns.innerHTML = related.map(template => `
        <div class="related-card" onclick="openTemplateModal(${template.id})">
            <img src="${template.image}" alt="${template.title}">
            <div class="related-card-content">
                <h4>${template.title}</h4>
                <p>${template.category}</p>
            </div>
        </div>
    `).join('');
}

// ===== Setup Modal Events =====
function setupModalEvents() {
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeTemplateModal);
    }
    
    if (templateModal) {
        templateModal.addEventListener('click', (e) => {
            if (e.target === templateModal) {
                closeTemplateModal();
            }
        });
    }
    
    // Like button functionality
    if (modalLikeBtn) {
        modalLikeBtn.addEventListener('click', function() {
            const currentLikes = parseInt(modalLikeCount.textContent.replace(/,/g, ''));
            const newLikes = currentLikes + 1;
            modalLikeCount.textContent = formatNumber(newLikes);
            
            // Animate like button
            this.classList.add('liked');
            setTimeout(() => {
                this.classList.remove('liked');
            }, 300);
            
            // Update card like count (would need template ID in real implementation)
        });
    }
    
    // Download button functionality
    if (downloadTemplateBtn) {
        downloadTemplateBtn.addEventListener('click', function() {
            const currentDownloads = parseInt(modalDownloadCount.textContent.replace(/,/g, ''));
            const newDownloads = currentDownloads + 1;
            modalDownloadCount.textContent = formatNumber(newDownloads);
            
            alert('Your download will start shortly. Thank you for choosing Starford Tech Graphics!');
        });
    }
    
    // Preview button
    if (previewBtn) {
        previewBtn.addEventListener('click', function() {
            const fullImage = document.getElementById('modalFullImage');
            fullImage.scrollIntoView({ behavior: 'smooth' });
        });
    }
    
    // Customize button
    if (customizeBtn) {
        customizeBtn.addEventListener('click', function() {
            alert('Online editor feature coming soon! You can download the template now and edit in your preferred software.');
        });
    }
    
    // Expand button
    const expandBtn = document.getElementById('modalExpandBtn');
    if (expandBtn) {
        expandBtn.addEventListener('click', function() {
            const fullImage = document.getElementById('modalFullImage');
            if (fullImage.requestFullscreen) {
                fullImage.requestFullscreen();
            }
        });
    }
    
    // Share button
    const shareBtn = document.getElementById('modalShareBtn');
    if (shareBtn) {
        shareBtn.addEventListener('click', function() {
            if (navigator.share) {
                navigator.share({
                    title: modalTitle.textContent,
                    text: 'Check out this amazing free template from Starford Tech Graphics!',
                    url: window.location.href,
                });
            } else {
                alert('Share this template with your friends! (Link copied to clipboard)');
                // Copy link logic here
            }
        });
    }
    
    // Favorite button
    const favoriteBtn = document.getElementById('modalFavoriteBtn');
    if (favoriteBtn) {
        favoriteBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            const icon = this.querySelector('i');
            if (this.classList.contains('active')) {
                icon.style.color = 'var(--warning)';
                alert('Added to favorites!');
            } else {
                icon.style.color = '';
                alert('Removed from favorites');
            }
        });
    }
    
    // Bookmark button
    const bookmarkBtn = document.getElementById('modalBookmarkBtn');
    if (bookmarkBtn) {
        bookmarkBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            const icon = this.querySelector('i');
            if (this.classList.contains('active')) {
                icon.style.color = 'var(--primary)';
                alert('Bookmarked for later!');
            } else {
                icon.style.color = '';
                alert('Bookmark removed');
            }
        });
    }
}

// Make openTemplateModal globally available
window.openTemplateModal = openTemplateModal;

// ===== Close Template Modal =====
function closeTemplateModal() {
    templateModal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

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
        <a href="javascript:void(0)" onclick="openTemplateModal(${template.id})" class="featured-slide">
            <div class="featured-card">
                <div class="featured-img">
                    <img src="${template.image}" alt="${template.title}" loading="lazy">
                    ${template.badge ? `<div class="featured-badge">${template.badge}</div>` : ''}
                </div>
                <div class="featured-content">
                    <h3>${template.title}</h3>
                    <p>${template.description.substring(0, 80)}...</p>
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
    const servicesGrid = document.getElementById('servicesGrid');
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
    const portfolioGrid = document.getElementById('portfolioGrid');
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
    const toolsGrid = document.getElementById('toolsGrid');
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
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.trim().toLowerCase();
        
        if (searchTerm.length < 2) {
            searchResults.classList.remove('active');
            return;
        }
        
        const results = searchData.filter(item => 
            item.title.toLowerCase().includes(searchTerm) ||
            item.category.toLowerCase().includes(searchTerm) ||
            item.tags.some(tag => tag.toLowerCase().includes(searchTerm))
        ).slice(0, 5);
        
        displaySearchResults(results, searchTerm);
    });
    
    const searchIcon = document.querySelector('.search-box i');
    if (searchIcon) {
        searchIcon.addEventListener('click', () => {
            const searchTerm = searchInput.value.trim().toLowerCase();
            if (searchTerm) {
                performSearch(searchTerm);
            }
        });
    }
    
    // Close search results when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-box')) {
            searchResults.classList.remove('active');
        }
    });
}

function displaySearchResults(results, searchTerm) {
    if (results.length === 0) {
        searchResults.innerHTML = '<div class="no-results">No templates found</div>';
        searchResults.classList.add('active');
        return;
    }
    
    searchResults.innerHTML = results.map(result => `
        <div class="search-result-item" onclick="selectSearchResult('${result.url}')">
            <img src="${result.image}" alt="${result.title}">
            <div class="search-result-info">
                <h4>${result.title}</h4>
                <p>${result.category}</p>
            </div>
        </div>
    `).join('');
    
    searchResults.classList.add('active');
}

function selectSearchResult(url) {
    window.location.href = url;
}

function performSearch(searchTerm) {
    const results = searchData.filter(item => 
        item.title.toLowerCase().includes(searchTerm) ||
        item.category.toLowerCase().includes(searchTerm) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );
    
    if (results.length > 0) {
        alert(`Found ${results.length} templates for "${searchTerm}"`);
        // In a real implementation, redirect to search results page
        searchInput.value = '';
        searchResults.classList.remove('active');
    } else {
        alert(`No templates found for "${searchTerm}". Try different keywords.`);
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
});