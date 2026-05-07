# CLAUDE.md — הוראות עבודה לקלוד קוד

> **קובץ זה נטען אוטומטית ע"י Claude Code בתחילת כל סשן.**
> הוא מתאר את המבנה, הדרישות הקבועות והנהלים לבניית אתר ללקוח חדש.

---

## 🎯 המטרה

תבנית גנרית להקמת **דפי נחיתה / אתרי תדמית סטטיים** ללקוחות עסקיים.
האתרים מתארחים על **GitHub Pages** ועומדים בדרישות:

* רספונסיביים מלא (Mobile-First)
* תואמי **Google Search Console (GSC)** ו-Core Web Vitals
* רמת אבטחה גבוהה (CSP, SRI, ללא inline scripts מסוכנים)
* RTL + עברית כברירת מחדל
* נגישות (WCAG 2.1 AA)

---

## 📋 תהליך העבודה לפרויקט חדש (חובה לעקוב לפי הסדר)

### שלב 1 — קריאת הברייף
1. קרא **תמיד** קודם את `BRIEF.md` (אם הלקוח מילא) או את `BRIEF.template.md`.
2. אם הברייף לא מולא — בקש מהמשתמש להשלים את השדות החסרים לפני שמתחילים בקוד.
3. אסור להמציא תוכן עסקי (שמות, טלפונים, כתובות, התמחויות) — תמיד לבקש או להשתמש בנקבע בברייף.

### שלב 2 — מילוי `client.config.json`
1. עדכן את `client.config.json` עם **כל** השדות מהברייף.
2. זהו המקור היחיד של האמת (Single Source of Truth) — כל קובץ אחר שואב ממנו.

### שלב 3 — התאמת התוכן (HTML)
לפי `client.config.json`, עדכן בסדר הבא:
1. `index.html` — שדות כותרת, תגיות meta, schema.org, נווט, hero, about, services, contact, footer.
2. `pages/privacy.html`, `pages/terms.html`, `pages/accessibility.html` — שם העסק, מ.ר/ע.מ, תאריך עדכון.
3. `404.html` — צבעים ושפה.
4. `robots.txt`, `sitemap.xml`, `manifest.json` — דומיין ועדכון תאריכים.

### שלב 4 — התאמת עיצוב (CSS)
1. ערוך **רק** את `css/01-variables.css` עבור התאמת מותג (צבעים, פונטים, רדיוסים).
2. אסור לערוך את שאר קבצי ה-CSS אלא אם הלקוח דורש שינוי מבני.
3. בדוק שהצבעים עומדים ב-AA contrast (4.5:1 לטקסט).

### שלב 5 — התאמת רובריקות
* הלקוח עשוי להיות מתחומים שונים (עו"ד / רופא / יועץ פיננסי / מסעדה / חנות / נדל"ן וכו').
* בתיקיית `sections/` יש **קטעי snippet** ספציפיים לתחומים (`_industry-legal.html`, `_industry-medical.html` וכו').
* החלף את הסקציה `<!-- INDUSTRY_SECTION -->` ב-`index.html` בקטע המתאים, או צור חדש אם התחום לא קיים.

### שלב 6 — אופטימיזציה ובדיקות
לפני סיום:
- [ ] כל `{{PLACEHOLDER}}` הוחלפו (חיפוש: `grep -r "{{" .`)
- [ ] התמונות מוקטנות (≤200KB, פורמט WebP/JPG אופטימלי)
- [ ] כל הקישורים החיצוניים: `target="_blank" rel="noopener noreferrer"`
- [ ] `meta description` בין 120-160 תווים
- [ ] `<title>` עד 60 תווים
- [ ] `sitemap.xml` ו-`robots.txt` עם הדומיין הנכון
- [ ] schema.org JSON-LD תקין (validate ב-search.google.com/test/rich-results)
- [ ] כל התמונות עם `alt` תיאורי
- [ ] טופס יצירת הקשר מחובר (Formspree / Web3Forms / mailto)

---

## 🗂️ מבנה הפרויקט

```
client-landing-template/
├── CLAUDE.md                  ← אתה כאן (לא לערוך)
├── BRIEF.template.md          ← תבנית לאיסוף מידע מהלקוח
├── BRIEF.md                   ← העתק שמולא ללקוח הספציפי (לא ב-Git)
├── README.md                  ← הוראות אנושיות
├── client.config.json         ← מקור האמת היחיד
├── .gitignore
├── CNAME                      ← דומיין GitHub Pages
│
├── index.html                 ← דף הבית
├── 404.html                   ← דף שגיאה
├── robots.txt                 ← SEO
├── sitemap.xml                ← SEO
├── manifest.json              ← PWA
│
├── css/
│   ├── 01-variables.css       ← ⭐ צבעים, פונטים, מרחקים (יחיד שהלקוח משנה)
│   ├── 02-base.css            ← reset, טיפוגרפיה
│   ├── 03-components.css      ← כפתורים, כרטיסים, טפסים
│   ├── 04-sections.css        ← סטיילים לסקציות (hero, about וכו')
│   ├── 05-responsive.css      ← media queries
│   └── styles.css             ← ⭐ הקובץ הראשי שמייבא את כולם
│
├── js/
│   ├── main.js                ← אתחול ראשי
│   ├── ui-handlers.js         ← תפריט, FAQ, scroll
│   ├── form-handler.js        ← טיפול בטופס
│   └── analytics.js           ← GA4 (אופציונלי)
│
├── images/
│   └── README.md              ← רשימת תמונות נדרשות
│
├── pages/
│   ├── privacy.html           ← מדיניות פרטיות
│   ├── terms.html             ← תנאי שימוש
│   └── accessibility.html     ← הצהרת נגישות
│
├── sections/                  ← קטעי snippet לפי תחום (REFERENCE בלבד)
│   ├── _industry-legal.html
│   ├── _industry-medical.html
│   ├── _industry-financial.html
│   ├── _industry-restaurant.html
│   ├── _industry-realestate.html
│   └── _industry-generic.html
│
├── docs/
│   ├── DEPLOYMENT.md          ← העלאה ל-GitHub Pages
│   ├── DOMAIN-SETUP.md        ← חיבור דומיין .co.il
│   ├── GSC-SETUP.md           ← רישום ב-Google Search Console
│   └── SECURITY.md            ← נוהלי אבטחה
│
└── .github/workflows/
    └── pages.yml              ← פריסה אוטומטית
```

---

## 🔒 כללי אבטחה (חובה — אסור לעקוף!)

1. **Content Security Policy (CSP)** — קיים כ-meta tag ב-`<head>` של כל דף. אל תוסיף inline scripts או event handlers (`onclick="..."`) — תמיד דרך `addEventListener`.
2. **Subresource Integrity (SRI)** — כל משאב חיצוני מ-CDN (FontAwesome וכו') חייב כולל `integrity` ו-`crossorigin`.
3. **External links** — תמיד `rel="noopener noreferrer"` + `target="_blank"`.
4. **Forms** — תמיד עם validation בצד-לקוח, honeypot field, ו-action ל-HTTPS.
5. **אסור** לחשוף API keys, סיסמאות, מיילים פרטיים בקוד מקור.
6. **אסור** `eval()`, `innerHTML` עם תוכן חיצוני, או `document.write`.
7. כל הקישורים: HTTPS בלבד.

---

## 📐 סטנדרטים טכניים

| תחום | סטנדרט |
|---|---|
| HTML | HTML5 סמנטי, lang="he" dir="rtl" |
| CSS | CSS Variables, Grid + Flexbox, Mobile-First |
| JS | ES6+ vanilla (ללא jQuery/frameworks) |
| תמונות | WebP/JPG, lazy-loading, alt תיאורי, srcset לרספונסיביות |
| פונטים | Google Fonts עם `preconnect` + `display=swap` |
| גודל index.html | < 100KB |
| Lighthouse יעד | Performance ≥ 90, Accessibility ≥ 95, SEO = 100 |

---

## 🚫 מה לא לעשות

* **לא** להשתמש ב-localStorage/sessionStorage באתרי לקוחות (אלא אם דרישה מפורשת).
* **לא** להוסיף תלויות npm — האתר חייב להיות סטטי לחלוטין.
* **לא** ליצור build steps (Webpack/Vite/וכו') — ה-HTML הוא ה-source.
* **לא** למחוק את הסקציות `privacy/terms/accessibility` — חובה משפטית בישראל.
* **לא** לשנות את שם הקבצים של ה-CSS המודולרי (סדר הטעינה חשוב).
* **לא** לשלב מערכות צ'אט/CRM ללא אישור מפורש — סוגיות פרטיות.

---

## 💬 תקשורת מועדפת

* כותב התבנית: **ניל קאפל** (NK Planning) — neil.k.planning@gmail.com
* שפת הפרויקטים: עברית (RTL)
* קבצים שלא נערכים אחרי הקמה: `02-base.css` ועד `05-responsive.css`, כל קבצי ה-JS, קבצי `docs/`.

---

**גרסת תבנית:** 1.0.0 | **תאריך:** 05/2026
