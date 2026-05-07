# מדריך העלאת האתר ל-GitHub Pages

## שלב 1: יצירת ריפו חדש

1. היכנס ל-https://github.com → **New repository**
2. שם הריפו: מומלץ `<client-slug>-site` (למשל `orit-beneli-site`)
3. **Public** (חובה ל-GitHub Pages בחשבון חינמי)
4. אל תוסיף README/gitignore — נעלה הכל מקומית

## שלב 2: העלאת הקבצים

מתוך תיקיית הפרויקט של הלקוח (אחרי שמילאת `BRIEF.md` ו-Claude Code סיים לעדכן):

```bash
git init
git add .
git commit -m "Initial site"
git branch -M main
git remote add origin https://github.com/<your-user>/<repo-name>.git
git push -u origin main
```

## שלב 3: הפעלת GitHub Pages

1. בריפו → **Settings** → **Pages**
2. **Source**: `Deploy from a branch`
3. **Branch**: `main` / `(root)` → **Save**
4. תוך 1-2 דקות יופיע URL: `https://<user>.github.io/<repo>/`

> **חלופה**: אם קיים `.github/workflows/pages.yml` (כלול בתבנית), בחר **Source = GitHub Actions**. הדפלוי אוטומטי בכל push.

## שלב 4: חיבור דומיין מותאם (.co.il)

1. בקובץ `CNAME` ודא שמופיע הדומיין הנקי (ללא https, ללא www): `example.co.il`
2. ב-GitHub → Settings → Pages → **Custom domain** → הזן `example.co.il` → Save
3. אצל ספק הדומיין (BOX/אחר) הוסף רשומות DNS:
   - `A` records לכתובות של GitHub Pages:
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`
   - `CNAME` עבור www → `<user>.github.io`
4. המתן ל-DNS propagation (עד 24 שעות, בד"כ דקות).
5. סמן **Enforce HTTPS** ב-GitHub Pages אחרי שה-cert נוצר.

## שלב 5: בדיקות אחרי עלייה לאוויר

- [ ] האתר נטען ב-`https://<domain>`
- [ ] HTTPS פעיל (מנעול ירוק)
- [ ] הפניית www עובדת
- [ ] WhatsApp/חיוג עובדים מהמובייל
- [ ] טופס יצירת קשר שולח (ראה DEPLOYMENT-FORMS למטה)

## חיבור Formspree לטופס

1. הירשם ב-https://formspree.io (התוכנית החינמית = 50 הודעות בחודש)
2. צור טופס חדש → קבל מזהה כמו `xyzabc123`
3. ב-`index.html` עדכן את ה-form:
   ```html
   <form id="contact-form" data-endpoint="https://formspree.io/f/xyzabc123">
   ```
4. בדוק שליחה אמיתית — האימייל הראשון דורש אישור.
