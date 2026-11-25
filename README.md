# Vatsal Kansagara – Portfolio

Personal portfolio of Vatsal Kansagara, Full Stack Developer (React.js, PHP, MySQL).

Live site: https://vatsalkansagara.vercel.app/

## Built with
HTML5, CSS3, JavaScript, jQuery, Typed.js, ScrollReveal, Vanilla Tilt, particles.js, Font Awesome, EmailJS.

## Folder structure
```
index.html          main page
css/style.css       all styles
js/script.js        site logic, animations, contact form (EmailJS settings at the top)
js/app.js           particles background settings
images/             WebP screenshots and icons
VATSAL_KANSAGARA_RESUME.pdf
```

## Contact form (EmailJS)
Keys are at the top of `js/script.js` (service `service_thu5ucn`, template `template_jw6r4ce`). Template variables: `{{name}}`, `{{email}}`, `{{phone}}`, `{{message}}`. If EmailJS fails, WhatsApp opens automatically with the same message.

## Project cards
Showcase cards use screenshots from `images/projects/<name>/01.webp, 02.webp...`. Copy an existing `showcase-card` block in `index.html` and change the folder, image count and text.

If the form shows an error, the message now includes the EmailJS error text (e.g. "412 Gmail_API: ..."). Check Email Services and the template "To email" in the EmailJS dashboard.

### Enable Job Portal (when live)
In the Job Portal card: remove class `coming-soon`, delete the `<span class="btn disabled">` line, and uncomment the `<a>` line above it.

## Run locally
Open `index.html` in a browser, or use any static server such as `npx serve`.
