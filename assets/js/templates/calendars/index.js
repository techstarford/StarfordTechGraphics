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

// ===== CALENDAR DATA (12 complete items) =====
const calendars = {
    1: {
        id: 1,
        title: "Modern Business Calendar 2025",
        subtitle: "Professional yearly calendar for corporate use",
        description: "This sophisticated business calendar for 2025 features a clean, professional design perfect for corporate offices. It includes all major holidays, ample notes space, and quarterly overviews.",
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
        description: "A beautifully minimal monthly planner designed for personal productivity. It features a two-page spread with calendar grid and notes section, delicate color palette.",
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
        description: "Comprehensive academic calendar for schools and universities. Includes color-coded days, exam periods, icons for activities.",
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
        description: "A comprehensive weekly planner combining time blocking, task lists, habit tracking and goal setting. Perfect for freelancers and project managers.",
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
    5: {
        id: 5,
        title: "Creative Wall Calendar",
        subtitle: "Artistic design for home or office",
        description: "Brighten up your space with this artistic wall calendar featuring original illustrations and ample space for notes.",
        designDetails: "Illustrated monthly pages with seasonal motifs, hand-drawn typography.",
        materialsSpecs: "High-res PDF, CMYK, 150gsm satin paper recommended.",
        designInspiration: "Modern illustration, nature, folk art.",
        practicalApplications: "Home decor, office wall, gift giving.",
        thumbnailUrl: "../../assets/images/calendars/creative-wall-calendar-thumb.jpg",
        fullImageUrl: "../../assets/images/calendars/creative-wall-calendar-full.jpg",
        calendarType: "Wall Calendar",
        category: "personal",
        categories: ["wall", "monthly", "personal"],
        fileFormats: ["PDF", "JPG", "PNG"],
        dimensions: "11×17 in | 3300×5100 px",
        orientation: "landscape",
        downloadCount: 4231,
        likes: 1876,
        calendarYear: "Undated",
        paperSize: "Tabloid, A3",
        printReady: "Yes",
        colors: ["#F9C74F", "#F9844A", "#F94144", "#577590", "#43AA8B"],
        colorNames: ["Sunset Yellow", "Orange", "Red", "Blue", "Green"],
        tags: ["creative", "wall", "artistic", "illustrated"],
        features: ["Original illustrations", "Seasonal themes", "Notes section", "Holiday markers"]
    },
    6: {
        id: 6,
        title: "Corporate Desk Calendar",
        subtitle: "Executive style with meeting notes",
        description: "A sleek desk calendar designed for busy executives. Each month includes a priority list, meeting schedule, and notes section.",
        designDetails: "Elegant minimal grid, subtle branding space, premium typography.",
        materialsSpecs: "Print-ready PDF with crop marks, 120gsm uncoated paper.",
        designInspiration: "Corporate identity, Swiss design.",
        practicalApplications: "Executive desks, conference rooms, client gifts.",
        thumbnailUrl: "../../assets/images/calendars/corporate-desk-calendar-thumb.jpg",
        fullImageUrl: "../../assets/images/calendars/corporate-desk-calendar-full.jpg",
        calendarType: "Desk Calendar",
        category: "business",
        categories: ["desk", "monthly", "business"],
        fileFormats: ["PDF", "PNG", "JPG", "AI"],
        dimensions: "5×7 in (standing) | 1500×2100 px",
        orientation: "portrait",
        downloadCount: 2456,
        likes: 789,
        calendarYear: "Undated",
        paperSize: "A5, 5×7",
        printReady: "Yes",
        colors: ["#2C3E50", "#34495E", "#7F8C8D", "#BDC3C7", "#ECF0F1"],
        colorNames: ["Dark Blue", "Wet Asphalt", "Concrete", "Silver", "Clouds"],
        tags: ["corporate", "desk", "executive", "professional"],
        features: ["Meeting notes", "Priority list", "Month-at-a-glance", "Holiday indicators"]
    },
    7: {
        id: 7,
        title: "Family Planner Calendar",
        subtitle: "Color-coded for multiple family members",
        description: "Keep the whole family organized with this color-coded monthly planner. Each family member gets a color, plus shared activities and meal planning.",
        designDetails: "Color-coded columns, meal planning section, chore tracker.",
        materialsSpecs: "Print at home or office, 80-100gsm paper.",
        designInspiration: "Family systems, visual organization.",
        practicalApplications: "Family command center, kitchen wall, fridge.",
        thumbnailUrl: "../../assets/images/calendars/family-planner-thumb.jpg",
        fullImageUrl: "../../assets/images/calendars/family-planner-full.jpg",
        calendarType: "Family Planner",
        category: "personal",
        categories: ["monthly", "personal", "family"],
        fileFormats: ["PDF", "PNG", "JPG"],
        dimensions: "11×17 in | 3300×5100 px",
        orientation: "landscape",
        downloadCount: 3321,
        likes: 1567,
        calendarYear: "Undated",
        paperSize: "Tabloid, A3",
        printReady: "Yes",
        colors: ["#F8C7CC", "#A3D8F4", "#B5EAD7", "#FFD6A5", "#C7CEEA"],
        colorNames: ["Pink", "Sky Blue", "Mint", "Peach", "Lavender"],
        tags: ["family", "planner", "color-coded", "monthly"],
        features: ["Color-coded per person", "Meal planning", "Chore tracker", "Notes section"]
    },
    8: {
        id: 8,
        title: "Fitness & Health Tracker",
        subtitle: "Workout and meal planning calendar",
        description: "Achieve your health goals with this fitness calendar. Track workouts, meals, water intake, and progress photos.",
        designDetails: "Workout log, meal planner, water tracker, progress photo space.",
        materialsSpecs: "Printable PDF, can be used digitally in Goodnotes.",
        designInspiration: "Fitness apps, bullet journal layouts.",
        practicalApplications: "Gym, home workouts, meal prep.",
        thumbnailUrl: "../../assets/images/calendars/fitness-tracker-thumb.jpg",
        fullImageUrl: "../../assets/images/calendars/fitness-tracker-full.jpg",
        calendarType: "Fitness Tracker",
        category: "personal",
        categories: ["weekly", "personal", "health"],
        fileFormats: ["PDF", "PNG", "JPG"],
        dimensions: "US Letter | 2550×3300 px",
        orientation: "portrait",
        downloadCount: 3189,
        likes: 1234,
        calendarYear: "Undated",
        paperSize: "US Letter, A4",
        printReady: "Yes",
        colors: ["#F94144", "#F9C74F", "#90BE6D", "#577590", "#4D908E"],
        colorNames: ["Red", "Yellow", "Green", "Blue", "Teal"],
        tags: ["fitness", "health", "workout", "tracker"],
        features: ["Workout log", "Meal planning", "Water tracker", "Progress photos"]
    },
    9: {
        id: 9,
        title: "Project Management Calendar",
        subtitle: "Gantt chart style with milestones",
        description: "Plan and track projects effectively with this Gantt-style calendar. Includes milestone tracking, task assignments, and progress bars.",
        designDetails: "Gantt chart layout, task lists, milestone markers, progress indicators.",
        materialsSpecs: "Digital PDF with fillable fields, print-friendly.",
        designInspiration: "Agile methodologies, Gantt charts, Kanban.",
        practicalApplications: "Project managers, team leads, freelancers.",
        thumbnailUrl: "../../assets/images/calendars/project-management-thumb.jpg",
        fullImageUrl: "../../assets/images/calendars/project-management-full.jpg",
        calendarType: "Project Calendar",
        category: "business",
        categories: ["monthly", "business", "project"],
        fileFormats: ["PDF", "PNG", "JPG", "XLSX"],
        dimensions: "11×17 in | 3300×5100 px",
        orientation: "landscape",
        downloadCount: 2678,
        likes: 876,
        calendarYear: "Undated",
        paperSize: "Tabloid, A3",
        printReady: "Yes",
        colors: ["#2C3E50", "#27AE60", "#F39C12", "#E74C3C", "#3498DB"],
        colorNames: ["Dark Blue", "Green", "Orange", "Red", "Blue"],
        tags: ["project", "gantt", "milestones", "tasks"],
        features: ["Gantt timeline", "Task assignments", "Milestone markers", "Progress bars"]
    },
    10: {
        id: 10,
        title: "Floral Design Calendar",
        subtitle: "Beautiful botanical illustrations",
        description: "Each month features a stunning botanical illustration, perfect for nature lovers. Includes space for notes and reminders.",
        designDetails: "Full-bleed botanical illustrations, elegant serif typography.",
        materialsSpecs: "High-res print PDF, CMYK, 150gsm matte paper.",
        designInspiration: "Vintage botanical prints, watercolor art.",
        practicalApplications: "Home decor, gift, office wall.",
        thumbnailUrl: "../../assets/images/calendars/floral-calendar-thumb.jpg",
        fullImageUrl: "../../assets/images/calendars/floral-calendar-full.jpg",
        calendarType: "Wall Calendar",
        category: "personal",
        categories: ["wall", "monthly", "personal"],
        fileFormats: ["PDF", "JPG", "PNG"],
        dimensions: "11×17 in | 3300×5100 px",
        orientation: "portrait",
        downloadCount: 4543,
        likes: 1987,
        calendarYear: "Undated",
        paperSize: "Tabloid, A3",
        printReady: "Yes",
        colors: ["#E6B8B7", "#C9A9A6", "#A7C7C1", "#F3DBCF", "#B7C68B"],
        colorNames: ["Blush", "Dusty Rose", "Sage", "Cream", "Moss"],
        tags: ["floral", "botanical", "illustrated", "nature"],
        features: ["Botanical illustrations", "Notes space", "Holiday markers", "Moon phases"]
    },
    11: {
        id: 11,
        title: "Student Academic Planner",
        subtitle: "Class schedule and assignment tracker",
        description: "Designed for students to keep track of classes, assignments, exams, and deadlines. Includes grade tracker and study planner.",
        designDetails: "Weekly spreads with class schedule, assignment tracker, exam countdown.",
        materialsSpecs: "Print at home or college, 80gsm paper.",
        designInspiration: "Student bullet journals, academic planners.",
        practicalApplications: "High school, college, university students.",
        thumbnailUrl: "../../assets/images/calendars/student-planner-thumb.jpg",
        fullImageUrl: "../../assets/images/calendars/student-planner-full.jpg",
        calendarType: "Academic Planner",
        category: "academic",
        categories: ["weekly", "academic", "student"],
        fileFormats: ["PDF", "PNG", "JPG"],
        dimensions: "US Letter | 2550×3300 px",
        orientation: "portrait",
        downloadCount: 5987,
        likes: 2345,
        calendarYear: "Undated",
        paperSize: "US Letter, A4",
        printReady: "Yes",
        colors: ["#577590", "#F9C74F", "#F9844A", "#90BE6D", "#F94144"],
        colorNames: ["Blue", "Yellow", "Orange", "Green", "Red"],
        tags: ["student", "academic", "planner", "assignments"],
        features: ["Class schedule", "Assignment tracker", "Exam countdown", "Grade tracker"]
    },
    12: {
        id: 12,
        title: "Professional Quarterly Planner",
        subtitle: "Business quarter planning with goals",
        description: "Plan your business quarters effectively with goal setting, quarterly reviews, and monthly breakdowns.",
        designDetails: "Quarterly goals, monthly calendars, review pages.",
        materialsSpecs: "Digital PDF with hyperlinks, print-ready.",
        designInspiration: "OKR methodology, strategic planning.",
        practicalApplications: "Business owners, managers, entrepreneurs.",
        thumbnailUrl: "../../assets/images/calendars/quarterly-planner-thumb.jpg",
        fullImageUrl: "../../assets/images/calendars/quarterly-planner-full.jpg",
        calendarType: "Quarterly Planner",
        category: "business",
        categories: ["monthly", "business", "quarterly"],
        fileFormats: ["PDF", "PNG", "JPG", "AI"],
        dimensions: "US Letter | 2550×3300 px",
        orientation: "landscape",
        downloadCount: 1876,
        likes: 654,
        calendarYear: "Undated",
        paperSize: "US Letter, A4",
        printReady: "Yes",
        colors: ["#2C3E50", "#27AE60", "#F39C12", "#3498DB", "#E74C3C"],
        colorNames: ["Dark Blue", "Green", "Orange", "Blue", "Red"],
        tags: ["quarterly", "business", "goals", "planning"],
        features: ["Goal setting", "Quarterly reviews", "Monthly breakdown", "Notes section"]
    }
};

// ===== GLOBAL VARIABLES =====
let likedCalendars = JSON.parse(localStorage.getItem('likedCalendars')) || [];
let downloadTriggered = JSON.parse(localStorage.getItem('downloadTriggered')) || [];

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

// Calendar Modal Elements
const modal = document.getElementById('calendarModal');
let currentCalendarId = null;

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
        const badgeText = cal.categories[0].charAt(0).toUpperCase() + cal.categories[0].slice(1);

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
        calendar.downloadCount -= 1;
    } else {
        likedCalendars.push(calId);
        calendar.likes += 1;
        calendar.downloadCount += 1;
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
function openModal(id) {
    const cal = calendars[id];
    if (!cal) return;
    currentCalendarId = id;

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

    document.getElementById('modalPrice').innerHTML = '<span class="price-free">FREE</span>';

    const formatBadges = document.getElementById('formatBadges');
    formatBadges.innerHTML = cal.fileFormats.map(f => `<span class="format-badge">${f}</span>`).join('');

    const colorPalette = document.getElementById('colorPalette');
    colorPalette.innerHTML = cal.colors.map((c, i) => `
        <div class="color" style="background-color: ${c};" title="${cal.colorNames[i]}"></div>
    `).join('');

    document.getElementById('tagsContainer').innerHTML = cal.tags.map(t => `<span class="tag">${t}</span>`).join('');

    const featuresList = document.getElementById('featuresList');
    featuresList.innerHTML = cal.features.map(f => `<li>${f}</li>`).join('');

    generateRelatedDesigns(id, cal.category);

    const modalLikeBtn = document.getElementById('modalLikeBtn');
    const modalLikeCount = document.getElementById('modalLikeCount');
    const isLiked = likedCalendars.includes(id);
    modalLikeBtn.classList.toggle('active', isLiked);
    modalLikeCount.textContent = isLiked ? cal.likes + 1 : cal.likes;

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

// ===== SEARCH FUNCTIONALITY =====
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
    
    // Initial render of calendar grid
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
                this.innerHTML = '<i class="fas fa-plus"></i> Load More Calendars';
                this.disabled = false;
                alert('More calendars would be loaded dynamically in production.');
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
        if (!currentCalendarId) return;
        handleLike(currentCalendarId);
        const cal = calendars[currentCalendarId];
        const isLiked = likedCalendars.includes(currentCalendarId);
        this.classList.toggle('active', isLiked);
        document.getElementById('modalLikeCount').textContent = isLiked ? cal.likes + 1 : cal.likes;
    });

    document.getElementById('modalDownloadBtn')?.addEventListener('click', function() {
        if (currentCalendarId) downloadTemplate(currentCalendarId);
    });

    document.getElementById('downloadTemplateBtn')?.addEventListener('click', function() {
        if (currentCalendarId) downloadTemplate(currentCalendarId);
    });

    document.getElementById('previewBtn')?.addEventListener('click', function() {
        if (currentCalendarId) window.open(calendars[currentCalendarId].fullImageUrl, '_blank');
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
                alert(`Thank you for subscribing with ${email}! You'll receive monthly calendar templates.`);
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