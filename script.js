/* ========================================
   JavaScript for HDPE Pipes Landing Page
   ======================================== */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    /* ========================================
       Sticky Header Functionality
       ======================================== */
    const stickyHeader = document.getElementById('stickyHeader');
    const heroSection = document.getElementById('hero');
    let lastScrollTop = 0;
    let heroBottom = 0;

    // Calculate hero section bottom position
    function updateHeroBottom() {
        heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
    }

    updateHeroBottom();
    window.addEventListener('resize', updateHeroBottom);

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Show sticky header after scrolling past hero section
        if (scrollTop > heroBottom) {
            // Show header when scrolling down, hide when scrolling up
            if (scrollTop > lastScrollTop) {
                // Scrolling down - show sticky header
                stickyHeader.classList.add('show');
                stickyHeader.classList.remove('hide');
            } else {
                // Scrolling up - hide sticky header
                stickyHeader.classList.remove('show');
                stickyHeader.classList.add('hide');
            }
        } else {
            // Above hero section - always hide
            stickyHeader.classList.remove('show');
            stickyHeader.classList.add('hide');
        }
        
        lastScrollTop = scrollTop;
    });

    /* ========================================
       Hero Image Carousel
       ======================================== */
    const carouselItems = document.querySelectorAll('.carousel-item');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    const thumbnails = document.querySelectorAll('.thumb-btn');
    let currentSlide = 0;
    let autoSlideInterval;

    // Function to show specific slide
    function showSlide(index) {
        carouselItems.forEach((item, i) => {
            item.classList.remove('active');
            if (i === index) {
                item.classList.add('active');
            }
        });
        
        // Update thumbnails
        thumbnails.forEach((thumb, i) => {
            thumb.classList.remove('active');
            if (i === index) {
                thumb.classList.add('active');
            }
        });
    }

    // Next slide function
    function nextSlide() {
        currentSlide = (currentSlide + 1) % carouselItems.length;
        showSlide(currentSlide);
    }

    // Previous slide function
    function prevSlide() {
        currentSlide = (currentSlide - 1 + carouselItems.length) % carouselItems.length;
        showSlide(currentSlide);
    }

    // Auto-slide functionality (every 4 seconds)
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 4000);
    }

    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    // Event listeners for carousel buttons
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            nextSlide();
            stopAutoSlide();
            startAutoSlide(); // Restart auto-slide after manual control
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            prevSlide();
            stopAutoSlide();
            startAutoSlide(); // Restart auto-slide after manual control
        });
    }

    // Thumbnail click handlers
    thumbnails.forEach((thumb, index) => {
        thumb.addEventListener('click', function() {
            currentSlide = index;
            showSlide(currentSlide);
            stopAutoSlide();
            startAutoSlide();
        });
    });

    // Pause auto-slide on hover
    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', stopAutoSlide);
        carouselContainer.addEventListener('mouseleave', startAutoSlide);
        
        // Start auto-slide only if carousel exists
        startAutoSlide();
    }

    /* ========================================
       FAQ Accordion
       ======================================== */
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });

    /* ========================================
       Manufacturing Process Tabs
       ======================================== */
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            const targetContent = document.getElementById(tabId);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });

    /* ========================================
       Applications Carousel
       ======================================== */
    const appCarousel = document.querySelector('.applications-track');
    const appPrevBtn = document.querySelector('.applications-carousel .carousel-nav-btn.prev');
    const appNextBtn = document.querySelector('.applications-carousel .carousel-nav-btn.next');
    let appScrollPosition = 0;

    if (appCarousel && appPrevBtn && appNextBtn) {
        appNextBtn.addEventListener('click', function() {
            const cardWidth = appCarousel.querySelector('.application-card').offsetWidth + 32; // card width + gap
            appScrollPosition += cardWidth;
            
            // Check if reached end
            if (appScrollPosition > appCarousel.scrollWidth - appCarousel.offsetWidth) {
                appScrollPosition = appCarousel.scrollWidth - appCarousel.offsetWidth;
            }
            
            appCarousel.style.transform = `translateX(-${appScrollPosition}px)`;
        });

        appPrevBtn.addEventListener('click', function() {
            const cardWidth = appCarousel.querySelector('.application-card').offsetWidth + 32;
            appScrollPosition -= cardWidth;
            
            // Check if reached start
            if (appScrollPosition < 0) {
                appScrollPosition = 0;
            }
            
            appCarousel.style.transform = `translateX(-${appScrollPosition}px)`;
        });
    }

    /* ========================================
       Smooth Scroll for Navigation Links
       ======================================== */
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if href is just "#"
            if (href === '#') return;
            
            e.preventDefault();
            
            const targetId = href.substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const headerOffset = 80; // Offset for sticky header
                const targetPosition = targetSection.offsetTop - headerOffset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    /* ========================================
       Form Submission Handler
       ======================================== */
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const formData = new FormData(contactForm);
            
            // Show success message (you can customize this)
            alert('Thank you for your interest! We will contact you shortly.');
            
            // Reset form
            contactForm.reset();
            
            // In production, you would send this data to a server
            console.log('Form submitted with data:', Object.fromEntries(formData));
        });
    }

    /* ========================================
       Mobile Menu Toggle (for future implementation)
       ======================================== */
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
    }

    /* ========================================
       Intersection Observer for Scroll Animations
       (Optional: Add fade-in animations as elements come into view)
       ======================================== */
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe feature cards, product cards, etc.
    const animatedElements = document.querySelectorAll('.feature-card, .product-card, .application-card, .testimonial-card');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    /* ========================================
       Logo Scroll Animation Enhancement
       ======================================== */
    const logoTrack = document.querySelector('.logo-track');
    
    if (logoTrack) {
        // Pause animation on hover
        logoTrack.addEventListener('mouseenter', function() {
            this.style.animationPlayState = 'paused';
        });
        
        logoTrack.addEventListener('mouseleave', function() {
            this.style.animationPlayState = 'running';
        });
    }

    /* ========================================
       Image Hover Zoom Effect
       (Already handled in CSS, but can add JS enhancement if needed)
       ======================================== */
    
    /* ========================================
       Download Button Handlers
       ======================================== */
    const downloadButtons = document.querySelectorAll('.btn-download, .btn-download-small');
    
    downloadButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Show download message
            alert('The technical datasheet download will begin shortly.');
            
            // In production, this would trigger an actual file download
            console.log('Download button clicked');
        });
    });

    /* ========================================
       Request Quote Buttons
       ======================================== */
    const quoteButtons = document.querySelectorAll('.btn-quote, .btn-expert, .btn-primary');
    
    quoteButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Scroll to contact form
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                const headerOffset = 80;
                const targetPosition = contactSection.offsetTop - headerOffset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    /* ========================================
       View Technical Specs Button
       ======================================== */
    const techSpecsBtn = document.querySelector('.btn-secondary');
    
    if (techSpecsBtn) {
        techSpecsBtn.addEventListener('click', function() {
            const specsSection = document.querySelector('.specifications');
            if (specsSection) {
                const headerOffset = 80;
                const targetPosition = specsSection.offsetTop - headerOffset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }

    /* ========================================
       Catalogue Request Handler
       ======================================== */
    const catalogueBtn = document.querySelector('.btn-catalogue');
    const catalogueEmail = document.querySelector('.catalogue-form input[type="email"]');
    
    if (catalogueBtn && catalogueEmail) {
        catalogueBtn.addEventListener('click', function() {
            const email = catalogueEmail.value;
            
            if (email && validateEmail(email)) {
                alert('Thank you! We will send the catalogue to ' + email);
                catalogueEmail.value = '';
            } else {
                alert('Please enter a valid email address.');
            }
        });
    }

    /* ========================================
       Email Validation Helper
       ======================================== */
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    /* ========================================
       Testimonials Scroll Enhancement
       (Optional: Add touch/swipe support for mobile)
       ======================================== */
    const testimonialsScroll = document.querySelector('.testimonials-scroll');
    
    if (testimonialsScroll) {
        let isDown = false;
        let startX;
        let scrollLeft;

        testimonialsScroll.addEventListener('mousedown', (e) => {
            isDown = true;
            startX = e.pageX - testimonialsScroll.offsetLeft;
            scrollLeft = testimonialsScroll.scrollLeft;
        });

        testimonialsScroll.addEventListener('mouseleave', () => {
            isDown = false;
        });

        testimonialsScroll.addEventListener('mouseup', () => {
            isDown = false;
        });

        testimonialsScroll.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - testimonialsScroll.offsetLeft;
            const walk = (x - startX) * 2;
            testimonialsScroll.scrollLeft = scrollLeft - walk;
        });
    }

    /* ========================================
       Console Log for Debugging
       ======================================== */
    console.log('Mangalam HDPE Pipes website loaded successfully');
    console.log('All interactive features initialized');


    /* ========================================
       Performance Optimization
       ======================================== */
    // Debounce scroll events for better performance
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Apply debounce to scroll-heavy operations if needed
    // window.addEventListener('scroll', debounce(someFunction, 100));

    /* ========================================
       Lazy Loading Images (Optional Enhancement)
       ======================================== */
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        observer.unobserve(img);
                    }
                }
            });
        });

        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    }

    /* ========================================
       Accessibility Enhancements
       ======================================== */
    // Add keyboard navigation support for carousel
    document.addEventListener('keydown', function(e) {
        // Only trigger if carousel exists and no input is focused
        const activeElement = document.activeElement;
        const isInputFocused = activeElement.tagName === 'INPUT' || 
                              activeElement.tagName === 'TEXTAREA' || 
                              activeElement.isContentEditable;
        
        if (!isInputFocused) {
            if (e.key === 'ArrowLeft' && prevBtn) {
                prevSlide();
                stopAutoSlide();
                startAutoSlide();
            } else if (e.key === 'ArrowRight' && nextBtn) {
                nextSlide();
                stopAutoSlide();
                startAutoSlide();
            }
        }
    });

    // Focus management for accordion
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.setAttribute('tabindex', '0');
            question.setAttribute('role', 'button');
            question.setAttribute('aria-expanded', 'false');
            
            question.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.click();
                    // Update aria-expanded
                    const isActive = item.classList.contains('active');
                    this.setAttribute('aria-expanded', isActive ? 'true' : 'false');
                }
            });
        }
    });

    /* ========================================
       Browser Compatibility Checks
       ======================================== */
    // Check for CSS Grid support
    if (!window.CSS || !CSS.supports('display', 'grid')) {
        console.warn('⚠️ CSS Grid is not supported in this browser. Layout may not display correctly.');
    }

    // Check for modern JavaScript features
    if (!Array.prototype.forEach) {
        console.warn('⚠️ This browser may not support all JavaScript features used on this page.');
    }

});

/* ========================================
   Additional Utility Functions
   ======================================== */

// Function to get current scroll position
function getScrollPosition() {
    return window.pageYOffset || document.documentElement.scrollTop;
}

// Function to check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Function to smoothly scroll to top
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Export functions if using modules (optional)
// export { getScrollPosition, isInViewport, scrollToTop };