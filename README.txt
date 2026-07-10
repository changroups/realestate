CHAN GROUPS REAL ESTATE - FRESH HERO VERSION
===========================================

This version was rebuilt with a fresh hero section for both desktop and mobile.

Main improvements:
- New future-growth hero background image: assets/images/hero-growth.jpg
- Desktop hero uses a clean two-column layout.
- Quick Enquiry form is not squeezed; it has comfortable spacing.
- Mobile hero is compact but readable.
- Mobile menu opens as a 72% width side drawer.
- Mobile gallery works as a swipe slider.
- Sticky bottom buttons: WhatsApp first, Call second.

Open in VS Code:
1. Extract ZIP.
2. Open folder in Visual Studio Code.
3. Right-click index.html.
4. Open with Live Server.

Before publishing, replace sample project text/photos with verified project details.

UPDATE:
- Mobile footer and drawer refined for compact display.
- Drawer now opens as a floating 70% compact panel instead of full-height page.
- Footer links arranged in balanced mobile grid with bottom safe space for sticky buttons.


FINAL COMPACT UI UPDATE
=======================
- Reduced section spacing across desktop and mobile.
- Mobile services now use smaller cards.
- Mobile city and property sections now use horizontal swipe cards to reduce vertical height.
- Quick Enquiry form is compact but still readable.
- Mobile drawer is shorter, lighter and includes Instagram / WhatsApp / Call icons.
- Footer is compressed for mobile with pill links and smaller contact text.


CITY CAROUSEL UPDATE
====================
- City cards auto-slide on mobile every 1 second.
- Added dots below the city cards.
- User can still swipe manually.
- Auto slide pauses briefly during manual touch/swipe.
- City cards were reduced in height for better mobile UI.


CITY SLIDER SPEED + PAGE MOVEMENT FIX
=====================================
- City auto-slide speed changed from 1 second to 3.8 seconds.
- Hero small city strip auto-slide speed changed to 4.2 seconds.
- Replaced scrollIntoView() with horizontal scrollTo(), so the full page will not jump/move during slide change.
- Added carousel stability CSS using overscroll-behavior.


CONTACT + WHATSAPP FORM UPDATE
==============================
- Added Facebook link: https://www.facebook.com/61579498522683
- Added Facebook icon in desktop topbar, mobile drawer, contact section and footer.
- Added 1:1 Property Advice as a paid service.
- Changed Quick Enquiry form to send pre-filled WhatsApp message instead of relying on static form submission.
- Contact section redesigned as compact contact hub to reduce vertical space.
- Services on mobile now use horizontal swipe cards to avoid adding height after adding the paid service.


PROJECT GALLERY UPDATE
======================
You can now add more project images easily.

Folder:
assets/images/projects/

Main list file:
js/gallery-data.js

Steps:
1. Copy your new photos into assets/images/projects/
2. Open js/gallery-data.js
3. Add a new item with the exact file name
4. Save and refresh the website

Important:
A pure static website cannot automatically read all files inside a folder.
So js/gallery-data.js is used as the safe editable image list.


SUPER EASY GALLERY METHOD
=========================

No need to understand js/gallery-data.js.

Use this simple method:
1. Open folder: assets/images/projects/
2. Copy your project photos there.
3. Rename them as:
   project-01.jpg
   project-02.jpg
   project-03.jpg
   project-04.jpg
   project-05.jpg
   project-06.jpg
4. Refresh website.

The website will automatically search from project-01 to project-30.
It supports jpg, jpeg, png and webp.


SOCIAL UPDATE
=============
- Old Facebook link removed.
- New Facebook link added: https://www.facebook.com/changroupsrama
- WhatsApp Channel added: https://whatsapp.com/channel/0029Vb90oEyLI8YOoWBIG93G
- Added Facebook + WhatsApp Channel in:
  * desktop top bar
  * mobile drawer
  * About Rama CH section
  * Contact hub
  * footer socials
- Mobile top bar spacing improved: phone left, social icons right.
- About section UI improved with compact social cards.


BIG CLIENT UPDATE
=================
- Added dual-language Telugu/English switcher.
- Default language is Telugu.
- Added Noto Sans Telugu and Noto Serif Telugu fonts for modern Telugu appearance.
- Removed Cities and Properties from top navigation.
- Added Enroll Mentorship button and separate URL page: mentorship.html
- Added full mentorship landing page with enroll form.
- Renamed paid service to: 1 to 1 Property Advisor.
- Added popup quick enquiry form for 1 to 1 Property Advisor.
- Popup enquiry connects directly to WhatsApp.
- Added highlight card for 1 to 1 Property Advisor in About section.
- Reduced header/nav font sizes and spacing.


FINAL UI FIX UPDATE
===================
- Mentorship page redesigned with improved hero, glass card, timeline, benefits, FAQ and mobile layout.
- Mobile mentorship page now has a visible Back to Website button.
- Main page hero content now supports Telugu/English.
- Featured Categories section now supports Telugu/English.
- Default language storage key updated so new version opens in Telugu by default.
- About Advisor section social cards removed to reduce space.
- Tiny scroll-to-top button added on both main page and mentorship page.


MOBILE HEADER + CITY LANGUAGE + ENROLL THANK YOU UPDATE
=======================================================
- Main mobile header now shows compact Telugu/EN switch and Mentor button beside the hamburger icon.
- Drawer no longer duplicates language switch and mentorship button, reducing clutter.
- Service Locations / City-Focused Property Guidance section now supports Telugu/English.
- Mentorship page mobile header now keeps Back to Website and language switch visible.
- Mentorship enrollment form now opens WhatsApp and also shows a Thank You popup.
- Thank You popup includes a YouTube video area.

HOW TO ADD YOUTUBE VIDEO IN THANK YOU POPUP
===========================================
Open mentorship.html and search:
data-video-src=""

Paste the full YouTube embed URL inside the quotes.

Example:
If YouTube link is:
https://www.youtube.com/watch?v=ABC123xyz

Use:
https://www.youtube.com/embed/ABC123xyz


COMPLETE FINAL POLISH
=====================
- Added mentorship hero metrics: 2H Master Class, 90 Days Training, 365 Days Support.
- Added sticky quick navigation on mentorship page: Enroll, Roadmap, Benefits, FAQ.
- Added smoother card hover polish and improved mobile spacing.
- This ZIP contains the complete website code ready to edit in VS Code.


PREMIUM MOBILE BUGFIX
=====================
- Fixed 1 to 1 Property Advisor popup using event delegation.
- Paid advisor contact card now opens the popup instead of going randomly/directly.
- Popup is hidden by default with inline + CSS failsafe.
- Mentorship mobile header redesigned with clear language bar.
- Mentorship hero card redesigned as a clean premium card.
- Mentorship mobile layout improved and reduced clutter.


FINAL LAUNCH REVIEW PATCH
=========================
- Removed Netlify form attributes because the site is hosted on GitHub Pages.
- Quick Enquiry now relies on WhatsApp submit only.
- Removed visible placeholder text from the property section.
- Added Open Graph / Twitter preview tags to improve WhatsApp sharing previews.
- Added noindex robots meta tag to thank-you.html.
- YouTube thank-you video now uses an empty data-video-src until a real client video is provided, so no broken embed is loaded.


FINAL GALLERY CLEANUP
=====================
- Removed public-facing admin instructions from the Project Gallery section.
- Gallery section now uses client-facing copy.
- Gallery heading/subtitle/filter buttons now support Telugu/English translation.
- City carousel helper text changed to client-facing wording.


INSTAGRAM REEL THANK-YOU UPDATE
===============================
- Mentorship enrollment thank-you popup now uses this Instagram Reel:
  https://www.instagram.com/reel/DaSw2_byFE_/?igsh=MXZuanZ3YnVyeWJkNw==
- Embed URL used:
  https://www.instagram.com/reel/DaSw2_byFE_/embed
- Facebook display name updated to:
  Chan Rama Groups


ENROLL BUTTON FIX
=================
- Fixed mentorship hero Enroll Now button.
- Added id="enroll" to the enrollment form card so href="#enroll" scrolls correctly.


HERO ENROLL POPUP UPDATE
========================
- Mentorship hero "Enroll Now" button now opens a popup modal instead of scrolling down.
- Popup contains the enrollment form.
- Existing enrollment section remains available lower on the page.
- Both popup form and lower page form send details to WhatsApp and then show the thank-you popup.
