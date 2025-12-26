// DOM Ready
document.addEventListener('DOMContentLoaded', function() {
    // Set current year
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
    // Initialize all features
    initProgressBar();
    initScrollSpy();
    initMobileMenu();
    initBackToTop();
    initFAQ();
    initAnimations();
    initDownloadTracking();
    initSmoothScroll();
    initIntersectionObserver();
});

// Progress Scroll Bar
function initProgressBar() {
    const progressBar = document.getElementById('scrollProgressBar');
    
    window.addEventListener('scroll', function() {
        const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// Scroll Spy Navigation
function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.getElementById('navbar');
    
    // Add scroll event listener
    window.addEventListener('scroll', function() {
        let current = '';
        
        // Check each section
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        // Update active nav link
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
        
        // Add scrolled class to navbar
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Mobile Menu Toggle
function initMobileMenu() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            const icon = this.querySelector('i');
            
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('ri-menu-line');
                icon.classList.add('ri-close-line');
                document.body.style.overflow = 'hidden';
            } else {
                icon.classList.remove('ri-close-line');
                icon.classList.add('ri-menu-line');
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 992) {
                navMenu.classList.remove('active');
                document.querySelector('.nav-toggle i').classList.remove('ri-close-line');
                document.querySelector('.nav-toggle i').classList.add('ri-menu-line');
                document.body.style.overflow = 'auto';
            }
        });
    });
    
    // Close menu on window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 992) {
            navMenu.classList.remove('active');
            if (navToggle) {
                navToggle.querySelector('i').classList.remove('ri-close-line');
                navToggle.querySelector('i').classList.add('ri-menu-line');
            }
            document.body.style.overflow = 'auto';
        }
    });
}

// Back to Top Button
function initBackToTop() {
    const backToTop = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// FAQ Accordion
function initFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            
            // Close all other items
            document.querySelectorAll('.faq-item').forEach(item => {
                if (item !== faqItem) {
                    item.classList.remove('active');
                    item.querySelector('.faq-answer').style.display = 'none';
                }
            });
            
            // Toggle current item
            faqItem.classList.toggle('active');
            const answer = faqItem.querySelector('.faq-answer');
            answer.style.display = faqItem.classList.contains('active') ? 'block' : 'none';
        });
    });
}

// Animations
function initAnimations() {
    // Add animation classes on scroll
    const animateElements = document.querySelectorAll('.category-card, .feature-card, .stat-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, {
        threshold: 0.1
    });
    
    animateElements.forEach(element => {
        observer.observe(element);
    });
    
    // Parallax effect for hero background
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        
        if (hero) {
            const rate = scrolled * -0.5;
            hero.style.transform = `translate3d(0, ${rate}px, 0)`;
        }
    });
}

// Download Tracking
function initDownloadTracking() {
    const downloadButtons = document.querySelectorAll('.download-btn');
    
    downloadButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const buttonId = this.id;
            const downloadType = this.getAttribute('href')?.includes('github') ? 'github' : 'direct';
            
            // Track download event
            trackDownload(downloadType, buttonId);
            
            // Google Analytics event
            if (typeof gtag !== 'undefined') {
                gtag('event', 'download', {
                    'event_category': 'engagement',
                    'event_label': downloadType,
                    'value': 1
                });
            }
        });
    });
}

// Smooth Scroll
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update active nav link
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });
}

// Intersection Observer for animations
function initIntersectionObserver() {
    const sections = document.querySelectorAll('section');
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '-50px'
    });
    
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
}

// Track Download Function
function trackDownload(type, source) {
    const eventData = {
        event: 'download',
        type: type,
        source: source,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        platform: navigator.platform,
        screen: `${window.screen.width}x${window.screen.height}`,
        language: navigator.language
    };
    
    console.log('Download Event:', eventData);
    
    // Send to your analytics backend
    sendToAnalytics(eventData);
    
    // Show download success message
    showDownloadSuccess(type);
}

// Send to Analytics
function sendToAnalytics(data) {
    // Replace with your actual analytics endpoint
    const endpoint = 'https://your-analytics.com/track';
    
    if (navigator.sendBeacon) {
        const blob = new Blob([JSON.stringify(data)], {type: 'application/json'});
        navigator.sendBeacon(endpoint, blob);
    } else {
        fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
            keepalive: true
        }).catch(console.error);
    }
}

// Show Download Success Message
function showDownloadSuccess(type) {
    const messages = {
        'direct': 'بدأ تحميل التطبيق. شكراً لثقتك بنا!',
        'github': 'يتم فتح صفحة GitHub للإصدارات. اختر الإصدار المناسب لك.'
    };
    
    const message = messages[type] || 'بدأ تحميل التطبيق.';
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = 'download-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <i class="ri-download-fill"></i>
            <div>
                <h4>جاري التحميل</h4>
                <p>${message}</p>
            </div>
        </div>
    `;
    
    // Add styles
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            .download-notification {
                position: fixed;
                bottom: 2rem;
                right: 2rem;
                background: white;
                border-radius: var(--radius-xl);
                padding: 1.5rem 2rem;
                box-shadow: var(--shadow-xxl);
                border: 1px solid var(--primary-light);
                z-index: 9999;
                animation: slideIn 0.3s ease-out;
                max-width: 400px;
                backdrop-filter: blur(10px);
            }
            
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            .notification-content {
                display: flex;
                align-items: center;
                gap: 1.5rem;
            }
            
            .notification-content i {
                font-size: 2.5rem;
                color: var(--primary);
                background: rgba(79, 70, 229, 0.1);
                width: 60px;
                height: 60px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .notification-content h4 {
                margin: 0 0 0.25rem;
                color: var(--dark);
                font-size: 1.2rem;
            }
            
            .notification-content p {
                margin: 0;
                color: var(--gray);
                font-size: 1rem;
                line-height: 1.5;
            }
            
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out forwards';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Track Social Clicks
window.trackEvent = function(category, action) {
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            'event_category': category,
            'event_label': action
        });
    }
    
    console.log('Event tracked:', category, action);
};

// Performance Monitoring
window.addEventListener('load', function() {
    const loadTime = window.performance.timing.domContentLoadedEventEnd - 
                    window.performance.timing.navigationStart;
    console.log(`Page loaded in ${loadTime}ms`);
    
    // Send to analytics
    if (typeof gtag !== 'undefined') {
        gtag('event', 'timing_complete', {
            'name': 'load',
            'value': loadTime,
            'event_category': 'Performance'
        });
    }
});

// Error Tracking
window.addEventListener('error', function(e) {
    console.error('Page error:', e.error);
    
    if (typeof gtag !== 'undefined') {
        gtag('event', 'exception', {
            'description': e.error.message,
            'fatal': true
        });
    }
});

// PWA Support
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js').then(function(registration) {
            console.log('ServiceWorker registration successful');
        }, function(err) {
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}

// Offline/Online Detection
window.addEventListener('online', function() {
    console.log('You are online');
    trackEvent('connection', 'online');
    
    // Show online notification
    showConnectionNotification('online');
});

window.addEventListener('offline', function() {
    console.log('You are offline');
    trackEvent('connection', 'offline');
    
    // Show offline notification
    showConnectionNotification('offline');
});

function showConnectionNotification(status) {
    const notification = document.createElement('div');
    notification.className = `connection-notification ${status}`;
    notification.innerHTML = `
        <i class="ri-${status === 'online' ? 'wifi-line' : 'wifi-off-line'}"></i>
        <span>أنت الآن ${status === 'online' ? 'متصل' : 'غير متصل'}</span>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}
