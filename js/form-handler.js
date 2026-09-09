/**
 * form-handler.js
 * טיפול בטופס יצירת קשר עם validation, honeypot ושליחה ל-Web3Forms.
 *
 * הגדרה (פעם אחת):
 *   1. היכנס ל-https://web3forms.com, הזן את כתובת המייל שאליה יגיעו הלידים
 *      וקבל Access Key במייל.
 *   2. הדבק את המפתח ב-index.html, בשדה:
 *        <input type="hidden" name="access_key" value="...">
 *
 * אם המפתח חסר — הטופס *לא* מתחזה להצלחה. הוא מציג שגיאה ומפנה
 * לטלפון ול-WhatsApp, כדי שלא ייעלמו לידים בלי שאיש יידע.
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
    const accessKey = form.querySelector('input[name="access_key"]')?.value.trim();

    try {
        if (!endpoint || endpoint.startsWith('{{')) {
            throw new Error('form endpoint is not configured');
        }
        if (!accessKey || accessKey.startsWith('{{')) {
            throw new Error('web3forms access_key is not configured');
        }

        const response = await fetch(endpoint, {
            method: 'POST',
            body: new FormData(form),
            headers: { 'Accept': 'application/json' }
        });

        // Web3Forms מחזיר 200 עם success:false על מפתח שגוי — יש לבדוק את הגוף.
        const result = await response.json().catch(() => ({}));
        if (!response.ok || result.success === false) {
            throw new Error(result.message || `HTTP ${response.status}`);
        }

        showSuccess(form, submitBtn);
    } catch (err) {
        console.error('[form-handler] Error:', err);
        submitBtn.innerHTML = originalHTML;
        submitBtn.disabled = false;
        showFormFailure(form);
    }
}

/**
 * כשל שליחה — הודעה גלויה בתוך הטופס עם דרכי קשר חלופיות.
 * מוצג במקום alert() כדי לא לחסום ולהישאר נגיש לקוראי מסך.
 */
function showFormFailure(form) {
    let box = form.querySelector('.form-failure');
    if (!box) {
        box = document.createElement('div');
        box.className = 'form-failure';
        box.setAttribute('role', 'alert');
        box.innerHTML =
            '<strong>השליחה נכשלה.</strong> ' +
            'אנא נסו שוב, או צרו קשר ישירות: ' +
            '<a href="tel:+972508813626">050-881-3626</a> · ' +
            '<a href="https://wa.me/972543209765" target="_blank" rel="noopener noreferrer">WhatsApp</a>';
        form.querySelector('.submit-btn').insertAdjacentElement('afterend', box);
    }
    box.hidden = false;
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
