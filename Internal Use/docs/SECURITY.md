# אבטחת האתר

## עקרונות

האתרים מארחים תוכן סטטי על GitHub Pages — אין שרת, אין DB, אין login. רוב וקטורי התקיפה הסטנדרטיים אינם רלוונטיים. עיקר ההגנה היא:

1. **CSP** — מניעת הזרקת JS זדוני
2. **SRI** — וידוא שספריות חיצוניות (FontAwesome) לא הוחלפו
3. **HTTPS** — כפוי ע"י GitHub Pages
4. **טפסים** — Honeypot + validate, ללא אחסון מקומי
5. **קישורים חיצוניים** — `rel="noopener noreferrer"`

## CSP (Content Security Policy)

ב-`<head>` של כל עמוד:

```html
<meta http-equiv="Content-Security-Policy" content="
  default-src 'self';
  script-src 'self' https://www.googletagmanager.com https://www.google-analytics.com;
  style-src 'self' https://fonts.googleapis.com https://cdnjs.cloudflare.com;
  font-src 'self' https://fonts.gstatic.com https://cdnjs.cloudflare.com;
  img-src 'self' data: https:;
  connect-src 'self' https://formspree.io https://www.google-analytics.com;
  frame-ancestors 'none';
">
```

**אסור** להשתמש ב-`'unsafe-inline'` ל-script. אם צריך JS דינמי — שים בקובץ נפרד תחת `js/`.

## SRI (Subresource Integrity)

ל-CDN חיצוני, חובה hash:

```html
<link rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
      integrity="sha512-..."
      crossorigin="anonymous"
      referrerpolicy="no-referrer">
```

ה-hash זמין בדף של CDNJS לכל גרסה.

## טופס יצירת קשר

### Honeypot
שדה נסתר בשם `website` שאמור להישאר ריק. בוטים ממלאים אותו → הטופס נדחה.
מיושם ב-`js/form-handler.js`.

### Formspree
- **לעולם לא** לשמור את endpoint Formspree בקוד פתוח עם הגדרות אבטחה רגישות.
- הפעל ב-Formspree:
  - reCAPTCHA (חינמי)
  - **Allowed Domains** — רק הדומיין של הלקוח
  - **Email notifications** + autoresponder

### Validation
- אימייל: regex סטנדרטי
- טלפון ישראלי: `/^0\d{1,2}-?\d{7}$/`
- טקסט: trimming + max length

## הגנה מ-Clickjacking

ה-meta CSP כולל `frame-ancestors 'none'` שמונע הטמעה ב-iframe.

> שים לב: `X-Frame-Options` כ-HTTP header לא ניתן להגדיר ב-GitHub Pages, ולכן ה-CSP הוא ההגנה היחידה. זה מספיק לדפדפנים מודרניים.

## חשיפה של פרטים אישיים

⚠️ **חשוב** — בכל פרויקט לקוח:
- `BRIEF.md` מכיל מידע אישי (שמות, טלפונים, כתובות פרטיות, החלטות עסקיות)
- הקובץ נמצא ב-`.gitignore` כברירת מחדל
- אסור לעולם לעשות commit ל-`BRIEF.md` בריפו ציבורי
- בדוק לפני push: `git status` — אם BRIEF.md מופיע, תקן את ה-gitignore

## הגנה על דומיין

- הפעל **Domain Lock** אצל BOX/הספק
- הפעל **2FA** בחשבון GitHub
- הפעל **2FA** בחשבון של הלקוח (אם קיבלת גישה)

## בדיקות שבועיות (אחרי עלייה לאוויר)

- https://securityheaders.com/?q=example.co.il — שאף לציון A+
- https://observatory.mozilla.org — בדיקה מקיפה
- https://www.ssllabs.com/ssltest/ — SSL grade
