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

// ===== SIMPLIFIED POPULAR DESIGNS DATA (using placeholder images) =====
const popularDesigns = [
    // Row 1 - Flyers
    {
        id: 'pop-flyer-1',
        title: 'Modern Business Flyer',
        description: 'Professional business flyer template perfect for corporate events.',
        category: 'flyers',
        price: 'Free',
        likes: 2345,
        downloads: 12890,
        rating: 4.9,
        badge: '🔥 Trending',
        image: 'https://via.placeholder.com/400x300/4361ee/ffffff?text=Business+Flyer',
        fullImage: 'https://via.placeholder.com/800x600/4361ee/ffffff?text=Business+Flyer+Preview',
        fileFormats: ['AI', 'EPS', 'PSD', 'PDF'],
        dimensions: '8.5" x 11"',
        software: ['Adobe Illustrator', 'Adobe Photoshop'],
        printReady: 'Yes, 300 DPI',
        colorMode: 'CMYK',
        fileSize: '45 MB',
        tags: ['business', 'corporate', 'professional'],
        description: 'Professional business flyer with clean design',
        colors: ['#4361ee', '#3a0ca3', '#f72585', '#ffffff']
    },
    {
        id: 'pop-flyer-2',
        title: 'Birthday Party Flyer',
        description: 'Vibrant birthday flyer template with fun elements.',
        category: 'flyers',
        price: 'Free',
        likes: 1876,
        downloads: 9450,
        rating: 4.8,
        badge: '🎉 Popular',
        image: 'https://via.placeholder.com/400x300/f72585/ffffff?text=Birthday+Flyer',
        fullImage: 'https://via.placeholder.com/800x600/f72585/ffffff?text=Birthday+Flyer+Preview',
        fileFormats: ['PSD', 'AI', 'PNG'],
        dimensions: '8.5" x 11"',
        software: ['Adobe Photoshop', 'Adobe Illustrator'],
        printReady: 'Yes',
        colorMode: 'CMYK',
        fileSize: '35 MB',
        tags: ['birthday', 'party', 'celebration'],
        description: 'Colorful birthday party flyer',
        colors: ['#ff6b6b', '#4ecdc4', '#ffe66d', '#c77dff']
    },
    {
        id: 'pop-flyer-3',
        title: 'Real Estate Flyer',
        description: 'Elegant real estate flyer for property listings.',
        category: 'flyers',
        price: 'Free',
        likes: 1567,
        downloads: 7890,
        rating: 4.7,
        badge: '🏠 Featured',
        image: 'https://via.placeholder.com/400x300/2c3e50/ffffff?text=Real+Estate+Flyer',
        fullImage: 'https://via.placeholder.com/800x600/2c3e50/ffffff?text=Real+Estate+Preview',
        fileFormats: ['INDD', 'AI', 'PSD'],
        dimensions: '8.5" x 11"',
        software: ['Adobe InDesign', 'Adobe Illustrator'],
        printReady: 'Yes',
        colorMode: 'CMYK',
        fileSize: '52 MB',
        tags: ['real estate', 'property', 'housing'],
        description: 'Luxury real estate flyer',
        colors: ['#2c3e50', '#e74c3c', '#ecf0f1', '#bdc3c7']
    },
    {
        id: 'pop-flyer-4',
        title: 'Music Concert Flyer',
        description: 'Dynamic concert flyer for music events.',
        category: 'flyers',
        price: 'Free',
        likes: 2134,
        downloads: 11230,
        rating: 4.9,
        badge: '🎵 Hot',
        image: 'https://via.placeholder.com/400x300/ff3838/ffffff?text=Concert+Flyer',
        fullImage: 'https://via.placeholder.com/800x600/ff3838/ffffff?text=Concert+Preview',
        fileFormats: ['AI', 'PSD', 'EPS'],
        dimensions: '11" x 17"',
        software: ['Adobe Illustrator', 'Adobe Photoshop'],
        printReady: 'Yes',
        colorMode: 'CMYK',
        fileSize: '48 MB',
        tags: ['concert', 'music', 'event'],
        description: 'High-energy concert flyer',
        colors: ['#000000', '#ff3838', '#ff9f1a', '#ffffff']
    },
    
    // Row 2 - Logos
    {
        id: 'pop-logo-1',
        title: 'Minimalist Business Logo',
        description: 'Clean logo template for modern businesses.',
        category: 'logos',
        price: 'Free',
        likes: 3210,
        downloads: 15678,
        rating: 4.9,
        badge: '⭐ Bestseller',
        image: 'https://via.placeholder.com/400x300/2d4059/ffffff?text=Business+Logo',
        fullImage: 'https://via.placeholder.com/800x600/2d4059/ffffff?text=Logo+Preview',
        fileFormats: ['AI', 'EPS', 'SVG', 'PNG'],
        dimensions: 'Vector',
        software: ['Adobe Illustrator'],
        printReady: 'Yes',
        colorMode: 'RGB/CMYK',
        fileSize: '12 MB',
        tags: ['logo', 'business', 'minimal'],
        description: 'Minimalist business logo design',
        colors: ['#2d4059', '#ea5455', '#eeeeee', '#222831']
    },
    {
        id: 'pop-logo-2',
        title: 'Creative Abstract Logo',
        description: 'Artistic logo for creative agencies.',
        category: 'logos',
        price: 'Free',
        likes: 2789,
        downloads: 12345,
        rating: 4.8,
        badge: '🎨 Creative',
        image: 'https://via.placeholder.com/400x300/8338ec/ffffff?text=Creative+Logo',
        fullImage: 'https://via.placeholder.com/800x600/8338ec/ffffff?text=Abstract+Preview',
        fileFormats: ['AI', 'EPS', 'SVG', 'PDF'],
        dimensions: 'Vector',
        software: ['Adobe Illustrator'],
        printReady: 'Yes',
        colorMode: 'RGB/CMYK',
        fileSize: '15 MB',
        tags: ['creative', 'abstract', 'artistic'],
        description: 'Abstract creative logo',
        colors: ['#8338ec', '#3a86ff', '#ff006e', '#fb5607']
    },
    {
        id: 'pop-logo-3',
        title: 'Luxury Gold Emblem',
        description: 'Elegant logo with gold accents.',
        category: 'logos',
        price: 'Free',
        likes: 2345,
        downloads: 10987,
        rating: 4.9,
        badge: '👑 Premium',
        image: 'https://via.placeholder.com/400x300/bf9b30/ffffff?text=Luxury+Logo',
        fullImage: 'https://via.placeholder.com/800x600/bf9b30/ffffff?text=Gold+Preview',
        fileFormats: ['AI', 'EPS', 'SVG', 'PNG'],
        dimensions: 'Vector',
        software: ['Adobe Illustrator'],
        printReady: 'Yes',
        colorMode: 'CMYK',
        fileSize: '18 MB',
        tags: ['luxury', 'gold', 'elegant'],
        description: 'Luxury gold emblem logo',
        colors: ['#bf9b30', '#aa8800', '#1a1a1a', '#ffffff']
    },
    {
        id: 'pop-logo-4',
        title: 'Tech Startup Logo',
        description: 'Modern tech logo for startups.',
        category: 'logos',
        price: 'Free',
        likes: 2987,
        downloads: 13456,
        rating: 4.8,
        badge: '💻 Tech',
        image: 'https://via.placeholder.com/400x300/4361ee/ffffff?text=Tech+Logo',
        fullImage: 'https://via.placeholder.com/800x600/4361ee/ffffff?text=Tech+Preview',
        fileFormats: ['AI', 'EPS', 'SVG', 'FIG'],
        dimensions: 'Vector',
        software: ['Adobe Illustrator', 'Figma'],
        printReady: 'Yes',
        colorMode: 'RGB/CMYK',
        fileSize: '14 MB',
        tags: ['tech', 'startup', 'digital'],
        description: 'Modern technology logo',
        colors: ['#4361ee', '#4cc9f0', '#f72585', '#1a1a2e']
    },
    
    // Row 3 - Business Cards
    {
        id: 'pop-card-1',
        title: 'Modern Business Card',
        description: 'Sleek corporate business card template.',
        category: 'businessCards',
        price: 'Free',
        likes: 1987,
        downloads: 9876,
        rating: 4.8,
        badge: 'Popular',
        image: 'https://via.placeholder.com/400x300/2c3e50/ffffff?text=Business+Card',
        fullImage: 'https://via.placeholder.com/800x600/2c3e50/ffffff?text=Card+Preview',
        fileFormats: ['AI', 'PSD', 'PDF'],
        dimensions: '3.5" x 2"',
        software: ['Adobe Illustrator', 'Adobe Photoshop'],
        printReady: 'Yes',
        colorMode: 'CMYK',
        fileSize: '25 MB',
        tags: ['business card', 'corporate'],
        description: 'Professional business card',
        colors: ['#2c3e50', '#34495e', '#ecf0f1', '#3498db']
    },
    {
        id: 'pop-card-2',
        title: 'Creative Portfolio Card',
        description: 'Artistic card for designers.',
        category: 'businessCards',
        price: 'Free',
        likes: 1654,
        downloads: 7654,
        rating: 4.7,
        badge: 'Trending',
        image: 'https://via.placeholder.com/400x300/ff6b6b/ffffff?text=Creative+Card',
        fullImage: 'https://via.placeholder.com/800x600/ff6b6b/ffffff?text=Card+Preview',
        fileFormats: ['AI', 'PSD', 'PDF'],
        dimensions: '3.5" x 2"',
        software: ['Adobe Illustrator', 'Adobe Photoshop'],
        printReady: 'Yes',
        colorMode: 'CMYK',
        fileSize: '28 MB',
        tags: ['creative', 'designer'],
        description: 'Artistic portfolio card',
        colors: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4']
    }
];

// ===== DOM Elements with error checking =====
const popularGrid = document.getElementById('popularGrid');
const filterButtons = document.querySelectorAll('.filter-popular-btn');
const loadMoreBtn = document.getElementById('loadMorePopularBtn');
const templateModal = document.getElementById('templateModal');
const closeModal = document.getElementById('closeModal');
const overlay = document.getElementById('overlay');
const searchInput = document.getElementById('searchInput');

// State
let displayedPopularCount = 8;
let currentFilter = 'all';
let likedTemplates = JSON.parse(localStorage.getItem('likedTemplates')) || {};

// ===== Initialize when DOM is loaded =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded - initializing...');
    
    // Initialize starfield animation
    try {
        const starfield = new StarfieldAnimation();
        console.log('Starfield initialized');
    } catch (e) {
        console.error('Starfield error:', e);
    }
    
    // Load popular designs
    if (popularGrid) {
        console.log('Loading popular designs...');
        loadPopularDesigns();
    } else {
        console.error('Popular grid not found');
    }
    
    // Setup filter buttons
    setupFilters();
    
    // Setup load more button
    setupLoadMore();
    
    // Setup modal close button
    if (closeModal) {
        closeModal.addEventListener('click', closeTemplateModal);
    }
    
    // Close modal when clicking overlay
    if (overlay) {
        overlay.addEventListener('click', function() {
            closeTemplateModal();
        });
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeTemplateModal();
        }
    });
    
    // Setup search functionality
    setupSearch();
    
    // Initialize AOS
    if (window.AOS) {
        AOS.init({
            duration: 200,
            easing: 'ease-in-out',
            once: true
        });
    }
    
    // Initialize Slick slider
    initializeSlider();
    
    // Setup YouTube Popup
    setupYouTubePopup();
    
    // Load other sections
    loadTemplates();
    loadServices();
    loadPortfolio();
    loadTools();
    
    console.log('Initialization complete');
});

// ===== LOAD POPULAR DESIGNS =====
function loadPopularDesigns() {
    if (!popularGrid) {
        console.error('Popular grid element not found');
        return;
    }
    
    console.log('Loading popular designs, filter:', currentFilter);
    
    const filteredDesigns = filterDesigns(popularDesigns, currentFilter);
    const designsToShow = filteredDesigns.slice(0, displayedPopularCount);
    
    if (designsToShow.length === 0) {
        popularGrid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 50px;">No designs found in this category</div>';
        return;
    }
    
    popularGrid.innerHTML = designsToShow.map(design => createPopularCard(design)).join('');
    
    // Add event listeners to cards
    document.querySelectorAll('.popular-card').forEach(card => {
        card.addEventListener('click', function(e) {
            // Don't open modal if clicking on like button
            if (e.target.closest('.popular-likes i')) return;
            
            const designId = this.dataset.id;
            console.log('Card clicked:', designId);
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
        if (card) {
            const designId = card.dataset.id;
            if (likedTemplates[designId]) {
                btn.classList.add('active', 'fas');
                btn.classList.remove('far');
            }
        }
    });
    
    // Hide load more button if no more designs
    if (loadMoreBtn) {
        if (displayedPopularCount >= filteredDesigns.length) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'inline-flex';
        }
    }
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
    if (!filterButtons.length) {
        console.log('No filter buttons found');
        return;
    }
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active button
            filterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Update filter and reload designs
            currentFilter = this.dataset.filter || 'all';
            displayedPopularCount = 8; // Reset when filter changes
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
    if (!loadMoreBtn) {
        console.log('Load more button not found');
        return;
    }
    
    loadMoreBtn.addEventListener('click', function() {
        const filteredDesigns = filterDesigns(popularDesigns, currentFilter);
        
        if (displayedPopularCount < filteredDesigns.length) {
            displayedPopularCount += 4; // Load 4 more
            loadPopularDesigns();
        }
    });
}

// ===== MODAL FUNCTIONS =====
function openTemplateModal(design) {
    console.log('Opening modal for:', design.title);
    
    if (!templateModal) {
        console.error('Modal element not found');
        return;
    }
    
    // Get modal elements
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
    const modalLikeCount = document.getElementById('modalLikeCount');
    const modalBadge = document.getElementById('modalBadge');
    
    // Set basic content with fallbacks
    if (modalImage) modalImage.src = design.image;
    if (modalFullImage) modalFullImage.src = design.fullImage || design.image;
    if (modalTitle) modalTitle.textContent = design.title;
    if (modalSubtitle) modalSubtitle.textContent = design.category;
    if (modalDescription) modalDescription.textContent = design.description;
    if (modalCategory) modalCategory.textContent = design.category;
    if (modalFileFormat) modalFileFormat.textContent = design.fileFormats ? design.fileFormats.join(', ') : 'AI, PSD, PDF';
    if (modalDimensions) modalDimensions.textContent = design.dimensions || 'Various sizes';
    if (modalDownloadCount) modalDownloadCount.textContent = formatNumber(design.downloads);
    if (modalSoftware) modalSoftware.textContent = design.software ? design.software.join(', ') : 'Adobe Software';
    if (modalPrintReady) modalPrintReady.textContent = design.printReady || 'Yes';
    if (modalColorMode) modalColorMode.textContent = design.colorMode || 'CMYK';
    if (modalFileSize) modalFileSize.textContent = design.fileSize || 'Varies';
    if (modalLikeCount) modalLikeCount.textContent = formatNumber(design.likes);
    if (modalBadge) modalBadge.textContent = design.badge || 'Popular';
    
    // Load additional sections
    loadFormatBadges(design.fileFormats);
    loadColorPalette(design.colors);
    loadTags(design.tags);
    
    // Show modal
    templateModal.classList.add('active');
    if (overlay) overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeTemplateModal() {
    if (templateModal) templateModal.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
    document.body.style.overflow = '';
}

function loadFormatBadges(formats) {
    const formatBadges = document.getElementById('formatBadges');
    if (!formatBadges) return;
    
    const formatList = formats || ['AI', 'PSD', 'PDF'];
    formatBadges.innerHTML = formatList.map(format => 
        `<span class="format-badge">${format}</span>`
    ).join('');
}

function loadColorPalette(colors) {
    const colorPalette = document.getElementById('colorPalette');
    if (!colorPalette) return;
    
    const colorList = colors || ['#4361ee', '#f72585', '#4cc9f0'];
    colorPalette.innerHTML = colorList.map(color => 
        `<div class="color" style="background: ${color};" title="${color}"></div>`
    ).join('');
}

function loadTags(tags) {
    const tagsContainer = document.getElementById('tagsContainer');
    if (!tagsContainer) return;
    
    const tagList = tags || ['design', 'template', 'free'];
    tagsContainer.innerHTML = tagList.map(tag => 
        `<span class="tag">${tag}</span>`
    ).join('');
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
    
    // Update design likes count
    const design = findDesignById(designId);
    if (design) {
        if (likedTemplates[designId]) {
            design.likes += 1;
        } else {
            design.likes -= 1;
        }
        
        // Update count display
        const countSpan = element.closest('.popular-likes');
        if (countSpan) {
            const textNode = countSpan.childNodes[2];
            if (textNode) {
                textNode.textContent = ' ' + formatNumber(design.likes);
            }
        }
    }
}

// ===== SEARCH FUNCTIONALITY =====
function setupSearch() {
    if (!searchInput) {
        console.log('Search input not found');
        return;
    }
    
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const searchTerm = this.value.trim();
            if (searchTerm) {
                performSearch(searchTerm);
            }
        }
    });
    
    const searchIcon = document.querySelector('.search-box i');
    if (searchIcon) {
        searchIcon.addEventListener('click', function() {
            const searchTerm = searchInput.value.trim();
            if (searchTerm) {
                performSearch(searchTerm);
            }
        });
    }
}

function performSearch(searchTerm) {
    console.log('Searching for:', searchTerm);
    const results = searchAllTemplates(searchTerm);
    displaySearchResults(results, searchTerm);
}

function searchAllTemplates(term) {
    const searchTerm = term.toLowerCase();
    return popularDesigns.filter(design => 
        design.title.toLowerCase().includes(searchTerm) ||
        design.description.toLowerCase().includes(searchTerm) ||
        (design.tags && design.tags.some(tag => tag.toLowerCase().includes(searchTerm))) ||
        design.category.toLowerCase().includes(searchTerm)
    );
}

function displaySearchResults(results, searchTerm) {
    const searchModal = document.getElementById('searchModal');
    const searchStats = document.getElementById('searchStats');
    const searchResultsGrid = document.getElementById('searchResultsGrid');
    
    if (!searchModal || !searchStats || !searchResultsGrid) {
        alert(`Found ${results.length} results for "${searchTerm}"`);
        return;
    }
    
    searchStats.textContent = `Found ${results.length} results for "${searchTerm}"`;
    
    if (results.length === 0) {
        searchResultsGrid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 50px;">
                <i class="fas fa-search" style="font-size: 3rem; color: #ccc; margin-bottom: 20px;"></i>
                <h3>No templates found</h3>
                <p>Try different keywords</p>
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
                    <span class="search-result-category">${template.category}</span>
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
                searchModal.classList.remove('active');
            }
        });
    });
    
    // Show modal
    searchModal.classList.add('active');
    if (overlay) overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Clear search input
    searchInput.value = '';
}

// ===== UTILITY FUNCTIONS =====
function findDesignById(id) {
    return popularDesigns.find(d => d.id === id);
}

function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

// ===== EXISTING FUNCTIONS (simplified versions) =====
function loadTemplates() {
    const slider = document.querySelector('.featured-slider');
    if (!slider) return;
    
    const featuredTemplates = [
        {
            title: "Ultimate Business Bundle",
            description: "Complete set of business templates",
            price: "Free",
            rating: 5.0,
            reviews: 128,
            badge: "Bestseller",
            image: "https://via.placeholder.com/400x300/4361ee/ffffff?text=Business+Bundle"
        },
        {
            title: "Social Media Pack 2025",
            description: "200+ templates for social media",
            price: "Free",
            rating: 4.9,
            reviews: 87,
            badge: "New",
            image: "https://via.placeholder.com/400x300/f72585/ffffff?text=Social+Media"
        },
        {
            title: "Birthday Flyer Templates",
            description: "Modern birthday flyer designs",
            price: "Free",
            rating: 4.8,
            reviews: 156,
            badge: null,
            image: "https://via.placeholder.com/400x300/ff9f1a/ffffff?text=Birthday+Flyer"
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
    // Simplified - your existing code works
}

function loadPortfolio() {
    // Simplified - your existing code works
}

function loadTools() {
    // Simplified - your existing code works
}

function initializeSlider() {
    if (typeof $ !== 'undefined' && $('.featured-slider').length) {
        try {
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
        } catch (e) {
            console.error('Slick slider error:', e);
        }
    }
}

function setupYouTubePopup() {
    const youtubePopup = document.getElementById('youtubePopup');
    if (!youtubePopup) return;
    
    setTimeout(() => {
        youtubePopup.classList.add('active');
        if (overlay) overlay.classList.add('active');
    }, 5000);
    
    const closeYoutubePopup = document.getElementById('closeYoutubePopup');
    if (closeYoutubePopup) {
        closeYoutubePopup.addEventListener('click', () => {
            youtubePopup.classList.remove('active');
            if (overlay) overlay.classList.remove('active');
        });
    }
}

// Mobile navigation code (keep your existing code)
// Auth modal code (keep your existing code)
// Back to top code (keep your existing code)

console.log('JavaScript file loaded successfully');