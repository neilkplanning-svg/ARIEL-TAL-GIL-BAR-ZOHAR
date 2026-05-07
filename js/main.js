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
});

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
 * FAQ — accordion
 */
function initFAQ() {
    const items = document.querySelectorAll('.faq-item');
    items.forEach(item => {
        const q = item.querySelector('.faq-question');
        if (!q) return;

        q.addEventListener('click', () => {
            const wasActive = item.classList.contains('active');
            items.forEach(i => i.classList.remove('active'));
            if (!wasActive) item.classList.add('active');
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
