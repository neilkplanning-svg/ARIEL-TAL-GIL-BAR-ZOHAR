/**
 * video-hover.js
 * ניהול וידאו ברקעי כרטיסי שירות + סרטון Hero.
 *
 * התנהגות:
 *   - דסקטופ: סרטון בכרטיס שירות מנגן רק על hover.
 *   - מובייל: סרטונים מנגנים באוטומט (קטעי-loop קצרים).
 *   - prefers-reduced-motion: שום סרטון לא מנגן, רק poster.
 *   - IntersectionObserver: סרטונים שמתחת ל-fold נטענים רק כשמתקרבים לתצוגה.
 *
 * הקובץ מוטען עם defer; רץ ל-DOMContentLoaded.
 */

(function () {
    'use strict';

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouch = window.matchMedia('(hover: none)').matches || window.innerWidth < 769;

    function init() {
        if (prefersReducedMotion) {
            // אל תפעיל סרטונים — השאר poster בלבד
            document.querySelectorAll('video[data-src]').forEach(v => v.removeAttribute('data-src'));
            return;
        }

        initHeroVideo();
        initServiceCardVideos();
    }

    /**
     * Hero video — autoplay loop muted
     */
    function initHeroVideo() {
        const hero = document.querySelector('.hero-video');
        if (!hero) return;

        // במובייל — אל תטען את הוידאו כלל (חיסכון דאטה)
        if (isTouch && window.innerWidth < 769) {
            hero.remove();
            return;
        }

        loadVideoSource(hero);
        const tryPlay = () => {
            const p = hero.play();
            if (p && typeof p.catch === 'function') {
                p.catch(() => { /* autoplay blocked — fine, poster stays */ });
            }
        };
        if (hero.readyState >= 2) tryPlay();
        else hero.addEventListener('loadeddata', tryPlay, { once: true });
    }

    /**
     * Service card videos — hover on desktop, always on mobile
     */
    function initServiceCardVideos() {
        const cards = document.querySelectorAll('.service-card');
        if (!cards.length) return;

        // טעינה עצלה דרך IntersectionObserver
        const lazyObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const video = entry.target.querySelector('.service-card-video');
                    if (video && video.dataset.src && !video.src) {
                        loadVideoSource(video);

                        // במובייל — מתחילים לנגן אוטומטית כשבתצוגה
                        if (isTouch) {
                            entry.target.classList.add('is-mobile');
                            video.muted = true;
                            video.loop = true;
                            video.playsInline = true;
                            const p = video.play();
                            if (p && typeof p.catch === 'function') p.catch(() => {});
                        }
                    }
                    lazyObserver.unobserve(entry.target);
                }
            });
        }, { rootMargin: '300px 0px' });

        cards.forEach(card => {
            lazyObserver.observe(card);

            const video = card.querySelector('.service-card-video');
            if (!video) return;

            if (!isTouch) {
                // דסקטופ: hover מתחיל ניגון, leave מאפס
                card.addEventListener('mouseenter', () => {
                    if (!video.src && video.dataset.src) loadVideoSource(video);
                    const p = video.play();
                    if (p && typeof p.catch === 'function') p.catch(() => {});
                });
                card.addEventListener('mouseleave', () => {
                    video.pause();
                    try { video.currentTime = 0; } catch (e) {}
                });
                // קיבולת מקלדת: focus = hover
                card.addEventListener('focusin', () => {
                    if (!video.src && video.dataset.src) loadVideoSource(video);
                    const p = video.play();
                    if (p && typeof p.catch === 'function') p.catch(() => {});
                });
                card.addEventListener('focusout', () => {
                    video.pause();
                    try { video.currentTime = 0; } catch (e) {}
                });
            }
        });
    }

    /**
     * העברת data-src ל-src בפועל (lazy)
     */
    function loadVideoSource(video) {
        if (!video.dataset.src) return;
        if (video.src) return;
        video.src = video.dataset.src;
        video.removeAttribute('data-src');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
