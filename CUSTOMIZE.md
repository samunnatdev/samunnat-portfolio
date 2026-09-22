# Customize your portfolio

This site is a static React project. The content is intentionally kept in small page components so you can change it without searching through a large file.

## Change colors

Open `client/src/index.css` and edit the variables near the top of the file. The current palette is:

| Variable | Current value | Used for |
|---|---|---|
| `--deep` | `#003049` | Header, footer, dark panels, primary text |
| `--red` | `#C1121F` | Headings, buttons, active states |
| `--lava` | `#780000` | Hover states and darker emphasis |
| `--papaya` | `#FDF0D5` | Main page background |
| `--steel` | `#669BBC` | Metadata, lines, supporting accents |
| `--cream` | `#FFF8E9` | Cards and lighter surfaces |

Change a hex value, save, and the preview server will refresh automatically. Keep the contrast between `--deep` and `--papaya` strong for readable text.

## Change your name, headline, and bio

- Home hero: `client/src/pages/Home.tsx`
- About page: `client/src/pages/About.tsx`
- Footer headline: `client/src/App.tsx`
- Page titles and descriptions: `client/index.html`

Search for the sentence or heading you want to replace, edit the text between the JSX tags, and save. Use plain apostrophes or standard curly apostrophes; no other formatting is required.

## Change the project and skills

The single Project 1 card lives in `client/src/pages/Portfolio.tsx`. Replace its placeholder copy, status, and tags as the project develops. The learning timeline and skill tags live in `client/src/pages/Experience.tsx`. Add or remove `<span className="tag">...</span>` items as your skills evolve.

## Change links and email

Update the GitHub and LinkedIn URLs in `client/src/App.tsx`, `client/src/pages/About.tsx`, `client/src/pages/Experience.tsx`, and `client/src/pages/Contact.tsx`. Update `samunnat.dev@gmail.com` anywhere it appears if you want to use a different public address. The site currently shows the email visibly because that was your chosen contact preference.

## Change the profile image

Keep the original image outside the project directory, then upload a replacement through the active WebDev project:

```bash
mkdir -p /home/ubuntu/webdev-static-assets
cp /path/to/your-new-photo.jpg /home/ubuntu/webdev-static-assets/profile.jpg
manus-upload-file --webdev /home/ubuntu/webdev-static-assets/profile.jpg
```

Copy the returned `/manus-storage/...` path into the `profileImage` constant in `Home.tsx` and `About.tsx`. Do not place large media files in `client/public` or `client/src/assets`.

## Run and review locally

From the project directory:

```bash
pnpm dev
```

Then open the local preview URL shown by Vite. Before sharing a change, run:

```bash
pnpm check
pnpm build
```

## GitHub note

GitHub is connected for this task, but no repository was created and nothing was pushed. If you want version history later, create or select the destination repository and approve the exact push action separately.
