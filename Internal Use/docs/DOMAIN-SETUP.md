# רכישה וחיבור דומיין .co.il

## רכישה

ספקים נפוצים בישראל:
- **BOX** (box.co.il) — מומלץ, ממשק ניהול נוח
- **Domain The Net** (domainthenet.com)
- **ISOC-IL** דרך רשמים מורשים

עלות: כ-50-80 ₪ לשנה.

## הגדרת DNS עבור GitHub Pages

לאחר רכישת הדומיין, היכנס לפאנל הניהול → **DNS Management** והגדר:

### A Records (לדומיין הראשי)

| Type | Name | Value | TTL |
|------|------|-------|-----|
| A | @ | 185.199.108.153 | 3600 |
| A | @ | 185.199.109.153 | 3600 |
| A | @ | 185.199.110.153 | 3600 |
| A | @ | 185.199.111.153 | 3600 |

### CNAME (לתת-דומיין www)

| Type | Name | Value | TTL |
|------|------|-------|-----|
| CNAME | www | `<your-username>.github.io.` | 3600 |

> ⚠️ שים לב לנקודה בסוף ה-CNAME בחלק מהפאנלים.

## אימות

```bash
dig example.co.il +short
# צריך להחזיר את 4 הכתובות של GitHub
dig www.example.co.il +short
# צריך להחזיר את כתובת ה-github.io
```

או דרך https://dnschecker.org

## הקובץ CNAME בריפו

הקובץ `CNAME` בשורש הריפו חייב להכיל את הדומיין הנקי בלבד:
```
example.co.il
```
ללא `https://`, ללא `www`, ללא רווחים, ללא שורה ריקה בסוף.

## מייל עסקי ממותג (אופציה +500 ₪)

אם הלקוח רוצה `office@example.co.il`:
1. ב-BOX → שירותי דואר → רכישת תיבת דואר (~100 ₪/שנה)
2. הוסף MX records לפי הוראות הספק
3. הזן את הכתובת ב-`client.config.json` תחת `contact.email`
