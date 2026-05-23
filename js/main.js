/**
 * main.js
 * נקודת כניסה ראשית לאתר.
 * מאתחל את כל הרכיבים לאחר שה-DOM נטען.
 */

document.addEventListener('DOMContentLoaded', () => {
    initHeader();
    initMobileMenu();
    initSmoothScroll();
    initFAQ();
    initScrollReveal();
    initContactForm();
    initCurrentYear();
    initImageFallbacks();
    initCursorGlow();
    initHeroParallax();
    initBackToTop();
});

/**
 * Back to top — כפתור צף שמופיע אחרי גלילה
 */
function initBackToTop() {
    // צור אם לא קיים ב-HTML
    let btn = document.querySelector('.back-to-top');
    if (!btn) {
        btn = document.createElement('button');
        btn.className = 'back-to-top';
        btn.type = 'button';
        btn.setAttribute('aria-label', 'חזרה לראש העמוד');
        btn.innerHTML = '<i class="fas fa-chevron-up" aria-hidden="true"></i>';
        document.body.appendChild(btn);
    }

    const threshold = 500;
    function onScroll() {
        btn.classList.toggle('visible', window.scrollY > threshold);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

/**
 * Cursor glow — תאורה רכה אחרי סמן העכבר (אפקט יוקרה)
 */
function initCursorGlow() {
    if (window.matchMedia('(hover: none)').matches || window.innerWidth < 769) return;

    const glow = document.createElement('div');
    glow.className = 'cursor-glow';
    document.body.appendChild(glow);

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let glowX = mouseX;
    let glowY = mouseY;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        glow.classList.add('active');
    });

    document.addEventListener('mouseleave', () => glow.classList.remove('active'));

    function animateGlow() {
        // smoothing factor — אפקט "מתעכב" אחרי הסמן
        glowX += (mouseX - glowX) * 0.12;
        glowY += (mouseY - glowY) * 0.12;
        glow.style.transform = `translate(${glowX}px, ${glowY}px) translate(-50%, -50%)`;
        requestAnimationFrame(animateGlow);
    }
    animateGlow();
}

/**
 * Hero title parallax — הכותרת מתרחבת בגלילה (אפקט aluk)
 */
function initHeroParallax() {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;

    let ticking = false;
    function update() {
        const scrolled = window.scrollY;
        const max = 400;
        const ratio = Math.min(scrolled / max, 1);
        const scale = 1 + ratio * 0.08;
        const opacity = 1 - ratio * 0.7;
        heroTitle.style.transform = `scale(${scale})`;
        heroTitle.style.opacity = opacity;
        heroTitle.style.transformOrigin = 'right center';
        ticking = false;
    }
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(update);
            ticking = true;
        }
    }, { passive: true });
}

/**
 * Image fallbacks — תופס תמונות שבורות ומחיל סגנון fallback על ההורה
 */
function initImageFallbacks() {
    const handleError = (img) => {
        img.style.display = 'none';
        const parent = img.parentElement;
        if (parent && (parent.classList.contains('hero-image') || parent.classList.contains('about-image'))) {
            parent.classList.add('image-fallback');
        }
    };

    document.querySelectorAll('.hero-image img, .about-image img').forEach(img => {
        // אם כבר נכשלה לפני ה-listener
        if (img.complete && img.naturalHeight === 0) {
            handleError(img);
        } else {
            img.addEventListener('error', () => handleError(img), { once: true });
        }
    });
}

/**
 * Header — אפקט גלילה
 */
function initHeader() {
    const header = document.getElementById('header');
    if (!header) return;

    const threshold = 50;

    function onScroll() {
        header.classList.toggle('header-scrolled', window.scrollY > threshold);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
}

/**
 * תפריט מובייל
 */
function initMobileMenu() {
    const toggle = document.querySelector('.mobile-toggle');
    const menu = document.getElementById('nav-menu');
    if (!toggle || !menu) return;

    function closeMenu() {
        toggle.classList.remove('active');
        menu.classList.remove('active');
        document.body.classList.remove('menu-open');
    }

    toggle.addEventListener('click', (e) => {
        e.stopPropagation();
        const isActive = menu.classList.toggle('active');
        toggle.classList.toggle('active', isActive);
        document.body.classList.toggle('menu-open', isActive);
    });

    // סגירה בקליק על קישור
    menu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // סגירה בקליק חיצוני
    document.addEventListener('click', (e) => {
        if (!toggle.contains(e.target) && !menu.contains(e.target)) {
            closeMenu();
        }
    });

    // סגירה ב-Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeMenu();
    });
}

/**
 * Smooth scroll עם offset לכותרת
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const targetId = anchor.getAttribute('href');
            if (targetId === '#' || targetId.length < 2) return;

            const target = document.querySelector(targetId);
            if (!target) return;

            e.preventDefault();
            const headerHeight = document.getElementById('header')?.offsetHeight || 80;
            const offset = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

            window.scrollTo({ top: offset, behavior: 'smooth' });
        });
    });
}

/**
 * FAQ — toggle עצמאי לכל פריט (לא accordion — מונע קפיצות תצוגה)
 */
function initFAQ() {
    const items = document.querySelectorAll('.faq-item');
    items.forEach(item => {
        const q = item.querySelector('.faq-question');
        if (!q) return;

        // a11y
        q.setAttribute('aria-expanded', 'false');

        q.addEventListener('click', (e) => {
            e.preventDefault();
            const isOpen = item.classList.toggle('active');
            q.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });
    });
}

/**
 * אנימציית reveal בגלילה — IntersectionObserver
 */
function initScrollReveal() {
    const elements = document.querySelectorAll('.reveal');
    if (elements.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(el => observer.observe(el));
}

/**
 * עדכון אוטומטי של שנה ב-footer
 */
function initCurrentYear() {
    const yearEl = document.getElementById('current-year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
}
