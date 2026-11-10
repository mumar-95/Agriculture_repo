# GreenHarvest Agriculture

A professional, responsive single-page website for **GreenHarvest Agriculture** — a fictional agribusiness platform that connects farmers, agricultural experts, suppliers, and customers.

## Sections

- **Hero** — Layered full-bleed farmland visual, brand-first headline, two working CTAs
- **Impact** — Farming statistics with scroll-triggered count-up and agriculture icons
- **About Us** — Mission, vision, and farmer-focused sustainability story
- **Sustainability** — Regenerative soil, water stewardship, and low-waste supply highlights
- **Products & Services** — Featured irrigation offer plus four interactive product cards
- **Farming Solutions** — Smart farming, water management, soil health (with icons + inquire CTAs)
- **Farmer Stories** — Fictional testimonials from growers
- **Contact** — Validated form (name, email, phone, message) and business details
- **Footer** — Quick links, contact info, social links, copyright

## Color psychology (justification)

| Color | Hex | Psychology | Usage on this site |
| --- | --- | --- | --- |
| Green | `#2F6B3A` | Growth, nature, sustainability, trust | Primary brand actions, links, icons |
| Dark green | `#1B3D24` | Reliability, professionalism | Headings, navigation, footer base |
| Earth brown | `#6B4F2A` | Soil, stability, agriculture | Section eyebrows and secondary labels |
| Yellow / sun | `#E6B422` | Optimism, energy, sunlight | Primary CTAs and accent underlines |
| White / soft sage | `#FFFFFF` / `#EEF5EC` | Cleanliness, clarity, calm | Page backgrounds and content surfaces |

The palette stays limited so the site feels coherent and trustworthy—no competing accent colors. Yellow is reserved for calls to action so interactive elements stay obvious. Dark text on light sage/white backgrounds supports readable contrast.

## Functional behavior

- Navigation links and hero CTAs scroll to real sections; active nav state updates while scrolling
- Product cards expand/collapse real detail lists; inquire buttons prefill the contact message and scroll to the form
- Featured product and solution CTAs do the same inquire flow
- Contact form validates required fields and shows a success message
- Mobile hamburger menu opens/closes and closes after a link is chosen
- Stat numbers animate once when the impact section enters view (respects reduced-motion)

## Run locally

No build step is required.

1. Open `index.html` in a modern browser, **or**
2. Serve the folder:

```bash
python -m http.server 8080
```

Then visit `http://127.0.0.1:8080/`.

## Project structure

```
Agriculture_repo/
├── index.html
├── css/styles.css
├── js/main.js
└── README.md
```
