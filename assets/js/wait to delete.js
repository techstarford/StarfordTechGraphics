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
        this.colors = ['#4361ee', '#4cc9f0', '#b5179e', '#f9c74f', '#ffffff'];
        this.animationId = null;
        this.resizeTimeout = null;
        
        this.init();
    }

    init() {
        this.setupCanvas();
        this.createStars();
        this.animate();
        this.setupResizeHandler();
    }

    setupCanvas() {
        const heroSection = document.querySelector('.starry-hero');
        const heroHeight = heroSection ? heroSection.offsetHeight : window.innerHeight;
        
        this.canvas.width = window.innerWidth;
        this.canvas.height = heroHeight;
        this.canvas.style.position = 'absolute';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.pointerEvents = 'none';
    }

    createStars() {
        this.stars = [];
        const starCount = Math.min(150, Math.floor((window.innerWidth * window.innerHeight) / 5000));

        for (let i = 0; i < starCount; i++) {
            this.stars.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 2 + 1,
                color: this.colors[Math.floor(Math.random() * this.colors.length)],
                speedX: (Math.random() - 0.5) * 0.1,
                speedY: (Math.random() - 0.5) * 0.1,
                opacity: Math.random() * 0.5 + 0.2,
                twinkleSpeed: Math.random() * 0.02 + 0.01,
                phase: Math.random() * Math.PI * 2
            });
        }
    }

    animate = () => {
        if (!this.ctx || !this.canvas) return;
        
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        const time = Date.now() * 0.001;
        
        this.stars.forEach(star => {
            // Move stars
            star.x += star.speedX;
            star.y += star.speedY;
            
            // Wrap around edges
            if (star.x < 0) star.x = this.canvas.width;
            if (star.x > this.canvas.width) star.x = 0;
            if (star.y < 0) star.y = this.canvas.height;
            if (star.y > this.canvas.height) star.y = 0;
            
            // Twinkle effect
            const twinkle = 0.5 + 0.5 * Math.sin(time * 2 + star.phase);
            const opacity = star.opacity * (0.5 + 0.5 * twinkle);
            
            // Draw star (simple circle for better performance)
            this.ctx.beginPath();
            this.ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
            this.ctx.fillStyle = star.color;
            this.ctx.globalAlpha = opacity;
            this.ctx.fill();
            
            // Add glow for larger stars
            if (star.size > 1.5) {
                this.ctx.shadowColor = star.color;
                this.ctx.shadowBlur = 10;
                this.ctx.fill();
                this.ctx.shadowBlur = 0;
            }
        });
        
        this.animationId = requestAnimationFrame(this.animate);
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

// ===== COMPLETE TEMPLATE DATA =====
const templateDatabase = [
    // Flyers
    { 
        id: 'flyer-1', 
        title: 'Business Conference Flyer', 
        category: 'flyers', 
        subcategory: 'Business Flyers', 
        image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop', 
        downloads: 3452, 
        likes: 287, 
        badge: 'Trending', 
        price: 'Free', 
        description: 'Professional business conference flyer template with modern layout and corporate colors.',
        tags: ['business', 'conference', 'corporate', 'seminar'],
        formats: 'AI,PSD,PDF',
        dimensions: 'A4 (210 x 297 mm)'
    },
    { 
        id: 'flyer-2', 
        title: 'Music Festival Flyer', 
        category: 'flyers', 
        subcategory: 'Event Flyers', 
        image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=400&h=300&fit=crop', 
        downloads: 5678, 
        likes: 423, 
        badge: 'Popular', 
        price: 'Free', 
        description: 'Energetic music festival flyer with vibrant colors and dynamic typography.',
        tags: ['music', 'festival', 'concert', 'event'],
        formats: 'AI,PSD,PDF',
        dimensions: 'A5 (148 x 210 mm)'
    },
    { 
        id: 'flyer-3', 
        title: 'Real Estate Open House', 
        category: 'flyers', 
        subcategory: 'Real Estate Flyers', 
        image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=300&fit=crop', 
        downloads: 2891, 
        likes: 176, 
        badge: null, 
        price: 'Free', 
        description: 'Elegant real estate flyer template for property listings and open house events.',
        tags: ['real estate', 'property', 'house', 'realtor'],
        formats: 'AI,PSD,PDF',
        dimensions: 'A5 (148 x 210 mm)'
    },
    { 
        id: 'flyer-4', 
        title: 'Restaurant Grand Opening', 
        category: 'flyers', 
        subcategory: 'Business Flyers', 
        image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop', 
        downloads: 4123, 
        likes: 345, 
        badge: 'New', 
        price: 'Free', 
        description: 'Mouth-watering restaurant grand opening flyer with food photography.',
        tags: ['restaurant', 'food', 'opening', 'dining'],
        formats: 'AI,PSD,PDF',
        dimensions: 'A5 (148 x 210 mm)'
    },
    
    // Logos
    { 
        id: 'logo-1', 
        title: 'Minimal Tech Logo', 
        category: 'logos', 
        subcategory: 'Business Logos', 
        image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400&h=300&fit=crop', 
        downloads: 4321, 
        likes: 398, 
        badge: 'Trending', 
        price: 'Free', 
        description: 'Clean and modern tech logo template with geometric shapes.',
        tags: ['logo', 'tech', 'minimal', 'startup'],
        formats: 'AI,EPS,PNG,SVG',
        dimensions: 'Vector'
    },
    { 
        id: 'logo-2', 
        title: 'Eco-Friendly Brand', 
        category: 'logos', 
        subcategory: 'Creative Logos', 
        image: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=400&h=300&fit=crop', 
        downloads: 2987, 
        likes: 276, 
        badge: null, 
        price: 'Free', 
        description: 'Organic and natural logo design perfect for eco-friendly brands.',
        tags: ['eco', 'green', 'nature', 'organic'],
        formats: 'AI,EPS,PNG,SVG',
        dimensions: 'Vector'
    },
    { 
        id: 'logo-3', 
        title: 'Luxury Gold Logo', 
        category: 'logos', 
        subcategory: 'Creative Logos', 
        image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=300&fit=crop', 
        downloads: 3876, 
        likes: 445, 
        badge: 'Popular', 
        price: 'Free', 
        description: 'Elegant luxury logo with gold accents and sophisticated typography.',
        tags: ['luxury', 'gold', 'premium', 'elegant'],
        formats: 'AI,EPS,PNG,SVG',
        dimensions: 'Vector'
    },
    { 
        id: 'logo-4', 
        title: 'Food & Restaurant Logo', 
        category: 'logos', 
        subcategory: 'Business Logos', 
        image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop', 
        downloads: 4567, 
        likes: 389, 
        badge: null, 
        price: 'Free', 
        description: 'Appetizing food logo template for restaurants and culinary businesses.',
        tags: ['food', 'restaurant', 'culinary', 'cafe'],
        formats: 'AI,EPS,PNG,SVG',
        dimensions: 'Vector'
    },
    
    // Calendars
    { 
        id: 'calendar-1', 
        title: '2026 Minimal Desk Calendar', 
        category: 'calendars', 
        subcategory: 'Desk Calendars', 
        image: 'https://images.unsplash.com/photo-1506784365847-bbad939e9335?w=400&h=300&fit=crop', 
        downloads: 4563, 
        likes: 378, 
        badge: 'Trending', 
        price: 'Free', 
        description: 'Clean and minimal 2026 desk calendar template with modern typography.',
        tags: ['calendar', '2026', 'desk', 'minimal'],
        formats: 'AI,PSD,PDF',
        dimensions: '5x7 inches'
    },
    { 
        id: 'calendar-2', 
        title: '2026 Wall Calendar', 
        category: 'calendars', 
        subcategory: 'Wall Calendars', 
        image: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=400&h=300&fit=crop', 
        downloads: 3891, 
        likes: 312, 
        badge: 'Popular', 
        price: 'Free', 
        description: 'Beautiful wall calendar for 2026 with clean layout and monthly designs.',
        tags: ['calendar', '2026', 'wall'],
        formats: 'AI,PSD,PDF',
        dimensions: '12x12 inches'
    },
    
    // Social Media
    { 
        id: 'social-1', 
        title: 'Instagram Story Pack', 
        category: 'social', 
        subcategory: 'Instagram', 
        image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=300&fit=crop', 
        downloads: 6789, 
        likes: 589, 
        badge: 'Popular', 
        price: 'Free', 
        description: '50+ Instagram story templates for brands and influencers.',
        tags: ['instagram', 'stories', 'social media'],
        formats: 'PSD,AI',
        dimensions: '1080x1920 px'
    },
    { 
        id: 'social-2', 
        title: 'Facebook Cover Pack', 
        category: 'social', 
        subcategory: 'Facebook', 
        image: 'https://images.unsplash.com/photo-1611162616305-c69b3fa68f10?w=400&h=300&fit=crop', 
        downloads: 4321, 
        likes: 345, 
        badge: null, 
        price: 'Free', 
        description: 'Professional Facebook cover templates for business pages.',
        tags: ['facebook', 'cover', 'social media'],
        formats: 'PSD,AI',
        dimensions: '1640x924 px'
    },
    
    // Business Cards
    { 
        id: 'business-1', 
        title: 'Corporate Business Card', 
        category: 'business', 
        subcategory: 'Corporate', 
        image: 'https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=400&h=300&fit=crop', 
        downloads: 5678, 
        likes: 489, 
        badge: 'Trending', 
        price: 'Free', 
        description: 'Elegant corporate business card template with modern design.',
        tags: ['business card', 'corporate', 'professional'],
        formats: 'AI,PSD,PDF',
        dimensions: '3.5x2 inches'
    },
    { 
        id: 'business-2', 
        title: 'Creative Agency Card', 
        category: 'business', 
        subcategory: 'Creative', 
        image: 'https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=400&h=300&fit=crop', 
        downloads: 4321, 
        likes: 378, 
        badge: 'Popular', 
        price: 'Free', 
        description: 'Bold creative agency business card with unique design elements.',
        tags: ['business card', 'creative', 'agency'],
        formats: 'AI,PSD,PDF',
        dimensions: '3.5x2 inches'
    },
    
    // Posters
    { 
        id: 'poster-1', 
        title: 'Movie Poster Template', 
        category: 'posters', 
        subcategory: 'Movie Posters', 
        image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=300&fit=crop', 
        downloads: 4567, 
        likes: 398, 
        badge: 'Trending', 
        price: 'Free', 
        description: 'Dramatic movie poster template for film promotions.',
        tags: ['poster', 'movie', 'film'],
        formats: 'AI,PSD,PDF',
        dimensions: '27x40 inches'
    },
    { 
        id: 'poster-2', 
        title: 'Event Poster Template', 
        category: 'posters', 
        subcategory: 'Event Posters', 
        image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=300&fit=crop', 
        downloads: 3891, 
        likes: 334, 
        badge: null, 
        price: 'Free', 
        description: 'Versatile event poster template for concerts and gatherings.',
        tags: ['poster', 'event', 'concert'],
        formats: 'AI,PSD,PDF',
        dimensions: '18x24 inches'
    }
];

// ===== COMPLETE SEARCH DATA =====
const searchDatabase = templateDatabase.map(item => ({
    id: item.id,
    title: item.title,
    category: item.category,
    subcategory: item.subcategory,
    image: item.image,
    downloads: item.downloads,
    tags: item.tags,
    description: item.description
}));

// Make functions globally available
window.templateDatabase = templateDatabase;
window.searchDatabase = searchDatabase;

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    console.log('DOM loaded, initializing...');

    // Initialize AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            mirror: false
        });
    }

    // Initialize Starfield Animation
    new StarfieldAnimation();

    // ===== Global Variables =====
    const header = document.getElementById('header');
    const backToTop = document.getElementById('backToTop');
    const overlay = document.getElementById('overlay');
    const mobileNavToggle = document.querySelectorAll('.mobile-nav-toggle');
    const mobileNav = document.getElementById('mobile-nav');
    const userBtn = document.getElementById('userBtn');
    const userDropdown = document.getElementById('userDropdown');
    const authModal = document.getElementById('authModal');
    const closeAuthModal = document.getElementById('closeAuthModal');
    const loginBtn = document.getElementById('loginBtn');
    const signupBtn = document.getElementById('signupBtn');
    const authTabs = document.querySelectorAll('.auth-tab');
    const authForms = document.querySelectorAll('.auth-form');
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    const searchModal = document.getElementById('searchModal');
    const closeSearchModal = document.getElementById('closeSearchModal');
    const searchResultsGrid = document.getElementById('searchResultsGrid');
    const searchStats = document.getElementById('searchStats');
    const templateModal = document.getElementById('templateModal');
    const closeModal = document.getElementById('closeModal');
    const loadMorePopularBtn = document.getElementById('loadMorePopularBtn');
    const popularGrid = document.getElementById('popularGrid');
    const filterButtons = document.querySelectorAll('.filter-popular-btn');
    const youtubePopup = document.getElementById('youtubePopup');
    const closeYoutubePopup = document.getElementById('closeYoutubePopup');
    const subscribeBtn = document.getElementById('subscribeBtn');
    const viewChannelBtn = document.getElementById('viewChannelBtn');
    const newsletterForm = document.getElementById('newsletterForm');
    
    // ===== State Management =====
    let currentPopularPage = 1;
    const popularItemsPerPage = 8;
    let currentFilter = 'all';
    let likeCounts = JSON.parse(localStorage.getItem('likeCounts')) || {};
    let downloadCounts = JSON.parse(localStorage.getItem('downloadCounts')) || {};
    let favoriteItems = JSON.parse(localStorage.getItem('favorites')) || [];
    let bookmarkedItems = JSON.parse(localStorage.getItem('bookmarks')) || [];
    let searchTimeout;

    // Set current year in footer
    const currentYear = document.getElementById('currentYear');
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    // ===== Load Templates and Data =====
    loadTemplates();
    loadServices();
    loadPortfolio();
    loadTools();
    initSlickSlider();
    initPopularDesigns();
    setupYouTubePopup();

    // ===== POPULAR DESIGNS SECTION =====
    function initPopularDesigns() {
        if (popularGrid) {
            renderPopularDesigns();
        }

        // Filter buttons
        if (filterButtons.length > 0) {
            filterButtons.forEach(btn => {
                btn.addEventListener('click', function() {
                    filterButtons.forEach(b => b.classList.remove('active'));
                    this.classList.add('active');
                    currentFilter = this.getAttribute('data-filter');
                    currentPopularPage = 1;
                    renderPopularDesigns();
                });
            });
        }

        // Load more button
        if (loadMorePopularBtn) {
            loadMorePopularBtn.addEventListener('click', function() {
                currentPopularPage++;
                renderPopularDesigns(true);
            });
        }
    }

    function renderPopularDesigns(append = false) {
        if (!popularGrid) return;

        let filteredData = templateDatabase;
        if (currentFilter !== 'all') {
            filteredData = templateDatabase.filter(item => item.category === currentFilter);
        }

        const start = (currentPopularPage - 1) * popularItemsPerPage;
        const end = start + popularItemsPerPage;
        const pageData = filteredData.slice(start, end);

        if (!append) {
            popularGrid.innerHTML = '';
        }

        pageData.forEach(item => {
            const card = createPopularCard(item);
            popularGrid.appendChild(card);
        });

        // Hide load more button if no more items
        if (loadMorePopularBtn) {
            if (end >= filteredData.length || filteredData.length <= popularItemsPerPage) {
                loadMorePopularBtn.style.display = 'none';
            } else {
                loadMorePopularBtn.style.display = 'inline-flex';
            }
        }
    }

    function createPopularCard(item) {
        const card = document.createElement('div');
        card.className = 'popular-card';
        card.setAttribute('data-id', item.id);
        
        const badgeHtml = item.badge ? `<div class="popular-badge ${item.badge.toLowerCase()}">${item.badge}</div>` : '';
        const likes = likeCounts[item.id] || item.likes || Math.floor(Math.random() * 500) + 100;
        const downloads = downloadCounts[item.id] || item.downloads || Math.floor(Math.random() * 5000) + 1000;
        const isLiked = likeCounts[item.id] ? true : false;
        
        card.innerHTML = `
            ${badgeHtml}
            <div class="popular-img">
                <img src="${item.image}" alt="${item.title}" loading="lazy">
                <div class="popular-overlay">
                    <span class="popular-category">${item.subcategory || item.category}</span>
                </div>
            </div>
            <div class="popular-info">
                <h3>${item.title}</h3>
                <p>${item.description.substring(0, 60)}...</p>
                <div class="popular-meta">
                    <div class="popular-stats">
                        <span class="popular-likes" data-id="${item.id}">
                            <i class="${isLiked ? 'fas' : 'far'} fa-heart"></i>
                            <span class="likes-count">${likes}</span>
                        </span>
                        <span class="popular-downloads">
                            <i class="fas fa-download"></i>
                            <span>${downloads}</span>
                        </span>
                    </div>
                    <span class="popular-price">${item.price}</span>
                </div>
            </div>
        `;

        // Click handler to open modal
        card.addEventListener('click', (e) => {
            if (!e.target.closest('.popular-likes')) {
                openTemplateModal(item.id);
            }
        });

        // Like handler
        const likeBtn = card.querySelector('.popular-likes');
        if (likeBtn) {
            likeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                const id = likeBtn.getAttribute('data-id');
                const icon = likeBtn.querySelector('i');
                const countSpan = likeBtn.querySelector('.likes-count');
                
                likeCounts[id] = !likeCounts[id];
                icon.classList.toggle('far');
                icon.classList.toggle('fas');
                
                let count = parseInt(countSpan.textContent);
                count += likeCounts[id] ? 1 : -1;
                countSpan.textContent = count;
                
                localStorage.setItem('likeCounts', JSON.stringify(likeCounts));
                showToast(likeCounts[id] ? 'Added to likes' : 'Removed from likes');
            });
        }

        return card;
    }

    // ===== COMPLETE SEARCH FUNCTIONALITY =====
    if (searchInput) {
        // Search on input with debounce
        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            const query = this.value.trim();
            
            if (query.length < 2) {
                searchResults.classList.remove('active');
                return;
            }
            
            searchTimeout = setTimeout(() => {
                performLiveSearch(query);
            }, 300);
        });

        // Search on Enter key
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const query = searchInput.value.trim();
                if (query) {
                    performSearch(query);
                    searchResults.classList.remove('active');
                }
            }
        });

        // Search icon click
        const searchIcon = document.querySelector('.search-box i');
        if (searchIcon) {
            searchIcon.addEventListener('click', () => {
                const query = searchInput.value.trim();
                if (query) {
                    performSearch(query);
                    searchResults.classList.remove('active');
                }
            });
        }

        // Close search results when clicking outside
        document.addEventListener('click', function(e) {
            if (!searchInput?.contains(e.target) && !searchResults?.contains(e.target)) {
                searchResults.classList.remove('active');
            }
        });
    }

    function performLiveSearch(query) {
        const results = searchInTemplates(query).slice(0, 5);
        renderLiveSearchResults(results, query);
    }

    function searchInTemplates(query) {
        const searchTerm = query.toLowerCase();
        return searchDatabase.filter(item => 
            item.title.toLowerCase().includes(searchTerm) ||
            item.category.toLowerCase().includes(searchTerm) ||
            (item.subcategory && item.subcategory.toLowerCase().includes(searchTerm)) ||
            (item.tags && item.tags.some(tag => tag.toLowerCase().includes(searchTerm))) ||
            item.description.toLowerCase().includes(searchTerm)
        );
    }

    function renderLiveSearchResults(results, query) {
        if (!searchResults) return;

        if (results.length === 0) {
            searchResults.innerHTML = `
                <div class="search-result-item no-results">
                    <i class="fas fa-search"></i>
                    <span>No results found for "${query}"</span>
                    <small>Try: logos, flyers, business cards</small>
                </div>
            `;
            searchResults.classList.add('active');
            return;
        }

        let html = '';
        results.forEach(item => {
            html += `
                <div class="search-result-item" data-id="${item.id}">
                    <img src="${item.image}" alt="${item.title}">
                    <div class="search-result-info">
                        <h4>${item.title}</h4>
                        <p>${item.category} • ${item.downloads.toLocaleString()} downloads</p>
                    </div>
                </div>
            `;
        });
        
        html += `<div class="search-result-item view-all" data-query="${query}">
                    <div class="search-result-info">
                        <h4><i class="fas fa-arrow-right"></i> View all ${searchInTemplates(query).length} results</h4>
                    </div>
                </div>`;
        
        searchResults.innerHTML = html;
        searchResults.classList.add('active');

        // Add click handlers
        document.querySelectorAll('.search-result-item[data-id]').forEach(item => {
            item.addEventListener('click', function() {
                const id = this.getAttribute('data-id');
                openTemplateModal(id);
                searchResults.classList.remove('active');
                searchInput.value = '';
            });
        });

        const viewAllBtn = document.querySelector('.search-result-item.view-all');
        if (viewAllBtn) {
            viewAllBtn.addEventListener('click', function() {
                const query = this.getAttribute('data-query');
                performSearch(query);
                searchResults.classList.remove('active');
                searchInput.value = '';
            });
        }
    }

    function performSearch(query) {
        const results = searchInTemplates(query);
        openSearchModal(query, results);
    }

    function openSearchModal(query, results) {
        if (!searchModal || !searchResultsGrid || !searchStats) return;

        searchStats.innerHTML = `<i class="fas fa-search"></i> Found ${results.length} result${results.length !== 1 ? 's' : ''} for "${query}"`;
        
        if (results.length === 0) {
            searchResultsGrid.innerHTML = `
                <div class="no-search-results">
                    <i class="fas fa-search fa-3x"></i>
                    <h3>No results found</h3>
                    <p>We couldn't find any templates matching "${query}"</p>
                    <p class="search-suggestions">Try: logos, flyers, business cards, social media</p>
                </div>
            `;
        } else {
            let html = '';
            results.forEach(item => {
                html += `
                    <div class="search-result-card" data-id="${item.id}">
                        <div class="search-result-img">
                            <img src="${item.image}" alt="${item.title}">
                            <span class="search-result-category">${item.category}</span>
                        </div>
                        <div class="search-result-info">
                            <h4>${item.title}</h4>
                            <p>${item.description.substring(0, 80)}...</p>
                            <div class="search-result-meta">
                                <span><i class="fas fa-download"></i> ${item.downloads.toLocaleString()}</span>
                                <span><i class="fas fa-tag"></i> ${item.subcategory || item.category}</span>
                            </div>
                        </div>
                    </div>
                `;
            });
            
            searchResultsGrid.innerHTML = html;
        }

        searchModal.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Add click handlers to result cards
        document.querySelectorAll('.search-result-card').forEach(card => {
            card.addEventListener('click', function() {
                const id = this.getAttribute('data-id');
                openTemplateModal(id);
            });
        });
    }

    if (closeSearchModal) {
        closeSearchModal.addEventListener('click', closeSearchModalFunction);
    }

    function closeSearchModalFunction() {
        searchModal.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    // ===== TEMPLATE MODAL FUNCTIONALITY =====
    window.openTemplateModal = function(id) {
        if (!templateModal || !overlay) return;
        
        const template = templateDatabase.find(t => t.id === id) || templateDatabase[0];
        if (!template) return;

        console.log('Opening modal for:', template.title);

        // Update modal content
        const modalImage = document.getElementById('modalImage');
        const modalTitle = document.getElementById('modalTitle');
        const modalSubtitle = document.getElementById('modalSubtitle');
        const modalDescription = document.getElementById('modalDescription');
        const modalCategory = document.getElementById('modalCategory');
        const modalFileFormat = document.getElementById('modalFileFormat');
        const modalDimensions = document.getElementById('modalDimensions');
        const modalDownloadCount = document.getElementById('modalDownloadCount');
        const modalLikeCount = document.getElementById('modalLikeCount');
        const modalBadge = document.getElementById('modalBadge');
        const formatBadges = document.getElementById('formatBadges');
        const tagsContainer = document.getElementById('tagsContainer');

        if (modalImage) modalImage.src = template.image;
        if (modalTitle) modalTitle.textContent = template.title;
        if (modalSubtitle) modalSubtitle.textContent = template.subcategory || template.category;
        if (modalDescription) modalDescription.textContent = template.description;
        if (modalCategory) modalCategory.textContent = template.category;
        if (modalFileFormat) modalFileFormat.textContent = template.formats || 'AI, PSD, PDF';
        if (modalDimensions) modalDimensions.textContent = template.dimensions || 'Multiple sizes';
        if (modalDownloadCount) modalDownloadCount.textContent = `${(downloadCounts[template.id] || template.downloads || 0).toLocaleString()}+`;
        if (modalLikeCount) modalLikeCount.textContent = likeCounts[template.id] || template.likes || 0;

        // Set badge
        if (modalBadge) {
            if (template.badge) {
                modalBadge.textContent = template.badge;
                modalBadge.style.display = 'block';
            } else {
                modalBadge.style.display = 'none';
            }
        }

        // Render format badges
        if (formatBadges) {
            const formats = (template.formats || 'AI,PSD,PDF').split(',');
            let formatHtml = '';
            formats.forEach(format => {
                formatHtml += `<span class="format-badge">${format.trim()}</span>`;
            });
            formatBadges.innerHTML = formatHtml;
        }

        // Render tags
        if (tagsContainer) {
            const tags = template.tags || ['business', 'modern', 'professional'];
            let tagsHtml = '';
            tags.forEach(tag => {
                tagsHtml += `<span class="tag">#${tag}</span>`;
            });
            tagsContainer.innerHTML = tagsHtml;
        }

        // Show modal
        templateModal.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    // Modal close button
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            templateModal.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    // ===== HEADER SCROLL EFFECT =====
    window.addEventListener('scroll', function() {
        if (header) {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
                if (backToTop) backToTop.classList.add('active');
            } else {
                header.classList.remove('scrolled');
                if (backToTop) backToTop.classList.remove('active');
            }
        }
    });

    // ===== BACK TO TOP BUTTON =====
    if (backToTop) {
        backToTop.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ===== MOBILE NAVIGATION =====
    if (mobileNavToggle.length > 0 && mobileNav && overlay) {
        mobileNavToggle.forEach(btn => {
            btn.addEventListener('click', function() {
                const isExpanded = this.getAttribute('aria-expanded') === 'true';
                this.setAttribute('aria-expanded', !isExpanded);
                mobileNav.classList.toggle('active');
                overlay.classList.toggle('active');
                document.body.classList.toggle('no-scroll');
                
                const icon = this.querySelector('i');
                if (icon) {
                    icon.classList.toggle('fa-bars');
                    icon.classList.toggle('fa-times');
                }
            });
        });

        // Close mobile nav when clicking overlay
        overlay.addEventListener('click', function() {
            mobileNav.classList.remove('active');
            overlay.classList.remove('active');
            document.body.classList.remove('no-scroll');
            mobileNavToggle.forEach(btn => {
                btn.setAttribute('aria-expanded', 'false');
                const icon = btn.querySelector('i');
                if (icon) {
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-times');
                }
            });
            
            // Also close modals
            if (authModal) authModal.classList.remove('active');
            if (templateModal) templateModal.classList.remove('active');
            if (searchModal) searchModal.classList.remove('active');
            if (userDropdown) userDropdown.classList.remove('active');
        });
    }

    // ===== MOBILE DROPDOWN TOGGLES =====
    document.querySelectorAll('.mobile-dropdown-toggle').forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            const dropdown = this.nextElementSibling;
            const icon = this.querySelector('i');
            
            if (dropdown) {
                dropdown.classList.toggle('active');
            }
            if (icon) {
                icon.classList.toggle('fa-chevron-down');
                icon.classList.toggle('fa-chevron-up');
            }
        });
    });

    // ===== USER BUTTON DROPDOWN =====
    if (userBtn && userDropdown) {
        userBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            userDropdown.classList.toggle('active');
        });

        document.addEventListener('click', function(e) {
            if (!userBtn?.contains(e.target) && !userDropdown?.contains(e.target)) {
                if (userDropdown) userDropdown.classList.remove('active');
            }
        });
    }

    // ===== AUTH MODAL =====
    if (loginBtn && authModal) {
        loginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            openAuthModal('login');
        });
    }

    if (signupBtn && authModal) {
        signupBtn.addEventListener('click', function(e) {
            e.preventDefault();
            openAuthModal('signup');
        });
    }

    if (closeAuthModal && authModal) {
        closeAuthModal.addEventListener('click', function() {
            closeAuthModalFunction();
        });
    }

    function openAuthModal(type = 'login') {
        if (authModal && overlay) {
            authModal.classList.add('active');
            overlay.classList.add('active');
            document.body.classList.add('no-scroll');
            switchAuthTab(type);
        }
    }

    function closeAuthModalFunction() {
        if (authModal && overlay) {
            authModal.classList.remove('active');
            overlay.classList.remove('active');
            document.body.classList.remove('no-scroll');
        }
    }

    // ===== AUTH TABS =====
    if (authTabs.length > 0) {
        authTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                const tabName = this.getAttribute('data-tab');
                switchAuthTab(tabName);
            });
        });
    }

    function switchAuthTab(tabName) {
        authTabs.forEach(t => t.classList.remove('active'));
        const activeTab = document.querySelector(`[data-tab="${tabName}"]`);
        if (activeTab) activeTab.classList.add('active');
        
        const loginForm = document.getElementById('loginForm');
        const signupForm = document.getElementById('signupForm');
        
        if (tabName === 'login') {
            if (loginForm) loginForm.classList.add('active');
            if (signupForm) signupForm.classList.remove('active');
        } else {
            if (signupForm) signupForm.classList.add('active');
            if (loginForm) loginForm.classList.remove('active');
        }
    }

    // ===== AUTH FORM SUBMISSIONS =====
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');

    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]')?.value || 'user@example.com';
            simulateAuth('login', email);
        });
    }

    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = this.querySelector('input[type="text"]')?.value || 'User';
            const email = this.querySelector('input[type="email"]')?.value || 'user@example.com';
            simulateAuth('signup', email, name);
        });
    }

    function simulateAuth(type, email, name = '') {
        const submitBtn = type === 'login' 
            ? loginForm?.querySelector('button[type="submit"]')
            : signupForm?.querySelector('button[type="submit"]');
        
        if (!submitBtn) return;
        
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Processing...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            if (type === 'login') {
                showToast(`Welcome back! Successfully logged in as ${email}`, 'success');
                if (userBtn) {
                    userBtn.innerHTML = `<i class="fas fa-user-circle"></i><span>${email.split('@')[0]}</span>`;
                }
            } else {
                showToast(`Welcome ${name}! Your account has been created.`, 'success');
                if (userBtn) {
                    userBtn.innerHTML = `<i class="fas fa-user-circle"></i><span>${name}</span>`;
                }
            }
            
            closeAuthModalFunction();
            
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            
            if (type === 'login') {
                if (loginForm) loginForm.reset();
            } else {
                if (signupForm) signupForm.reset();
            }
        }, 1500);
    }

    // ===== YOUTUBE POPUP =====
    function setupYouTubePopup() {
        if (!youtubePopup || !overlay) return;
        
        // Show after 10 seconds if not previously closed
        if (!localStorage.getItem('youtubePopupClosed')) {
            setTimeout(() => {
                youtubePopup.classList.add('active');
                overlay.classList.add('active');
            }, 10000);
        }

        if (closeYoutubePopup) {
            closeYoutubePopup.addEventListener('click', hideYoutubePopup);
        }

        if (subscribeBtn) {
            subscribeBtn.addEventListener('click', () => {
                window.open('https://www.youtube.com/@starford.tech7?sub_confirmation=1', '_blank');
                showToast('Thanks for subscribing! 🎉', 'success');
                hideYoutubePopup();
                localStorage.setItem('youtubePopupClosed', 'true');
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
        if (youtubePopup && overlay) {
            youtubePopup.classList.remove('active');
            overlay.classList.remove('active');
        }
    }

    // ===== NEWSLETTER FORM =====
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput ? emailInput.value : 'user@example.com';
            const submitBtn = this.querySelector('button');
            
            if (submitBtn) {
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Subscribing...';
                submitBtn.disabled = true;
                
                setTimeout(() => {
                    showToast(`Thanks for subscribing with ${email}! You'll receive our weekly design resources.`, 'success');
                    if (emailInput) emailInput.value = '';
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 1000);
            }
        });
    }

    // ===== LOAD TEMPLATES =====
    function loadTemplates() {
        const slider = document.querySelector('.featured-slider');
        if (!slider) return;
        
        const featuredTemplates = templateDatabase.slice(0, 5);
        slider.innerHTML = featuredTemplates.map(template => `
            <div class="featured-slide" onclick="openTemplateModal('${template.id}')" style="cursor: pointer;">
                <div class="featured-card">
                    <div class="featured-img">
                        <img src="${template.image}" alt="${template.title}" loading="lazy">
                        ${template.badge ? `<div class="featured-badge">${template.badge}</div>` : ''}
                    </div>
                    <div class="featured-content">
                        <h3>${template.title}</h3>
                        <p>${template.description.substring(0, 60)}...</p>
                        <div class="featured-meta">
                            <span class="featured-price">${template.price}</span>
                            <span class="featured-rating">
                                <i class="fas fa-heart"></i> ${template.likes || 128}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // ===== LOAD SERVICES =====
    function loadServices() {
        const servicesGrid = document.querySelector('.services-grid');
        if (!servicesGrid) return;
        
        const services = [
            { id: 1, title: "Brand Identity", description: "Complete identity packages including logo design, color schemes, and typography.", icon: "fas fa-palette", count: 128, link: "./templates/logos/index.html" },
            { id: 2, title: "Print Design", description: "High-quality print materials from business cards to large format printing.", icon: "fas fa-print", count: 234, link: "./templates/flyers/index.html" },
            { id: 3, title: "Digital Design", description: "Engaging digital assets optimized for web and social media.", icon: "fas fa-laptop-code", count: 345, link: "./templates/social-media/index.html" },
            { id: 4, title: "Social Media", description: "Templates for Instagram, Facebook, LinkedIn, and more.", icon: "fas fa-hashtag", count: 456, link: "./templates/social-media/index.html" }
        ];
        
        servicesGrid.innerHTML = services.map(service => `
            <div class="service-card">
                <div class="service-icon">
                    <i class="${service.icon}"></i>
                </div>
                <h3>${service.title}</h3>
                <p>${service.description}</p>
                <div class="service-stats">
                    <span>${service.count}+ templates</span>
                </div>
                <a href="${service.link}" class="btn">Browse Templates</a>
            </div>
        `).join('');
    }

    // ===== LOAD PORTFOLIO =====
    function loadPortfolio() {
        const portfolioGrid = document.querySelector('.portfolio-grid');
        if (!portfolioGrid) return;
        
        const portfolioItems = templateDatabase.filter((_, index) => index % 3 === 0).slice(0, 6);
        
        portfolioGrid.innerHTML = portfolioItems.map(item => `
            <div class="portfolio-item">
                <div class="portfolio-img">
                    <img src="${item.image}" alt="${item.title}" loading="lazy">
                    <span class="portfolio-category">${item.subcategory || item.category}</span>
                </div>
                <div class="portfolio-content">
                    <h3>${item.title}</h3>
                    <p>${item.description.substring(0, 60)}...</p>
                    <a href="javascript:void(0)" onclick="openTemplateModal('${item.id}')" class="btn btn-outline">View Template</a>
                </div>
            </div>
        `).join('');
    }

    // ===== LOAD TOOLS =====
    function loadTools() {
        const toolsGrid = document.querySelector('.tools-grid');
        if (!toolsGrid) return;
        
        const tools = [
            { name: "Adobe Photoshop", icon: "fab fa-adobe", color: "#31A8FF" },
            { name: "Adobe Illustrator", icon: "fab fa-adobe", color: "#FF9A00" },
            { name: "Figma", icon: "fab fa-figma", color: "#F24E1E" },
            { name: "Canva", icon: "fas fa-paint-brush", color: "#00C4CC" }
        ];
        
        toolsGrid.innerHTML = tools.map(tool => `
            <div class="tool-card">
                <div class="tool-icon" style="color: ${tool.color}">
                    <i class="${tool.icon}"></i>
                </div>
                <h3>${tool.name}</h3>
            </div>
        `).join('');
    }

    // ===== INITIALIZE SLICK SLIDER =====
    function initSlickSlider() {
        if (typeof $ !== 'undefined' && $('.featured-slider').length) {
            try {
                $('.featured-slider').slick({
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    autoplay: true,
                    autoplaySpeed: 4000,
                    dots: true,
                    arrows: true,
                    responsive: [
                        {
                            breakpoint: 1024,
                            settings: {
                                slidesToShow: 2
                            }
                        },
                        {
                            breakpoint: 600,
                            settings: {
                                slidesToShow: 1
                            }
                        }
                    ]
                });
            } catch (e) {
                console.log('Slick slider error:', e);
            }
        }
    }

    // ===== SHOW TOAST NOTIFICATION =====
    function showToast(message, type = 'success') {
        // Remove any existing toasts
        const existingToasts = document.querySelectorAll('.toast');
        existingToasts.forEach(toast => toast.remove());

        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;

        document.body.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('active');
        }, 10);

        setTimeout(() => {
            toast.classList.remove('active');
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, 3000);
    }

    // Add toast styles if not already in CSS
    if (!document.getElementById('toast-styles')) {
        const toastStyles = `
            .toast {
                position: fixed;
                bottom: 30px;
                left: 50%;
                transform: translateX(-50%) translateY(100px);
                background: white;
                color: #333;
                padding: 12px 24px;
                border-radius: 50px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.2);
                display: flex;
                align-items: center;
                gap: 10px;
                z-index: 9999;
                opacity: 0;
                transition: all 0.3s ease;
                font-weight: 500;
                border-left: 4px solid #4CAF50;
            }
            .toast.toast-success { border-left-color: #4CAF50; }
            .toast.toast-info { border-left-color: #4361ee; }
            .toast i { font-size: 1.2rem; }
            .toast.toast-success i { color: #4CAF50; }
            .toast.toast-info i { color: #4361ee; }
            .toast.active {
                opacity: 1;
                transform: translateX(-50%) translateY(0);
            }
            body.no-scroll { overflow: hidden; }
        `;
        
        const styleSheet = document.createElement('style');
        styleSheet.id = 'toast-styles';
        styleSheet.textContent = toastStyles;
        document.head.appendChild(styleSheet);
    }

    console.log('Initialization complete!');
});

// Make openTemplateModal globally available
window.openTemplateModal = function(id) {
    // This will be called from HTML onclick
    if (typeof openTemplateModal === 'function') {
        // Function is already defined in DOMContentLoaded
    }
};