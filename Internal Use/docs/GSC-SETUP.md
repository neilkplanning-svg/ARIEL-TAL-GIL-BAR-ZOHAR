# רישום ב-Google Search Console

## למה?

GSC מאפשר לעקוב אחרי איך גוגל רואה את האתר, לזהות בעיות אינדקס, לראות שאילתות חיפוש ולשלוח sitemap להאצת הסריקה.

## שלב 1: הוספת Property

1. https://search.google.com/search-console
2. **Add Property** → בחר **Domain** (מומלץ — מכסה גם www וגם https)
3. הזן `example.co.il`

## שלב 2: אימות בעלות

גוגל יבקש להוסיף רשומת **TXT** ב-DNS:

| Type | Name | Value |
|------|------|-------|
| TXT | @ | `google-site-verification=...` |

הוסף את זה בפאנל ה-DNS של ספק הדומיין. המתן 5-30 דקות → **Verify** ב-GSC.

> חלופה: אם בחרת **URL prefix** במקום Domain, אפשר לאמת באמצעות העלאת קובץ HTML או meta tag. עבור meta tag — הוסף ל-`<head>` ב-`index.html`:
> ```html
> <meta name="google-site-verification" content="..." />
> ```

## שלב 3: הגשת Sitemap

1. בתבנית קיים `sitemap.xml` — ודא שהדומיין בו תקין (הוחלף ע"י Claude Code).
2. ב-GSC → **Sitemaps** → הזן `sitemap.xml` → **Submit**
3. אחרי כמה ימים יופיע סטטוס Success עם מספר עמודים שאונדקסו.

## שלב 4: בדיקות חיוניות

- **Coverage** → אסור שיהיו עמודים עם Error
- **Mobile Usability** → צריך להיות ירוק (התבנית מותאמת לזה)
- **Core Web Vitals** → אחרי כשבוע יופיעו נתונים. שאף ל-LCP < 2.5s, CLS < 0.1.
- **URL Inspection** → הזן את ה-URL הראשי, **Request Indexing** להאצת אינדוקס.

## חיבור Google Analytics 4 (אופציונלי)

1. https://analytics.google.com → צור property חדש
2. קבל **Measurement ID** (פורמט: `G-XXXXXXXXXX`)
3. ב-`client.config.json` עדכן את `analytics.gaMeasurementId`
4. Claude Code יחליף את ה-placeholder ב-`js/analytics.js` ובאינדקס.

## רשימת בדיקה SEO לפני עלייה לאוויר

- [ ] `<title>` ייחודי בכל עמוד, עד 60 תווים
- [ ] `<meta name="description">` עד 160 תווים, עם מילות מפתח
- [ ] תמונת `og-image.jpg` במידות 1200×630
- [ ] Schema.org JSON-LD מלא (סוג עסק, כתובת, טלפון, שעות פעילות)
- [ ] תגי `alt` בכל התמונות
- [ ] heading hierarchy תקין (H1 אחד בלבד, H2 ל-sections)
- [ ] קישורים פנימיים בין עמודים
- [ ] עמוד 404 מותאם (קיים בתבנית)
- [ ] קצב טעינה < 3 שניות (PageSpeed Insights)
