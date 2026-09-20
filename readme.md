ORBIT — Unified Transportation Platform
A futuristic web concept for Sri Lanka's 2100 transportation ecosystem, unifying HyperRail, Autonomous Buses, Air Transit, and Smart Roads into a single seamless experience.

Overview
ORBIT is a fully interactive front-end web application that demonstrates what a next-generation national transportation platform could look like. Built entirely with vanilla HTML, CSS, and JavaScript — no frameworks, no dependencies — it showcases modern UI techniques including glassmorphism, fluid typography, animated SVG, dark/light theming, and full mobile responsiveness.

Features
Journey Planner — Search routes across all four transport modes with real-time route suggestions (Fastest, Simplest, Flexible)
Live Journey Tracker — Step-by-step guidance, progress bar, delay simulation, and AI Journey Guardian
Network Explorer — Custom SVG map of Sri Lanka's transport network with interactive legend
User Profile — Journey history, statistics, digital pass card, and accessibility controls
Dark / Light Mode — System-preference aware with persistent localStorage toggle
User Authentication UI — Sign in and Create Account modal with form validation
Voice Guidance — Web Speech API integration with visual toast fallback
Fully Responsive — Optimised for desktop, tablet, and mobile
Tech Stack
Layer	Technology
Frontend	HTML5, CSS3, Vanilla JavaScript (ES6+)
Styling	Custom CSS with CSS Custom Properties, Grid, Flexbox, clamp(), backdrop-filter
Design	Designed entirely in code (no Figma)
Map	Custom hand-drawn SVG (no external library)
Shell	React 19 + Vite 8 (serves the static app via iframe)
Hosting	Compatible with Vercel, Netlify, or GitHub Pages
Project Structure
public/
  orbit.html     # Main application (all 5 pages)
  style.css      # Design system, tokens, components, responsive
  script.js      # Navigation, theme, auth, voice, accessibility
  hero-bg.png    # Hero section background image
src/
  App.tsx        # React shell — iframes orbit.html full-screen
  main.tsx       # Vite entrypoint
Pages
Page	Description
Home	Full-bleed hero with search, live network stats, mode cards, how-it-works steps
Plan Journey	Multi-field route search, three detailed route cards with inline timelines
Live Journey	Real-time dashboard, delay alerts, Ask ORBIT AI assistant, arrival confirmation
Explore	SVG network map, mode statistics, network legend
Profile	Journey stats, digital pass card, accessibility settings
Getting Started
# Install dependencies
pnpm install

# Start development server
pnpm dev
Open the URL shown in the terminal. The app runs inside a Vite dev server with hot reload.

Design Highlights
Glassmorphism navigation bar (backdrop-filter: blur)
Full-bleed hero image with layered gradient overlays for text legibility
Gradient text on hero headline (background-clip: text)
Animated pulsing live-status indicators
Floating UI badges with @keyframes float animation
Futuristic monospace data labels throughout
Scanline texture on hero overlay
Accessibility
ARIA labels and roles on all interactive elements
Keyboard navigation and focus-visible outlines
Toggleable large text, high contrast, reduced motion, and simplified UI modes
Voice guidance via Web Speech API
prefers-reduced-motion and prefers-color-scheme media query support
Concept project — ORBIT is a design and engineering demonstration, not a live service.