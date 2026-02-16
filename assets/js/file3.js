/**
 * Starford Tech Graphics - Main JavaScript File
 * Handles all interactive functionality for the template website
 */

// ===== DOM Elements =====
document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // Initialize AOS (Animate on Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });

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
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const globalSearchInput = document.getElementById('globalSearchInput');
    const globalSearchResults = document.getElementById('globalSearchResults');
    const searchModal = document.getElementById('searchModal');
    const closeSearchModal = document.getElementById('closeSearchModal');
    const searchResultsGrid = document.getElementById('searchResultsGrid');
    const searchStats = document.getElementById('searchStats');
    const templateModal = document.getElementById('templateModal');
    const closeModal = document.getElementById('closeModal');
    const loadMorePopularBtn = document.getElementById('loadMorePopularBtn');
    const youtubePopup = document.getElementById('youtubePopup');
    const closeYoutubePopup = document.getElementById('closeYoutubePopup');
    const subscribeBtn = document.getElementById('subscribeBtn');
    const viewChannelBtn = document.getElementById('viewChannelBtn');
    const newsletterForm = document.getElementById('newsletterForm');
    
    // ===== State Management =====
    let currentPopularPage = 1;
    const popularItemsPerPage = 8;
    let currentFilter = 'all';
    let popularDesignsData = [];
    let searchTimeout;
    let likeCounts = {};
    let downloadCounts = {};
    let favoriteItems = JSON.parse(localStorage.getItem('favorites')) || [];
    let bookmarkedItems = JSON.parse(localStorage.getItem('bookmarks')) || [];
    
    // ===== Initialize Star Canvas =====
    initStarCanvas();
    
    // ===== Initialize Data =====
    initData();
    
    // ===== Initialize Slick Slider =====
    initSlickSlider();
    
    // ===== Event Listeners =====
    
    // Header scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
            backToTop.classList.add('active');
        } else {
            header.classList.remove('scrolled');
            backToTop.classList.remove('active');
        }
    });

    // Back to top button
    if (backToTop) {
        backToTop.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Mobile navigation toggle
    mobileNavToggle.forEach(btn => {
        btn.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
            mobileNav.classList.toggle('active');
            overlay.classList.toggle('active');
            
            // Toggle icon
            const icon = this.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });
    });

    // Close mobile nav when clicking overlay
    if (overlay) {
        overlay.addEventListener('click', function() {
            mobileNav.classList.remove('active');
            overlay.classList.remove('active');
            mobileNavToggle.forEach(btn => {
                btn.setAttribute('aria-expanded', 'false');
                const icon = btn.querySelector('i');
                if (icon) {
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-times');
                }
            });
        });
    }

    // User dropdown toggle
    if (userBtn) {
        userBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            userDropdown.classList.toggle('active');
        });
    }

    // Close user dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!userBtn?.contains(e.target) && !userDropdown?.contains(e.target)) {
            userDropdown?.classList.remove('active');
        }
    });

    // Auth modal
    if (loginBtn) {
        loginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            authModal.classList.add('active');
            overlay.classList.add('active');
            userDropdown.classList.remove('active');
            switchAuthTab('login');
        });
    }

    if (signupBtn) {
        signupBtn.addEventListener('click', function(e) {
            e.preventDefault();
            authModal.classList.add('active');
            overlay.classList.add('active');
            userDropdown.classList.remove('active');
            switchAuthTab('signup');
        });
    }

    if (closeAuthModal) {
        closeAuthModal.addEventListener('click', function() {
            authModal.classList.remove('active');
            overlay.classList.remove('active');
        });
    }

    // Auth tabs
    authTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            switchAuthTab(tabName);
        });
    });

    function switchAuthTab(tabName) {
        authTabs.forEach(t => t.classList.remove('active'));
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
        
        if (tabName === 'login') {
            loginForm.classList.add('active');
            signupForm.classList.remove('active');
        } else {
            signupForm.classList.add('active');
            loginForm.classList.remove('active');
        }
    }

    // Close modal when clicking overlay
    if (overlay) {
        overlay.addEventListener('click', function() {
            authModal.classList.remove('active');
            templateModal.classList.remove('active');
            searchModal.classList.remove('active');
            overlay.classList.remove('active');
        });
    }

    /* ****************************************************************** */
    // ===== Popular Designs Filter =====
    const filterButtons = document.querySelectorAll('.filter-popular-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            filterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentFilter = this.getAttribute('data-filter');
            currentPopularPage = 1;
            renderPopularDesigns();
        });
    });

    // ===== Load More Popular Designs =====
    if (loadMorePopularBtn) {
        loadMorePopularBtn.addEventListener('click', function() {
            currentPopularPage++;
            renderPopularDesigns(true);
        });
    }

    // ===== Global Search =====
    if (globalSearchInput) {
        globalSearchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            const query = this.value.trim();
            
            if (query.length < 2) {
                globalSearchResults.classList.remove('active');
                return;
            }
            
            searchTimeout = setTimeout(() => {
                performSearch(query);
            }, 300);
        });

        // Close search results when clicking outside
        document.addEventListener('click', function(e) {
            if (!globalSearchInput?.contains(e.target) && !globalSearchResults?.contains(e.target)) {
                globalSearchResults.classList.remove('active');
            }
        });
    }

    function performSearch(query) {
        // Simulate search results (in real app, this would be an API call)
        const results = getAllTemplates().filter(item => 
            item.title.toLowerCase().includes(query.toLowerCase()) ||
            item.category.toLowerCase().includes(query.toLowerCase()) ||
            item.tags?.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
        ).slice(0, 5);

        if (results.length > 0) {
            renderSearchResults(results);
            globalSearchResults.classList.add('active');
        } else {
            globalSearchResults.innerHTML = '<div class="search-result-item">No results found</div>';
            globalSearchResults.classList.add('active');
        }
    }

    function renderSearchResults(results) {
        let html = '';
        results.forEach(item => {
            html += `
                <div class="search-result-item" data-id="${item.id}">
                    <img src="${item.image}" alt="${item.title}">
                    <div class="search-result-info">
                        <h4>${item.title}</h4>
                        <p>${item.category} • ${item.downloads} downloads</p>
                    </div>
                </div>
            `;
        });
        
        html += `<div class="search-result-item view-all" onclick="openSearchModal('${globalSearchInput.value}')">
                    <div class="search-result-info">
                        <h4>View all results <i class="fas fa-arrow-right"></i></h4>
                    </div>
                </div>`;
        
        globalSearchResults.innerHTML = html;

        // Add click handlers
        document.querySelectorAll('.search-result-item[data-id]').forEach(item => {
            item.addEventListener('click', function() {
                const id = this.getAttribute('data-id');
                openTemplateModal(id);
            });
        });
    }

    // ===== Search Modal =====
    window.openSearchModal = function(query) {
        const results = getAllTemplates().filter(item => 
            item.title.toLowerCase().includes(query.toLowerCase()) ||
            item.category.toLowerCase().includes(query.toLowerCase()) ||
            item.tags?.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
        );

        searchStats.innerHTML = `Found ${results.length} results for "${query}"`;
        
        let html = '';
        results.forEach(item => {
            html += `
                <div class="search-result-card" data-id="${item.id}">
                    <div class="search-result-img">
                        <img src="${item.image}" alt="${item.title}">
                    </div>
                    <div class="search-result-info">
                        <h4>${item.title}</h4>
                        <p>${item.description.substring(0, 60)}...</p>
                        <span class="search-result-category">${item.category}</span>
                    </div>
                </div>
            `;
        });
        
        searchResultsGrid.innerHTML = html;
        searchModal.classList.add('active');
        overlay.classList.add('active');
        globalSearchResults.classList.remove('active');

        // Add click handlers
        document.querySelectorAll('.search-result-card').forEach(card => {
            card.addEventListener('click', function() {
                const id = this.getAttribute('data-id');
                openTemplateModal(id);
            });
        });
    };

    if (closeSearchModal) {
        closeSearchModal.addEventListener('click', function() {
            searchModal.classList.remove('active');
            overlay.classList.remove('active');
        });
    }

    // ===== Template Modal =====
    window.openTemplateModal = function(id) {
        const template = getTemplateById(id);
        if (!template) return;

        // Update modal content
        document.getElementById('modalImage').src = template.image;
        document.getElementById('modalFullImage').src = template.fullImage || template.image;
        document.getElementById('modalTitle').textContent = template.title;
        document.getElementById('modalSubtitle').textContent = template.subtitle || template.category;
        document.getElementById('modalDescription').textContent = template.description;
        document.getElementById('designDetails').textContent = template.designDetails || 'Modern design with attention to detail and professional typography.';
        document.getElementById('materialsSpecs').textContent = template.materialsSpecs || 'High-resolution, print-ready files with bleed and crop marks included.';
        document.getElementById('designInspiration').textContent = template.inspiration || 'Inspired by contemporary design trends and user-centered aesthetics.';
        document.getElementById('practicalApplications').textContent = template.applications || 'Perfect for digital use, print materials, and social media campaigns.';
        document.getElementById('modalCategory').textContent = template.category;
        document.getElementById('modalFileFormat').textContent = template.formats || 'AI, PSD, PDF, PNG';
        document.getElementById('modalDimensions').textContent = template.dimensions || '3000 x 4000 px';
        document.getElementById('modalDownloadCount').textContent = `${template.downloads || 0}+`;
        document.getElementById('modalSoftware').textContent = template.software || 'Adobe Photoshop, Illustrator';
        document.getElementById('modalPrintReady').textContent = template.printReady ? 'Yes (300 DPI)' : 'Digital Use Only';
        document.getElementById('modalColorMode').textContent = template.colorMode || 'CMYK, RGB';
        document.getElementById('modalFileSize').textContent = template.fileSize || '25 MB (Zipped)';
        document.getElementById('modalLikeCount').textContent = template.likes || 0;

        // Set badge
        const modalBadge = document.getElementById('modalBadge');
        if (template.badge) {
            modalBadge.textContent = template.badge;
            modalBadge.style.display = 'block';
        } else {
            modalBadge.style.display = 'none';
        }

        // Render format badges
        const formats = (template.formats || 'AI,PSD,PDF,PNG').split(',');
        let formatHtml = '';
        formats.forEach(format => {
            formatHtml += `<span class="format-badge">${format.trim()}</span>`;
        });
        document.getElementById('formatBadges').innerHTML = formatHtml;

        // Render color palette
        const colors = template.colors || ['#4361ee', '#f72585', '#4cc9f0', '#38b000', '#ff9e00'];
        let colorHtml = '';
        colors.forEach(color => {
            colorHtml += `<div class="color" style="background: ${color};" title="${color}"></div>`;
        });
        document.getElementById('colorPalette').innerHTML = colorHtml;

        // Render tags
        const tags = template.tags || ['business', 'modern', 'professional', 'print-ready'];
        let tagsHtml = '';
        tags.forEach(tag => {
            tagsHtml += `<span class="tag">#${tag}</span>`;
        });
        document.getElementById('tagsContainer').innerHTML = tagsHtml;

        // Render features
        const features = template.features || [
            'Fully editable',
            'Print ready (300 DPI)',
            'Includes fonts',
            'Organized layers',
            'Help file included'
        ];
        let featuresHtml = '';
        features.forEach(feature => {
            featuresHtml += `<li>${feature}</li>`;
        });
        document.getElementById('featuresList').innerHTML = featuresHtml;

        // Set action button states
        const likeBtn = document.getElementById('modalLikeBtn');
        const favoriteBtn = document.getElementById('modalFavoriteBtn');
        const bookmarkBtn = document.getElementById('modalBookmarkBtn');

        likeBtn.classList.toggle('active', likeCounts[id] === true);
        favoriteBtn.classList.toggle('active', favoriteItems.includes(id));
        bookmarkBtn.classList.toggle('active', bookmarkedItems.includes(id));

        // Render related designs
        renderRelatedDesigns(template.category, id);

        // Show modal
        templateModal.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    // Modal action buttons
    document.getElementById('modalLikeBtn')?.addEventListener('click', function() {
        const id = document.getElementById('modalTitle').textContent.toLowerCase().replace(/\s+/g, '-');
        likeCounts[id] = !likeCounts[id];
        this.classList.toggle('active');
        
        const countSpan = document.getElementById('modalLikeCount');
        let count = parseInt(countSpan.textContent);
        count += likeCounts[id] ? 1 : -1;
        countSpan.textContent = count;
    });

    document.getElementById('modalFavoriteBtn')?.addEventListener('click', function() {
        const id = document.getElementById('modalTitle').textContent.toLowerCase().replace(/\s+/g, '-');
        const index = favoriteItems.indexOf(id);
        if (index === -1) {
            favoriteItems.push(id);
        } else {
            favoriteItems.splice(index, 1);
        }
        this.classList.toggle('active');
        localStorage.setItem('favorites', JSON.stringify(favoriteItems));
        showToast(index === -1 ? 'Added to favorites' : 'Removed from favorites');
    });

    document.getElementById('modalBookmarkBtn')?.addEventListener('click', function() {
        const id = document.getElementById('modalTitle').textContent.toLowerCase().replace(/\s+/g, '-');
        const index = bookmarkedItems.indexOf(id);
        if (index === -1) {
            bookmarkedItems.push(id);
        } else {
            bookmarkedItems.splice(index, 1);
        }
        this.classList.toggle('active');
        localStorage.setItem('bookmarks', JSON.stringify(bookmarkedItems));
        showToast(index === -1 ? 'Bookmarked' : 'Bookmark removed');
    });

    document.getElementById('modalDownloadBtn')?.addEventListener('click', function() {
        const title = document.getElementById('modalTitle').textContent;
        simulateDownload(title);
    });

    document.getElementById('downloadTemplateBtn')?.addEventListener('click', function() {
        const title = document.getElementById('modalTitle').textContent;
        simulateDownload(title);
    });

    document.getElementById('previewBtn')?.addEventListener('click', function() {
        const fullImage = document.getElementById('modalFullImage').src;
        window.open(fullImage, '_blank');
    });

    document.getElementById('customizeBtn')?.addEventListener('click', function() {
        showToast('Online editor coming soon!', 'info');
    });

    document.getElementById('modalShareBtn')?.addEventListener('click', function() {
        if (navigator.share) {
            navigator.share({
                title: document.getElementById('modalTitle').textContent,
                text: 'Check out this free template from Starford Tech Graphics!',
                url: window.location.href
            });
        } else {
            navigator.clipboard.writeText(window.location.href);
            showToast('Link copied to clipboard!');
        }
    });

    document.getElementById('modalExpandBtn')?.addEventListener('click', function() {
        const fullImage = document.getElementById('modalFullImage').src;
        window.open(fullImage, '_blank');
    });

    if (closeModal) {
        closeModal.addEventListener('click', function() {
            templateModal.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    // ===== Newsletter Form =====
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            showToast(`Thanks for subscribing with ${email}!`, 'success');
            this.reset();
        });
    }

    // ===== YouTube Popup =====
    // Show YouTube popup after 10 seconds
    setTimeout(() => {
        if (!localStorage.getItem('youtubePopupClosed')) {
            youtubePopup.classList.add('active');
        }
    }, 10000);

    if (closeYoutubePopup) {
        closeYoutubePopup.addEventListener('click', function() {
            youtubePopup.classList.remove('active');
            localStorage.setItem('youtubePopupClosed', 'true');
        });
    }

    if (subscribeBtn) {
        subscribeBtn.addEventListener('click', function() {
            window.open('https://youtube.com/starfordtech?sub_confirmation=1', '_blank');
            showToast('Thanks for subscribing!', 'success');
            youtubePopup.classList.remove('active');
            localStorage.setItem('youtubePopupClosed', 'true');
        });
    }

    if (viewChannelBtn) {
        viewChannelBtn.addEventListener('click', function() {
            window.open('https://youtube.com/starfordtech', '_blank');
        });
    }

    // ===== Mobile Dropdown Toggles =====
    document.querySelectorAll('.mobile-dropdown-toggle').forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            const dropdown = this.nextElementSibling;
            const icon = this.querySelector('i');
            
            dropdown.classList.toggle('active');
            icon.classList.toggle('fa-chevron-down');
            icon.classList.toggle('fa-chevron-up');
        });
    });

    // ===== Helper Functions =====

    function initStarCanvas() {
        const canvas = document.getElementById('starCanvas');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let width, height;
        let stars = [];
        let mouseX = 0, mouseY = 0;
        let isMouseMoving = false;
        let mouseTimeout;

        function initStars() {
            stars = [];
            for (let i = 0; i < 200; i++) {
                stars.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    radius: Math.random() * 2 + 1,
                    speedX: (Math.random() - 0.5) * 0.5,
                    speedY: (Math.random() - 0.5) * 0.5,
                    opacity: Math.random() * 0.5 + 0.3
                });
            }
        }

        function resizeCanvas() {
            width = window.innerWidth;
            height = document.querySelector('.starry-hero').offsetHeight;
            canvas.width = width;
            canvas.height = height;
            initStars();
        }

        function drawStars() {
            ctx.clearRect(0, 0, width, height);
            
            stars.forEach(star => {
                // Update position
                star.x += star.speedX;
                star.y += star.speedY;

                // Wrap around edges
                if (star.x < 0) star.x = width;
                if (star.x > width) star.x = 0;
                if (star.y < 0) star.y = height;
                if (star.y > height) star.y = 0;

                // Mouse interaction
                if (isMouseMoving) {
                    const dx = mouseX - star.x;
                    const dy = mouseY - star.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 100) {
                        const angle = Math.atan2(dy, dx);
                        const force = (100 - distance) / 100 * 2;
                        star.x -= Math.cos(angle) * force;
                        star.y -= Math.sin(angle) * force;
                    }
                }

                // Draw star
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
                ctx.fill();

                // Add glow for larger stars
                if (star.radius > 1.5) {
                    ctx.shadowColor = 'rgba(255, 255, 255, 0.5)';
                    ctx.shadowBlur = 10;
                    ctx.fill();
                    ctx.shadowBlur = 0;
                }
            });

            requestAnimationFrame(drawStars);
        }

        window.addEventListener('resize', resizeCanvas);
        
        canvas.addEventListener('mousemove', (e) => {
            const rect = canvas.getBoundingClientRect();
            mouseX = e.clientX - rect.left;
            mouseY = e.clientY - rect.top;
            isMouseMoving = true;

            clearTimeout(mouseTimeout);
            mouseTimeout = setTimeout(() => {
                isMouseMoving = false;
            }, 100);
        });

        resizeCanvas();
        drawStars();
    }

    function initSlickSlider() {
        $('.featured-slider').slick({
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 4000,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        });
    }

    function initData() {
        // Initialize popular designs data
        popularDesignsData = generatePopularDesigns();
        renderPopularDesigns();
        renderRecentDesigns();
        renderCategories();
        renderTools();
    }

    // generate mock data for popular designs ===========*********
    function generatePopularDesigns() {
        const categories = ['flyers', 'logos', 'calendars', 'posters', 'social', 'business'];
        const templates = [];
        
        for (let i = 1; i <= 20; i++) {
            const category = categories[Math.floor(Math.random() * categories.length)];
            const downloads = Math.floor(Math.random() * 5000) + 1000;
            const likes = Math.floor(Math.random() * 500) + 100;
            
            templates.push({
                id: `template-${i}`,
                title: `${category.charAt(0).toUpperCase() + category.slice(1)} Template ${i}`,
                description: `Professional ${category} design for your projects`,
                category: category,
                image: `https://picsum.photos/400/300?random=${i}`,
                downloads: downloads,
                likes: likes,
                badge: i % 5 === 0 ? 'Trending' : (i % 7 === 0 ? 'New' : null),
                tags: [category, 'professional', 'free'],
                price: 'Free'
            });
        }
        
        return templates;
    }

    // Render popular designs with pagination and filtering
    function renderPopularDesigns(append = false) {
        const grid = document.getElementById('popularGrid');
        if (!grid) return;

        let filteredData = popularDesignsData;
        if (currentFilter !== 'all') {
            filteredData = popularDesignsData.filter(item => item.category === currentFilter);
        }

        const start = (currentPopularPage - 1) * popularItemsPerPage;
        const end = start + popularItemsPerPage;
        const pageData = filteredData.slice(start, end);

        if (!append) {
            grid.innerHTML = '';
        }

        pageData.forEach(item => {
            const card = createPopularCard(item);
            grid.appendChild(card);
        });

        // Hide load more button if no more items
        if (loadMorePopularBtn) {
            if (end >= filteredData.length) {
                loadMorePopularBtn.style.display = 'none';
            } else {
                loadMorePopularBtn.style.display = 'inline-flex';
            }
        }
    }

    // Create a card element for a popular design
    function createPopularCard(item) {
        const card = document.createElement('div');
        card.className = 'popular-card';
        card.setAttribute('data-id', item.id);
        
        const badgeHtml = item.badge ? `<div class="popular-badge">${item.badge}</div>` : '';
        
        card.innerHTML = `
            ${badgeHtml}
            <div class="popular-img">
                <img src="${item.image}" alt="${item.title}">
            </div>
            <div class="popular-info">
                <h3>${item.title}</h3>
                <p>${item.description}</p>
                <div class="popular-meta">
                    <div class="popular-stats">
                        <span class="popular-likes" data-id="${item.id}">
                            <i class="${likeCounts[item.id] ? 'fas' : 'far'} fa-heart"></i>
                            <span class="likes-count">${item.likes}</span>
                        </span>
                        <span class="popular-downloads">
                            <i class="fas fa-download"></i>
                            <span>${item.downloads}</span>
                        </span>
                    </div>
                    <span class="popular-price">${item.price}</span>
                </div>
            </div>
        `;

        // Add click handler to open modal
        card.addEventListener('click', (e) => {
            if (!e.target.closest('.popular-likes')) {
                openTemplateModal(item.id);
            }
        });

        // Add like handler
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
                
                showToast(likeCounts[id] ? 'Added to likes' : 'Removed from likes');
            });
        }

        return card;
    }

    // Render recent designs section
    function renderRecentDesigns() {
        const grid = document.getElementById('recentGrid');
        if (!grid) return;

        const recentItems = [
            {
                id: 'recent-1',
                title: 'Modern Business Card Set',
                category: 'Business Cards',
                image: 'https://picsum.photos/400/300?random=101',
                description: 'Minimal and professional business card templates'
            },
            {
                id: 'recent-2',
                title: 'Instagram Story Templates',
                category: 'Social Media',
                image: 'https://picsum.photos/400/300?random=102',
                description: '20+ Instagram story designs for brands'
            },
            {
                id: 'recent-3',
                title: '2026 Calendar Design',
                category: 'Calendars',
                image: 'https://picsum.photos/400/300?random=103',
                description: 'Minimal desk calendar with typography'
            },
            {
                id: 'recent-4',
                title: 'Real Estate Flyer Pack',
                category: 'Flyers',
                image: 'https://picsum.photos/400/300?random=104',
                description: 'Professional flyers for property listings'
            },
            {
                id: 'recent-5',
                title: 'Logo Design Bundle',
                category: 'Logos',
                image: 'https://picsum.photos/400/300?random=105',
                description: '50+ logo templates for various industries'
            },
            {
                id: 'recent-6',
                title: 'Product Mockup Set',
                category: 'Mockups',
                image: 'https://picsum.photos/400/300?random=106',
                description: 'High-quality product packaging mockups'
            }
        ];

        recentItems.forEach(item => {
            const card = document.createElement('div');
            card.className = 'recent-item';
            card.setAttribute('data-id', item.id);
            
            card.innerHTML = `
                <div class="recent-img">
                    <img src="${item.image}" alt="${item.title}">
                    <span class="recent-category">${item.category}</span>
                </div>
                <div class="recent-content">
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                    <button class="btn btn-outline-primary btn-sm">View Details</button>
                </div>
            `;

            card.addEventListener('click', () => {
                openTemplateModal(item.id);
            });

            grid.appendChild(card);
        });
    }

    function renderCategories() {
        const grid = document.getElementById('categoriesGrid');
        if (!grid) return;

        const categories = [
            { name: 'Flyers', count: '5,234', icon: 'fa-solid fa-file-image', image: 'https://picsum.photos/400/300?random=201' },
            { name: 'Logos', count: '3,892', icon: 'fa-solid fa-star', image: 'https://picsum.photos/400/300?random=202' },
            { name: 'Mockups', count: '2,156', icon: 'fa-solid fa-cube', image: 'https://picsum.photos/400/300?random=203' },
            { name: 'Posters', count: '1,845', icon: 'fa-solid fa-image', image: 'https://picsum.photos/400/300?random=204' },
            { name: 'Business Cards', count: '3,421', icon: 'fa-solid fa-id-card', image: 'https://picsum.photos/400/300?random=205' },
            { name: 'Social Media', count: '4,567', icon: 'fa-solid fa-hashtag', image: 'https://picsum.photos/400/300?random=206' },
            { name: 'Calendars', count: '1,234', icon: 'fa-solid fa-calendar', image: 'https://picsum.photos/400/300?random=207' },
            { name: 'Brochures', count: '987', icon: 'fa-solid fa-book', image: 'https://picsum.photos/400/300?random=208' }
        ];

        categories.forEach(cat => {
            const card = document.createElement('div');
            card.className = 'category-card';
            
            card.innerHTML = `
                <div class="category-img">
                    <img src="${cat.image}" alt="${cat.name}">
                    <div class="category-icon">
                        <i class="${cat.icon}"></i>
                    </div>
                    <div class="category-overlay">
                        <h3>${cat.name}</h3>
                        <p>${cat.count} templates</p>
                    </div>
                </div>
            `;

            card.addEventListener('click', () => {
                window.location.href = `./templates/${cat.name.toLowerCase().replace(' ', '-')}/index.html`;
            });

            grid.appendChild(card);
        });
    }

    function renderTools() {
        const grid = document.getElementById('toolsGrid');
        if (!grid) return;

        const tools = [
            { name: 'Adobe Photoshop', icon: 'fa-brands fa-adobe' },
            { name: 'Adobe Illustrator', icon: 'fa-brands fa-adobe' },
            { name: 'Figma', icon: 'fa-brands fa-figma' },
            { name: 'Sketch', icon: 'fa-brands fa-sketch' },
            { name: 'Canva', icon: 'fa-solid fa-paint-brush' },
            { name: 'Inkscape', icon: 'fa-solid fa-pen-nib' },
            { name: 'GIMP', icon: 'fa-solid fa-paint-brush' },
            { name: 'CorelDRAW', icon: 'fa-solid fa-pencil' }
        ];

        tools.forEach(tool => {
            const card = document.createElement('div');
            card.className = 'tool-card';
            
            card.innerHTML = `
                <div class="tool-icon">
                    <i class="${tool.icon}"></i>
                </div>
                <h3>${tool.name}</h3>
            `;

            grid.appendChild(card);
        });
    }

    function renderRelatedDesigns(category, currentId) {
        const relatedGrid = document.getElementById('relatedDesigns');
        if (!relatedGrid) return;

        const related = getAllTemplates()
            .filter(item => item.category === category && item.id !== currentId)
            .slice(0, 4);

        let html = '';
        related.forEach(item => {
            html += `
                <div class="related-item" data-id="${item.id}">
                    <img src="${item.image}" alt="${item.title}">
                    <div class="related-overlay">
                        <span>${item.title}</span>
                    </div>
                </div>
            `;
        });

        relatedGrid.innerHTML = html;

        // Add click handlers
        document.querySelectorAll('.related-item').forEach(item => {
            item.addEventListener('click', function() {
                const id = this.getAttribute('data-id');
                openTemplateModal(id);
            });
        });
    }

    function getAllTemplates() {
        // This would normally come from an API
        return generatePopularDesigns().concat([
            {
                id: 'recent-1',
                title: 'Modern Business Card Set',
                category: 'Business Cards',
                image: 'https://picsum.photos/400/300?random=101',
                downloads: 1234,
                likes: 89,
                tags: ['business', 'cards', 'professional']
            },
            {
                id: 'recent-2',
                title: 'Instagram Story Templates',
                category: 'Social Media',
                image: 'https://picsum.photos/400/300?random=102',
                downloads: 2345,
                likes: 156,
                tags: ['social', 'instagram', 'stories']
            }
            // Add more templates as needed
        ]);
    }

    function getTemplateById(id) {
        const allTemplates = getAllTemplates();
        return allTemplates.find(t => t.id === id) || allTemplates[0];
    }

    function simulateDownload(title) {
        showToast(`Downloading ${title}...`, 'success');
        
        // Create a fake download link (in real app, this would trigger actual download)
        setTimeout(() => {
            showToast('Download complete!', 'success');
        }, 1500);
    }

    function showToast(message, type = 'success') {
        // Create toast element
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;

        // Add to body
        document.body.appendChild(toast);

        // Show toast
        setTimeout(() => {
            toast.classList.add('active');
        }, 10);

        // Remove after 3 seconds
        setTimeout(() => {
            toast.classList.remove('active');
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, 3000);
    }

    // Add toast styles if not already in CSS
    const toastStyles = `
        .toast {
            position: fixed;
            bottom: 30px;
            left: 50%;
            transform: translateX(-50%) translateY(100px);
            background: var(--white);
            color: var(--dark);
            padding: 15px 30px;
            border-radius: var(--border-radius-full);
            box-shadow: var(--box-shadow-lg);
            display: flex;
            align-items: center;
            gap: 10px;
            z-index: 9999;
            opacity: 0;
            transition: all 0.3s ease;
            font-weight: 500;
            border-left: 4px solid var(--success);
        }
        
        .toast.toast-success {
            border-left-color: var(--success);
        }
        
        .toast.toast-info {
            border-left-color: var(--primary);
        }
        
        .toast.toast-error {
            border-left-color: var(--danger);
        }
        
        .toast i {
            font-size: 1.2rem;
        }
        
        .toast.toast-success i {
            color: var(--success);
        }
        
        .toast.toast-info i {
            color: var(--primary);
        }
        
        .toast.toast-error i {
            color: var(--danger);
        }
        
        .toast.active {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
    `;

    const styleSheet = document.createElement('style');
    styleSheet.textContent = toastStyles;
    document.head.appendChild(styleSheet);
});