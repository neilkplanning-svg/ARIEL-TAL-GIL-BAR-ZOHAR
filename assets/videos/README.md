# Video Assets — TODO List

האתר מצפה לקבצי וידאו בנתיבים הבאים. כרגע **חסרים כל הקבצים** — כשהם לא קיימים, הדפדפן יציג את ה־poster (תמונה סטטית) או רקע בלבד, ושום דבר לא נשבר. אחרי שתוריד ותדחוס ותעלה — הסרטונים יתחילו לפעול אוטומטית.

## 📋 רשימת קבצים נדרשים

### 1. Hero — סרטון הרקע הראשי
**נתיב:** `assets/videos/hero.mp4`
**גודל יעד:** 3-5 MB
**אורך:** 15-30 שניות, loop חלק
**רזולוציה:** 1920×1080
**ללא אודיו**

**הצעות חיפוש:**
- 🥇 [Pexels — jerusalem skyline](https://www.pexels.com/search/videos/jerusalem%20skyline/) — נוף ירושלים בשעת הזהב (חיבור רעיוני למשרד)
- [Pexels — tel aviv night](https://www.pexels.com/search/videos/tel%20aviv%20night/) — נוף תל אביב מהאוויר
- [Pexels — luxury office](https://www.pexels.com/search/videos/luxury%20office/) — משרד יוקרתי עם חלונות פנורמיים
- [Pexels — marble texture](https://www.pexels.com/search/videos/marble%20texture/) — שיש מסתובב לאט

**Poster (חובה!):**
`assets/videos/hero-poster.jpg` — תמונה סטטית מהפריים הראשון של הסרטון. במובייל זו התצוגה הקבועה (כדי לחסוך דאטה). אם חסר — הדפדפן יציג רקע gradient.

**פקודת ffmpeg:**
```bash
ffmpeg -i input.mp4 -vcodec libx264 -crf 28 -preset slow -vf "scale=1920:-2" -an hero.mp4
ffmpeg -i input.mp4 -ss 00:00:02 -frames:v 1 -q:v 3 -vf "scale=1920:-2" hero-poster.jpg
```

---

### 2. Service Cards — 13 סרטוני מיקרו לכרטיסי שירות
**נתיבים:** `assets/videos/services/service-01.mp4` ... `service-13.mp4`
**גודל יעד:** ~1 MB כל אחד (sum ≈ 13 MB)
**אורך:** 6-10 שניות loop
**רזולוציה:** 1280×720
**ללא אודיו**

הכרטיסים יעבדו ב־3 מצבים:
- **דסקטופ:** הסרטון בעצירה. נכנס סמן → מתחיל לנגן. יוצא סמן → נעצר ומחזיר ל־0.
- **מובייל:** סרטון מנגן ברציפות (lazy-loaded דרך IntersectionObserver).
- **`prefers-reduced-motion`:** סרטונים לא מנגנים בכלל; נשארת תמונת ה־poster.

| # | קובץ | תחום | הצעות חיפוש (Pexels/Coverr/Mixkit) |
|---|---|---|---|
| 01 | `service-01.mp4` | דיני משפחה ורכוש | "wedding rings", "house keys closeup" |
| 02 | `service-02.mp4` | ירושה וצוואות | "old documents", "antique pen writing" |
| 03 | `service-03.mp4` | בית דין רבני | "ancient hebrew text", "candle flame slow" |
| 04 | `service-04.mp4` | עתירות לבג"ץ | "courthouse columns", "supreme court" |
| 05 | `service-05.mp4` | נזיקין | "medical professional", "hospital corridor" |
| 06 | `service-06.mp4` | עסקים וסכסוכים מסחריים | "handshake business", "boardroom" |
| 07 | `service-07.mp4` | הבראת עסקים | "calculator finance", "graph chart" |
| 08 | `service-08.mp4` | פירוק שותפויות | "signing contract", "pen paper" |
| 09 | `service-09.mp4` | **דיור ציבורי** (תחום דגל) | "apartment building keys", "house door" |
| 10 | `service-10.mp4` | נדל"ן ומקרקעין | "luxury real estate", "city buildings" |
| 11 | `service-11.mp4` | תכנון ובנייה | "architecture blueprint", "construction crane" |
| 12 | `service-12.mp4` | עתירות מנהליות | "government building", "official documents" |
| 13 | `service-13.mp4` | הוצאה לפועל וכינוס נכסים | "gavel slow motion", "law books" |

**Posters (לכל סרטון):** `service-01-poster.jpg`, ..., `service-13-poster.jpg`.

**פקודת ffmpeg לכל סרטון:**
```bash
ffmpeg -i input.mp4 -t 8 -vcodec libx264 -crf 30 -preset slow -vf "scale=1280:-2" -an service-XX.mp4
ffmpeg -i service-XX.mp4 -ss 0 -frames:v 1 -q:v 3 service-XX-poster.jpg
```

---

### 3. Public Housing Flagship — סרטון לסקציית הדגל
**נתיב:** `assets/videos/housing-flag.mp4`
**גודל יעד:** 2-3 MB
**אורך:** 10-15 שניות loop
**רזולוציה:** 1920×900 (פרופורציה רחבה)

**הצעות חיפוש:**
- "apartment buildings drone"
- "residential building keys"
- "door opening with key"
- [Coverr — buildings](https://coverr.co/s/buildings)

**Poster:** `housing-flag-poster.jpg`

---

## 🛠️ מקורות חינמיים מומלצים

| מקור | יתרונות | קישור |
|---|---|---|
| **Coverr** | חינם, ללא הרשמה, אופטימלי לרקעי וב | https://coverr.co/ |
| **Pexels** | מבחר ענק, חינם לשימוש מסחרי | https://www.pexels.com/videos/ |
| **Mixkit** | חינם לחלוטין, וידאו איכותי | https://mixkit.co/free-stock-video/ |
| **Pixabay** | חינם, אבל לפעמים איכות נמוכה | https://pixabay.com/videos/ |

⚠️ **אזהרה:** *אל* תיקח מ־Adobe Stock / Shutterstock / Getty — הם בתשלום ועם DRM.

---

## ✅ Checklist לפני העלאה ל־GitHub

- [ ] hero.mp4 + hero-poster.jpg קיימים ומתחת ל־5MB
- [ ] 13 service videos + posters קיימים (~1MB כל אחד)
- [ ] housing-flag.mp4 + poster (אופציונלי — אם רוצים גם וידאו ייעודי לסקציית הדגל)
- [ ] כל הסרטונים **ללא אודיו** (ffmpeg -an)
- [ ] כל הסרטונים **H.264 mp4** (תאימות מקסימלית)
- [ ] בדיקה בנייד אמיתי — הסרטונים אוטומטיים
- [ ] בדיקה ב־DevTools עם `prefers-reduced-motion` — סרטונים לא מתחילים

## 💡 טיפ: אם אין זמן/סבלנות לכל הסרטונים

**מינימום קריטי:** רק `hero.mp4` (השפעה ויזואלית הכי גדולה).
**שלב שני:** 3-4 כרטיסי שירות בכרטיסים הראשונים (משפחה, ירושה, בית דין רבני).
**מאוחר יותר:** השאר.

האתר מעוצב כך שאם וידאו חסר → ה־poster מופיע במקומו → אם גם הוא חסר → רקע gradient כהה. **שום דבר לא נשבר.**
