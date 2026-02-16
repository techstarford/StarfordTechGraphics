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

// ===== ORIGINAL DATA ARRAYS =====
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

// ===== ENHANCED TEMPLATE DATABASE (with download URLs and extra counters) =====
const templateDatabase = {
    flyers: [
        {
            id: 'flyer-1',
            title: 'Modern Business Flyer',
            description: 'Professional business flyer template perfect for corporate events and marketing campaigns.',
            category: 'flyers',
            subcategory: 'Business Flyers',
            price: 'Free',
            likes: 2345,
            downloads: 12890,
            favorites: 567,
            shares: 123,
            bookmarks: 89,
            rating: 4.9,
            reviews: 456,
            badge: '🔥 Trending',
            image: '../../assets/images/flyers/new-week-flyer.jpg',
            fullImage: 'https://via.placeholder.com/1200x800/4361ee/ffffff?text=Business+Flyer+Full',
            downloadUrl: './assets/downloads/business-flyer.zip',
            fileFormats: ['AI', 'EPS', 'PSD', 'PDF'],
            dimensions: '8.5" x 11" (US Letter)',
            software: ['Adobe Illustrator', 'Adobe Photoshop'],
            printReady: 'Yes, 300 DPI',
            colorMode: 'CMYK',
            fileSize: '45 MB',
            tags: ['business', 'corporate', 'professional', 'marketing'],
            designDetails: 'This modern business flyer features clean lines, professional typography, and ample space for your company information.',
            materialsSpecs: 'Print on high-quality glossy paper for best results. Designed for 4-color offset printing with 300 DPI resolution.',
            designInspiration: 'Inspired by contemporary corporate architecture and minimalist design principles.',
            practicalApplications: 'Ideal for product launches, corporate announcements, business events, and trade show promotions.',
            features: [
                'Fully editable in Adobe Illustrator',
                'Includes 5 color variations',
                'Print-ready with bleed',
                'Free fonts used',
                'Well-organized layers'
            ],
            colors: ['#4361ee', '#3a0ca3', '#f72585', '#ffffff']
        },
        {
            id: 'flyer-2',
            title: 'Birthday Party Flyer',
            description: 'Vibrant birthday flyer template with fun elements and customizable sections.',
            category: 'flyers',
            subcategory: 'Event Flyers',
            price: 'Free',
            likes: 1876,
            downloads: 9450,
            favorites: 432,
            shares: 98,
            bookmarks: 54,
            rating: 4.8,
            reviews: 324,
            badge: '🎉 Popular',
            image: '../../assets/images/flyers/Claire_001 Birthday flyer.jpg',
            fullImage: 'https://via.placeholder.com/1200x800/f72585/ffffff?text=Birthday+Full',
            downloadUrl: './assets/downloads/birthday-flyer.zip',
            fileFormats: ['PSD', 'AI', 'PNG'],
            dimensions: '8.5" x 11"',
            software: ['Adobe Photoshop', 'Adobe Illustrator'],
            printReady: 'Yes',
            colorMode: 'RGB/CMYK',
            fileSize: '35 MB',
            tags: ['birthday', 'party', 'celebration', 'event'],
            designDetails: 'Colorful and energetic birthday flyer with festive elements like balloons, confetti, and ribbons.',
            materialsSpecs: 'Designed for both digital and print use. High-resolution files with organized layers.',
            designInspiration: 'Inspired by modern party aesthetics and celebration culture.',
            practicalApplications: 'Use for birthday invitations, party promotions, event announcements, and social media sharing.',
            features: [
                'Editable text and colors',
                'Includes both RGB and CMYK versions',
                'High-resolution print files',
                'Free fonts included',
                'Layered PSD files'
            ],
            colors: ['#ff6b6b', '#4ecdc4', '#ffe66d', '#c77dff']
        },
        {
            id: 'flyer-3',
            title: 'Real Estate Flyer',
            description: 'Elegant real estate flyer template for property listings and open houses.',
            category: 'flyers',
            subcategory: 'Real Estate',
            price: 'Free',
            likes: 1567,
            downloads: 7890,
            favorites: 345,
            shares: 67,
            bookmarks: 41,
            rating: 4.7,
            reviews: 278,
            badge: '🏠 Featured',
            image: '../../assets/images/photos/print-design-bg.jpg',
            fullImage: '../../assets/images/photos/print-design-bg.jpg',
            downloadUrl: './assets/downloads/real-estate-flyer.zip',
            fileFormats: ['INDD', 'AI', 'PSD'],
            dimensions: '8.5" x 11"',
            software: ['Adobe InDesign', 'Adobe Illustrator'],
            printReady: 'Yes',
            colorMode: 'CMYK',
            fileSize: '52 MB',
            tags: ['real estate', 'property', 'housing', 'luxury'],
            designDetails: 'Sophisticated real estate flyer designed to showcase luxury properties.',
            materialsSpecs: 'Perfect for premium paper stocks with spot UV coating options.',
            designInspiration: 'Luxury real estate marketing and architectural photography influence this clean design.',
            practicalApplications: 'Ideal for property listings, open house promotions, and realtor marketing materials.',
            features: [
                'Multiple photo placeholders',
                'Property details sections',
                'Agent contact information',
                'QR code placeholder',
                'Social media icons'
            ],
            colors: ['#2c3e50', '#e74c3c', '#ecf0f1', '#bdc3c7']
        },
        {
            id: 'flyer-4',
            title: 'Music Concert Flyer',
            description: 'Dynamic concert flyer template for music events, festivals, and live performances.',
            category: 'flyers',
            subcategory: 'Event Flyers',
            price: 'Free',
            likes: 2134,
            downloads: 11230,
            favorites: 678,
            shares: 156,
            bookmarks: 92,
            rating: 4.9,
            reviews: 412,
            badge: '🎵 Hot',
            image: '../../assets/images/flyers/Graphics-Design-Flyer-thumbnail.jpg',
            fullImage: '../../assets/images/flyers/Graphics-Design-Flyer-full.jpg',
            downloadUrl: './assets/downloads/concert-flyer.zip',
            fileFormats: ['AI', 'PSD', 'EPS'],
            dimensions: '11" x 17" (Poster Size)',
            software: ['Adobe Illustrator', 'Adobe Photoshop'],
            printReady: 'Yes',
            colorMode: 'CMYK',
            fileSize: '48 MB',
            tags: ['concert', 'music', 'event', 'festival'],
            designDetails: 'High-energy concert flyer with bold typography and dynamic graphic elements.',
            materialsSpecs: 'Large format ready with high-resolution graphics. Suitable for posters and banners.',
            designInspiration: 'Inspired by rock concert posters and music festival branding.',
            practicalApplications: 'Use for concert promotions, music festival advertising, and club night events.',
            features: [
                'Bold typography styles',
                'Multiple artist slots',
                'Event details section',
                'Ticket information area',
                'Sponsor logo placements'
            ],
            colors: ['#000000', '#ff3838', '#ff9f1a', '#ffffff']
        }
    ],
    logos: [
        {
            id: 'logo-1',
            title: 'Minimalist Business Logo',
            description: 'Clean and professional logo template for modern businesses and startups.',
            category: 'logos',
            subcategory: 'Business Logos',
            price: 'Free',
            likes: 3210,
            downloads: 15678,
            favorites: 890,
            shares: 234,
            bookmarks: 123,
            rating: 4.9,
            reviews: 567,
            badge: '⭐ Bestseller',
            image: '../../assets/images/logos/3D-Gold-Starford-Tech-Logo-on-Black-Background.jpg',
            fullImage: '../../assets/images/logos/3D-Starford-Tech-Logo-on-gradient-bg.jpg',
            downloadUrl: './assets/downloads/minimalist-logo.zip',
            fileFormats: ['AI', 'EPS', 'SVG', 'PNG'],
            dimensions: 'Vector (Scalable)',
            software: ['Adobe Illustrator', 'CorelDRAW'],
            printReady: 'Yes',
            colorMode: 'RGB/CMYK',
            fileSize: '12 MB',
            tags: ['logo', 'business', 'minimal', 'corporate'],
            designDetails: 'Sophisticated minimalist logo with clean lines and professional typography.',
            materialsSpecs: 'Vector format ensures perfect scaling for any application.',
            designInspiration: 'Modern corporate identity and minimalist design trends.',
            practicalApplications: 'Ideal for business branding, corporate identity, and startup companies.',
            features: [
                'Fully vector editable',
                'Multiple file formats',
                'Color variations included',
                'Black and white versions',
                'Transparent backgrounds'
            ],
            colors: ['#2d4059', '#ea5455', '#eeeeee', '#222831']
        },
        {
            id: 'logo-2',
            title: 'Creative Abstract Logo',
            description: 'Artistic and unique logo template for creative agencies and innovative brands.',
            category: 'logos',
            subcategory: 'Creative Logos',
            price: 'Free',
            likes: 2789,
            downloads: 12345,
            favorites: 654,
            shares: 189,
            bookmarks: 97,
            rating: 4.8,
            reviews: 432,
            badge: '🎨 Creative',
            image: '../../assets/images/logos/ssimwo-joah-logo-mockup-3D-Modern-Wall.png',
            fullImage: '../../assets/images/logos/ssimwo-jonah-logo-on-white-bg.png',
            downloadUrl: './assets/downloads/creative-logo.zip',
            fileFormats: ['AI', 'EPS', 'SVG', 'PDF'],
            dimensions: 'Vector (Scalable)',
            software: ['Adobe Illustrator', 'CorelDRAW'],
            printReady: 'Yes',
            colorMode: 'RGB/CMYK',
            fileSize: '15 MB',
            tags: ['creative', 'abstract', 'artistic', 'unique'],
            designDetails: 'Artistic logo with abstract elements and creative typography.',
            materialsSpecs: 'High-quality vector files with extensive customization options.',
            designInspiration: 'Contemporary art and abstract expressionism influence this unique design.',
            practicalApplications: 'Excellent for creative agencies, art galleries, and innovative brands.',
            features: [
                'Abstract shape elements',
                'Creative typography',
                'Multiple layout options',
                'Gradient versions',
                'Pattern fills'
            ],
            colors: ['#8338ec', '#3a86ff', '#ff006e', '#fb5607']
        },
        {
            id: 'logo-3',
            title: 'Luxury Gold Emblem',
            description: 'Elegant luxury logo template with gold accents for premium brands.',
            category: 'logos',
            subcategory: 'Luxury Logos',
            price: 'Free',
            likes: 2345,
            downloads: 10987,
            favorites: 543,
            shares: 145,
            bookmarks: 76,
            rating: 4.9,
            reviews: 389,
            badge: '👑 Premium',
            image: 'https://via.placeholder.com/600x400/bf9b30/ffffff?text=Luxury+Logo',
            fullImage: 'https://via.placeholder.com/1200x800/bf9b30/ffffff?text=Luxury+Full',
            downloadUrl: './assets/downloads/luxury-logo.zip',
            fileFormats: ['AI', 'EPS', 'SVG', 'PNG'],
            dimensions: 'Vector (Scalable)',
            software: ['Adobe Illustrator', 'Adobe Photoshop'],
            printReady: 'Yes',
            colorMode: 'CMYK with metallic simulation',
            fileSize: '18 MB',
            tags: ['luxury', 'gold', 'elegant', 'premium'],
            designDetails: 'Sophisticated emblem-style logo with gold accents and elegant typography.',
            materialsSpecs: 'Includes metallic color simulation and special printing guides for foil stamping.',
            designInspiration: 'Classic heraldry and modern luxury branding combine in this elegant design.',
            practicalApplications: 'Ideal for luxury brands, premium services, and high-end retail.',
            features: [
                'Gold foil effect',
                'Emblem style design',
                'Monogram options',
                'Seal variations',
                'Embossing guide'
            ],
            colors: ['#bf9b30', '#aa8800', '#1a1a1a', '#ffffff']
        },
        {
            id: 'logo-4',
            title: 'Tech Startup Logo',
            description: 'Modern technology logo template for startups and tech companies.',
            category: 'logos',
            subcategory: 'Technology Logos',
            price: 'Free',
            likes: 2987,
            downloads: 13456,
            favorites: 765,
            shares: 201,
            bookmarks: 112,
            rating: 4.8,
            reviews: 456,
            badge: '💻 Tech',
            image: 'https://via.placeholder.com/600x400/4361ee/ffffff?text=Tech+Logo',
            fullImage: 'https://via.placeholder.com/1200x800/4361ee/ffffff?text=Tech+Full',
            downloadUrl: './assets/downloads/tech-logo.zip',
            fileFormats: ['AI', 'EPS', 'SVG', 'FIG'],
            dimensions: 'Vector (Scalable)',
            software: ['Adobe Illustrator', 'Figma'],
            printReady: 'Yes',
            colorMode: 'RGB/CMYK',
            fileSize: '14 MB',
            tags: ['tech', 'startup', 'digital', 'modern'],
            designDetails: 'Contemporary tech logo with geometric elements and modern typography.',
            materialsSpecs: 'Optimized for both digital and print applications with responsive scaling.',
            designInspiration: 'Modern technology and digital innovation inspire this forward-thinking design.',
            practicalApplications: 'Excellent for tech startups, software companies, and digital platforms.',
            features: [
                'Geometric shapes',
                'Digital-first design',
                'App icon included',
                'Responsive variations',
                'Animation ready'
            ],
            colors: ['#4361ee', '#4cc9f0', '#f72585', '#1a1a2e']
        }
    ],
    businessCards: [
        {
            id: 'card-1',
            title: 'Modern Business Card',
            description: 'Sleek and professional business card template for corporate professionals.',
            category: 'businessCards',
            subcategory: 'Corporate',
            price: 'Free',
            likes: 1987,
            downloads: 9876,
            favorites: 432,
            shares: 98,
            bookmarks: 54,
            rating: 4.8,
            reviews: 345,
            badge: 'Popular',
            image: '../../assets/images/business-cards/business-cards-mt-zion.jpg',
            fullImage: '../../assets/images/business-cards/business-cards-mt-zion.jpg',
            downloadUrl: './assets/downloads/modern-business-card.zip',
            fileFormats: ['AI', 'PSD', 'PDF', 'PNG'],
            dimensions: '3.5" x 2" (Standard)',
            software: ['Adobe Illustrator', 'Adobe Photoshop'],
            printReady: 'Yes, 300 DPI with bleed',
            colorMode: 'CMYK',
            fileSize: '25 MB',
            tags: ['business card', 'corporate', 'professional', 'minimal'],
            designDetails: 'Contemporary business card design with clean typography and subtle geometric patterns.',
            materialsSpecs: 'Print-ready with 0.125" bleed on all sides. Includes guides for standard and rounded corners.',
            designInspiration: 'Modern corporate identity and minimalist design principles.',
            practicalApplications: 'Perfect for executives, consultants, and professionals in any industry.',
            features: [
                'Double-sided design',
                'Spot UV guide',
                'Foil stamping options',
                'Social media icons',
                'QR code placeholder'
            ],
            colors: ['#2c3e50', '#34495e', '#ecf0f1', '#3498db']
        },
        {
            id: 'card-2',
            title: 'Creative Portfolio Card',
            description: 'Artistic business card template for creative professionals and designers.',
            category: 'businessCards',
            subcategory: 'Creative',
            price: 'Free',
            likes: 1654,
            downloads: 7654,
            favorites: 321,
            shares: 76,
            bookmarks: 43,
            rating: 4.7,
            reviews: 234,
            badge: 'Trending',
            image: '../../assets/images/flyers/graphics-design-flyer-template-thumb.jpg',
            fullImage: '../../assets/images/flyers/graphics-design-flyer-template-full.jpg', 
            downloadUrl: './assets/downloads/creative-card.zip',
            fileFormats: ['AI', 'PSD', 'PDF'],
            dimensions: '3.5" x 2"',
            software: ['Adobe Illustrator', 'Adobe Photoshop'],
            printReady: 'Yes',
            colorMode: 'CMYK',
            fileSize: '28 MB',
            tags: ['creative', 'designer', 'portfolio', 'artistic'],
            designDetails: 'Artistic business card with creative layout options, perfect for photographers, designers, and artists to showcase their portfolio.',
            materialsSpecs: 'High-quality design suitable for specialty papers and unique finishes.',
            designInspiration: 'Art gallery aesthetics and portfolio presentations inspire this creative card design.',
            practicalApplications: 'Ideal for creative professionals, artists, photographers, and designers.',
            features: [
                'Portfolio image space',
                'Creative typography',
                'Multiple layout options',
                'Texture overlays',
                'Bleed marks included'
            ],
            colors: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4']
        },
        {
            id: 'card-3',
            title: 'Luxury Gold Business Card',
            description: 'Elegant business card template with gold accents for premium branding.',
            category: 'businessCards',
            subcategory: 'Luxury',
            price: 'Free',
            likes: 1432,
            downloads: 6543,
            favorites: 298,
            shares: 65,
            bookmarks: 37,
            rating: 4.9,
            reviews: 198,
            badge: 'Premium',
            image: '../../assets/images/flyers/Happy-New-Week-Flyer-template-thumb.jpg',
            fullImage: '../../assets/images/flyers/Happy-New-Week-Flyer-template-full.jpg',
            downloadUrl: './assets/downloads/luxury-card.zip',
            fileFormats: ['AI', 'EPS', 'PDF'],
            dimensions: '3.5" x 2"', 
            software: ['Adobe Illustrator'],
            printReady: 'Yes',
            colorMode: 'CMYK with metallic simulation',
            fileSize: '22 MB',
            tags: ['luxury', 'gold', 'elegant', 'premium'],
            designDetails: 'Sophisticated business card with gold foil effects and elegant typography. Perfect for luxury brands and high-end services.',
            materialsSpecs: 'Includes guides for gold foil stamping, embossing, and specialty printing techniques.',
            designInspiration: 'Luxury branding and high-end stationery influence this elegant, premium card design.',
            practicalApplications: 'Ideal for luxury brands, high-end retailers, exclusive services, and premium professionals.',
            features: [
                'Gold foil guide',
                'Embossing layers',
                'Debossing options',
                'Letterpress ready',
                'Thick stock templates'
            ],
            colors: ['#d4af37', '#aa8800', '#1a1a1a', '#f8f8f8']
        },
        {
            id: 'card-4',
            title: 'Tech Minimal Card',
            description: 'Sleek minimal business card template for tech startups and digital agencies.',
            category: 'businessCards',
            subcategory: 'Technology',
            price: 'Free',
            likes: 1765,
            downloads: 8765,
            favorites: 387,
            shares: 87,
            bookmarks: 49,
            rating: 4.8,
            reviews: 267,
            badge: 'Popular',
            image: '../../assets/images/tickets/ticket-template-thumb.jpg', 
            fullImage: '../../assets/images/tickets/ticket-template-full.jpg',
            downloadUrl: './assets/downloads/tech-card.zip',
            fileFormats: ['AI', 'FIG', 'SVG', 'PDF'],
            dimensions: '3.5" x 2"',
            software: ['Adobe Illustrator', 'Figma'],
            printReady: 'Yes',
            colorMode: 'RGB/CMYK',
            fileSize: '16 MB',
            tags: ['tech', 'minimal', 'startup', 'digital'],
            designDetails: 'Ultra-minimal tech business card with clean lines and modern typography. Perfect for startups and digital agencies.',
            materialsSpecs: 'Optimized for both digital business cards and print. Includes NFC card integration guide.',
            designInspiration: 'Digital interfaces and modern tech aesthetics inspire this clean, minimal design.',
            practicalApplications: 'Perfect for tech startups, software companies, digital agencies, and IT professionals.',
            features: [
                'QR code integration',
                'NFC card guide',
                'Digital version included',
                'Social media handles',
                'App icon style'
            ],
            colors: ['#1a1a2e', '#16213e', '#0f3460', '#e94560']
        }
    ],
    socialMedia: [
        {
            id: 'social-1',
            title: 'Instagram Story Pack',
            description: '50+ Instagram story templates for business and personal branding.',
            category: 'social',
            subcategory: 'Instagram Stories',
            price: 'Free',
            likes: 4567,
            downloads: 23456,
            favorites: 1234,
            shares: 456,
            bookmarks: 234,
            rating: 4.9,
            reviews: 678,
            badge: 'Bestseller',
            image: 'https://via.placeholder.com/600x400/833ab4/ffffff?text=Instagram+Stories',
            fullImage: 'https://via.placeholder.com/1200x800/833ab4/ffffff?text=Stories+Full',
            downloadUrl: './assets/downloads/instagram-stories.zip',
            fileFormats: ['PSD', 'FIG', 'PNG', 'MP4'],
            dimensions: '1080 x 1920 px',
            software: ['Adobe Photoshop', 'Figma', 'Canva'],
            printReady: 'No (Digital Only)',
            colorMode: 'RGB',
            fileSize: '85 MB',
            tags: ['instagram', 'stories', 'social media', 'templates'],
            designDetails: 'Complete Instagram story template pack with 50+ unique designs for promotions, announcements, and engagement.',
            materialsSpecs: 'Optimized for Instagram stories with proper dimensions and mobile-friendly layouts.',
            designInspiration: 'Current social media trends and engagement strategies influence these story designs.',
            practicalApplications: 'Perfect for Instagram marketing, brand storytelling, product launches, and daily engagement.',
            features: [
                'Question stickers',
                'Poll templates',
                'Countdown designs',
                'Quote cards',
                'Product showcases',
                'Link stickers included'
            ],
            colors: ['#833ab4', '#fd1d1d', '#fcb045', '#405de6']
        },
        {
            id: 'social-2',
            title: 'Facebook Cover Pack',
            description: 'Professional Facebook cover templates for business pages and profiles.',
            category: 'social',
            subcategory: 'Facebook Covers',
            price: 'Free',
            likes: 3456,
            downloads: 15678,
            favorites: 876,
            shares: 321,
            bookmarks: 167,
            rating: 4.8,
            reviews: 456,
            badge: 'Popular',
            image: 'https://via.placeholder.com/600x400/1877f2/ffffff?text=Facebook+Covers',
            fullImage: 'https://via.placeholder.com/1200x800/1877f2/ffffff?text=Covers+Full',
            downloadUrl: './assets/downloads/facebook-covers.zip',
            fileFormats: ['PSD', 'AI', 'JPG', 'PNG'],
            dimensions: '851 x 315 px',
            software: ['Adobe Photoshop', 'Adobe Illustrator'],
            printReady: 'No',
            colorMode: 'RGB',
            fileSize: '45 MB',
            tags: ['facebook', 'cover', 'social media', 'profile'],
            designDetails: '20 professional Facebook cover templates for business pages, events, and promotions.',
            materialsSpecs: 'Optimized for Facebook timeline with proper image dimensions and placement guides.',
            designInspiration: 'Facebook best practices and professional page design principles.',
            practicalApplications: 'Ideal for Facebook business pages, event promotions, and professional profiles.',
            features: [
                'Profile picture integration',
                'Call-to-action buttons',
                'Event promotion space',
                'Product showcases',
                'Contact information',
                'Branded backgrounds'
            ],
            colors: ['#1877f2', '#42b72a', '#f0f2f5', '#1c1e21']
        }
    ],
    posters: [
        {
            id: 'poster-1',
            title: 'Movie Poster Template',
            description: 'Dramatic movie poster template for film promotions and events.',
            category: 'posters',
            subcategory: 'Movie Posters',
            price: 'Free',
            likes: 3456,
            downloads: 16789,
            favorites: 987,
            shares: 345,
            bookmarks: 189,
            rating: 4.8,
            reviews: 567,
            badge: 'Popular',
            image: 'https://via.placeholder.com/600x400/8b0000/ffffff?text=Movie+Poster',
            fullImage: 'https://via.placeholder.com/1200x800/8b0000/ffffff?text=Poster+Full',
            downloadUrl: './assets/downloads/movie-poster.zip',
            fileFormats: ['PSD', 'AI', 'PDF'],
            dimensions: '27" x 40" (Standard Movie)',
            software: ['Adobe Photoshop', 'Adobe Illustrator'],
            printReady: 'Yes, 300 DPI',
            colorMode: 'CMYK',
            fileSize: '125 MB',
            tags: ['movie', 'film', 'poster', 'cinema'],
            designDetails: 'Professional movie poster template with dramatic layout for cast, crew, and film information.',
            materialsSpecs: 'Large format print-ready with high-resolution images and proper bleed.',
            designInspiration: 'Hollywood movie posters and cinematic design principles.',
            practicalApplications: 'Perfect for film promotions, movie events, and theatrical releases.',
            features: [
                'Title treatment area',
                'Cast and crew list',
                'Release date',
                'Rating information',
                'Studio logos',
                'Tagline space'
            ],
            colors: ['#1a1a1a', '#8b0000', '#c0c0c0', '#f5f5f5']
        }
    ],
    calendars: [
        {
            id: 'calendar-1',
            title: '2026 Wall Calendar',
            description: 'Beautiful wall calendar template for 2026 with monthly designs.',
            category: 'calendars',
            subcategory: 'Wall Calendars',
            price: 'Free',
            likes: 3456,
            downloads: 17890,
            favorites: 1023,
            shares: 412,
            bookmarks: 234,
            rating: 4.9,
            reviews: 567,
            badge: 'New',
            image: 'https://via.placeholder.com/600x400/4361ee/ffffff?text=2026+Calendar',
            fullImage: 'https://via.placeholder.com/1200x800/4361ee/ffffff?text=Calendar+Full',
            downloadUrl: './assets/downloads/2026-calendar.zip',
            fileFormats: ['INDD', 'AI', 'PDF', 'PSD'],
            dimensions: '12" x 12" (Closed)',
            software: ['Adobe InDesign', 'Adobe Illustrator'],
            printReady: 'Yes, with spiral binding guides',
            colorMode: 'CMYK',
            fileSize: '156 MB',
            tags: ['calendar', '2026', 'wall', 'yearly'],
            designDetails: 'Complete 2026 wall calendar with unique monthly designs, holiday markers, and ample writing space.',
            materialsSpecs: 'Print-ready with spiral binding guides and cover design included.',
            designInspiration: 'Modern calendar design with artistic monthly themes.',
            practicalApplications: 'Perfect for home, office, or promotional giveaways.',
            features: [
                '12 monthly spreads',
                'Cover design',
                'Holiday markers',
                'Moon phases',
                'Notes section',
                'Back cover with overview'
            ],
            colors: ['#4361ee', '#f72585', '#4cc9f0', '#7209b7']
        }
    ]
};

// Combine all templates into one array for search and popular
const allTemplates = [
    ...templateDatabase.flyers,
    ...templateDatabase.logos,
    ...templateDatabase.businessCards,
    ...templateDatabase.socialMedia,
    ...templateDatabase.posters,
    ...templateDatabase.calendars
];

// Popular designs (select first 12)
const popularDesigns = allTemplates.slice(0, 12).map((item, index) => ({
    ...item,
    id: item.id || `pop-${index}`,
    badge: item.badge || (index < 3 ? '🔥 Hot' : null)
}));

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

// New elements for popular section
const popularGrid = document.getElementById('popularGrid');
const filterButtons = document.querySelectorAll('.filter-popular-btn');
const loadMoreBtn = document.getElementById('loadMorePopularBtn');
const templateModal = document.getElementById('templateModal');
const modalCloseBtn = document.getElementById('closeModal');
const searchModal = document.getElementById('searchModal');
const closeSearchModal = document.getElementById('closeSearchModal');

// State
let displayedCount = 8;
let currentFilter = 'all';
let likedTemplates = JSON.parse(localStorage.getItem('likedTemplates')) || {};
let favoritedTemplates = JSON.parse(localStorage.getItem('favoritedTemplates')) || {};
let bookmarkedTemplates = JSON.parse(localStorage.getItem('bookmarkedTemplates')) || {};

// ===== INJECT CUSTOM CSS FOR SMALLER SEARCH MODAL, SUGGESTIONS, AND BUTTON COLORS =====
function injectCustomStyles() {
    const style = document.createElement('style');
    style.textContent = `
        /* Smaller search modal */
        .search-modal-content {
            max-width: 900px !important;
        }
        .search-results-grid {
            grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)) !important;
            gap: 15px !important;
        }
        .search-result-card {
            max-width: 100%;
        }
        .search-result-img {
            height: 140px !important;
        }
        .search-result-info {
            padding: 12px !important;
        }
        .search-result-info h4 {
            font-size: 1rem !important;
        }
        .search-result-info p {
            font-size: 0.8rem !important;
            margin-bottom: 5px !important;
        }
        .search-result-category {
            font-size: 0.7rem !important;
            padding: 3px 8px !important;
        }
        /* Live suggestions dropdown */
        .search-suggestions {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            border: 1px solid var(--light-gray);
            border-radius: 8px;
            box-shadow: var(--box-shadow);
            z-index: 1000;
            max-height: 300px;
            overflow-y: auto;
            display: none;
        }
        .search-suggestions.active {
            display: block;
        }
        .suggestion-item {
            display: flex;
            align-items: center;
            padding: 10px;
            cursor: pointer;
            border-bottom: 1px solid #f0f0f0;
            transition: background 0.2s;
        }
        .suggestion-item:hover {
            background: #f5f5f5;
        }
        .suggestion-item img {
            width: 40px;
            height: 40px;
            object-fit: cover;
            border-radius: 5px;
            margin-right: 10px;
        }
        .suggestion-info {
            flex: 1;
        }
        .suggestion-title {
            font-weight: 600;
            font-size: 0.9rem;
        }
        .suggestion-category {
            font-size: 0.8rem;
            color: var(--medium-gray);
        }
        /* Category link suggestion */
        .suggestion-category-link {
            font-weight: 600;
            color: var(--primary);
            text-decoration: underline;
        }
        /* Modal action buttons distinct colors */
        .modal-actions .btn-primary {
            background-color: #4361ee !important;
            color: white !important;
        }
        .modal-actions .btn-secondary {
            background-color: #f72585 !important;
            color: white !important;
        }
        .modal-actions .btn-success {
            background-color: #38b000 !important;
            color: white !important;
        }
        .modal-actions .btn-primary:hover,
        .modal-actions .btn-secondary:hover,
        .modal-actions .btn-success:hover {
            filter: brightness(0.9);
            transform: translateY(-2px);
        }
        /* Floating button active states */
        .action-btn.like.active {
            background-color: #e74c3c !important;
            color: white !important;
        }
        .action-btn.favorite.active {
            background-color: #f39c12 !important;
            color: white !important;
        }
        .action-btn.bookmark.active {
            background-color: #9b59b6 !important;
            color: white !important;
        }
    `;
    document.head.appendChild(style);
}
injectCustomStyles();

// ===== UTILITY FUNCTIONS =====
function formatNumber(num) {
    if (num >= 1000000) return (num/1000000).toFixed(1)+'M';
    if (num >= 1000) return (num/1000).toFixed(1)+'K';
    return num.toString();
}

function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

// ===== POPULAR GRID FUNCTIONS =====
function filterDesigns(arr, filter) {
    if (filter === 'all') return arr;
    return arr.filter(d => d.category === filter);
}

function createCardHTML(d) {
    const liked = likedTemplates[d.id] ? 'fas' : 'far';
    return `
        <div class="popular-card" data-id="${d.id}" data-category="${d.category}">
            ${d.badge ? `<div class="popular-badge">${d.badge}</div>` : ''}
            <div class="popular-img">
                <img src="${d.image}" alt="${d.title}" loading="lazy">
            </div>
            <div class="popular-info">
                <h3>${d.title}</h3>
                <p>${d.description.substring(0,60)}...</p>
                <div class="popular-meta">
                    <div class="popular-stats">
                        <span class="popular-likes"><i class="${liked} fa-heart"></i> ${formatNumber(d.likes)}</span>
                        <span class="popular-downloads"><i class="fas fa-download"></i> ${formatNumber(d.downloads)}</span>
                    </div>
                    <span class="popular-price">${d.price}</span>
                </div>
            </div>
        </div>
    `;
}

function renderPopularGrid() {
    if (!popularGrid) return;
    const filtered = filterDesigns(popularDesigns, currentFilter);
    const toShow = filtered.slice(0, displayedCount);
    
    if (toShow.length === 0) {
        popularGrid.innerHTML = '<div style="grid-column:1/-1; text-align:center; padding:50px;">No designs in this category.</div>';
        return;
    }
    
    popularGrid.innerHTML = toShow.map(design => createCardHTML(design)).join('');
    
    // Attach click listeners to cards
    document.querySelectorAll('.popular-card').forEach(card => {
        card.addEventListener('click', (e) => {
            if (e.target.closest('.popular-likes i')) return;
            const id = card.dataset.id;
            const design = popularDesigns.find(d => d.id === id) || allTemplates.find(d => d.id === id);
            if (design) openModal(design);
        });
    });
    
    // Like button listeners
    document.querySelectorAll('.popular-likes i').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const card = btn.closest('.popular-card');
            const id = card.dataset.id;
            toggleLike(id, btn);
        });
        const id = btn.closest('.popular-card').dataset.id;
        if (likedTemplates[id]) {
            btn.classList.add('active', 'fas');
            btn.classList.remove('far');
        }
    });
    
    // Load more button visibility
    if (loadMoreBtn) {
        loadMoreBtn.style.display = displayedCount >= filtered.length ? 'none' : 'inline-flex';
    }
}

// ===== MODAL FUNCTIONS =====
function openModal(design) {
    if (!templateModal) return;

    const setElem = (id, prop, val) => {
        const el = document.getElementById(id);
        if (el) el[prop] = val;
    };

    setElem('modalImage', 'src', design.image);
    setElem('modalFullImage', 'src', design.fullImage || design.image);
    setElem('modalTitle', 'textContent', design.title);
    setElem('modalSubtitle', 'textContent', design.subcategory || design.category);
    setElem('modalDescription', 'textContent', design.description);
    setElem('modalCategory', 'textContent', design.subcategory || design.category);
    setElem('modalFileFormat', 'textContent', design.fileFormats ? design.fileFormats.join(', ') : '');
    setElem('modalDimensions', 'textContent', design.dimensions || '');
    setElem('modalDownloadCount', 'textContent', formatNumber(design.downloads));
    setElem('modalSoftware', 'textContent', design.software ? design.software.join(', ') : '');
    setElem('modalPrintReady', 'textContent', design.printReady || '');
    setElem('modalColorMode', 'textContent', design.colorMode || '');
    setElem('modalFileSize', 'textContent', design.fileSize || '');
    setElem('designDetails', 'textContent', design.designDetails || '');
    setElem('materialsSpecs', 'textContent', design.materialsSpecs || '');
    setElem('designInspiration', 'textContent', design.designInspiration || '');
    setElem('practicalApplications', 'textContent', design.practicalApplications || '');
    setElem('modalBadge', 'textContent', design.badge || 'Popular');

    // Format badges
    const formatBadges = document.getElementById('formatBadges');
    if (formatBadges && design.fileFormats) {
        formatBadges.innerHTML = design.fileFormats.map(f => `<span class="format-badge">${f}</span>`).join('');
    }

    // Color palette
    const colorPalette = document.getElementById('colorPalette');
    if (colorPalette && design.colors) {
        colorPalette.innerHTML = design.colors.map(c => `<div class="color" style="background:${c}" title="${c}"></div>`).join('');
    }

    // Tags
    const tagsContainer = document.getElementById('tagsContainer');
    if (tagsContainer && design.tags) {
        tagsContainer.innerHTML = design.tags.map(t => `<span class="tag">${t}</span>`).join('');
    }

    // Features
    const featuresList = document.getElementById('featuresList');
    if (featuresList && design.features) {
        featuresList.innerHTML = design.features.map(f => `<li>${f}</li>`).join('');
    }

    // Floating action buttons
    const likeBtn = document.getElementById('modalLikeBtn');
    const likeCount = document.getElementById('modalLikeCount');
    if (likeBtn && likeCount) {
        const isLiked = likedTemplates[design.id];
        likeBtn.innerHTML = `<i class="${isLiked ? 'fas' : 'far'} fa-heart"></i>`;
        likeCount.textContent = formatNumber(design.likes);
        likeBtn.onclick = () => {
            toggleLike(design.id, likeBtn.querySelector('i'));
            likeCount.textContent = formatNumber(design.likes);
            updateCardCounts(design);
        };
    }

    const downloadBtn = document.getElementById('modalDownloadBtn');
    if (downloadBtn) {
        downloadBtn.onclick = () => {
            downloadTemplate(design);
            updateModalCounts(design);
        };
    }

    const favoriteBtn = document.getElementById('modalFavoriteBtn');
    const favCount = document.getElementById('modalFavoriteCount');
    if (favoriteBtn && favCount) {
        const isFav = favoritedTemplates[design.id];
        favoriteBtn.innerHTML = `<i class="${isFav ? 'fas' : 'far'} fa-star"></i>`;
        favCount.textContent = formatNumber(design.favorites || 0);
        favoriteBtn.onclick = () => {
            toggleFavorite(design.id, favoriteBtn.querySelector('i'));
            favCount.textContent = formatNumber(design.favorites || 0);
        };
    }

    const shareBtn = document.getElementById('modalShareBtn');
    const shareCount = document.getElementById('modalShareCount');
    if (shareBtn && shareCount) {
        shareCount.textContent = formatNumber(design.shares || 0);
        shareBtn.onclick = () => {
            shareTemplate(design);
            shareCount.textContent = formatNumber(design.shares || 0);
        };
    }

    const bookmarkBtn = document.getElementById('modalBookmarkBtn');
    const bookmarkCount = document.getElementById('modalBookmarkCount');
    if (bookmarkBtn && bookmarkCount) {
        const isBookmarked = bookmarkedTemplates[design.id];
        bookmarkBtn.innerHTML = `<i class="${isBookmarked ? 'fas' : 'far'} fa-bookmark"></i>`;
        bookmarkCount.textContent = formatNumber(design.bookmarks || 0);
        bookmarkBtn.onclick = () => {
            toggleBookmark(design.id, bookmarkBtn.querySelector('i'));
            bookmarkCount.textContent = formatNumber(design.bookmarks || 0);
        };
    }

    const expandBtn = document.getElementById('modalExpandBtn');
    if (expandBtn) {
        expandBtn.onclick = () => expandImage(design);
    }

    // Bottom action buttons (with distinct colors)
    const previewBtn = document.getElementById('previewBtn');
    if (previewBtn) {
        previewBtn.classList.add('btn-primary');
        previewBtn.onclick = () => expandImage(design);
    }

    const customizeBtn = document.getElementById('customizeBtn');
    if (customizeBtn) {
        customizeBtn.classList.add('btn-secondary');
        customizeBtn.onclick = () => alert('Customize Online feature coming soon!');
    }

    const downloadTemplateBtn = document.getElementById('downloadTemplateBtn');
    if (downloadTemplateBtn) {
        downloadTemplateBtn.classList.add('btn-success');
        downloadTemplateBtn.onclick = () => {
            downloadTemplate(design);
            updateModalCounts(design);
        };
    }

    // Related designs
    const relatedGrid = document.getElementById('relatedDesigns');
    if (relatedGrid) {
        const sameCat = allTemplates.filter(d => d.category === design.category && d.id !== design.id).slice(0, 4);
        if (sameCat.length) {
            relatedGrid.innerHTML = sameCat.map(d => `
                <div class="related-item" data-id="${d.id}">
                    <img src="${d.image}" alt="${d.title}">
                    <div class="related-overlay"><span>${d.title}</span></div>
                </div>
            `).join('');
            document.querySelectorAll('.related-item').forEach(el => {
                el.addEventListener('click', () => {
                    const id = el.dataset.id;
                    const relatedDesign = allTemplates.find(t => t.id === id);
                    if (relatedDesign) {
                        openModal(relatedDesign);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                });
            });
        } else {
            const relatedSection = relatedGrid.closest('.related-designs');
            if (relatedSection) relatedSection.style.display = 'none';
        }
    }

    templateModal.classList.add('active');
    if (overlay) overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeTemplateModal() {
    if (templateModal) templateModal.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
    document.body.style.overflow = '';
}

// ===== INTERACTION FUNCTIONS =====
function toggleLike(id, iconEl) {
    if (likedTemplates[id]) {
        delete likedTemplates[id];
        iconEl.classList.remove('active', 'fas');
        iconEl.classList.add('far');
    } else {
        likedTemplates[id] = true;
        iconEl.classList.add('active', 'fas');
        iconEl.classList.remove('far');
    }
    localStorage.setItem('likedTemplates', JSON.stringify(likedTemplates));
    
    const design = allTemplates.find(d => d.id === id) || popularDesigns.find(d => d.id === id);
    if (design) {
        if (likedTemplates[id]) design.likes += 1;
        else design.likes -= 1;
        updateModalCounts(design);
    }
}

function toggleFavorite(id, iconEl) {
    if (favoritedTemplates[id]) {
        delete favoritedTemplates[id];
        iconEl.classList.remove('active', 'fas');
        iconEl.classList.add('far');
    } else {
        favoritedTemplates[id] = true;
        iconEl.classList.add('active', 'fas');
        iconEl.classList.remove('far');
    }
    localStorage.setItem('favoritedTemplates', JSON.stringify(favoritedTemplates));
    
    const design = allTemplates.find(d => d.id === id) || popularDesigns.find(d => d.id === id);
    if (design) {
        if (favoritedTemplates[id]) design.favorites += 1;
        else design.favorites -= 1;
        updateModalCounts(design);
    }
}

function toggleBookmark(id, iconEl) {
    if (bookmarkedTemplates[id]) {
        delete bookmarkedTemplates[id];
        iconEl.classList.remove('active', 'fas');
        iconEl.classList.add('far');
    } else {
        bookmarkedTemplates[id] = true;
        iconEl.classList.add('active', 'fas');
        iconEl.classList.remove('far');
    }
    localStorage.setItem('bookmarkedTemplates', JSON.stringify(bookmarkedTemplates));
    
    const design = allTemplates.find(d => d.id === id) || popularDesigns.find(d => d.id === id);
    if (design) {
        if (bookmarkedTemplates[id]) design.bookmarks += 1;
        else design.bookmarks -= 1;
        updateModalCounts(design);
    }
}

function downloadTemplate(design) {
    if (!design.downloadUrl) {
        alert('Download URL not available for this template.');
        return;
    }
    const link = document.createElement('a');
    link.href = design.downloadUrl;
    link.download = design.downloadUrl.split('/').pop();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    design.downloads += 1;
    updateModalCounts(design);
}

function shareTemplate(design) {
    const shareData = {
        title: design.title,
        text: design.description,
        url: window.location.origin + '/template.html?id=' + design.id
    };
    if (navigator.share) {
        navigator.share(shareData).catch(console.error);
    } else {
        navigator.clipboard.writeText(shareData.url).then(() => {
            alert('Link copied to clipboard!');
        }).catch(() => {
            prompt('Copy this link:', shareData.url);
        });
    }
    design.shares = (design.shares || 0) + 1;
    updateModalCounts(design);
}

function expandImage(design) {
    window.open(design.fullImage || design.image, '_blank');
}

function updateModalCounts(design) {
    const likeCount = document.getElementById('modalLikeCount');
    const downloadCount = document.getElementById('modalDownloadCount');
    const favCount = document.getElementById('modalFavoriteCount');
    const shareCount = document.getElementById('modalShareCount');
    const bookmarkCount = document.getElementById('modalBookmarkCount');
    
    if (likeCount) likeCount.textContent = formatNumber(design.likes);
    if (downloadCount) downloadCount.textContent = formatNumber(design.downloads);
    if (favCount) favCount.textContent = formatNumber(design.favorites || 0);
    if (shareCount) shareCount.textContent = formatNumber(design.shares || 0);
    if (bookmarkCount) bookmarkCount.textContent = formatNumber(design.bookmarks || 0);
}

function updateCardCounts(design) {
    const card = document.querySelector(`.popular-card[data-id="${design.id}"]`);
    if (card) {
        const likeSpan = card.querySelector('.popular-likes');
        if (likeSpan) {
            const icon = likeSpan.querySelector('i');
            const countNode = likeSpan.childNodes[2];
            if (countNode) countNode.textContent = ' ' + formatNumber(design.likes);
        }
    }
}

// ===== SEARCH FUNCTIONS =====
function setupSearch() {
    if (!searchInput) return;
    
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const term = searchInput.value.trim();
            if (term) performSearch(term);
        }
    });
    
    const searchIcon = document.querySelector('.search-box i');
    if (searchIcon) {
        searchIcon.addEventListener('click', () => {
            const term = searchInput.value.trim();
            if (term) performSearch(term);
        });
    }

    // Close search modal when its close button is clicked
    if (closeSearchModal) {
        closeSearchModal.addEventListener('click', () => {
            searchModal.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
}

function performSearch(term) {
    const results = allTemplates.filter(d =>
        d.title.toLowerCase().includes(term.toLowerCase()) ||
        d.description.toLowerCase().includes(term.toLowerCase()) ||
        (d.tags && d.tags.some(t => t.toLowerCase().includes(term.toLowerCase()))) ||
        d.category.toLowerCase().includes(term.toLowerCase()) ||
        (d.subcategory && d.subcategory.toLowerCase().includes(term.toLowerCase()))
    );
    displaySearchResults(results, term);
}

function displaySearchResults(results, term) {
    if (!searchModal) {
        alert(`Found ${results.length} results for "${term}"`);
        return;
    }
    
    const stats = document.getElementById('searchStats');
    const grid = document.getElementById('searchResultsGrid');
    
    if (stats) stats.textContent = `Found ${results.length} results for "${term}"`;
    
    if (grid) {
        let html = '';
        if (results.length) {
            html = results.map(r => `
                <div class="search-result-card" data-id="${r.id}">
                    <div class="search-result-img">
                        <img src="${r.image}" alt="${r.title}" loading="lazy">
                    </div>
                    <div class="search-result-info">
                        <h4>${r.title}</h4>
                        <p>${r.description.substring(0,60)}...</p>
                        <span class="search-result-category">${r.category}</span>
                    </div>
                </div>
            `).join('');
        } else {
            html = '<div style="grid-column:1/-1; text-align:center; padding:50px;">No results found.</div>';
        }
        grid.innerHTML = html;
        
        document.querySelectorAll('.search-result-card').forEach(card => {
            card.addEventListener('click', () => {
                const id = card.dataset.id;
                const design = allTemplates.find(d => d.id === id);
                if (design) {
                    openModal(design);
                    searchModal.classList.remove('active');
                    if (overlay) overlay.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        });
    }
    
    searchModal.classList.add('active');
    if (overlay) overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function setupLiveSearch() {
    if (!searchInput) return;
    
    const suggestionsDiv = document.createElement('div');
    suggestionsDiv.className = 'search-suggestions';
    searchInput.parentNode.appendChild(suggestionsDiv);
    
    searchInput.addEventListener('input', debounce(function() {
        const term = this.value.trim();
        if (term.length < 2) {
            suggestionsDiv.classList.remove('active');
            return;
        }
        
        // Get matching templates
        const templateResults = allTemplates.filter(d =>
            d.title.toLowerCase().includes(term.toLowerCase()) ||
            d.description.toLowerCase().includes(term.toLowerCase()) ||
            (d.tags && d.tags.some(t => t.toLowerCase().includes(term.toLowerCase())))
        ).slice(0, 5);
        
        // Also check if term matches a category (flyers, logos, etc.)
        const categoryMap = {
            flyers: { name: 'All Flyers', url: './templates/flyers/index.html' },
            logos: { name: 'All Logos', url: './templates/logos/index.html' },
            businesscards: { name: 'All Business Cards', url: './templates/business-cards/index.html' },
            social: { name: 'All Social Media', url: './templates/social-media/index.html' },
            posters: { name: 'All Posters', url: './templates/posters/index.html' },
            calendars: { name: 'All Calendars', url: './templates/calendars/index.html' },
            mockups: { name: 'All Mockups', url: './templates/mockups/index.html' }
        };
        const categoryLink = categoryMap[term.toLowerCase().replace(/\s+/g, '')];
        
        let suggestionsHtml = '';
        if (categoryLink) {
            suggestionsHtml += `
                <div class="suggestion-item category-link" data-url="${categoryLink.url}">
                    <div class="suggestion-info">
                        <div class="suggestion-title suggestion-category-link">${categoryLink.name} →</div>
                    </div>
                </div>
            `;
        }
        
        if (templateResults.length) {
            suggestionsHtml += templateResults.map(r => `
                <div class="suggestion-item" data-id="${r.id}">
                    <img src="${r.image}" alt="${r.title}" loading="lazy">
                    <div class="suggestion-info">
                        <div class="suggestion-title">${r.title}</div>
                        <div class="suggestion-category">${r.category}</div>
                    </div>
                </div>
            `).join('');
        }
        
        if (!categoryLink && templateResults.length === 0) {
            suggestionsDiv.classList.remove('active');
            return;
        }
        
        suggestionsDiv.innerHTML = suggestionsHtml;
        suggestionsDiv.classList.add('active');
        
        // Template suggestions
        document.querySelectorAll('.suggestion-item[data-id]').forEach(item => {
            item.addEventListener('click', () => {
                const id = item.dataset.id;
                const design = allTemplates.find(d => d.id === id);
                if (design) openModal(design);
                suggestionsDiv.classList.remove('active');
                searchInput.value = '';
            });
        });
        
        // Category link
        const catLink = document.querySelector('.suggestion-item.category-link');
        if (catLink) {
            catLink.addEventListener('click', () => {
                window.location.href = catLink.dataset.url;
            });
        }
    }, 300));
    
    document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target) && !suggestionsDiv.contains(e.target)) {
            suggestionsDiv.classList.remove('active');
        }
    });
}

// ===== ORIGINAL FUNCTIONS (unchanged) =====
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
                { breakpoint: 992, settings: { slidesToShow: 2 } },
                { breakpoint: 576, settings: { slidesToShow: 1 } }
            ]
        });
    }
}

function setupYouTubePopup() {
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
        if (youtubePopup.classList.contains('active') && !youtubePopup.contains(e.target)) {
            hideYoutubePopup();
        }
    });
}

function hideYoutubePopup() {
    if (youtubePopup) youtubePopup.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
}

// ===== ORIGINAL EVENT LISTENERS =====
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

if (authTabs.length > 0) {
    authTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabId = tab.getAttribute('data-tab');
            switchTab(tabId);
        });
    });
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
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

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

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            
            if (mobileNav && mobileNav.classList.contains('active')) {
                mobileNav.classList.remove('active');
                overlay.classList.remove('active');
                document.body.classList.remove('no-scroll');
            }
        }
    });
});

window.addEventListener('resize', () => {});

// ===== DOMContentLoaded initialization =====
document.addEventListener('DOMContentLoaded', function() {
    new StarfieldAnimation();
    
    if (currentYear) currentYear.textContent = new Date().getFullYear();
    
    loadTemplates();
    loadServices();
    loadPortfolio();
    loadTools();
    
    if (window.AOS) {
        AOS.init({ duration: 200, once: true });
    }
    
    initializeSlider();
    setupYouTubePopup();
    
    // New initializations
    renderPopularGrid();
    setupSearch();
    setupLiveSearch();
    
    // Filter buttons
    if (filterButtons.length) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                filterButtons.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                currentFilter = this.dataset.filter || 'all';
                displayedCount = 8;
                renderPopularGrid();
            });
        });
    }
    
    // Load more button
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            displayedCount += 4;
            renderPopularGrid();
        });
    }
    
    // Modal close button
    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', closeTemplateModal);
    }
    
    // Close modals when clicking overlay
    if (overlay) {
        overlay.addEventListener('click', function() {
            closeTemplateModal();
            if (searchModal) searchModal.classList.remove('active');
        });
    }
    
    // Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeTemplateModal();
            if (searchModal) searchModal.classList.remove('active');
            if (overlay) overlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});