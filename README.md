# 🌐 Client Landing Template — by NK Planning

תבנית גנרית להקמת דפי נחיתה / אתרי תדמית סטטיים ללקוחות, מותאמת ל-GitHub Pages.

---

## ⚡ Quick Start (לאתר חדש ללקוח)

```bash
# 1. שכפל את התבנית לתיקייה חדשה
cp -r client-landing-template/ ./newclient-website/
cd newclient-website/

# 2. העתק את BRIEF.template.md ל-BRIEF.md ומלא אותו
cp BRIEF.template.md BRIEF.md

# 3. פתח את הפרויקט ב-Claude Code (מהתיקייה הנוכחית):
claude

# 4. תן לקלוד את ההוראה:
#    "קרא את CLAUDE.md ואת BRIEF.md ובנה לי אתר ללקוח"
```

קלוד קוד יקרא את `CLAUDE.md` אוטומטית ויעבד לפי השלבים שמוגדרים שם.

---

## 📁 מה יש כאן?

| קובץ / תיקייה | תפקיד |
|---|---|
| `CLAUDE.md` | **הוראות עבודה לקלוד קוד** (לא לערוך) |
| `BRIEF.template.md` | תבנית למילוי פרטי הלקוח |
| `client.config.json` | מקור האמת היחיד — כל המידע במקום אחד |
| `index.html` | דף הבית |
| `pages/` | מדיניות פרטיות, תנאי שימוש, נגישות |
| `css/` | CSS מודולרי (5 קבצים) |
| `js/` | JavaScript מודולרי (4 קבצים) |
| `sections/` | קטעי תוכן ספציפיים לתחום (snippets) |
| `docs/` | תיעוד פריסה, דומיין, GSC, אבטחה |
| `.github/workflows/pages.yml` | פריסה אוטומטית ל-GitHub Pages |

---

## ✅ מה התבנית כוללת מתוך הצעת המחיר?

- [x] עיצוב נקי ורספונסיבי
- [x] CTA: כפתורי חיוג, ווטסאפ צף
- [x] אחסון על GitHub Pages
- [x] HTML סטטי
- [x] טופס לידים (Formspree-ready)
- [x] טמעת Google Maps + כפתור Waze
- [x] עמודי חובה (פרטיות, תקנון, נגישות)
- [x] Schema.org JSON-LD
- [x] Sitemap + robots.txt
- [x] PWA Manifest
- [x] Open Graph + Twitter Cards

תוספים בתשלום (לפי הצעת המחיר):
- [ ] זימון תורים — Google Calendar (חינם להטמעה)
- [ ] כפתור נגישות (+₪300)
- [ ] מייל עסקי ממותג (+₪500)

---

## 🔒 אבטחה

לפרטים מלאים: ראה `docs/SECURITY.md`. בקצרה:
- CSP via meta tag
- SRI על משאבי CDN
- HTTPS only (אכוף ע"י GitHub Pages)
- ללא inline JavaScript מסוכן
- Honeypot fields בטפסים

---

## 📞 יצירת קשר

**ניל קאפל — NK Planning**
neil.k.planning@gmail.com | 054-588-2618

---

**גרסת תבנית:** 1.0.0 | **עודכן:** 05/2026
