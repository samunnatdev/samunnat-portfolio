# Samunnat Tuladhar — Personal Profile & Portfolio

A personal profile and portfolio website for **Samunnat Tuladhar**, an aspiring AI/ML engineer building foundations in Python, data, and intelligent systems.

The site presents Samunnat’s background, current work-in-progress project, learning path, experience, and contact links in a responsive editorial-style interface.

## Portfolio

- **Home** — Introduction, profile image, headline, and focus areas
- **About** — Personal story, learning philosophy, and profile links
- **Project** — Project 1 work-in-progress showcase
- **Experience** — Current learning path and skills snapshot
- **Contact** — Email, GitHub, and LinkedIn links

## Highlights

- Responsive desktop and mobile layouts
- Light/dark mode with local preference persistence
- Custom animated sun-to-moon theme toggle
- Smooth color transitions between themes
- Accessible focus states and descriptive button labels
- Hover interactions for navigation links, buttons, and project surfaces
- Portable embedded profile image
- Custom domain metadata and GitHub Pages deployment configuration

## Design system

The visual identity uses the following palette:

- **Molten Lava:** `#780000`
- **Flag Red:** `#c1121f`
- **Papaya Whip:** `#fdf0d5`
- **Deep Space Blue:** `#003049`
- **Steel Blue:** `#669bbc`

Typography combines Space Grotesk for display headings, DM Sans for readable interface text, and DM Mono for labels and metadata.

## Tech stack

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Wouter for client-side routing
- Lucide React for interface icons
- GitHub Actions and GitHub Pages for deployment

## Run locally

Requirements:

- Node.js 20 or newer
- pnpm

Install dependencies and start the development server:

```bash
pnpm install
pnpm dev
```

Run the validation checks:

```bash
pnpm check
pnpm build
```

## Project structure

```text
client/
  public/       Static public assets, including the custom-domain CNAME
  src/
    components/ Shared UI components
    contexts/   Theme context and persistence
    lib/        Shared utilities and embedded profile asset
    pages/      Home, About, Project, Experience, and Contact pages
    App.tsx     Layout, navigation, routes, and theme control
    index.css   Design tokens, responsive styles, and animations
  index.html    Metadata and canonical URL
.github/
  workflows/    GitHub Pages deployment workflow
CNAME           Custom domain configuration
```

## Deployment

The repository includes a GitHub Actions workflow at `.github/workflows/deploy-pages.yml`. Every push to `main`:

1. Installs dependencies with the project’s pinned pnpm version
2. Builds the production site
3. Preserves the custom domain file
4. Uploads the static site artifact
5. Deploys it to GitHub Pages

The configured custom domain is:

```text
samunnattuladhar.me
```

## Contact

- Email: [samunnat.dev@gmail.com](mailto:samunnat.dev@gmail.com)
- GitHub: [github.com/samunnatdev](https://github.com/samunnatdev)
- LinkedIn: [Samunnat Tuladhar](https://www.linkedin.com/in/samunnat-tuladhar-3528b0408/)

## License

This project is a personal portfolio website. The source structure and implementation are shared for reference; personal content and profile imagery belong to Samunnat Tuladhar.
