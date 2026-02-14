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
            star.x += star.speedX;
            star.y += star.speedY;
            
            if (star.x < -50) star.x = this.canvas.width + 50;
            if (star.x > this.canvas.width + 50) star.x = -50;
            if (star.y < -50) star.y = this.canvas.height + 50;
            if (star.y > this.canvas.height + 50) star.y = -50;
            
            star.opacity = 0.3 + Math.sin(time * star.twinkleSpeed + star.twinkleOffset) * 0.3;
            
            const points = Math.floor(Math.random() * 2) + 4;
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

// ===== SEARCH DATA (for header search) =====
const searchData = [
    { title: "Business Flyer", category: "Flyers", url: "./templates/flyers/business-flyers.html", tags: ["flyer", "business", "marketing"] },
    { title: "Event Flyer", category: "Flyers", url: "./templates/flyers/event-flyer.html", tags: ["event", "party", "celebration"] },
    { title: "Sale Flyer", category: "Flyers", url: "./templates/flyers/sale-flyer.html", tags: ["sale", "discount", "promotion"] },
    { title: "Real Estate Flyer", category: "Flyers", url: "./templates/flyers/real-estate-flyer.html", tags: ["real estate", "property", "house"] },
    { title: "Corporate Flyer", category: "Flyers", url: "./templates/flyers/corporate-flyer.html", tags: ["corporate", "business", "professional"] },
    { title: "Music Festival Flyer", category: "Flyers", url: "./templates/flyers/music-flyer.html", tags: ["music", "festival", "concert"] },
    { title: "Party Flyer", category: "Flyers", url: "./templates/flyers/party-flyer.html", tags: ["party", "birthday", "celebration"] },
    { title: "Promotional Flyer", category: "Flyers", url: "./templates/flyers/promo-flyer.html", tags: ["promo", "advertisement", "marketing"] }
];

// ===== FLYER DATA (12 complete items) =====
const flyers = {
    1: {
        id: 1,
        title: "Modern Business Flyer",
        subtitle: "Clean corporate design for professional use",
        description: "A sleek, professional flyer template perfect for corporate announcements, product launches, and B2B marketing. Features a modular grid and ample space for your content.",
        designDetails: "Grid-based layout with ample whitespace, modern sans-serif typography, subtle geometric accents.",
        materialsSpecs: "Print-ready with bleed marks, CMYK, 150gsm matte paper recommended.",
        designInspiration: "Swiss design, minimalist corporate branding.",
        practicalApplications: "Corporate events, business announcements, product launches.",
        thumbnailUrl: "https://picsum.photos/id/1/600/400",
        fullImageUrl: "https://picsum.photos/id/1/1200/800",
        flyerType: "Business Flyer",
        category: "business",
        categories: ["business", "corporate"],
        fileFormats: ["PDF", "PSD", "AI", "PNG", "JPG"],
        dimensions: "A4 (8.27×11.69 in) | 2480×3508 px",
        orientation: "portrait",
        downloadCount: 3245,
        likes: 942,
        paperSize: "A4, US Letter",
        printReady: "Yes",
        colors: ["#2C3E50", "#3498DB", "#ECF0F1", "#95A5A6", "#27AE60"],
        colorNames: ["Midnight Blue", "Peter River", "Clouds", "Concrete", "Nephritis"],
        tags: ["business", "corporate", "professional", "minimal"],
        features: ["Fully editable", "Print-ready", "Includes guidelines", "Free fonts used"],
        videoUrl: "https://www.youtube.com/watch?v=T6LMWAxnm-s&t=57s"  // first tutorial link
    },
    2: {
        id: 2,
        title: "Colorful Event Flyer",
        subtitle: "Vibrant design for parties and gatherings",
        description: "Eye‑catching flyer template for any kind of event – from birthday parties to music festivals. Bold colors, playful typography, and plenty of space for your details.",
        designDetails: "Vibrant gradients, bold display fonts, asymmetrical layout, photo‑ready areas.",
        materialsSpecs: "Digital and print, 130gsm glossy paper recommended.",
        designInspiration: "Street art, festival posters, Memphis design.",
        practicalApplications: "Concerts, club nights, birthday parties, community events.",
        thumbnailUrl: "https://picsum.photos/id/26/600/400",
        fullImageUrl: "https://picsum.photos/id/26/1200/800",
        flyerType: "Event Flyer",
        category: "event",
        categories: ["event", "party"],
        fileFormats: ["PDF", "PSD", "AI", "PNG", "JPG"],
        dimensions: "A5 (5.83×8.27 in) | 1748×2480 px",
        orientation: "portrait",
        downloadCount: 4281,
        likes: 1532,
        paperSize: "A5, Half Letter",
        printReady: "Yes",
        colors: ["#F9C74F", "#F9844A", "#F94144", "#577590", "#43AA8B"],
        colorNames: ["Sunset Yellow", "Orange", "Red", "Blue", "Green"],
        tags: ["event", "party", "colorful", "festival"],
        features: ["Fully editable", "Print-ready", "Social media sizes included", "Spot colors"],
        videoUrl: "https://www.youtube.com/watch?v=FW2-byfMRbI&t=284s"  // second tutorial link
    },
    3: {
        id: 3,
        title: "Flash Sale Flyer",
        subtitle: "Urgent design for promotions and discounts",
        description: "Create urgency and drive sales with this bold sale flyer template. Large price tags, countdown timers, and attention‑grabbing typography.",
        designDetails: "High‑contrast colors, large price display, countdown element, bullet points for offers.",
        materialsSpecs: "Print‑ready PDF with crop marks, CMYK, 100gsm coated paper.",
        designInspiration: "Retail advertising, Black Friday campaigns.",
        practicalApplications: "Retail sales, online promotions, clearance events.",
        thumbnailUrl: "https://picsum.photos/id/24/600/400",
        fullImageUrl: "https://picsum.photos/id/24/1200/800",
        flyerType: "Sale Flyer",
        category: "sale",
        categories: ["sale", "promotional"],
        fileFormats: ["PDF", "PSD", "AI", "PNG", "JPG"],
        dimensions: "A4 (8.27×11.69 in) | 2480×3508 px",
        orientation: "portrait",
        downloadCount: 2765,
        likes: 887,
        paperSize: "A4, US Letter",
        printReady: "Yes",
        colors: ["#E63946", "#F1FA8C", "#A8DADC", "#457B9D", "#1D3557"],
        colorNames: ["Red", "Light Yellow", "Light Blue", "Steel Blue", "Dark Blue"],
        tags: ["sale", "discount", "promotion", "retail"],
        features: ["Editable text", "Change colors", "Countdown element", "Print‑ready"],
        videoUrl: null
    },
    4: {
        id: 4,
        title: "Real Estate Open House Flyer",
        subtitle: "Professional flyer for property listings",
        description: "Showcase your property with this elegant real estate flyer. Features a large photo area, key selling points, and agent contact details.",
        designDetails: "Sophisticated serif + sans‑serif pairing, subtle texture, price and features prominently displayed.",
        materialsSpecs: "Print‑ready, CMYK, 150gsm matte paper recommended.",
        designInspiration: "Luxury real estate brochures, architectural photography.",
        practicalApplications: "Open houses, property listings, agent marketing.",
        thumbnailUrl: "https://picsum.photos/id/106/600/400",
        fullImageUrl: "https://picsum.photos/id/106/1200/800",
        flyerType: "Real Estate Flyer",
        category: "real-estate",
        categories: ["real-estate", "business"],
        fileFormats: ["PDF", "PSD", "AI", "PNG", "JPG"],
        dimensions: "A5 (5.83×8.27 in) | 1748×2480 px",
        orientation: "portrait",
        downloadCount: 1982,
        likes: 614,
        paperSize: "A5, Half Letter",
        printReady: "Yes",
        colors: ["#2C3E50", "#BDC3C7", "#ECF0F1", "#7F8C8D", "#3498DB"],
        colorNames: ["Dark Blue", "Silver", "Clouds", "Asbestos", "Peter River"],
        tags: ["real estate", "property", "open house", "agent"],
        features: ["Photo placeholder", "Key features list", "Agent info", "Print‑ready"],
        videoUrl: null
    },
    5: {
        id: 5,
        title: "Music Festival Flyer",
        subtitle: "Edgy design for concerts and festivals",
        description: "Capture the energy of your music event with this bold, grunge‑inspired flyer. Perfect for rock, electronic, or indie festivals.",
        designDetails: "Distressed textures, overlapping elements, bold headline, line‑up grid.",
        materialsSpecs: "Print‑ready PDF, CMYK, 120gsm uncoated paper for a natural feel.",
        designInspiration: "Rock posters, street art, vinyl cover art.",
        practicalApplications: "Music festivals, club nights, concert promotions.",
        thumbnailUrl: "https://picsum.photos/id/15/600/400",
        fullImageUrl: "https://picsum.photos/id/15/1200/800",
        flyerType: "Music Flyer",
        category: "music",
        categories: ["music", "event"],
        fileFormats: ["PDF", "PSD", "AI", "PNG", "JPG"],
        dimensions: "A4 (8.27×11.69 in) | 2480×3508 px",
        orientation: "portrait",
        downloadCount: 3310,
        likes: 1275,
        paperSize: "A4, US Letter",
        printReady: "Yes",
        colors: ["#000000", "#E63946", "#F1FA8C", "#A8DADC", "#457B9D"],
        colorNames: ["Black", "Red", "Yellow", "Light Blue", "Blue"],
        tags: ["music", "festival", "concert", "band"],
        features: ["Line‑up grid", "Editable text", "Photo ready", "Print‑ready"],
        videoUrl: null
    },
    6: {
        id: 6,
        title: "Corporate Seminar Flyer",
        subtitle: "Elegant design for professional events",
        description: "Promote your seminar, workshop, or conference with this refined, grid‑based flyer. Clean lines and a professional color scheme.",
        designDetails: "Grid layout, subtle gradient background, icon set included.",
        materialsSpecs: "Print‑ready PDF with bleed, CMYK, 150gsm silk paper.",
        designInspiration: "Corporate identity, minimalist posters.",
        practicalApplications: "Seminars, workshops, conferences, networking events.",
        thumbnailUrl: "https://picsum.photos/id/20/600/400",
        fullImageUrl: "https://picsum.photos/id/20/1200/800",
        flyerType: "Corporate Flyer",
        category: "corporate",
        categories: ["corporate", "business"],
        fileFormats: ["PDF", "PSD", "AI", "PNG", "JPG"],
        dimensions: "A5 (5.83×8.27 in) | 1748×2480 px",
        orientation: "portrait",
        downloadCount: 1547,
        likes: 512,
        paperSize: "A5, Half Letter",
        printReady: "Yes",
        colors: ["#1E3D58", "#43B0F1", "#E8EEF1", "#057DCD", "#F4F4F4"],
        colorNames: ["Navy", "Sky Blue", "Off White", "Blue", "Light Gray"],
        tags: ["corporate", "seminar", "workshop", "professional"],
        features: ["Agenda area", "Speaker bios", "Sponsor logos", "Print‑ready"],
        videoUrl: null
    },
    7: {
        id: 7,
        title: "Restaurant Promotion Flyer",
        subtitle: "Appetizing design for food & drink offers",
        description: "Make your customers hungry with this delicious‑looking flyer template. Perfect for happy hour, new menu items, or special events.",
        designDetails: "Food‑friendly layout, large photo space, decorative typography.",
        materialsSpecs: "Print‑ready PDF, CMYK, 150gsm gloss paper.",
        designInspiration: "Food photography, vintage menus.",
        practicalApplications: "Restaurants, cafes, food trucks, bars.",
        thumbnailUrl: "https://picsum.photos/id/30/600/400",
        fullImageUrl: "https://picsum.photos/id/30/1200/800",
        flyerType: "Promotional Flyer",
        category: "promotional",
        categories: ["promotional", "sale"],
        fileFormats: ["PDF", "PSD", "AI", "PNG", "JPG"],
        dimensions: "A5 (5.83×8.27 in) | 1748×2480 px",
        orientation: "landscape",
        downloadCount: 2194,
        likes: 784,
        paperSize: "A5, Half Letter",
        printReady: "Yes",
        colors: ["#E27D60", "#E8A87C", "#C38D9E", "#E98074", "#E6B89C"],
        colorNames: ["Terracotta", "Peach", "Mauve", "Coral", "Cream"],
        tags: ["restaurant", "food", "drink", "promotion"],
        features: ["Menu section", "Offer highlights", "Photo ready", "Print‑ready"],
        videoUrl: null
    },
    8: {
        id: 8,
        title: "Gym & Fitness Flyer",
        subtitle: "Motivational design for fitness events",
        description: "Inspire action with this energetic flyer for gym openings, fitness classes, or wellness workshops. Bold typography and dynamic shapes.",
        designDetails: "Dynamic diagonal lines, bold sans‑serif, before/after photo spots.",
        materialsSpecs: "Print‑ready PDF, CMYK, 130gsm matte paper.",
        designInspiration: "Sports branding, motivational posters.",
        practicalApplications: "Gym openings, fitness classes, personal training.",
        thumbnailUrl: "https://picsum.photos/id/98/600/400",
        fullImageUrl: "https://picsum.photos/id/98/1200/800",
        flyerType: "Promotional Flyer",
        category: "promotional",
        categories: ["promotional", "event"],
        fileFormats: ["PDF", "PSD", "AI", "PNG", "JPG"],
        dimensions: "A4 (8.27×11.69 in) | 2480×3508 px",
        orientation: "portrait",
        downloadCount: 1862,
        likes: 633,
        paperSize: "A4, US Letter",
        printReady: "Yes",
        colors: ["#F94144", "#F9C74F", "#90BE6D", "#577590", "#4D908E"],
        colorNames: ["Red", "Yellow", "Green", "Blue", "Teal"],
        tags: ["fitness", "gym", "workout", "health"],
        features: ["Class schedule", "Trainer bios", "Price list", "Print‑ready"],
        videoUrl: null
    },
    9: {
        id: 9,
        title: "Birthday Party Flyer",
        subtitle: "Fun, colorful design for all ages",
        description: "Celebrate in style with this versatile birthday flyer. Customize the colors and text to match any age or theme.",
        designDetails: "Playful shapes, confetti elements, balloon illustrations, photo spot.",
        materialsSpecs: "Print‑ready PDF, CMYK, 120gsm gloss paper.",
        designInspiration: "Party decorations, children’s birthday themes.",
        practicalApplications: "Kids' birthdays, adult parties, milestone celebrations.",
        thumbnailUrl: "https://picsum.photos/id/96/600/400",
        fullImageUrl: "https://picsum.photos/id/96/1200/800",
        flyerType: "Party Flyer",
        category: "party",
        categories: ["party", "event"],
        fileFormats: ["PDF", "PSD", "AI", "PNG", "JPG"],
        dimensions: "A5 (5.83×8.27 in) | 1748×2480 px",
        orientation: "portrait",
        downloadCount: 2931,
        likes: 1123,
        paperSize: "A5, Half Letter",
        printReady: "Yes",
        colors: ["#F94144", "#F8961E", "#F9C74F", "#90BE6D", "#577590"],
        colorNames: ["Red", "Orange", "Yellow", "Green", "Blue"],
        tags: ["birthday", "party", "celebration", "fun"],
        features: ["Photo spot", "Editable text", "Balloon graphics", "Print‑ready"],
        videoUrl: null
    },
    10: {
        id: 10,
        title: "Non‑profit Fundraiser Flyer",
        subtitle: "Compassionate design for charity events",
        description: "Raise awareness and encourage donations with this heartfelt flyer template. Clean, trustworthy design with space for mission statements and calls to action.",
        designDetails: "Warm color palette, icon set, donor recognition area.",
        materialsSpecs: "Print‑ready PDF, CMYK, 130gsm recycled paper recommended.",
        designInspiration: "Charity campaigns, social impact design.",
        practicalApplications: "Galas, donation drives, awareness events.",
        thumbnailUrl: "https://picsum.photos/id/432/600/400",
        fullImageUrl: "https://picsum.photos/id/432/1200/800",
        flyerType: "Event Flyer",
        category: "event",
        categories: ["event", "promotional"],
        fileFormats: ["PDF", "PSD", "AI", "PNG", "JPG"],
        dimensions: "A4 (8.27×11.69 in) | 2480×3508 px",
        orientation: "portrait",
        downloadCount: 1456,
        likes: 489,
        paperSize: "A4, US Letter",
        printReady: "Yes",
        colors: ["#2E5E4E", "#7C9D8E", "#F4B860", "#C73E1D", "#F3E9D2"],
        colorNames: ["Forest", "Sage", "Gold", "Rust", "Cream"],
        tags: ["non‑profit", "charity", "fundraiser", "awareness"],
        features: ["Mission statement", "Donation tear‑off", "Event details", "Print‑ready"],
        videoUrl: null
    },
    11: {
        id: 11,
        title: "Tech Product Launch Flyer",
        subtitle: "Modern, high‑tech design for gadgets",
        description: "Unleash the hype for your new tech product with this sleek, futuristic flyer. Perfect for smartphones, apps, or software releases.",
        designDetails: "Futuristic gradients, device mockup integration, bold headlines.",
        materialsSpecs: "Digital‑first, also print‑ready CMYK, 150gsm gloss paper.",
        designInspiration: "Apple product launches, sci‑fi aesthetics.",
        practicalApplications: "Product launches, trade shows, online promotions.",
        thumbnailUrl: "https://picsum.photos/id/60/600/400",
        fullImageUrl: "https://picsum.photos/id/60/1200/800",
        flyerType: "Business Flyer",
        category: "business",
        categories: ["business", "promotional"],
        fileFormats: ["PDF", "PSD", "AI", "PNG", "JPG"],
        dimensions: "A4 (8.27×11.69 in) | 2480×3508 px",
        orientation: "landscape",
        downloadCount: 2013,
        likes: 721,
        paperSize: "A4, US Letter",
        printReady: "Yes",
        colors: ["#0A0F0D", "#3A6EA5", "#C0D6DF", "#EBF5EE", "#78A1BB"],
        colorNames: ["Black", "Blue", "Light Blue", "Off White", "Steel Blue"],
        tags: ["tech", "product launch", "gadget", "innovation"],
        features: ["Device placeholder", "Features list", "Call to action", "Print‑ready"],
        videoUrl: null
    },
    12: {
        id: 12,
        title: "Educational Workshop Flyer",
        subtitle: "Clean, inviting design for learning events",
        description: "Attendees to your workshop, class, or seminar with this friendly, organized flyer. Space for curriculum, instructor bio, and registration details.",
        designDetails: "Friendly serif + sans‑serif combination, icons for subjects, grid layout.",
        materialsSpecs: "Print‑ready PDF, CMYK, 120gsm uncoated paper.",
        designInspiration: "Educational brochures, university posters.",
        practicalApplications: "Workshops, adult education, training sessions.",
        thumbnailUrl: "https://picsum.photos/id/20/600/400",
        fullImageUrl: "https://picsum.photos/id/20/1200/800",
        flyerType: "Event Flyer",
        category: "event",
        categories: ["event", "promotional"],
        fileFormats: ["PDF", "PSD", "AI", "PNG", "JPG"],
        dimensions: "A5 (5.83×8.27 in) | 1748×2480 px",
        orientation: "portrait",
        downloadCount: 1782,
        likes: 596,
        paperSize: "A5, Half Letter",
        printReady: "Yes",
        colors: ["#283618", "#606C38", "#FEFAE0", "#DDA15E", "#BC6C25"],
        colorNames: ["Dark Green", "Olive", "Cream", "Tan", "Brown"],
        tags: ["workshop", "education", "class", "training"],
        features: ["Curriculum outline", "Instructor bio", "QR code spot", "Print‑ready"],
        videoUrl: null
    }
};

// ===== GLOBAL VARIABLES =====
let likedFlyers = JSON.parse(localStorage.getItem('likedFlyers')) || [];

// ===== DOM ELEMENTS =====
const mobileNavToggle = document.querySelectorAll('.mobile-nav-toggle');
const mobileNav = document.getElementById('mobile-nav');
const overlay = document.getElementById('overlay');
const backToTop = document.getElementById('backToTop');
const searchInput = document.getElementById('searchInput');
const newsletterForm = document.getElementById('newsletterForm');
const currentYear = document.getElementById('currentYear');

// Auth Modal Elements
const authModal = document.getElementById('authModal');
const closeAuthModal = document.getElementById('closeAuthModal');
const loginBtn = document.getElementById('loginBtn');
const signupBtn = document.getElementById('signupBtn');
const userBtn = document.getElementById('userBtn');
const userDropdown = document.getElementById('userDropdown');
const authTabs = document.querySelectorAll('.auth-tab');
const authForms = document.querySelectorAll('.auth-form');

// YouTube Popup Elements
const youtubePopup = document.getElementById('youtubePopup');
const closeYoutubePopup = document.getElementById('closeYoutubePopup');
const subscribeBtn = document.getElementById('subscribeBtn');
const viewChannelBtn = document.getElementById('viewChannelBtn');

// Flyer Modal Elements
const modal = document.getElementById('flyerModal');
let currentFlyerId = null;

// ===== HELPER: Slugify =====
function slugify(text) {
    return text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/--+/g, '-')
        .replace(/^-+|-+$/g, '');
}

// ===== RENDER PROJECTS GRID =====
function renderProjectsGrid(filterCategory = 'all', filterOrientation = 'all', sortBy = 'newest') {
    const grid = document.getElementById('projectsGrid');
    if (!grid) return;

    let filtered = Object.values(flyers).filter(flr => {
        if (filterCategory !== 'all' && !flr.categories.includes(filterCategory)) return false;
        if (filterOrientation !== 'all' && flr.orientation !== filterOrientation) return false;
        return true;
    });

    // Sorting
    if (sortBy === 'popular') filtered.sort((a,b) => b.likes - a.likes);
    else if (sortBy === 'downloads') filtered.sort((a,b) => b.downloadCount - a.downloadCount);
    else if (sortBy === 'az') filtered.sort((a,b) => a.title.localeCompare(b.title));
    else if (sortBy === 'za') filtered.sort((a,b) => b.title.localeCompare(a.title));
    else filtered.sort((a,b) => b.id - a.id); // newest

    grid.innerHTML = filtered.map(flr => {
        const isLiked = likedFlyers.includes(flr.id);
        const likeCount = isLiked ? flr.likes + 1 : flr.likes;
        const badgeText = flr.categories[0].charAt(0).toUpperCase() + flr.categories[0].slice(1);

        return `
        <div class="project-card" data-id="${flr.id}" data-category="${flr.categories.join(' ')}" data-orientation="${flr.orientation}">
            <div class="project-badge">${badgeText}</div>
            <div class="project-img">
                <img src="${flr.thumbnailUrl}" alt="${flr.title}" loading="lazy">
            </div>
            <div class="project-info">
                <h3>${flr.title}</h3>
                <p>${flr.subtitle}</p>
                <div class="project-meta">
                    <span class="project-price free">FREE</span>
                    <div class="project-stats">
                        <span class="project-likes">
                            <i class="fas fa-heart like-icon ${isLiked ? 'active' : ''}" data-id="${flr.id}"></i>
                            <span class="like-count" data-id="${flr.id}">${likeCount}</span>
                        </span>
                        <span class="project-downloads">
                            <i class="fas fa-download"></i>
                            <span class="download-count" data-id="${flr.id}">${flr.downloadCount}</span>
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
function handleLike(flrId) {
    const flyer = flyers[flrId];
    if (!flyer) return;

    const wasLiked = likedFlyers.includes(flrId);
    if (wasLiked) {
        likedFlyers = likedFlyers.filter(id => id !== flrId);
        flyer.likes -= 1;
    } else {
        likedFlyers.push(flrId);
        flyer.likes += 1;
    }
    localStorage.setItem('likedFlyers', JSON.stringify(likedFlyers));

    // Update UI
    const likeIcons = document.querySelectorAll(`.project-likes .like-icon[data-id="${flrId}"]`);
    const likeCounts = document.querySelectorAll(`.like-count[data-id="${flrId}"]`);

    likeIcons.forEach(icon => icon.classList.toggle('active', !wasLiked));
    likeCounts.forEach(el => el.textContent = flyer.likes);
}

// ===== MODAL FUNCTIONS =====
function openModal(id) {
    const flr = flyers[id];
    if (!flr) return;
    currentFlyerId = id;

    document.getElementById('modalImage').src = flr.thumbnailUrl;
    document.getElementById('modalTitle').textContent = flr.title;
    document.getElementById('modalSubtitle').textContent = flr.subtitle;
    document.getElementById('modalDescription').textContent = flr.description;
    document.getElementById('designDetails').textContent = flr.designDetails;
    document.getElementById('materialsSpecs').textContent = flr.materialsSpecs;
    document.getElementById('designInspiration').textContent = flr.designInspiration;
    document.getElementById('practicalApplications').textContent = flr.practicalApplications;
    document.getElementById('flyerType').textContent = flr.flyerType;
    document.getElementById('fileFormat').textContent = flr.fileFormats.join(', ');
    document.getElementById('dimensions').textContent = flr.dimensions;
    document.getElementById('downloadCount').textContent = flr.downloadCount.toLocaleString();
    document.getElementById('orientation').textContent = flr.orientation.charAt(0).toUpperCase() + flr.orientation.slice(1);
    document.getElementById('paperSize').textContent = flr.paperSize;
    document.getElementById('printReady').textContent = flr.printReady;
    document.getElementById('modalFullImage').src = flr.fullImageUrl;
    document.getElementById('modalFullImage').className = `modal-full-image ${flr.orientation}`;

    document.getElementById('modalPrice').innerHTML = '<span class="price-free">FREE</span>';

    const formatBadges = document.getElementById('formatBadges');
    formatBadges.innerHTML = flr.fileFormats.map(f => `<span class="format-badge">${f}</span>`).join('');

    const colorPalette = document.getElementById('colorPalette');
    colorPalette.innerHTML = flr.colors.map((c, i) => `
        <div class="color" style="background-color: ${c};" title="${flr.colorNames[i]}"></div>
    `).join('');

    document.getElementById('tagsContainer').innerHTML = flr.tags.map(t => `<span class="tag">${t}</span>`).join('');

    const featuresList = document.getElementById('featuresList');
    featuresList.innerHTML = flr.features.map(f => `<li>${f}</li>`).join('');

    // Handle video tutorial section
    const videoSection = document.getElementById('videoTutorialSection');
    if (flr.videoUrl) {
        videoSection.style.display = 'block';
        const videoId = extractYouTubeID(flr.videoUrl);
        if (videoId) {
            const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/0.jpg`;
            document.getElementById('videoThumbnail').src = thumbnailUrl;
            document.getElementById('videoLink').href = flr.videoUrl;
        } else {
            // fallback: just show the link as text
            document.getElementById('videoThumbnail').src = '';
            document.getElementById('videoLink').href = flr.videoUrl;
            document.querySelector('.video-container p').innerHTML = `<a href="${flr.videoUrl}" target="_blank">Watch tutorial on YouTube</a>`;
        }
    } else {
        videoSection.style.display = 'none';
    }

    generateRelatedDesigns(id, flr.category);

    const modalLikeBtn = document.getElementById('modalLikeBtn');
    const modalLikeCount = document.getElementById('modalLikeCount');
    const isLiked = likedFlyers.includes(id);
    modalLikeBtn.classList.toggle('active', isLiked);
    modalLikeCount.textContent = isLiked ? flr.likes + 1 : flr.likes;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
    currentFlyerId = null;
}

function extractYouTubeID(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
}

function generateRelatedDesigns(currentId, category) {
    const container = document.getElementById('relatedDesigns');
    const related = Object.values(flyers)
        .filter(f => f.id !== currentId && f.category === category)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);
    
    container.innerHTML = related.map(f => `
        <div class="related-item" data-id="${f.id}">
            <img src="${f.thumbnailUrl}" alt="${f.title}">
            <div class="related-overlay"><span>${f.title}</span></div>
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

// ===== DOWNLOAD TEMPLATE =====
function downloadTemplate(flrId) {
    const flr = flyers[flrId];
    if (!flr) return;

    const slug = slugify(flr.title);
    const fileName = `${slug}.zip`;
    const fileUrl = `../../assets/downloads/flyers/${fileName}`;

    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    flr.downloadCount += 1;
    localStorage.setItem(`download_${flrId}`, Date.now());
    document.querySelectorAll(`.download-count[data-id="${flrId}"]`).forEach(el => {
        el.textContent = flr.downloadCount;
    });
    document.getElementById('downloadCount').textContent = flr.downloadCount.toLocaleString();
}

// ===== SEARCH FUNCTIONALITY =====
function performSearch(searchTerm) {
    const searchTerms = [
        'flyer', 'business', 'event', 'sale', 'real estate', 'party',
        'music', 'corporate', 'promotional', 'poster', 'template'
    ];
    
    if (searchTerms.some(term => searchTerm.toLowerCase().includes(term))) {
        alert(`Searching for: "${searchTerm}"\n\nThis would show relevant templates in a real implementation.`);
        searchInput.value = '';
    } else {
        alert(`No templates found for "${searchTerm}". Try searching for: flyer, business, event, sale, etc.`);
    }
}

// ===== YOUTUBE POPUP =====
function setupYouTubePopup() {
    if (!youtubePopup) return;
    
    setTimeout(() => {
        youtubePopup.classList.add('active');
        overlay.classList.add('active');
    }, 5000);

    if (closeYoutubePopup) {
        closeYoutubePopup.addEventListener('click', hideYoutubePopup);
    }

    if (subscribeBtn) {
        subscribeBtn.addEventListener('click', () => {
            alert('Redirecting to YouTube to subscribe to our channel!');
            window.open('https://www.youtube.com/channel/UC_x5XG1OV2P6uZZ5FSM9Ttw', '_blank');
            hideYoutubePopup();
        });
    }

    if (viewChannelBtn) {
        viewChannelBtn.addEventListener('click', () => {
            window.open('https://www.youtube.com/@starford.tech7', '_blank');
            hideYoutubePopup();
        });
    }

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

// ===== AUTH MODAL FUNCTIONS =====
function openAuthModal(type = 'login') {
    authModal.classList.add('active');
    overlay.classList.add('active');
    document.body.classList.add('no-scroll');
    switchAuthTab(type);
}

function closeAuthModalFunc() {
    authModal.classList.remove('active');
    overlay.classList.remove('active');
    document.body.classList.remove('no-scroll');
}

function switchAuthTab(tabId) {
    authTabs.forEach(t => t.classList.remove('active'));
    authForms.forEach(f => f.classList.remove('active'));
    document.querySelector(`.auth-tab[data-tab="${tabId}"]`).classList.add('active');
    document.getElementById(`${tabId}Form`).classList.add('active');
}

// ===== INITIALIZE EVERYTHING ON DOM LOAD =====
document.addEventListener('DOMContentLoaded', function() {
    // Starfield
    new StarfieldAnimation();
    
    // Set current year in footer
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }
    
    // Initialize AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            offset: 100,
            mirror: false,
            anchorPlacement: 'top-bottom',
        });
    }
    
    // Initial render of flyer grid
    renderProjectsGrid();
    
    // ===== FILTER BUTTONS =====
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

    // Load More (simulate)
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
            this.disabled = true;
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-plus"></i> Load More Flyers';
                this.disabled = false;
                alert('More flyers would be loaded dynamically in production.');
            }, 1000);
        });
    }

    // ===== MODAL CLOSE EVENTS =====
    document.getElementById('closeModal')?.addEventListener('click', closeModal);
    document.querySelector('.modal-overlay')?.addEventListener('click', function(e) {
        if (e.target === this) closeModal();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
    });

    // Modal action buttons
    document.getElementById('modalLikeBtn')?.addEventListener('click', function() {
        if (!currentFlyerId) return;
        handleLike(currentFlyerId);
        const flr = flyers[currentFlyerId];
        const isLiked = likedFlyers.includes(currentFlyerId);
        this.classList.toggle('active', isLiked);
        document.getElementById('modalLikeCount').textContent = isLiked ? flr.likes + 1 : flr.likes;
    });

    document.getElementById('modalDownloadBtn')?.addEventListener('click', function() {
        if (currentFlyerId) downloadTemplate(currentFlyerId);
    });

    document.getElementById('downloadTemplateBtn')?.addEventListener('click', function() {
        if (currentFlyerId) downloadTemplate(currentFlyerId);
    });

    document.getElementById('previewBtn')?.addEventListener('click', function() {
        if (currentFlyerId) window.open(flyers[currentFlyerId].fullImageUrl, '_blank');
    });

    document.getElementById('customizeBtn')?.addEventListener('click', function() {
        alert('Online editor coming soon!');
    });

    // ===== MOBILE NAVIGATION TOGGLE =====
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

    // Close mobile menu on overlay click
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

    // Mobile dropdown toggle
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

    // ===== USER DROPDOWN =====
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

    // ===== AUTH MODAL =====
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
    if (closeAuthModal) {
        closeAuthModal.addEventListener('click', closeAuthModalFunc);
    }

    // Auth tabs
    authTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabId = tab.getAttribute('data-tab');
            switchAuthTab(tabId);
        });
    });

    // Auth form submissions (simulate)
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

    // ===== SEARCH =====
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

    // ===== NEWSLETTER =====
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = newsletterForm.querySelector('input').value;
            
            const submitBtn = newsletterForm.querySelector('button');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Subscribing...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert(`Thank you for subscribing with ${email}! You'll receive monthly flyer templates.`);
                newsletterForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1000);
        });
    }

    // ===== BACK TO TOP =====
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTop.classList.add('active');
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

    // ===== DESKTOP DROPDOWNS =====
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

    // ===== SMOOTH SCROLLING FOR ANCHOR LINKS =====
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

    // ===== YOUTUBE POPUP =====
    setupYouTubePopup();

    // ===== ADDITIONAL: MOBILE LOGIN/SIGNUP LINKS =====
    document.querySelector('.mobile-login-btn')?.addEventListener('click', (e) => {
        e.preventDefault();
        openAuthModal('login');
    });
    document.querySelector('.mobile-signup-btn')?.addEventListener('click', (e) => {
        e.preventDefault();
        openAuthModal('signup');
    });
});