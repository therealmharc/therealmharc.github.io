# therealmharc | portfolio

Modern, responsive portfolio with glassmorphism design and red accent theme.

## Features

- Dark/light mode with system preference detection
- Glassmorphism UI with backdrop blur effects
- Fully responsive design (mobile + desktop)
- Mobile hamburger menu navigation
- Desktop floating island nav bar with sliding active indicator
- Typing animation for tagline
- Animated gradient background
- Scroll progress indicator
- Resume download with feedback states
- Keyboard shortcuts (1-6/T/B)
- Dynamic copyright year
- Accessibility-first with ARIA labels, skip links, and focus indicators

## Tech Stack

- Vanilla HTML5, CSS3, JavaScript (no dependencies except fonts/icons)
- CSS custom properties (variables) for theming
- IntersectionObserver for scroll animations
- Font Awesome icons
- Google Fonts (Poppins)

## Sections

- **Header**: Profile, social links, contact info
- **Work Experience**: Timeline with job history
- **Skills**: Categorized skill badges
- **Projects**: Featured open-source work
- **Education**: Academic background
- **My Gears**: Tech equipment showcase

## Architecture (DRY Principles)

### CSS Variables
All repeated values are centralized in `:root`:
- `--shadow-combined`: Merged shadow + inset shadow pattern
- `--touch-target`: Consistent 44px touch target for accessibility
- `--primary-bg`, `--primary-bg-light`, `--primary-border`: Theme-aware primary colors
- `--subtle-border`, `--subtle-bg`: Theme-aware neutral colors
- `--github`, `--linkedin`, `--website`: Brand colors, auto-switch per theme
- All variables auto-switch between light/dark modes

### Utility Classes
- `.glass-panel`: Reusable glassmorphism effect (gradient, blur, shadow, border) — applied to 26 elements (header, 5 sections, 14 cards), eliminating 20+ duplicated lines
- `.stagger-animation`: Cascading animation delays for child elements

### CSS Refactors
- Shared `.card:hover` / `.project-card:hover` selector — single hover transform rule for both card types
- Universal `.social-link:hover { color: #fff }` — brands only override background, not color
- Theme-aware GitHub hover: uses `var(--github)` / `var(--background)` instead of hardcoded `#24292e`
- Section header comments (Variables, Utilities, Navigation, etc.) for file readability

### Visual Enhancements
- Gear icons as large background watermarks (4rem, 15% opacity, positioned absolute in `.gear-header`)
- Timeline gradient line (fades from solid primary to transparent)
- Animated timeline dot pulse (2s ease-in-out infinite)
- Alternating even-section tinted backgrounds

### JavaScript Modules
Single-responsibility classes in `script.js`:
- `ThemeManager`: Dark/light mode with localStorage persistence
- `ScrollManager`: Back-to-top button and rAF-based progress bar
- `AnimationObserver`: Intersection-based reveal animations (progressive enhancement)
- `TypeWriter`: Tagline typing effect with reduced-motion support
- `MobileMenu`: Hamburger navigation with focus trapping
- `NavScrollSpy`: Desktop nav active tracking with sliding indicator
- `ResumeDownloader`: Fetch-based PDF download with real success/error feedback
- `PerformanceManager`: Pauses animations when tab is hidden
- `KeyboardShortcuts`: 1-6 section navigation, T/B for theme and back-to-top

## Performance & Security

- **Theme flash prevention**: Inline script in `<head>` sets theme before CSS loads
- **Animation optimization**: Background animations pause when tab is hidden
- **Eager loading**: Above-fold images use `loading="eager"`
- **Reduced motion**: Respects `prefers-reduced-motion` preference
- **SRI integrity**: Font Awesome CDN includes subresource integrity hash
- **Noscript fallback**: Tagline displays without JavaScript

## Development

Edit content in `index.html`. Styling in `style.css` uses CSS variables defined in `:root` for easy theming. JavaScript in `script.js` handles all interactivity through modular classes.
