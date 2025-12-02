# therealmharc | portfolio

Modern, responsive portfolio with glassmorphism design and red accent theme.

## Features

- Dark/light mode with system preference detection
- Glassmorphism UI with backdrop blur effects
- Fully responsive design (mobile + desktop)
- Mobile hamburger menu navigation
- Desktop scroll-spy dot navigation
- Typing animation for tagline
- Animated gradient background
- Scroll progress indicator
- Resume download with feedback states
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
- All variables auto-switch between light/dark modes

### Utility Classes
- `.glass-panel`: Reusable glassmorphism effect (gradient, blur, shadow, border)
- `.stagger-animation`: Cascading animation delays for child elements

### JavaScript Modules
Single-responsibility classes in `script.js`:
- `ThemeManager`: Dark/light mode with localStorage persistence
- `ScrollManager`: Back-to-top button and progress bar
- `AnimationObserver`: Intersection-based reveal animations
- `TypeWriter`: Tagline typing effect with reduced-motion support
- `MobileMenu`: Hamburger navigation
- `DotNavigation`: Desktop scroll-spy dots
- `ResumeDownloader`: PDF download with feedback states
- `PerformanceManager`: Pauses animations when tab is hidden

## Performance & Security

- **Theme flash prevention**: Inline script in `<head>` sets theme before CSS loads
- **Animation optimization**: Background animations pause when tab is hidden
- **Eager loading**: Above-fold images use `loading="eager"`
- **Reduced motion**: Respects `prefers-reduced-motion` preference
- **SRI integrity**: Font Awesome CDN includes subresource integrity hash
- **Noscript fallback**: Tagline displays without JavaScript

## Development

Edit content in `index.html`. Styling in `style.css` uses CSS variables defined in `:root` for easy theming. JavaScript in `script.js` handles all interactivity through modular classes.

