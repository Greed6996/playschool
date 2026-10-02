# SHEMROCK Playschool - Modern Landing Page

A high-performance, mobile-first, and responsive landing page for SHEMROCK Playschool, built with semantic HTML5, Vanilla CSS, and modular JavaScript.

## 🚀 Features

- **Brand Alignment**: Styled with SHEMROCK's signature color palette (Poppy Red, Sunshine Yellow, Azure Blue, Leaf Green).
- **Zero-Lag Performance**: Optimized CSS rendering, lazy-loaded media, throttled scroll handlers with `requestAnimationFrame`.
- **Mobile & Tablet Optimized**: Compact mobile layout featuring horizontal swipe-snapping cards (`scroll-snap-type`) to prevent endless vertical scrolling.
- **Interactive ShemEduMAX™ Curriculum Explorer**: Dynamic 8-pillar explorer with synchronized orbital wheel (desktop) and compact tap pills (mobile/tablet).
- **Live Branch Locator**: Real-time searchable center locator with PIN code and city filters.
- **Admission Tour Booking Modal**: Interactive multi-step modal with celebration confetti effect.
- **Sticky Bottom Conversion Bar**: Mobile-specific bottom bar for instant calls and tour bookings.

## 📁 Project Structure

```text
├── index.html        # Main landing page markup
├── style.css         # Modern, responsive design system & styles
├── script.js         # Interactive features, search & modal handlers
├── logo-3.png        # Official SHEMROCK logo
└── README.md         # Project documentation
```

## 🛠️ Getting Started

To view the landing page locally:

1. Clone this repository:
   ```bash
   git clone https://github.com/Greed6996/playschool.git
   ```
2. Open `index.html` directly in any modern web browser, or serve it using any local static file server:
   ```bash
   # Using Python
   python -m http.server 8000

   # Or using Node.js / npx
   npx serve .
   ```
