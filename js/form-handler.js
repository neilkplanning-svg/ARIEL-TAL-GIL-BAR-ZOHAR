/**
 * form-handler.js
 * טיפול בטופס יצירת קשר עם validation, honeypot, ושליחה ל-Formspree.
 *
 * הגדרת FORM_ENDPOINT:
 *   1. הירשם ל-Formspree (https://formspree.io) או Web3Forms (https://web3forms.com)
 *   2. החלף את הערך ב-data-endpoint על תג ה-form ב-HTML.
 *   3. אם לא הוגדר endpoint — הטופס יציג הודעת הצלחה דמה (לבדיקות בלבד).
 */

function initContactForm() {
    const form = document.querySelector('.contact-form');
    if (!form) return;

    form.addEventListener('submit', handleSubmit);
}

async function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;

    // ניקוי שגיאות קודמות
    form.querySelectorAll('.error-message').forEach(el => el.remove());
    form.querySelectorAll('.has-error').forEach(el => el.classList.remove('has-error'));

    // Honeypot — אם הוא מולא, זה בוט
    const honeypot = form.querySelector('input[name="website"]');
    if (honeypot && honeypot.value.trim() !== '') {
        // לא שולחים — נראה הצלחה כדי לבלבל את הבוט
        showSuccess(form);
        return;
    }

    // Validation
    const name = form.querySelector('#name');
    const phone = form.querySelector('#phone');
    const email = form.querySelector('#email');
    const subject = form.querySelector('#subject');

    let valid = true;

    if (name && !name.value.trim()) {
        showError(name, 'נא להזין שם מלא');
        valid = false;
    }
    if (phone && !phone.value.trim()) {
        showError(phone, 'נא להזין מספר טלפון');
        valid = false;
    } else if (phone && !isValidIsraeliPhone(phone.value)) {
        showError(phone, 'מספר טלפון לא תקין');
        valid = false;
    }
    if (email && email.value.trim() && !isValidEmail(email.value)) {
        showError(email, 'כתובת מייל לא תקינה');
        valid = false;
    }
    if (subject && !subject.value) {
        showError(subject, 'נא לבחור נושא');
        valid = false;
    }

    if (!valid) return;

    // שליחה
    const submitBtn = form.querySelector('.submit-btn');
    const originalHTML = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> שולח...';

    const endpoint = form.dataset.endpoint;

    try {
        if (endpoint && endpoint !== '' && !endpoint.startsWith('{{')) {
            // שליחה אמיתית
            const data = new FormData(form);
            const response = await fetch(endpoint, {
                method: 'POST',
                body: data,
                headers: { 'Accept': 'application/json' }
            });
            if (!response.ok) throw new Error('Network error');
        } else {
            // מצב בדיקה — דמה הצלחה
            await new Promise(r => setTimeout(r, 800));
            console.warn('[form-handler] No endpoint configured — simulated success.');
        }

        showSuccess(form, submitBtn);
    } catch (err) {
        console.error('[form-handler] Error:', err);
        submitBtn.innerHTML = originalHTML;
        submitBtn.disabled = false;
        alert('אירעה שגיאה בשליחה. אנא נסו שוב או צרו קשר טלפוני.');
    }
}

function showError(el, message) {
    if (!el) return;
    el.classList.add('has-error');
    el.style.borderColor = 'var(--error)';
    const span = document.createElement('div');
    span.className = 'error-message';
    span.textContent = message;
    el.parentElement.appendChild(span);
}

function showSuccess(form, btn) {
    if (btn) {
        btn.innerHTML = '<i class="fas fa-check"></i> נשלח בהצלחה!';
        btn.style.background = 'var(--success)';
    }
    setTimeout(() => {
        form.reset();
        if (btn) {
            btn.innerHTML = '<i class="fas fa-paper-plane"></i> שלחו פנייה';
            btn.style.background = '';
            btn.disabled = false;
        }
    }, 4000);
}

function isValidIsraeliPhone(value) {
    // מחיקת רווחים, מקפים וסוגריים
    const clean = value.replace(/[\s\-()]/g, '');
    // 0XX-XXXXXXX או +972XXXXXXXXX
    return /^(0\d{8,9}|\+972\d{8,9})$/.test(clean);
}

function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

// אתחול אוטומטי
document.addEventListener('DOMContentLoaded', initContactForm);
