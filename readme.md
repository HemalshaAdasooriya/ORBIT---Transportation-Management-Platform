# ORBIT — Unified Transportation Platform

> **Sri Lanka 2100** — A unified, next-generation national transportation ecosystem connecting HyperRail, Autonomous Buses, Air Transit, and Smart Roads into a single seamless experience.

[![Status](https://img.shields.io/badge/Status-Live%20Concept-6366f1?style=for-the-badge)](#)
[![Stack](https://img.shields.io/badge/Stack-Vanilla%20HTML5%20%7C%20CSS3%20%7C%20ES6+-06b6d4?style=for-the-badge)](#)
[![Zero Dependencies](https://img.shields.io/badge/Dependencies-Zero%20(Pure%20Web)-10b981?style=for-the-badge)](#)
[![Deployment](https://img.shields.io/badge/Deploy-Vercel%20Ready-000000?style=for-the-badge&logo=vercel)](#)

---

## 🧭 Overview

**ORBIT** is a front-end transportation management platform demonstrating what a futuristic smart transit network could look like. Built entirely with pure web standards (**HTML5**, **CSS3**, and **JavaScript ES6+**) and zero external framework dependencies, it delivers high performance, instant page loads, and modern UI design including glassmorphism, fluid typography, dark/light theming, and an interactive vector transit map.

---

## ✨ Key Features

### 1. 🚀 Full-Bleed Hero & Quick Transit Search
- High-impact visual hero section with dynamic gradient overlays and live network indicators.
- Quick departure/destination search with transit mode filters (*All, Maglev, HyperRail, Autonomous Bus, Air Transit, Smart Roads*).
- Real-time network statistics ticker (*Active Pods, Network Load, On-Time Rate, Carbon Saved*).

### 2. 🗺️ Journey Planner
- Compare multi-modal journeys across speed, complexity, and flexibility:
  - **Fastest**: HyperRail express route.
  - **Simplest**: Direct single-mode connection.
  - **Flexible**: Multi-modal autonomous bus + rail combination.
- Route metrics showing travel duration, transfers, estimated fare, and carbon footprint reduction.

### 3. ⏱️ Live Journey Tracker & AI Guardian
- Real-time journey progress bar and step-by-step waypoint directions.
- **Delay Simulation Engine**: Test live network disruption scenarios with real-time route recalculation and connection hold alerts.
- **Ask ORBIT Assistant**: Pre-configured conversational assistance for accessibility, walking directions, and missed connections.
- **Voice Guidance**: Speech output powered by the browser's native **Web Speech API** with on-screen visual toast fallbacks.

### 4. 🌐 Network Explorer (Interactive Sri Lanka Transit Map)
- Hand-drawn, responsive SVG transit map representing primary transit corridors across Sri Lanka.
- Interactive mode filtering to toggle HyperRail lines, Bus corridors, Air routes, and Highway links.
- Station data inspectability and regional connectivity statistics.

### 5. 🪪 Digital Pass & Profile
- Holographic digital boarding pass card with dynamic QR code and membership status.
- Traveler metrics tracking lifetime journeys, kilometers logged, punctuality rating, and carbon offset.
- Past journey history log and downloadable receipts UI.

### 6. ♿ Comprehensive Accessibility Suite
- **Voice Guidance**: Real-time auditory navigation instructions.
- **High Contrast Mode**: Enhanced visual contrast for daylight or visual impairment.
- **Large Text Mode**: Scaled typography for legibility.
- **Reduced Motion**: Respects system `prefers-reduced-motion` and manual toggle.
- **Theme Sync**: Seamless Dark and Light modes with persistent `localStorage` synchronization.

---

## 🛠️ Technology Stack

| Layer | Technology | Description |
| :--- | :--- | :--- |
| **Markup** | HTML5 | Semantic, accessible structure with ARIA roles and labels |
| **Styling** | Modern CSS3 | CSS Custom Properties, CSS Grid, Flexbox, `clamp()`, `backdrop-filter` glassmorphism |
| **Logic** | Vanilla JavaScript (ES6+) | Single Page Application state management, theme switching, Web Speech API, delay engine |
| **Mapping** | Hand-crafted SVG | High-resolution scalable vector transit map with zero third-party map dependencies |
| **Hosting & Routing** | Vercel (`vercel.json`) | Static hosting with clean URLs and SPA rewrite rules |

---

## 📁 Project Structure

```text
ORBIT/
├── index.html        # Primary application entrypoint (Home, Planner, Live, Map, Profile)
├── orbit.html        # Compatibility redirect fallback to index.html
├── style.css         # Design system tokens, layouts, glassmorphism, themes & responsive rules
├── script.js         # Navigation, theme engine, voice synthesis, delay simulation & a11y
├── hero-bg.png       # Hero section visual banner
├── vercel.json       # Vercel deployment routing & rewrite configuration
└── readme.md         # Project documentation
```

---

## 🚀 Getting Started

Since ORBIT is built without build tools or framework dependencies, you can run it immediately in any environment without installing packages.

### Method 1: Direct File Launch
Simply double-click `index.html` or open it in any modern web browser (Chrome, Edge, Firefox, Safari).

### Method 2: Local HTTP Server

Using **Python**:
```bash
python -m http.server 3000
```
Then visit [http://localhost:3000](http://localhost:3000).

Using **Node.js**:
```bash
npx serve .
```

Using **VS Code**:
Install the **Live Server** extension, right-click `index.html`, and select **Open with Live Server**.

---

## 🌐 Deployment

### Deploying to Vercel

The repository includes a pre-configured `vercel.json` file that handles routing:

1. Import this repository into [Vercel](https://vercel.com).
2. Configuration settings:
   - **Framework Preset**: `Other`
   - **Root Directory**: `./`
   - **Build Command**: *(Leave empty)*
   - **Output Directory**: `./`
3. Click **Deploy**. Vercel will automatically serve `index.html` at your root domain URL.

### Deploying to Netlify / GitHub Pages
- **Netlify**: Drag and drop the project folder into Netlify Drop, or connect via Git with publish directory set to `/`.
- **GitHub Pages**: Go to **Settings > Pages**, select the `master` branch and `/ (root)` folder, and save.

---

## 🎨 Design Highlights

- **Glassmorphism**: Layered translucent surfaces using `backdrop-filter: blur(16px)` and subtle glowing border strokes.
- **Dynamic Color System**: Futuristic HSL/Hex palette featuring deep space navies, cybernetic indigo (`#6366f1`), electric cyan (`#06b6d4`), and status amber (`#f59e0b`).
- **Fluid Typography**: Dynamic sizing using `clamp()` ensuring crisp readability from mobile screens to 4K displays.
- **Micro-Animations**: Smooth `@keyframes` glowing pulses, floating badges, and interactive route transitions.

---

## 📄 License & Disclaimer

*Concept Project* — ORBIT is a futuristic design and engineering demonstration created for presentation purposes, showcasing modern web performance and user experience principles.