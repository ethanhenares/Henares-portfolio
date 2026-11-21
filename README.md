# Kei — Portfolio

A personal portfolio for a graphic designer, built with **React**, **React Router** and **Tailwind CSS** (mobile-first), bundled with **Vite**.

## Pages

| Route | Page |
| --- | --- |
| `/` | Home |
| `/about` | About and skills |
| `/projects` | Projects, with switchable posters |
| `/socials` | Social media links |
| `/contact` | Contact form |
| anything else | 404 Not Found |

All pages share one `Header` and `Footer` through `Layout` and React Router's `Outlet`.

## Run it

```bash
npm install
npm run dev      
npm run build    
npm run lint     
```

## Project structure

```
src/
  components/   reusable pieces: Layout, Header, Footer, ProjectCard, Button, Field, Notice, ...
  pages/        one file per route
  data/         content you edit: projects.js (projects + posters) and site.js (contact + socials)
  index.css     Tailwind setup: colors, fonts, breakpoints, animations
public/
  posters/      project images
```

## Editing the content

- **Projects and posters:** `src/data/projects.js` (each poster has an `alt` text for screen readers).
- **Contact email / form and social links:** `src/data/site.js`.

## Deploying

Deployed on Vercel. `vercel.json` rewrites every URL to `index.html`, so opening or refreshing a page directly (for example `/about`) works. On Netlify, add a file `public/_redirects` containing `/* /index.html 200` instead.
