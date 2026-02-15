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

// ===== COMPREHENSIVE TEMPLATE DATA =====
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
            rating: 4.9,
            reviews: 456,
            badge: 'Trending',
            image: './assets/images/flyers/business-flyer-modern.jpg',
            fullImage: './assets/images/flyers/business-flyer-modern-full.jpg',
            link: './templates/flyers/business-flyer-modern.html',
            fileFormats: ['AI', 'EPS', 'PSD', 'PDF'],
            dimensions: '8.5" x 11" (US Letter)',
            software: ['Adobe Illustrator', 'Adobe Photoshop', 'CorelDRAW'],
            printReady: 'Yes, 300 DPI',
            colorMode: 'CMYK',
            fileSize: '45 MB',
            tags: ['business', 'corporate', 'professional', 'marketing'],
            designDetails: 'This modern business flyer features clean lines, professional typography, and ample space for your company information. The design includes a striking geometric pattern background with color gradients that can be easily customized.',
            materialsSpecs: 'Print on high-quality glossy paper for best results. Designed for 4-color offset printing with 300 DPI resolution. Includes bleed and trim marks.',
            designInspiration: 'Inspired by contemporary corporate architecture and minimalist design principles, this flyer emphasizes clarity and professionalism while maintaining visual interest through subtle geometric elements.',
            practicalApplications: 'Ideal for product launches, corporate announcements, business events, professional services marketing, and trade show promotions.',
            features: [
                'Fully editable in Adobe Illustrator',
                'Includes 5 color variations',
                'Print-ready with bleed',
                'Free fonts used',
                'Well-organized layers',
                'Includes mockup template'
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
            rating: 4.8,
            reviews: 324,
            badge: 'Popular',
            image: './assets/images/flyers/birthday-flyer-colorful.jpg',
            fullImage: './assets/images/flyers/birthday-flyer-colorful-full.jpg',
            link: './templates/flyers/birthday-flyer.html',
            fileFormats: ['PSD', 'AI', 'PNG'],
            dimensions: '8.5" x 11"',
            software: ['Adobe Photoshop', 'Adobe Illustrator'],
            printReady: 'Yes',
            colorMode: 'RGB/CMYK',
            fileSize: '35 MB',
            tags: ['birthday', 'party', 'celebration', 'event'],
            designDetails: 'Colorful and energetic birthday flyer with festive elements like balloons, confetti, and ribbons. Perfect for kids parties, adult birthdays, and milestone celebrations.',
            materialsSpecs: 'Designed for both digital and print use. High-resolution files with organized layers for easy editing.',
            designInspiration: 'Inspired by modern party aesthetics and celebration culture, combining playful typography with vibrant color schemes.',
            practicalApplications: 'Use for birthday invitations, party promotions, event announcements, and social media sharing.',
            features: [
                'Editable text and colors',
                'Includes both RGB and CMYK versions',
                'High-resolution print files',
                'Free fonts included',
                'Layered PSD files',
                'Social media optimized sizes included'
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
            rating: 4.7,
            reviews: 278,
            badge: null,
            image: './assets/images/flyers/real-estate-luxury.jpg',
            fullImage: './assets/images/flyers/real-estate-luxury-full.jpg',
            link: './templates/flyers/real-estate.html',
            fileFormats: ['INDD', 'AI', 'PSD'],
            dimensions: '8.5" x 11"',
            software: ['Adobe InDesign', 'Adobe Illustrator'],
            printReady: 'Yes',
            colorMode: 'CMYK',
            fileSize: '52 MB',
            tags: ['real estate', 'property', 'housing', 'luxury'],
            designDetails: 'Sophisticated real estate flyer designed to showcase luxury properties. Features elegant typography, space for high-quality property images, and detailed information sections.',
            materialsSpecs: 'Perfect for premium paper stocks with spot UV coating options. Includes all necessary print specifications.',
            designInspiration: 'Luxury real estate marketing and architectural photography influence this clean, sophisticated design.',
            practicalApplications: 'Ideal for property listings, open house promotions, realtor marketing materials, and property showcases.',
            features: [
                'Multiple photo placeholders',
                'Property details sections',
                'Agent contact information',
                'QR code placeholder',
                'Social media icons',
                'Customizable color scheme'
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
            rating: 4.9,
            reviews: 412,
            badge: 'Hot',
            image: './assets/images/flyers/concert-rock.jpg',
            fullImage: './assets/images/flyers/concert-rock-full.jpg',
            link: './templates/flyers/concert.html',
            fileFormats: ['AI', 'PSD', 'EPS'],
            dimensions: '11" x 17" (Poster Size)',
            software: ['Adobe Illustrator', 'Adobe Photoshop'],
            printReady: 'Yes',
            colorMode: 'CMYK',
            fileSize: '48 MB',
            tags: ['concert', 'music', 'event', 'festival'],
            designDetails: 'High-energy concert flyer with bold typography and dynamic graphic elements. Perfect for rock shows, music festivals, and club events.',
            materialsSpecs: 'Large format ready with high-resolution graphics. Suitable for posters and banners.',
            designInspiration: 'Inspired by rock concert posters and music festival branding, featuring bold contrasts and energetic compositions.',
            practicalApplications: 'Use for concert promotions, music festival advertising, club night events, and tour announcements.',
            features: [
                'Bold typography styles',
                'Multiple artist slots',
                'Event details section',
                'Ticket information area',
                'Sponsor logo placements',
                'Social media integration'
            ],
            colors: ['#000000', '#ff3838', '#ff9f1a', '#ffffff']
        },
        {
            id: 'flyer-5',
            title: 'Restaurant Menu Flyer',
            description: 'Elegant restaurant flyer template for menu promotions and special offers.',
            category: 'flyers',
            subcategory: 'Food & Beverage',
            price: 'Free',
            likes: 1432,
            downloads: 6540,
            rating: 4.6,
            reviews: 198,
            badge: null,
            image: './assets/images/flyers/restaurant-menu.jpg',
            fullImage: './assets/images/flyers/restaurant-menu-full.jpg',
            link: './templates/flyers/restaurant.html',
            fileFormats: ['AI', 'PSD', 'PDF'],
            dimensions: '8.5" x 14" (Legal)',
            software: ['Adobe Illustrator', 'Adobe Photoshop'],
            printReady: 'Yes',
            colorMode: 'CMYK',
            fileSize: '42 MB',
            tags: ['restaurant', 'menu', 'food', 'dining'],
            designDetails: 'Appetizing restaurant flyer design with dedicated sections for food items, prices, and special offers. Includes space for appetizing food photography.',
            materialsSpecs: 'Perfect for glossy or matte paper finishes. High-resolution images maintain print quality.',
            designInspiration: 'Culinary arts and fine dining aesthetics influence this clean, appetizing design.',
            practicalApplications: 'Ideal for restaurant promotions, daily specials, catering services, and food festival advertising.',
            features: [
                'Food menu sections',
                'Price list template',
                'Special offer callouts',
                'Contact information',
                'Opening hours',
                'Location map placeholder'
            ],
            colors: ['#8b4513', '#d4a373', '#f8f9fa', '#6c757d']
        },
        {
            id: 'flyer-6',
            title: 'Fitness Gym Flyer',
            description: 'Motivational gym flyer template for fitness classes and membership promotions.',
            category: 'flyers',
            subcategory: 'Fitness',
            price: 'Free',
            likes: 1890,
            downloads: 8765,
            rating: 4.8,
            reviews: 267,
            badge: 'Popular',
            image: './assets/images/flyers/gym-fitness.jpg',
            fullImage: './assets/images/flyers/gym-fitness-full.jpg',
            link: './templates/flyers/fitness.html',
            fileFormats: ['PSD', 'AI', 'EPS'],
            dimensions: '8.5" x 11"',
            software: ['Adobe Photoshop', 'Adobe Illustrator'],
            printReady: 'Yes',
            colorMode: 'CMYK',
            fileSize: '38 MB',
            tags: ['fitness', 'gym', 'workout', 'health'],
            designDetails: 'Dynamic fitness flyer with motivational imagery and bold typography. Perfect for gym promotions, fitness classes, and wellness events.',
            materialsSpecs: 'High-contrast design works well on various paper stocks. Optimized for both indoor and outdoor display.',
            designInspiration: 'Inspired by fitness culture and athletic aesthetics, combining energetic elements with clean design.',
            practicalApplications: 'Use for gym membership drives, fitness class promotions, personal training services, and health club events.',
            features: [
                'Motivational text overlays',
                'Class schedule template',
                'Pricing table',
                'Trainer profiles',
                'Special offer badges',
                'Call-to-action buttons'
            ],
            colors: ['#e63946', '#1e1e2c', '#a8dadc', '#f1faee']
        },
        {
            id: 'flyer-7',
            title: 'Education Seminar Flyer',
            description: 'Professional seminar flyer template for educational institutions and training centers.',
            category: 'flyers',
            subcategory: 'Education',
            price: 'Free',
            likes: 1234,
            downloads: 5432,
            rating: 4.5,
            reviews: 145,
            badge: null,
            image: './assets/images/flyers/education-seminar.jpg',
            fullImage: './assets/images/flyers/education-seminar-full.jpg',
            link: './templates/flyers/education.html',
            fileFormats: ['INDD', 'AI', 'PDF'],
            dimensions: '8.5" x 11"',
            software: ['Adobe InDesign', 'Adobe Illustrator'],
            printReady: 'Yes',
            colorMode: 'CMYK',
            fileSize: '36 MB',
            tags: ['education', 'seminar', 'workshop', 'training'],
            designDetails: 'Clean and professional educational flyer with structured content layout. Ideal for workshops, seminars, and training programs.',
            materialsSpecs: 'Standard print specifications with clear hierarchy for information.',
            designInspiration: 'Academic environments and professional development materials influence this structured design.',
            practicalApplications: 'Perfect for educational institutions, corporate training, professional development seminars, and workshop promotions.',
            features: [
                'Event schedule layout',
                'Speaker profiles',
                'Registration details',
                'Venue information',
                'Contact sections',
                'Early bird offer space'
            ],
            colors: ['#003049', '#669bbc', '#c1121f', '#fdf0d5']
        },
        {
            id: 'flyer-8',
            title: 'Medical Health Flyer',
            description: 'Trustworthy medical flyer template for healthcare services and wellness programs.',
            category: 'flyers',
            subcategory: 'Healthcare',
            price: 'Free',
            likes: 987,
            downloads: 4321,
            rating: 4.4,
            reviews: 98,
            badge: null,
            image: './assets/images/flyers/medical-health.jpg',
            fullImage: './assets/images/flyers/medical-health-full.jpg',
            link: './templates/flyers/medical.html',
            fileFormats: ['AI', 'PSD', 'PDF'],
            dimensions: '8.5" x 11"',
            software: ['Adobe Illustrator', 'Adobe Photoshop'],
            printReady: 'Yes',
            colorMode: 'CMYK',
            fileSize: '32 MB',
            tags: ['medical', 'health', 'healthcare', 'wellness'],
            designDetails: 'Professional healthcare flyer design that conveys trust and expertise. Suitable for medical practices, clinics, and wellness centers.',
            materialsSpecs: 'Clean design with appropriate medical imagery and professional typography.',
            designInspiration: 'Healthcare environments and medical professionalism guide this trustworthy design.',
            practicalApplications: 'Ideal for medical practices, health clinics, wellness programs, and healthcare service promotions.',
            features: [
                'Service listings',
                'Doctor profiles',
                'Insurance information',
                'Contact details',
                'Appointment callout',
                'Location map'
            ],
            colors: ['#2b7a78', '#3aafa9', '#def2f1', '#feffff']
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
            rating: 4.9,
            reviews: 567,
            badge: 'Bestseller',
            image: './assets/images/logos/minimalist-business.jpg',
            fullImage: './assets/images/logos/minimalist-business-full.jpg',
            link: './templates/logos/minimalist-business.html',
            fileFormats: ['AI', 'EPS', 'SVG', 'PNG'],
            dimensions: 'Vector (Scalable)',
            software: ['Adobe Illustrator', 'CorelDRAW', 'Inkscape'],
            printReady: 'Yes',
            colorMode: 'RGB/CMYK',
            fileSize: '12 MB',
            tags: ['logo', 'business', 'minimal', 'corporate'],
            designDetails: 'Sophisticated minimalist logo with clean lines and professional typography. Perfect for corporate branding and business identity.',
            materialsSpecs: 'Vector format ensures perfect scaling for any application from business cards to billboards.',
            designInspiration: 'Modern corporate identity and minimalist design trends inspire this clean, memorable logo.',
            practicalApplications: 'Ideal for business branding, corporate identity, professional services, and startup companies.',
            features: [
                'Fully vector editable',
                'Multiple file formats',
                'Color variations included',
                'Black and white versions',
                'Transparent backgrounds',
                'Business card mockup included'
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
            rating: 4.8,
            reviews: 432,
            badge: 'Trending',
            image: './assets/images/logos/creative-abstract.jpg',
            fullImage: './assets/images/logos/creative-abstract-full.jpg',
            link: './templates/logos/creative.html',
            fileFormats: ['AI', 'EPS', 'SVG', 'PDF'],
            dimensions: 'Vector (Scalable)',
            software: ['Adobe Illustrator', 'CorelDRAW'],
            printReady: 'Yes',
            colorMode: 'RGB/CMYK',
            fileSize: '15 MB',
            tags: ['creative', 'abstract', 'artistic', 'unique'],
            designDetails: 'Artistic logo with abstract elements and creative typography. Perfect for design agencies, art galleries, and creative businesses.',
            materialsSpecs: 'High-quality vector files with extensive customization options.',
            designInspiration: 'Contemporary art and abstract expressionism influence this unique, artistic logo design.',
            practicalApplications: 'Excellent for creative agencies, art galleries, design studios, and innovative brands.',
            features: [
                'Abstract shape elements',
                'Creative typography',
                'Multiple layout options',
                'Gradient versions',
                'Pattern fills',
                'Animation-ready files'
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
            rating: 4.9,
            reviews: 389,
            badge: 'Premium',
            image: './assets/images/logos/luxury-gold.jpg',
            fullImage: './assets/images/logos/luxury-gold-full.jpg',
            link: './templates/logos/luxury.html',
            fileFormats: ['AI', 'EPS', 'SVG', 'PNG'],
            dimensions: 'Vector (Scalable)',
            software: ['Adobe Illustrator', 'Adobe Photoshop'],
            printReady: 'Yes',
            colorMode: 'CMYK with metallic simulation',
            fileSize: '18 MB',
            tags: ['luxury', 'gold', 'elegant', 'premium'],
            designDetails: 'Sophisticated emblem-style logo with gold accents and elegant typography. Perfect for luxury brands and high-end services.',
            materialsSpecs: 'Includes metallic color simulation and special printing guides for foil stamping.',
            designInspiration: 'Classic heraldry and modern luxury branding combine in this elegant, timeless design.',
            practicalApplications: 'Ideal for luxury brands, premium services, high-end retail, and exclusive events.',
            features: [
                'Gold foil effect',
                'Emblem style design',
                'Monogram options',
                'Seal variations',
                'Embossing guide',
                'Stationery mockups'
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
            rating: 4.8,
            reviews: 456,
            badge: 'Popular',
            image: './assets/images/logos/tech-startup.jpg',
            fullImage: './assets/images/logos/tech-startup-full.jpg',
            link: './templates/logos/tech.html',
            fileFormats: ['AI', 'EPS', 'SVG', 'FIG'],
            dimensions: 'Vector (Scalable)',
            software: ['Adobe Illustrator', 'Figma', 'Sketch'],
            printReady: 'Yes',
            colorMode: 'RGB/CMYK',
            fileSize: '14 MB',
            tags: ['tech', 'startup', 'digital', 'modern'],
            designDetails: 'Contemporary tech logo with geometric elements and modern typography. Perfect for SaaS, apps, and digital services.',
            materialsSpecs: 'Optimized for both digital and print applications with responsive scaling.',
            designInspiration: 'Modern technology and digital innovation inspire this forward-thinking logo design.',
            practicalApplications: 'Excellent for tech startups, software companies, apps, and digital platforms.',
            features: [
                'Geometric shapes',
                'Digital-first design',
                'App icon included',
                'Responsive variations',
                'Animation ready',
                'Dark/light versions'
            ],
            colors: ['#4361ee', '#4cc9f0', '#f72585', '#1a1a2e']
        },
        {
            id: 'logo-5',
            title: 'Eco Friendly Logo',
            description: 'Natural and sustainable logo template for eco-conscious brands.',
            category: 'logos',
            subcategory: 'Green Business',
            price: 'Free',
            likes: 1876,
            downloads: 8765,
            rating: 4.7,
            reviews: 234,
            badge: 'Eco',
            image: './assets/images/logos/eco-friendly.jpg',
            fullImage: './assets/images/logos/eco-friendly-full.jpg',
            link: './templates/logos/eco.html',
            fileFormats: ['AI', 'EPS', 'SVG', 'PDF'],
            dimensions: 'Vector (Scalable)',
            software: ['Adobe Illustrator', 'CorelDRAW'],
            printReady: 'Yes',
            colorMode: 'RGB/CMYK',
            fileSize: '13 MB',
            tags: ['eco', 'green', 'sustainable', 'nature'],
            designDetails: 'Earth-friendly logo with organic shapes and natural color palette. Perfect for eco-friendly products and sustainable brands.',
            materialsSpecs: 'Environmentally-conscious design with natural color schemes and organic forms.',
            designInspiration: 'Nature and sustainability guide this organic, environmentally-conscious logo design.',
            practicalApplications: 'Ideal for organic products, sustainable brands, environmental organizations, and green businesses.',
            features: [
                'Leaf elements',
                'Organic shapes',
                'Earth tones',
                'Hand-drawn feel',
                'Recycled paper texture',
                'Sustainability icons'
            ],
            colors: ['#2ecc71', '#27ae60', '#16a085', '#f1c40f']
        },
        {
            id: 'logo-6',
            title: 'Restaurant Logo Collection',
            description: 'Complete restaurant logo set with multiple style variations for culinary businesses.',
            category: 'logos',
            subcategory: 'Food & Beverage',
            price: 'Free',
            likes: 1654,
            downloads: 7654,
            rating: 4.6,
            reviews: 198,
            badge: null,
            image: './assets/images/logos/restaurant-set.jpg',
            fullImage: './assets/images/logos/restaurant-set-full.jpg',
            link: './templates/logos/restaurant.html',
            fileFormats: ['AI', 'EPS', 'SVG', 'PNG'],
            dimensions: 'Vector (Scalable)',
            software: ['Adobe Illustrator', 'Adobe Photoshop'],
            printReady: 'Yes',
            colorMode: 'RGB/CMYK',
            fileSize: '22 MB',
            tags: ['restaurant', 'cafe', 'food', 'culinary'],
            designDetails: 'Versatile restaurant logo collection with multiple styles including chef-inspired, modern bistro, and traditional eatery designs.',
            materialsSpecs: 'Complete branding package with variations for menus, signage, and marketing materials.',
            designInspiration: 'Culinary arts and restaurant culture inspire this diverse collection of food industry logos.',
            practicalApplications: 'Perfect for restaurants, cafes, food trucks, bakeries, and catering services.',
            features: [
                '5 logo variations',
                'Badge styles',
                'Script typography',
                'Food icons',
                'Menu integration',
                'Social media kits'
            ],
            colors: ['#c44536', '#e27d60', '#e8a87c', '#41b3a3']
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
            rating: 4.8,
            reviews: 345,
            badge: 'Popular',
            image: './assets/images/cards/modern-corporate.jpg',
            fullImage: './assets/images/cards/modern-corporate-full.jpg',
            link: './templates/cards/modern.html',
            fileFormats: ['AI', 'PSD', 'PDF', 'PNG'],
            dimensions: '3.5" x 2" (Standard)',
            software: ['Adobe Illustrator', 'Adobe Photoshop'],
            printReady: 'Yes, 300 DPI with bleed',
            colorMode: 'CMYK',
            fileSize: '25 MB',
            tags: ['business card', 'corporate', 'professional', 'minimal'],
            designDetails: 'Contemporary business card design with clean typography and subtle geometric patterns. Double-sided layout with ample space for contact information.',
            materialsSpecs: 'Print-ready with 0.125" bleed on all sides. Includes guides for standard and rounded corners.',
            designInspiration: 'Modern corporate identity and minimalist design principles influence this sophisticated card.',
            practicalApplications: 'Perfect for executives, consultants, and professionals in any industry.',
            features: [
                'Double-sided design',
                'Spot UV guide',
                'Foil stamping options',
                'Social media icons',
                'QR code placeholder',
                'Multiple color schemes'
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
            rating: 4.7,
            reviews: 234,
            badge: 'Trending',
            image: './assets/images/cards/creative-portfolio.jpg',
            fullImage: './assets/images/cards/creative-portfolio-full.jpg',
            link: './templates/cards/creative.html',
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
                'Bleed marks included',
                'Die-cut templates'
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
            rating: 4.9,
            reviews: 198,
            badge: 'Premium',
            image: './assets/images/cards/luxury-gold.jpg',
            fullImage: './assets/images/cards/luxury-gold-full.jpg',
            link: './templates/cards/luxury.html',
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
                'Thick stock templates',
                'Matching envelope set'
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
            rating: 4.8,
            reviews: 267,
            badge: 'Popular',
            image: './assets/images/cards/tech-minimal.jpg',
            fullImage: './assets/images/cards/tech-minimal-full.jpg',
            link: './templates/cards/tech.html',
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
                'App icon style',
                'Dark/light versions'
            ],
            colors: ['#1a1a2e', '#16213e', '#0f3460', '#e94560']
        },
        {
            id: 'card-5',
            title: 'Architectural Business Card',
            description: 'Structural business card template for architects and design firms.',
            category: 'businessCards',
            subcategory: 'Architecture',
            price: 'Free',
            likes: 1234,
            downloads: 5432,
            rating: 4.6,
            reviews: 145,
            badge: null,
            image: './assets/images/cards/architectural.jpg',
            fullImage: './assets/images/cards/architectural-full.jpg',
            link: './templates/cards/architectural.html',
            fileFormats: ['AI', 'INDD', 'PDF'],
            dimensions: '3.5" x 2"',
            software: ['Adobe Illustrator', 'Adobe InDesign'],
            printReady: 'Yes',
            colorMode: 'CMYK',
            fileSize: '24 MB',
            tags: ['architecture', 'design', 'structural', 'blueprint'],
            designDetails: 'Structural business card with blueprint-style graphics and architectural grid systems. Perfect for architects and design firms.',
            materialsSpecs: 'Includes guides for specialty papers and architectural finishes.',
            designInspiration: 'Architectural drawings and structural designs influence this unique, professional card.',
            practicalApplications: 'Ideal for architects, interior designers, construction companies, and design-build firms.',
            features: [
                'Blueprint background',
                'Grid systems',
                'Scale markers',
                'Project space',
                'Material swatches',
                'Portfolio QR code'
            ],
            colors: ['#2c3e50', '#34495e', '#7f8c8d', '#bdc3c7']
        },
        {
            id: 'card-6',
            title: 'Healthcare Professional Card',
            description: 'Trustworthy business card template for healthcare providers and medical professionals.',
            category: 'businessCards',
            subcategory: 'Healthcare',
            price: 'Free',
            likes: 987,
            downloads: 4321,
            rating: 4.5,
            reviews: 98,
            badge: null,
            image: './assets/images/cards/healthcare.jpg',
            fullImage: './assets/images/cards/healthcare-full.jpg',
            link: './templates/cards/healthcare.html',
            fileFormats: ['AI', 'PSD', 'PDF'],
            dimensions: '3.5" x 2"',
            software: ['Adobe Illustrator', 'Adobe Photoshop'],
            printReady: 'Yes',
            colorMode: 'CMYK',
            fileSize: '20 MB',
            tags: ['healthcare', 'medical', 'doctor', 'clinic'],
            designDetails: 'Professional healthcare business card design that conveys trust and expertise. Suitable for doctors, clinics, and medical practices.',
            materialsSpecs: 'Clean, professional design with appropriate medical imagery and typography.',
            designInspiration: 'Healthcare environments and medical professionalism guide this trustworthy design.',
            practicalApplications: 'Perfect for doctors, dentists, therapists, clinics, and healthcare providers.',
            features: [
                'Medical cross icon',
                'Insurance info space',
                'Languages spoken',
                'Board certifications',
                'Appointment QR code',
                'Emergency contact'
            ],
            colors: ['#2b7a78', '#3aafa9', '#def2f1', '#17252a']
        },
        {
            id: 'card-7',
            title: 'Real Estate Agent Card',
            description: 'Professional business card template for real estate agents and brokers.',
            category: 'businessCards',
            subcategory: 'Real Estate',
            price: 'Free',
            likes: 1456,
            downloads: 6789,
            rating: 4.7,
            reviews: 178,
            badge: null,
            image: './assets/images/cards/real-estate.jpg',
            fullImage: './assets/images/cards/real-estate-full.jpg',
            link: './templates/cards/realestate.html',
            fileFormats: ['AI', 'PSD', 'PDF'],
            dimensions: '3.5" x 2"',
            software: ['Adobe Illustrator', 'Adobe Photoshop'],
            printReady: 'Yes',
            colorMode: 'CMYK',
            fileSize: '23 MB',
            tags: ['real estate', 'agent', 'property', 'realtor'],
            designDetails: 'Professional real estate business card with property-themed design elements. Perfect for agents and brokers.',
            materialsSpecs: 'High-impact design for networking and property showings.',
            designInspiration: 'Real estate marketing and property development inspire this professional design.',
            practicalApplications: 'Ideal for real estate agents, brokers, property managers, and mortgage professionals.',
            features: [
                'Property image space',
                'MLS number field',
                'Specialization area',
                'License information',
                'Multiple property types',
                'Testimonial space'
            ],
            colors: ['#b68b40', '#2c3e50', '#d4af37', '#ecf0f1']
        },
        {
            id: 'card-8',
            title: 'Fitness Trainer Card',
            description: 'Dynamic business card template for personal trainers and fitness coaches.',
            category: 'businessCards',
            subcategory: 'Fitness',
            price: 'Free',
            likes: 1345,
            downloads: 5890,
            rating: 4.6,
            reviews: 156,
            badge: null,
            image: './assets/images/cards/fitness-trainer.jpg',
            fullImage: './assets/images/cards/fitness-trainer-full.jpg',
            link: './templates/cards/fitness.html',
            fileFormats: ['AI', 'PSD', 'PDF'],
            dimensions: '3.5" x 2"',
            software: ['Adobe Illustrator', 'Adobe Photoshop'],
            printReady: 'Yes',
            colorMode: 'CMYK',
            fileSize: '19 MB',
            tags: ['fitness', 'trainer', 'gym', 'coach'],
            designDetails: 'Energetic fitness trainer business card with motivational elements and bold typography.',
            materialsSpecs: 'High-impact design perfect for health and fitness professionals.',
            designInspiration: 'Fitness culture and athletic aesthetics inspire this dynamic card design.',
            practicalApplications: 'Perfect for personal trainers, gym coaches, fitness instructors, and wellness coaches.',
            features: [
                'Specialization badges',
                'Certification space',
                'Class schedule QR',
                'Social fitness links',
                'Before/after QR code',
                'Client testimonial spot'
            ],
            colors: ['#e63946', '#1e1e2c', '#a8dadc', '#f1faee']
        }
    ],
    
    socialMedia: [
        {
            id: 'social-1',
            title: 'Instagram Story Pack',
            description: '50+ Instagram story templates for business and personal branding.',
            category: 'socialMedia',
            subcategory: 'Instagram Stories',
            price: 'Free',
            likes: 4567,
            downloads: 23456,
            rating: 4.9,
            reviews: 678,
            badge: 'Bestseller',
            image: './assets/images/social/instagram-stories.jpg',
            fullImage: './assets/images/social/instagram-stories-full.jpg',
            link: './templates/social/instagram-stories.html',
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
            category: 'socialMedia',
            subcategory: 'Facebook Covers',
            price: 'Free',
            likes: 3456,
            downloads: 15678,
            rating: 4.8,
            reviews: 456,
            badge: 'Popular',
            image: './assets/images/social/facebook-covers.jpg',
            fullImage: './assets/images/social/facebook-covers-full.jpg',
            link: './templates/social/facebook-covers.html',
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
        },
        {
            id: 'social-3',
            title: 'LinkedIn Banner Pack',
            description: 'Professional LinkedIn banner templates for personal branding and company pages.',
            category: 'socialMedia',
            subcategory: 'LinkedIn Banners',
            price: 'Free',
            likes: 2345,
            downloads: 10987,
            rating: 4.7,
            reviews: 345,
            badge: 'Professional',
            image: './assets/images/social/linkedin-banners.jpg',
            fullImage: './assets/images/social/linkedin-banners-full.jpg',
            link: './templates/social/linkedin-banners.html',
            fileFormats: ['PSD', 'AI', 'JPG', 'PNG'],
            dimensions: '1584 x 396 px',
            software: ['Adobe Photoshop', 'Adobe Illustrator'],
            printReady: 'No',
            colorMode: 'RGB',
            fileSize: '38 MB',
            tags: ['linkedin', 'banner', 'professional', 'career'],
            designDetails: 'Professional LinkedIn banner templates for executives, entrepreneurs, and company pages.',
            materialsSpecs: 'Optimized for LinkedIn profile and company page dimensions.',
            designInspiration: 'Corporate branding and professional networking aesthetics.',
            practicalApplications: 'Perfect for LinkedIn profiles, company pages, and professional branding.',
            features: [
                'Headline space',
                'Contact information',
                'Skills showcase',
                'Company logo area',
                'CTA buttons',
                'Brand guidelines included'
            ],
            colors: ['#0077b5', '#00a0dc', '#313335', '#86888a']
        },
        {
            id: 'social-4',
            title: 'Twitter Header Pack',
            description: 'Trendy Twitter header templates for personal and brand profiles.',
            category: 'socialMedia',
            subcategory: 'Twitter Headers',
            price: 'Free',
            likes: 1987,
            downloads: 8765,
            rating: 4.6,
            reviews: 234,
            badge: null,
            image: './assets/images/social/twitter-headers.jpg',
            fullImage: './assets/images/social/twitter-headers-full.jpg',
            link: './templates/social/twitter-headers.html',
            fileFormats: ['PSD', 'AI', 'JPG'],
            dimensions: '1500 x 500 px',
            software: ['Adobe Photoshop', 'Adobe Illustrator'],
            printReady: 'No',
            colorMode: 'RGB',
            fileSize: '32 MB',
            tags: ['twitter', 'header', 'social', 'profile'],
            designDetails: '15 modern Twitter header templates designed for maximum impact and brand consistency.',
            materialsSpecs: 'Optimized for Twitter timeline with proper image dimensions.',
            designInspiration: 'Twitter trends and social media best practices.',
            practicalApplications: 'Great for Twitter profiles, brand pages, and promotional campaigns.',
            features: [
                'Profile picture cutout',
                'Bio integration',
                'Hashtag space',
                'Pinned tweet area',
                'Follower milestone',
                'Trending topics'
            ],
            colors: ['#1da1f2', '#14171a', '#657786', '#aab8c2']
        },
        {
            id: 'social-5',
            title: 'YouTube Channel Art',
            description: 'Complete YouTube channel art pack with banner, thumbnails, and end screens.',
            category: 'socialMedia',
            subcategory: 'YouTube',
            price: 'Free',
            likes: 5678,
            downloads: 28901,
            rating: 4.9,
            reviews: 789,
            badge: 'Hot',
            image: './assets/images/social/youtube-channel.jpg',
            fullImage: './assets/images/social/youtube-channel-full.jpg',
            link: './templates/social/youtube.html',
            fileFormats: ['PSD', 'AI', 'PNG', 'JPG'],
            dimensions: '2560 x 1440 px (Banner)',
            software: ['Adobe Photoshop', 'Adobe Illustrator'],
            printReady: 'No',
            colorMode: 'RGB',
            fileSize: '95 MB',
            tags: ['youtube', 'channel art', 'thumbnails', 'video'],
            designDetails: 'Complete YouTube branding package including channel banner, video thumbnails, end screens, and watermark.',
            materialsSpecs: 'Optimized for all devices with safe zones for different screen sizes.',
            designInspiration: 'YouTube trends and successful channel branding strategies.',
            practicalApplications: 'Perfect for YouTubers, content creators, and video marketers.',
            features: [
                'Channel banner',
                '10 thumbnail templates',
                'End screen templates',
                'Watermark design',
                'Video outro cards',
                'Subscribe animation'
            ],
            colors: ['#ff0000', '#282828', '#ffffff', '#3ea6ff']
        },
        {
            id: 'social-6',
            title: 'Pinterest Pin Templates',
            description: 'Viral Pinterest pin templates for blog posts and products.',
            category: 'socialMedia',
            subcategory: 'Pinterest',
            price: 'Free',
            likes: 2876,
            downloads: 12345,
            rating: 4.8,
            reviews: 456,
            badge: 'Trending',
            image: './assets/images/social/pinterest-pins.jpg',
            fullImage: './assets/images/social/pinterest-pins-full.jpg',
            link: './templates/social/pinterest.html',
            fileFormats: ['PSD', 'CANVA', 'PNG'],
            dimensions: '1000 x 1500 px',
            software: ['Adobe Photoshop', 'Canva'],
            printReady: 'No',
            colorMode: 'RGB',
            fileSize: '42 MB',
            tags: ['pinterest', 'pins', 'viral', 'social'],
            designDetails: '30 eye-catching Pinterest pin templates designed for maximum engagement and virality.',
            materialsSpecs: 'Optimized for Pinterest with vertical format and text-safe zones.',
            designInspiration: 'Viral Pinterest content and SEO best practices.',
            practicalApplications: 'Ideal for bloggers, e-commerce, and content marketers.',
            features: [
                'Multiple layouts',
                'SEO title space',
                'Brand logo area',
                'Call-to-action',
                'Rich pin integration',
                'Video pin templates'
            ],
            colors: ['#e60023', '#bd081c', '#efefef', '#4a4a4a']
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
            rating: 4.8,
            reviews: 567,
            badge: 'Popular',
            image: './assets/images/posters/movie-poster.jpg',
            fullImage: './assets/images/posters/movie-poster-full.jpg',
            link: './templates/posters/movie.html',
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
        },
        {
            id: 'poster-2',
            title: 'Event Poster Template',
            description: 'Versatile event poster template for concerts, festivals, and parties.',
            category: 'posters',
            subcategory: 'Event Posters',
            price: 'Free',
            likes: 2987,
            downloads: 14567,
            rating: 4.7,
            reviews: 456,
            badge: 'Trending',
            image: './assets/images/posters/event-poster.jpg',
            fullImage: './assets/images/posters/event-poster-full.jpg',
            link: './templates/posters/event.html',
            fileFormats: ['PSD', 'AI', 'EPS'],
            dimensions: '18" x 24"',
            software: ['Adobe Photoshop', 'Adobe Illustrator'],
            printReady: 'Yes',
            colorMode: 'CMYK',
            fileSize: '98 MB',
            tags: ['event', 'concert', 'festival', 'party'],
            designDetails: 'Dynamic event poster template with multiple information areas and eye-catching design elements.',
            materialsSpecs: 'Print-ready with vibrant colors suitable for club and venue display.',
            designInspiration: 'Music festivals and nightlife culture influence this energetic design.',
            practicalApplications: 'Ideal for concerts, festivals, club nights, and special events.',
            features: [
                'Lineup section',
                'Date and venue',
                'Ticket information',
                'Age restriction',
                'Sponsor logos',
                'Social media handles'
            ],
            colors: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4']
        },
        {
            id: 'poster-3',
            title: 'Academic Conference Poster',
            description: 'Professional academic poster template for research presentations and conferences.',
            category: 'posters',
            subcategory: 'Academic',
            price: 'Free',
            likes: 1876,
            downloads: 8765,
            rating: 4.9,
            reviews: 345,
            badge: 'Professional',
            image: './assets/images/posters/academic-poster.jpg',
            fullImage: './assets/images/posters/academic-poster-full.jpg',
            link: './templates/posters/academic.html',
            fileFormats: ['PPTX', 'AI', 'PDF'],
            dimensions: '36" x 48"',
            software: ['PowerPoint', 'Adobe Illustrator'],
            printReady: 'Yes',
            colorMode: 'CMYK',
            fileSize: '65 MB',
            tags: ['academic', 'research', 'conference', 'science'],
            designDetails: 'Structured academic poster template with sections for research methodology, results, and conclusions.',
            materialsSpecs: 'Print-ready with academic formatting guidelines and proper font sizes.',
            designInspiration: 'Scientific presentations and academic conference standards.',
            practicalApplications: 'Perfect for research conferences, symposiums, and academic presentations.',
            features: [
                'Abstract section',
                'Methodology area',
                'Results charts',
                'Conclusion space',
                'References section',
                'Author affiliations'
            ],
            colors: ['#2c3e50', '#3498db', '#ecf0f1', '#95a5a6']
        },
        {
            id: 'poster-4',
            title: 'Fashion Poster Template',
            description: 'Glamorous fashion poster template for brand campaigns and lookbooks.',
            category: 'posters',
            subcategory: 'Fashion',
            price: 'Free',
            likes: 2345,
            downloads: 10987,
            rating: 4.8,
            reviews: 456,
            badge: 'Luxury',
            image: './assets/images/posters/fashion-poster.jpg',
            fullImage: './assets/images/posters/fashion-poster-full.jpg',
            link: './templates/posters/fashion.html',
            fileFormats: ['PSD', 'AI', 'PDF'],
            dimensions: '24" x 36"',
            software: ['Adobe Photoshop', 'Adobe Illustrator'],
            printReady: 'Yes',
            colorMode: 'CMYK',
            fileSize: '115 MB',
            tags: ['fashion', 'model', 'style', 'glamour'],
            designDetails: 'High-end fashion poster template with elegant typography and sophisticated layout for brand imagery.',
            materialsSpecs: 'Premium design suitable for luxury fashion brands and boutique displays.',
            designInspiration: 'Fashion magazines and haute couture campaigns influence this elegant design.',
            practicalApplications: 'Ideal for fashion shows, brand campaigns, lookbooks, and retail displays.',
            features: [
                'Model photo area',
                'Brand logo prominence',
                'Collection name',
                'Season indicators',
                'Runway information',
                'Designer credits'
            ],
            colors: ['#000000', '#d4af37', '#ffffff', '#800020']
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
            rating: 4.9,
            reviews: 567,
            badge: 'New',
            image: './assets/images/calendars/wall-calendar-2026.jpg',
            fullImage: './assets/images/calendars/wall-calendar-2026-full.jpg',
            link: './templates/calendars/wall-2026.html',
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
        },
        {
            id: 'calendar-2',
            title: 'Desk Calendar 2026',
            description: 'Elegant desk calendar template for professional office use.',
            category: 'calendars',
            subcategory: 'Desk Calendars',
            price: 'Free',
            likes: 2789,
            downloads: 13456,
            rating: 4.8,
            reviews: 456,
            badge: 'Professional',
            image: './assets/images/calendars/desk-calendar-2026.jpg',
            fullImage: './assets/images/calendars/desk-calendar-2026-full.jpg',
            link: './templates/calendars/desk-2026.html',
            fileFormats: ['AI', 'PSD', 'PDF'],
            dimensions: '5" x 7" (Standing)',
            software: ['Adobe Illustrator', 'Adobe Photoshop'],
            printReady: 'Yes',
            colorMode: 'CMYK',
            fileSize: '89 MB',
            tags: ['calendar', '2026', 'desk', 'office'],
            designDetails: 'Professional desk calendar with monthly tabs and ample space for daily appointments and notes.',
            materialsSpecs: 'Print-ready with stand design and spiral binding guides.',
            designInspiration: 'Corporate office supplies and professional organization tools.',
            practicalApplications: 'Ideal for executive desks, reception areas, and office organization.',
            features: [
                'Monthly spreads',
                'Holiday indicators',
                'Notes sections',
                'Year overview',
                'Important dates',
                'Contact pages'
            ],
            colors: ['#34495e', '#7f8c8d', '#bdc3c7', '#ecf0f1']
        }
    ],
    
    mockups: [
        {
            id: 'mockup-1',
            title: 'iPhone 15 Mockup',
            description: 'High-quality iPhone 15 mockup for app and website presentations.',
            category: 'mockups',
            subcategory: 'Device Mockups',
            price: 'Free',
            likes: 4567,
            downloads: 23456,
            rating: 4.9,
            reviews: 789,
            badge: 'Hot',
            image: './assets/images/mockups/iphone-15.jpg',
            fullImage: './assets/images/mockups/iphone-15-full.jpg',
            link: './templates/mockups/iphone-15.html',
            fileFormats: ['PSD', 'AI', 'FIG'],
            dimensions: '4000 x 4000 px',
            software: ['Adobe Photoshop', 'Figma'],
            printReady: 'No',
            colorMode: 'RGB',
            fileSize: '245 MB',
            tags: ['mockup', 'iphone', 'device', 'app'],
            designDetails: 'Realistic iPhone 15 mockup with multiple angles and customizable screens.',
            materialsSpecs: 'Smart object layers for easy screen replacement.',
            designInspiration: 'Apple product photography and app presentation standards.',
            practicalApplications: 'Perfect for app presentations, website showcases, and UI/UX portfolios.',
            features: [
                'Multiple angles',
                'Screen smart objects',
                'Realistic shadows',
                'Reflection effects',
                'Background options',
                'Color variations'
            ],
            colors: ['#1a1a1a', '#f5f5f5', '#d4af37', '#2c3e50']
        },
        {
            id: 'mockup-2',
            title: 'Branding Mockup Pack',
            description: 'Complete branding mockup set with stationery, signage, and merchandise.',
            category: 'mockups',
            subcategory: 'Branding Mockups',
            price: 'Free',
            likes: 3890,
            downloads: 19876,
            rating: 4.8,
            reviews: 678,
            badge: 'Popular',
            image: './assets/images/mockups/branding-pack.jpg',
            fullImage: './assets/images/mockups/branding-pack-full.jpg',
            link: './templates/mockups/branding.html',
            fileFormats: ['PSD', 'AI', 'PNG'],
            dimensions: 'Various',
            software: ['Adobe Photoshop', 'Adobe Illustrator'],
            printReady: 'No',
            colorMode: 'RGB',
            fileSize: '345 MB',
            tags: ['mockup', 'branding', 'stationery', 'pack'],
            designDetails: 'Comprehensive branding mockup set including business cards, letterheads, envelopes, totes, and signage.',
            materialsSpecs: 'Smart object layers for easy brand element placement.',
            designInspiration: 'Professional brand presentations and identity showcases.',
            practicalApplications: 'Perfect for brand identity presentations, client proposals, and portfolio showcases.',
            features: [
                'Business card mockups',
                'Letterhead designs',
                'Envelope set',
                'Tote bag mockups',
                'Signage displays',
                'Digital device mockups'
            ],
            colors: ['#4361ee', '#f72585', '#4cc9f0', '#7209b7']
        }
    ]
};

// ===== POPULAR DESIGNS DATA (24 items for 3 rows of 8, but we'll show 8 initially) =====
const popularDesigns = [
    // Row 1 - Flyers
    {
        id: 'pop-flyer-1',
        title: 'Modern Business Flyer',
        description: 'Professional business flyer template perfect for corporate events and marketing campaigns.',
        category: 'flyers',
        subcategory: 'Business Flyers',
        price: 'Free',
        likes: 2345,
        downloads: 12890,
        rating: 4.9,
        reviews: 456,
        badge: '🔥 Trending',
        image: './assets/images/flyers/business-flyer-modern.jpg',
        fullImage: './assets/images/flyers/business-flyer-modern-full.jpg',
        link: '#',
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
        id: 'pop-flyer-2',
        title: 'Birthday Party Flyer',
        description: 'Vibrant birthday flyer template with fun elements and customizable sections.',
        category: 'flyers',
        subcategory: 'Event Flyers',
        price: 'Free',
        likes: 1876,
        downloads: 9450,
        rating: 4.8,
        reviews: 324,
        badge: '🎉 Popular',
        image: './assets/images/flyers/birthday-flyer-colorful.jpg',
        fullImage: './assets/images/flyers/birthday-flyer-colorful-full.jpg',
        link: '#',
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
        id: 'pop-flyer-3',
        title: 'Real Estate Flyer',
        description: 'Elegant real estate flyer template for property listings and open houses.',
        category: 'flyers',
        subcategory: 'Real Estate',
        price: 'Free',
        likes: 1567,
        downloads: 7890,
        rating: 4.7,
        reviews: 278,
        badge: '🏠 Featured',
        image: './assets/images/flyers/real-estate-luxury.jpg',
        fullImage: './assets/images/flyers/real-estate-luxury-full.jpg',
        link: '#',
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
        id: 'pop-flyer-4',
        title: 'Music Concert Flyer',
        description: 'Dynamic concert flyer template for music events, festivals, and live performances.',
        category: 'flyers',
        subcategory: 'Event Flyers',
        price: 'Free',
        likes: 2134,
        downloads: 11230,
        rating: 4.9,
        reviews: 412,
        badge: '🎵 Hot',
        image: './assets/images/flyers/concert-rock.jpg',
        fullImage: './assets/images/flyers/concert-rock-full.jpg',
        link: '#',
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
    },
    
    // Row 2 - Logos
    {
        id: 'pop-logo-1',
        title: 'Minimalist Business Logo',
        description: 'Clean and professional logo template for modern businesses and startups.',
        category: 'logos',
        subcategory: 'Business Logos',
        price: 'Free',
        likes: 3210,
        downloads: 15678,
        rating: 4.9,
        reviews: 567,
        badge: '⭐ Bestseller',
        image: './assets/images/logos/minimalist-business.jpg',
        fullImage: './assets/images/logos/minimalist-business-full.jpg',
        link: '#',
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
        id: 'pop-logo-2',
        title: 'Creative Abstract Logo',
        description: 'Artistic and unique logo template for creative agencies and innovative brands.',
        category: 'logos',
        subcategory: 'Creative Logos',
        price: 'Free',
        likes: 2789,
        downloads: 12345,
        rating: 4.8,
        reviews: 432,
        badge: '🎨 Creative',
        image: './assets/images/logos/creative-abstract.jpg',
        fullImage: './assets/images/logos/creative-abstract-full.jpg',
        link: '#',
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
        id: 'pop-logo-3',
        title: 'Luxury Gold Emblem',
        description: 'Elegant luxury logo template with gold accents for premium brands.',
        category: 'logos',
        subcategory: 'Luxury Logos',
        price: 'Free',
        likes: 2345,
        downloads: 10987,
        rating: 4.9,
        reviews: 389,
        badge: '👑 Premium',
        image: './assets/images/logos/luxury-gold.jpg',
        fullImage: './assets/images/logos/luxury-gold-full.jpg',
        link: '#',
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
        id: 'pop-logo-4',
        title: 'Tech Startup Logo',
        description: 'Modern technology logo template for startups and tech companies.',
        category: 'logos',
        subcategory: 'Technology Logos',
        price: 'Free',
        likes: 2987,
        downloads: 13456,
        rating: 4.8,
        reviews: 456,
        badge: '💻 Tech',
        image: './assets/images/logos/tech-startup.jpg',
        fullImage: './assets/images/logos/tech-startup-full.jpg',
        link: '#',
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
];

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

// Modal Elements
const templateModal = document.getElementById('templateModal');
const closeModal = document.getElementById('closeModal');
const modalImage = document.getElementById('modalImage');
const modalFullImage = document.getElementById('modalFullImage');
const modalTitle = document.getElementById('modalTitle');
const modalSubtitle = document.getElementById('modalSubtitle');
const modalDescription = document.getElementById('modalDescription');
const modalCategory = document.getElementById('modalCategory');
const modalFileFormat = document.getElementById('modalFileFormat');
const modalDimensions = document.getElementById('modalDimensions');
const modalDownloadCount = document.getElementById('modalDownloadCount');
const modalSoftware = document.getElementById('modalSoftware');
const modalPrintReady = document.getElementById('modalPrintReady');
const modalColorMode = document.getElementById('modalColorMode');
const modalFileSize = document.getElementById('modalFileSize');
const designDetails = document.getElementById('designDetails');
const materialsSpecs = document.getElementById('materialsSpecs');
const designInspiration = document.getElementById('designInspiration');
const practicalApplications = document.getElementById('practicalApplications');
const formatBadges = document.getElementById('formatBadges');
const colorPalette = document.getElementById('colorPalette');
const tagsContainer = document.getElementById('tagsContainer');
const featuresList = document.getElementById('featuresList');
const modalLikeBtn = document.getElementById('modalLikeBtn');
const modalLikeCount = document.getElementById('modalLikeCount');
const modalBadge = document.getElementById('modalBadge');
const relatedDesigns = document.getElementById('relatedDesigns');

// Search Modal Elements
const searchModal = document.getElementById('searchModal');
const closeSearchModal = document.getElementById('closeSearchModal');
const searchStats = document.getElementById('searchStats');
const searchResultsGrid = document.getElementById('searchResultsGrid');

// YouTube Popup Elements
const youtubePopup = document.getElementById('youtubePopup');
const closeYoutubePopup = document.getElementById('closeYoutubePopup');
const subscribeBtn = document.getElementById('subscribeBtn');
const viewChannelBtn = document.getElementById('viewChannelBtn');

// Popular Section Elements
const popularGrid = document.getElementById('popularGrid');
const filterButtons = document.querySelectorAll('.filter-popular-btn');
const loadMoreBtn = document.getElementById('loadMorePopularBtn');

// State
let currentTemplate = null;
let displayedPopularCount = 8;
let currentFilter = 'all';
let likedTemplates = JSON.parse(localStorage.getItem('likedTemplates')) || {};

// ===== Initialize when DOM is loaded =====
document.addEventListener('DOMContentLoaded', function() {
    // Initialize starfield animation
    const starfield = new StarfieldAnimation();
    
    // Set current year in footer
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }
    
    // Load template data for other sections
    loadTemplates();
    loadServices();
    loadPortfolio();
    loadTools();
    
    // Load popular designs
    loadPopularDesigns();
    
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
    
    // Setup search functionality
    setupSearch();
    
    // Setup filter buttons
    setupFilters();
    
    // Setup load more button
    setupLoadMore();
    
    // Setup modal close button
    if (closeModal) {
        closeModal.addEventListener('click', closeTemplateModal);
    }
    
    // Setup search modal close button
    if (closeSearchModal) {
        closeSearchModal.addEventListener('click', closeSearchModal);
    }
    
    // Close modals when clicking overlay
    if (overlay) {
        overlay.addEventListener('click', function() {
            closeTemplateModal();
            closeSearchModal();
        });
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeTemplateModal();
            closeSearchModal();
        }
    });
});

// ===== LOAD POPULAR DESIGNS =====
function loadPopularDesigns() {
    if (!popularGrid) return;
    
    const filteredDesigns = filterDesigns(popularDesigns, currentFilter);
    const designsToShow = filteredDesigns.slice(0, displayedPopularCount);
    
    popularGrid.innerHTML = designsToShow.map(design => createPopularCard(design)).join('');
    
    // Add event listeners to cards
    document.querySelectorAll('.popular-card').forEach(card => {
        card.addEventListener('click', function(e) {
            // Don't open modal if clicking on like button
            if (e.target.closest('.popular-likes i')) return;
            
            const designId = this.dataset.id;
            const design = findDesignById(designId);
            if (design) {
                openTemplateModal(design);
            }
        });
    });
    
    // Add event listeners to like buttons
    document.querySelectorAll('.popular-likes i').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const card = this.closest('.popular-card');
            const designId = card.dataset.id;
            toggleLike(designId, this);
        });
        
        // Set initial like state
        const card = btn.closest('.popular-card');
        const designId = card.dataset.id;
        if (likedTemplates[designId]) {
            btn.classList.add('active', 'fas');
            btn.classList.remove('far');
        }
    });
}

function createPopularCard(design) {
    const isLiked = likedTemplates[design.id] || false;
    const likeIcon = isLiked ? 'fas' : 'far';
    
    return `
        <div class="popular-card" data-id="${design.id}" data-category="${design.category}">
            ${design.badge ? `<div class="popular-badge">${design.badge}</div>` : ''}
            <div class="popular-img">
                <img src="${design.image}" alt="${design.title}" loading="lazy">
            </div>
            <div class="popular-info">
                <h3>${design.title}</h3>
                <p>${design.description.substring(0, 60)}...</p>
                <div class="popular-meta">
                    <div class="popular-stats">
                        <span class="popular-likes">
                            <i class="${likeIcon} fa-heart"></i> ${formatNumber(design.likes)}
                        </span>
                        <span class="popular-downloads">
                            <i class="fas fa-download"></i> ${formatNumber(design.downloads)}
                        </span>
                    </div>
                    <span class="popular-price">${design.price}</span>
                </div>
            </div>
        </div>
    `;
}

// ===== FILTER FUNCTIONALITY =====
function setupFilters() {
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active button
            filterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Update filter and reload designs
            currentFilter = this.dataset.filter;
            displayedPopularCount = 8; // Reset to 8 when filter changes
            loadPopularDesigns();
        });
    });
}

function filterDesigns(designs, filter) {
    if (filter === 'all') return designs;
    return designs.filter(design => design.category === filter);
}

// ===== LOAD MORE FUNCTIONALITY =====
function setupLoadMore() {
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            const filteredDesigns = filterDesigns(popularDesigns, currentFilter);
            
            if (displayedPopularCount < filteredDesigns.length) {
                displayedPopularCount += 4; // Load 4 more
                loadPopularDesigns();
            }
            
            // Hide button if no more designs
            if (displayedPopularCount >= filteredDesigns.length) {
                this.style.display = 'none';
            } else {
                this.style.display = 'inline-flex';
            }
        });
    }
}

// ===== MODAL FUNCTIONS =====
function openTemplateModal(design) {
    currentTemplate = design;
    
    // Set modal content
    modalImage.src = design.image;
    modalImage.alt = design.title;
    modalFullImage.src = design.fullImage || design.image;
    modalFullImage.alt = design.title;
    modalTitle.textContent = design.title;
    modalSubtitle.textContent = design.subcategory || design.category;
    modalDescription.textContent = design.description;
    modalCategory.textContent = design.subcategory || design.category;
    modalFileFormat.textContent = design.fileFormats.join(', ');
    modalDimensions.textContent = design.dimensions;
    modalDownloadCount.textContent = formatNumber(design.downloads);
    modalSoftware.textContent = design.software.join(', ');
    modalPrintReady.textContent = design.printReady;
    modalColorMode.textContent = design.colorMode;
    modalFileSize.textContent = design.fileSize;
    designDetails.textContent = design.designDetails || design.description;
    materialsSpecs.textContent = design.materialsSpecs || 'High-quality print-ready files with proper specifications.';
    designInspiration.textContent = design.designInspiration || 'Contemporary design trends and professional standards.';
    practicalApplications.textContent = design.practicalApplications || 'Perfect for various marketing and branding applications.';
    modalBadge.textContent = design.badge || 'Popular';
    
    // Set like button state
    const isLiked = likedTemplates[design.id] || false;
    modalLikeBtn.classList.toggle('active', isLiked);
    modalLikeBtn.querySelector('i').className = isLiked ? 'fas fa-heart' : 'far fa-heart';
    modalLikeCount.textContent = formatNumber(design.likes);
    
    // Load file format badges
    loadFormatBadges(design.fileFormats);
    
    // Load color palette
    loadColorPalette(design.colors);
    
    // Load tags
    loadTags(design.tags);
    
    // Load features
    loadFeatures(design.features);
    
    // Load related designs
    loadRelatedDesigns(design);
    
    // Show modal
    templateModal.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeTemplateModal() {
    templateModal.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
}

function loadFormatBadges(formats) {
    if (!formatBadges) return;
    formatBadges.innerHTML = formats.map(format => 
        `<span class="format-badge">${format}</span>`
    ).join('');
}

function loadColorPalette(colors) {
    if (!colorPalette) return;
    colorPalette.innerHTML = colors.map(color => 
        `<div class="color" style="background: ${color};" title="${color}"></div>`
    ).join('');
}

function loadTags(tags) {
    if (!tagsContainer) return;
    tagsContainer.innerHTML = tags.map(tag => 
        `<span class="tag">${tag}</span>`
    ).join('');
}

function loadFeatures(features) {
    if (!featuresList) return;
    featuresList.innerHTML = features.map(feature => 
        `<li>${feature}</li>`
    ).join('');
}

function loadRelatedDesigns(currentDesign) {
    if (!relatedDesigns) return;
    
    // Get designs from same category
    const categoryDesigns = popularDesigns.filter(d => 
        d.category === currentDesign.category && d.id !== currentDesign.id
    ).slice(0, 4);
    
    if (categoryDesigns.length === 0) {
        relatedDesigns.closest('.related-designs').style.display = 'none';
        return;
    }
    
    relatedDesigns.closest('.related-designs').style.display = 'block';
    
    relatedDesigns.innerHTML = categoryDesigns.map(design => `
        <div class="related-item" data-id="${design.id}">
            <img src="${design.image}" alt="${design.title}" loading="lazy">
            <div class="related-overlay">
                <span>${design.title}</span>
            </div>
        </div>
    `).join('');
    
    // Add click handlers to related items
    document.querySelectorAll('.related-item').forEach(item => {
        item.addEventListener('click', function() {
            const designId = this.dataset.id;
            const design = findDesignById(designId);
            if (design) {
                openTemplateModal(design);
            }
        });
    });
}

// ===== LIKE FUNCTIONALITY =====
function toggleLike(designId, element) {
    if (likedTemplates[designId]) {
        delete likedTemplates[designId];
        element.classList.remove('active', 'fas');
        element.classList.add('far');
    } else {
        likedTemplates[designId] = true;
        element.classList.add('active', 'fas');
        element.classList.remove('far');
    }
    
    // Save to localStorage
    localStorage.setItem('likedTemplates', JSON.stringify(likedTemplates));
    
    // Update like count in UI if needed
    const design = findDesignById(designId);
    if (design) {
        if (likedTemplates[designId]) {
            design.likes += 1;
        } else {
            design.likes -= 1;
        }
        
        // Update count display
        const countElement = element.closest('.popular-likes')?.querySelector('.like-count');
        if (countElement) {
            countElement.textContent = formatNumber(design.likes);
        }
        
        // Update modal like count if open
        if (currentTemplate && currentTemplate.id === designId && modalLikeCount) {
            modalLikeCount.textContent = formatNumber(design.likes);
        }
    }
}

// ===== SEARCH FUNCTIONALITY =====
function setupSearch() {
    if (!searchInput) return;
    
    // Search on Enter key
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const searchTerm = this.value.trim();
            if (searchTerm) {
                performSearch(searchTerm);
            }
        }
    });
    
    // Search on icon click
    const searchIcon = document.querySelector('.search-box i');
    if (searchIcon) {
        searchIcon.addEventListener('click', function() {
            const searchTerm = searchInput.value.trim();
            if (searchTerm) {
                performSearch(searchTerm);
            }
        });
    }
    
    // Live search suggestions
    searchInput.addEventListener('input', debounce(function() {
        const searchTerm = this.value.trim();
        if (searchTerm.length >= 2) {
            showSearchSuggestions(searchTerm);
        } else {
            hideSearchSuggestions();
        }
    }, 300));
}

function performSearch(searchTerm) {
    const results = searchAllTemplates(searchTerm);
    displaySearchResults(results, searchTerm);
}

function searchAllTemplates(term) {
    const searchTerm = term.toLowerCase();
    const results = [];
    
    // Search through all template categories
    Object.values(templateDatabase).forEach(category => {
        category.forEach(template => {
            // Search in title, description, tags, category, subcategory
            if (
                template.title.toLowerCase().includes(searchTerm) ||
                template.description.toLowerCase().includes(searchTerm) ||
                template.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
                template.category.toLowerCase().includes(searchTerm) ||
                (template.subcategory && template.subcategory.toLowerCase().includes(searchTerm))
            ) {
                results.push(template);
            }
        });
    });
    
    return results;
}

function displaySearchResults(results, searchTerm) {
    if (!searchModal || !searchStats || !searchResultsGrid) return;
    
    searchStats.textContent = `Found ${results.length} results for "${searchTerm}"`;
    
    if (results.length === 0) {
        searchResultsGrid.innerHTML = `
            <div class="no-results" style="grid-column: 1/-1; text-align: center; padding: 50px;">
                <i class="fas fa-search" style="font-size: 3rem; color: var(--medium-gray); margin-bottom: 20px;"></i>
                <h3>No templates found</h3>
                <p>Try different keywords or browse our categories</p>
            </div>
        `;
    } else {
        searchResultsGrid.innerHTML = results.map(template => `
            <div class="search-result-card" data-id="${template.id}">
                <div class="search-result-img">
                    <img src="${template.image}" alt="${template.title}" loading="lazy">
                </div>
                <div class="search-result-info">
                    <h4>${template.title}</h4>
                    <p>${template.description.substring(0, 60)}...</p>
                    <span class="search-result-category">${template.subcategory || template.category}</span>
                </div>
            </div>
        `).join('');
    }
    
    // Add click handlers to search results
    document.querySelectorAll('.search-result-card').forEach(card => {
        card.addEventListener('click', function() {
            const templateId = this.dataset.id;
            const template = findDesignById(templateId);
            if (template) {
                openTemplateModal(template);
            }
        });
    });
    
    // Show modal
    searchModal.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Clear search input
    searchInput.value = '';
    hideSearchSuggestions();
}

function showSearchSuggestions(term) {
    if (!searchResults) return;
    
    const results = searchAllTemplates(term).slice(0, 5);
    
    if (results.length === 0) {
        hideSearchSuggestions();
        return;
    }
    
    searchResults.innerHTML = results.map(template => `
        <div class="search-suggestion" data-id="${template.id}">
            <img src="${template.image}" alt="${template.title}" style="width: 40px; height: 40px; object-fit: cover; border-radius: 5px;">
            <div class="suggestion-info">
                <div class="suggestion-title">${template.title}</div>
                <div class="suggestion-category">${template.subcategory || template.category}</div>
            </div>
        </div>
    `).join('');
    
    searchResults.classList.add('active');
    
    // Add click handlers to suggestions
    document.querySelectorAll('.search-suggestion').forEach(suggestion => {
        suggestion.addEventListener('click', function() {
            const templateId = this.dataset.id;
            const template = findDesignById(templateId);
            if (template) {
                openTemplateModal(template);
                hideSearchSuggestions();
            }
        });
    });
}

function hideSearchSuggestions() {
    if (searchResults) {
        searchResults.classList.remove('active');
        searchResults.innerHTML = '';
    }
}

function closeSearchModal() {
    searchModal.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
}

// ===== UTILITY FUNCTIONS =====
function findDesignById(id) {
    // Search in popular designs first
    let design = popularDesigns.find(d => d.id === id);
    if (design) return design;
    
    // Search in template database
    for (const category in templateDatabase) {
        design = templateDatabase[category].find(d => d.id === id);
        if (design) return design;
    }
    
    return null;
}

function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func.apply(this, args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ===== EXISTING FUNCTIONS (Keep as they are) =====
function loadTemplates() {
    const slider = document.querySelector('.featured-slider');
    if (!slider) return;
    
    const featuredTemplates = [
        {
            id: 'featured-1',
            title: "Ultimate Business Bundle",
            description: "Complete set of business templates including logos, cards, letterheads, and presentations.",
            price: "Free",
            rating: 5.0,
            reviews: 128,
            badge: "Bestseller",
            image: "./assets/images/ultimate-business-bundle.jpg",
            link: "./templates/business-bundle.html"
        },
        {
            id: 'featured-2',
            title: "Social Media Pack 2025",
            description: "200+ templates for Instagram posts, stories, Facebook covers, and Twitter headers.",
            price: "Free",
            rating: 4.9,
            reviews: 87,
            badge: "New",
            image: "./assets/images/youtube-banner-design.jpg",
            link: "./templates/social-media/index.html"
        },
        {
            id: 'featured-3',
            title: "Birthday Flyer Templates",
            description: "Clean and modern birthday flyer template designs for all occasions.",
            price: "Free",
            rating: 4.8,
            reviews: 156,
            badge: null,
            image: "./assets/images/flyers/birthday-flyer.jpg",
            link: "./templates/flyers/birthday-flyer-templates.html"
        },
        {
            id: 'featured-4',
            title: "Wedding Invitation Suite",
            description: "Elegant wedding invitations with matching RSVP cards, programs, and menus.",
            price: "Free",
            rating: 4.9,
            reviews: 64,
            badge: "Limited",
            image: "./assets/images/flyers/giveaway-flyer-template.jpg",
            link: "#"
        },
        {
            id: 'featured-5',
            title: "2026 Calendar Collection",
            description: "Beautifully designed wall, desk, and planner calendars for 2026.",
            price: "Free",
            rating: 4.7,
            reviews: 93,
            badge: null,
            image: "./assets/images/calendars/Calendar design template 2024.jpg",
            link: "./templates/calendars/index.html"
        }
    ];
    
    slider.innerHTML = featuredTemplates.map(template => `
        <div class="featured-slide">
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
        </div>
    `).join('');
}

function loadServices() {
    const servicesGrid = document.querySelector('.services-grid');
    if (!servicesGrid) return;
    
    const serviceData = [
        {
            id: 1,
            title: "Brand Identity",
            description: "Create a memorable brand with our comprehensive identity packages including logo design, color schemes, and typography.",
            icon: "fas fa-palette",
            features: ["Logo Design", "Brand Guidelines", "Business Cards", "Stationery Design"],
            link: "./templates/logos/index.html",
            bgImage: "./assets/images/brand-identity-bg.jpg"
        },
        {
            id: 2,
            title: "Print Design",
            description: "High-quality print materials that make an impression, from business collateral to large format printing.",
            icon: "fas fa-print",
            features: ["Brochures & Flyers", "Posters & Banners", "Magazine Layouts", "Annual Reports"],
            link: "./templates/flyers/index.html",
            bgImage: "./assets/images/print-design-bg.jpg"
        },
        {
            id: 3,
            title: "Digital Design",
            description: "Engaging digital assets optimized for web and social media to boost your online presence.",
            icon: "fas fa-laptop-code",
            features: ["Social Media Graphics", "Web Banners", "Email Templates", "Digital Ads"],
            link: "./templates/social-media/index.html",
            bgImage: "./assets/images/digital-design-bg.jpg"
        },
        {
            id: 4,
            title: "Packaging Design",
            description: "Eye-catching packaging that stands out on shelves and communicates your product's value.",
            icon: "fas fa-box-open",
            features: ["Product Labels", "Box & Bag Design", "Retail Displays", "Prototyping"],
            link: "./templates/packaging.html",
            bgImage: "./assets/images/packaging-bg.jpg"
        },
        {
            id: 5,
            title: "Social Media Design",
            description: "Intuitive and beautiful user interfaces that enhance user experience and drive engagement.",
            icon: "fas fa-mobile-alt",
            features: ["Website Design", "Mobile App Design", "User Flows", "Prototyping"],
            link: "./templates/social-media/index.html",
            bgImage: "./assets/images/social-media-bg.jpg"
        },
        {
            id: 6,
            title: "Motion Graphics",
            description: "Dynamic animated content that brings your brand to life and captures attention.",
            icon: "fas fa-film",
            features: ["Animated Logos", "Explainer Videos", "Social Media Ads", "Presentation Graphics"],
            link: "./motion-graphics.html",
            bgImage: "./assets/images/motion-graphics-bg.jpg"
        }
    ];
    
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