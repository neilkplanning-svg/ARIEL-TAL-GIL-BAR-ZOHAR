/**
 * analytics.js
 * Google Analytics 4 — אופציונלי.
 *
 * שימוש:
 *   1. הגדר GA4 Property ב-analytics.google.com
 *   2. החלף את {{GA_MEASUREMENT_ID}} ב-Measurement ID (פורמט: G-XXXXXXXXXX)
 *   3. אם לא רוצים אנליטיקס — אל תוסיפו את הסקריפט ב-HTML.
 *
 * הערה לפרטיות:
 *   - GA4 כבר מבטל את ה-IP אוטומטית.
 *   - מומלץ להוסיף הצהרת cookies ב-privacy.html.
 */

(function() {
    'use strict';

    const GA_ID = '{{GA_MEASUREMENT_ID}}';

    // אל תפעיל אם ה-ID לא הוגדר
    if (!GA_ID || GA_ID.startsWith('{{')) {
        return;
    }

    // טעינת gtag.js
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag() { window.dataLayer.push(arguments); }
    window.gtag = gtag;

    gtag('js', new Date());
    gtag('config', GA_ID, {
        anonymize_ip: true,
        cookie_flags: 'SameSite=None;Secure'
    });

    // Helper לאירועים מותאמים
    window.trackEvent = function(action, category, label, value) {
        gtag('event', action, {
            event_category: category,
            event_label: label,
            value: value
        });
    };
})();
