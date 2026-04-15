/**
 * Eleveon Gym - JavaScript
 * New Design
 */

document.addEventListener('DOMContentLoaded', function() {
    initTheme();
    initSmoothScroll();
    initMobileMenu();
    initHeaderScroll();
    initScrollTop();
    initTrafficChart();
    initProductFilter();
    initProductModal();
    initContactForm();
    initStatsCounter();
    initEquipmentCarousel();
});

// Theme Toggle - Dark/Light/Auto Mode
function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;

    // Get initial theme - check for saved preference or use auto-detect
    const savedTheme = localStorage.getItem('eleveon-theme');
    
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    } else {
        // Auto-detect based on system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
    }
    
    updateThemeIcon();

    // Add click handler for cycling through themes
    themeToggle.addEventListener('click', function() {
        const current = document.documentElement.getAttribute('data-theme');
        let next;
        
        if (current === 'dark') {
            next = 'light';
        } else if (current === 'light') {
            next = 'auto';
        } else {
            next = 'dark';
        }
        
        if (next === 'auto') {
            // For auto mode, detect system preference
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
            localStorage.setItem('eleveon-theme', 'auto');
        } else {
            document.documentElement.setAttribute('data-theme', next);
            localStorage.setItem('eleveon-theme', next);
        }
        updateThemeIcon();
    });

    // Listen for system theme changes when in auto mode
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
        const savedTheme = localStorage.getItem('eleveon-theme');
        if (savedTheme === 'auto' || !savedTheme) {
            document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
            updateThemeIcon();
        }
    });

    function updateThemeIcon() {
        const theme = document.documentElement.getAttribute('data-theme');
        const icon = themeToggle.querySelector('i');
        if (theme === 'light') {
            icon.className = 'fas fa-moon';
            themeToggle.title = 'Modo Escuro';
        } else if (theme === 'dark') {
            icon.className = 'fas fa-sun';
            themeToggle.title = 'Modo Claro';
        } else {
            icon.className = 'fas fa-adjust';
            themeToggle.title = 'Modo Automático';
        }
    }
}

// Smooth Scrolling Navigation
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const header = document.querySelector('.main-header');
                const offset = header ? header.offsetHeight : 70;
                const targetPosition = target.offsetTop - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Mobile Menu Toggle
function initMobileMenu() {
    const mobileToggle = document.getElementById('mobileToggle');
    const mainNav = document.getElementById('mainNav');
    
    if (!mobileToggle || !mainNav) return;

    mobileToggle.addEventListener('click', function() {
        mobileToggle.classList.toggle('active');
        mainNav.classList.toggle('active');
    });

    mainNav.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            mobileToggle.classList.remove('active');
            mainNav.classList.remove('active');
        });
    });

    document.addEventListener('click', function(e) {
        if (!mobileToggle.contains(e.target) && !mainNav.contains(e.target)) {
            mobileToggle.classList.remove('active');
            mainNav.classList.remove('active');
        }
    });
}

// Header Scroll Effect
function initHeaderScroll() {
    const header = document.getElementById('mainHeader');
    if (!header) return;

    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    }
}

// Scroll Top Button
function initScrollTop() {
    const scrollTopBtn = document.getElementById('scrollTop');
    if (!scrollTopBtn) return;

    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Traffic Chart - Bar Chart (7 charts for each day of the week)
function initTrafficChart() {
    const container = document.getElementById('gymCharts');
    if (!container) return;

    // Data for each day of the week - different occupancy patterns
    const weekData = {
        monday: [
            { label: '6h', value: 25 },
            { label: '8h', value: 70 },
            { label: '10h', value: 40 },
            { label: '14h', value: 50 },
            { label: '18h', value: 95 },
            { label: '20h', value: 85 },
            { label: '22h', value: 45 }
        ],
        tuesday: [
            { label: '6h', value: 30 },
            { label: '8h', value: 75 },
            { label: '10h', value: 45 },
            { label: '14h', value: 55 },
            { label: '18h', value: 90 },
            { label: '20h', value: 80 },
            { label: '22h', value: 40 }
        ],
        wednesday: [
            { label: '6h', value: 28 },
            { label: '8h', value: 72 },
            { label: '10h', value: 42 },
            { label: '14h', value: 52 },
            { label: '18h', value: 92 },
            { label: '20h', value: 82 },
            { label: '22h', value: 42 }
        ],
        thursday: [
            { label: '6h', value: 32 },
            { label: '8h', value: 78 },
            { label: '10h', value: 48 },
            { label: '14h', value: 58 },
            { label: '18h', value: 88 },
            { label: '20h', value: 78 },
            { label: '22h', value: 38 }
        ],
        friday: [
            { label: '6h', value: 22 },
            { label: '8h', value: 65 },
            { label: '10h', value: 35 },
            { label: '14h', value: 45 },
            { label: '18h', value: 85 },
            { label: '20h', value: 75 },
            { label: '22h', value: 55 }
        ],
        saturday: [
            { label: '7h', value: 60 },
            { label: '8h', value: 80 },
            { label: '9h', value: 70 },
            { label: '10h', value: 55 },
            { label: '11h', value: 30 },
            { label: '', value: 0 },
            { label: '', value: 0 }
        ]
    };

    const dayNames = {
        monday: 'Segunda-feira',
        tuesday: 'Terça-feira',
        wednesday: 'Quarta-feira',
        thursday: 'Quinta-feira',
        friday: 'Sexta-feira',
        saturday: 'Sábado',
        sunday: 'Domingo'
    };

    let html = '';

    // Generate a chart for each day
    Object.keys(weekData).forEach((day, dayIndex) => {
        const data = weekData[day];
        
        html += '<div class="chart-container">';
        html += '<h3 class="chart-day-title">' + dayNames[day] + '</h3>';
        html += '<div class="chart-bars">';

        data.forEach(item => {
            let levelClass = 'low';
            if (item.value >= 70) levelClass = 'high';
            else if (item.value >= 40) levelClass = 'medium';

            // Handle closed days (Sunday)
            const barStyle = item.value === 0 ? 'background: var(--dark-4);' : '';
            const displayValue = item.label === '' || item.value === 0 ? '0%' : item.value + '%';
            const heightValue = item.value === 0 ? '5%' : item.value + '%';

            html += '<div class="chart-bar-container">';
            html += '<div class="chart-bar ' + levelClass + '" style="height: 0%; ' + barStyle + '" data-height="' + heightValue + '" data-value="' + displayValue + '"></div>';
            html += '<span class="chart-label">' + item.label + '</span>';
            html += '</div>';
        });

        html += '</div>';
        
        // Only show legend on the first chart
        if (dayIndex === 0) {
            html += '<div class="chart-legend">';
            html += '<div class="legend-item"><span class="legend-dot low"></span><span>Tranquilo</span></div>';
            html += '<div class="legend-item"><span class="legend-dot medium"></span><span>Moderado</span></div>';
            html += '<div class="legend-item"><span class="legend-dot high"></span><span>Movimentado</span></div>';
            html += '</div>';
        }
        
        html += '</div>';
    });

    container.innerHTML = html;

    // Animate all charts
    setTimeout(() => {
        const allBars = container.querySelectorAll('.chart-bar');
        allBars.forEach((bar, index) => {
            setTimeout(() => {
                bar.style.height = bar.dataset.height;
            }, index * 50);
        });
    }, 300);
}

// Product Category Filter
function initProductFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');

    if (!filterButtons.length || !productCards.length) return;

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            const filter = this.dataset.filter;

            productCards.forEach(card => {
                const category = card.dataset.category;
                
                if (filter === 'all' || category === filter) {
                    card.classList.remove('hidden');
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.transition = 'all 0.3s ease';
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });
}

// Product Modal
function initProductModal() {
    const modal = document.getElementById('productModal');
    const modalOverlay = document.getElementById('modalOverlay');
    const modalClose = document.getElementById('modalClose');
    
    if (!modal) return;

    document.querySelectorAll('.product-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const card = this.closest('.product-card');
            if (card) {
                openModal(card);
            }
        });
    });

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeModal);
    }

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    modal.querySelector('.modal-btn').addEventListener('click', function() {
        alert('Obrigado pelo interesse! Esta é uma funcionalidade de protótipo.');
        closeModal();
    });

    function openModal(card) {
        const name = card.dataset.name || 'Produto';
        const desc = card.dataset.desc || 'Descrição do produto';
        const price = card.dataset.price || 'R$ 0,00';
        const icon = card.dataset.icon || 'fa-box';
        const category = card.dataset.cat || 'Produto';
        const image = card.dataset.image || '';

        document.getElementById('modalName').textContent = name;
        document.getElementById('modalDesc').textContent = desc;
        document.getElementById('modalPrice').textContent = price;
        document.getElementById('modalCategory').textContent = category;
        
        const modalImageArea = document.querySelector('.modal-image-area');
        const modalIcon = document.getElementById('modalIcon');
        
        // Handle product image in modal
        if (image) {
            // Check if image already exists
            let modalImg = modalImageArea.querySelector('img');
            if (!modalImg) {
                modalImg = document.createElement('img');
                modalImageArea.appendChild(modalImg);
            }
            modalImg.src = image;
            modalImg.style.display = 'block';
            modalIcon.style.display = 'none';
        } else {
            // No image, show icon
            const modalImg = modalImageArea.querySelector('img');
            if (modalImg) {
                modalImg.style.display = 'none';
            }
            modalIcon.className = 'fas ' + icon;
            modalIcon.style.display = 'block';
        }

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

// Contact Form
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nome = document.getElementById('nome');
        const email = document.getElementById('email');
        
        if (!nome.value.trim() || !email.value.trim()) {
            alert('Preencha todos os campos obrigatórios.');
            return;
        }

        alert('Mensagem enviada com sucesso! Em breve retornaremos seu contato.');
        form.reset();
    });

    const telefone = document.getElementById('telefone');
    if (telefone) {
        telefone.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.length > 0) {
                if (value.length <= 2) {
                    value = '(' + value;
                } else if (value.length <= 7) {
                    value = '(' + value.slice(0, 2) + ') ' + value.slice(2);
                } else {
                    value = '(' + value.slice(0, 2) + ') ' + value.slice(2, 7) + '-' + value.slice(7, 11);
                }
            }
            
            e.target.value = value;
        });
    }
}

// Stats Counter Animation
function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number[data-count]');
    
    if (!statNumbers.length) return;

    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const countTo = parseInt(target.dataset.count);
                animateCounter(target, 0, countTo, 2000);
                observer.unobserve(target);
            }
        });
    }, observerOptions);

    statNumbers.forEach(stat => {
        observer.observe(stat);
    });

    function animateCounter(element, start, end, duration) {
        let startTimestamp = null;
        
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const current = Math.floor(progress * (end - start) + start);
            element.textContent = current + '+';
            
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        
        window.requestAnimationFrame(step);
    }
}

// Equipment Carousel
function initEquipmentCarousel() {
    const track = document.getElementById('carouselTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dotsContainer = document.getElementById('carouselDots');
    
    if (!track) return;

    const slides = track.querySelectorAll('.carousel-card');
    const dots = dotsContainer ? dotsContainer.querySelectorAll('.dot') : [];
    
    if (slides.length === 0) return;

    // Single variable to control the slide index
    let currentIndex = 0;
    
    // Single interval variable - only ONE setInterval allowed
    let autoSlideInterval = null;
    
    // Animation lock to prevent multiple transitions
    let isAnimating = false;
    
    // Timing: 5 seconds for autoplay, 0.5s for CSS transition
    const slideDuration = 5000;

    // Function to move to a specific slide
    function goToSlide(index) {
        // Prevent multiple transitions at the same time
        if (isAnimating) return;
        
        // Validate index bounds
        if (index < 0) {
            index = slides.length - 1;
        } else if (index >= slides.length) {
            index = 0;
        }
        
        // Skip if already on this slide
        if (index === currentIndex) return;
        
        isAnimating = true;
        currentIndex = index;
        
        // Move slides using transform translateX -100% * index
        track.style.transform = 'translateX(-' + (currentIndex * 100) + '%)';
        
        // Update dots
        dots.forEach((dot, i) => {
            dot.classList.remove('active');
            if (i === currentIndex) {
                dot.classList.add('active');
            }
        });
        
        // Release lock after transition completes
        setTimeout(function() {
            isAnimating = false;
        }, 500); // 500ms matches CSS transition
    }

    // Next slide - increase index by exactly 1
    function nextSlide() {
        var nextIndex = currentIndex + 1;
        if (nextIndex >= slides.length) {
            nextIndex = 0; // Reset to 0 when reaching last slide
        }
        goToSlide(nextIndex);
    }

    // Previous slide - decrease index by 1
    function prevSlide() {
        var prevIndex = currentIndex - 1;
        if (prevIndex < 0) {
            prevIndex = slides.length - 1;
        }
        goToSlide(prevIndex);
    }

    // Start automatic sliding - ensure only ONE interval runs
    function startAutoSlide() {
        // Clear any existing interval first
        if (autoSlideInterval) {
            clearInterval(autoSlideInterval);
            autoSlideInterval = null;
        }
        
        // Create single interval
        autoSlideInterval = setInterval(nextSlide, slideDuration);
    }

    // Stop automatic sliding
    function stopAutoSlide() {
        if (autoSlideInterval) {
            clearInterval(autoSlideInterval);
            autoSlideInterval = null;
        }
    }

    // Event listeners for next button
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            stopAutoSlide();
            nextSlide();
            startAutoSlide(); // Restart timer after manual navigation
        });
    }

    // Event listeners for prev button
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            stopAutoSlide();
            prevSlide();
            startAutoSlide(); // Restart timer after manual navigation
        });
    }

    // Event listeners for dots
    dots.forEach(function(dot, index) {
        dot.addEventListener('click', function() {
            stopAutoSlide();
            goToSlide(index);
            startAutoSlide(); // Restart timer after manual navigation
        });
    });

    // Pause on hover (optional)
    var carousel = document.querySelector('.equipment-carousel');
    if (carousel) {
        carousel.addEventListener('mouseenter', stopAutoSlide);
        carousel.addEventListener('mouseleave', startAutoSlide);
    }

    // Initialize first slide
    goToSlide(0);
    
    // Start automatic sliding
    startAutoSlide();
}

