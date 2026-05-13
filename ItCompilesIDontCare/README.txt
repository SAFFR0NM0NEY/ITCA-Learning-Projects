Fixes Applied to Front-End Website
=================================

1. Removed server-side script tags:
   Any <script src="server/routes/..."> tags were removed because server-side code cannot be loaded in the browser.

2. Corrected static asset paths:
   - CSS links changed to 'css/style.css' (no leading slash) to ensure the browser loads the stylesheet from the correct relative path.
   - JS includes updated to 'js/main.js' (no leading slash and correct folder name).
   - Added 'favicon.ico' at the root and <link rel="icon" href="favicon.ico" /> in <head> to prevent 404 errors for the favicon.

3. Updated API calls to Render backend:
   All fetch() calls that previously used '/api/...'
   were replaced with 'https://itcompilesidontcare-backend.onrender.com/api/...', pointing to the hosted backend.

4. Fixed backslashes in paths:
   Replaced any '\\' in 'src' or 'href' attributes with '/' for valid URLs.

5. Ensured category-specific pages fetch filtered data:
   Pages like 'devilfruits.html' now need to fetch from the API endpoint at the Render URL and filter by category name.

Usage Instructions:
-------------------
1. Host these files as a static website (e.g., on GitHub Pages or Netlify).
2. Make sure all files and folders (html, css/, js/, images/, favicon.ico, README.txt) are preserved.
3. Your front-end will load static assets correctly and fetch dynamic content from the Render backend.
