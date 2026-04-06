# 🌸 Digital Bouquet

A beautiful, interactive web app for creating personalized flower arrangements based on your astrological signs. Built with React, Vite, and Framer Motion.

## Features

✨ **Zodiac Integration**
- Select your Sun, Moon, and Rising signs
- Auto-generate a personalized bouquet based on astrology

🎨 **Interactive Canvas**
- Drag and drop flowers onto the canvas
- Rotate (45° increments)
- Resize with smooth scaling
- Bring flowers to front/back
- Double-click to delete

🌼 **Asset Tray**
- 25 beautiful watercolor-style flowers
- Search and filter by name
- Click to add any flower to your bouquet

💾 **Export & Share**
- "Seal & Download" button to capture your bouquet as PNG
- Optional personal message
- High-quality export (2x resolution)

🎭 **Beautiful Design**
- Minimalist scrapbook aesthetic
- Cream textured background (#FFFDF5)
- Elegant serif fonts (EB Garamond)
- Clean sans-serif UI (Inter)
- Pastel color palette
- Subtle floating animations

## Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool
- **Framer Motion** - Interactive animations
- **Tailwind CSS** - Styling
- **html2canvas** - Export functionality
- **Lucide React** - Icons

## Setup

### Prerequisites
- Node.js 16+ and npm/yarn
- 25 flower JPEG images in `/public/flowers/`

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd digital-bouquet

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
digital-bouquet/
├── src/
│   ├── components/
│   │   ├── Header.jsx          # App title
│   │   ├── ZodiacSelector.jsx  # Zodiac dropdowns
│   │   ├── Canvas.jsx          # Main canvas area
│   │   ├── FlowerElement.jsx   # Individual flower with controls
│   │   ├── AssetTray.jsx       # Flower selection sidebar
│   │   └── Controls.jsx        # Export/download buttons
│   ├── hooks/
│   │   └── useFlowerProcessing.js  # Background removal (white→transparent)
│   ├── utils/
│   │   ├── zodiacMapping.js    # Zodiac-flower mappings
│   │   ├── flowerManifest.js   # Flower list and search
│   │   └── canvasExport.js     # html2canvas export wrapper
│   ├── App.jsx                 # Main component
│   ├── App.css                 # App styles
│   ├── index.css               # Global styles + paper texture
│   └── main.jsx                # Entry point
├── public/
│   └── flowers/                # Your 25 JPEG flower images
├── index.html                  # HTML template
├── vite.config.js             # Vite configuration
├── tailwind.config.js         # Tailwind configuration
├── postcss.config.js          # PostCSS configuration
├── vercel.json                # Vercel deployment config
├── package.json               # Dependencies
└── README.md                  # This file
```

## Zodiac Flower Mappings

| Sign | Flower | Scale |
|------|--------|-------|
| Aries | Honeysuckle | 1.2× |
| Taurus | Rose | 1.2× |
| Gemini | Lavender | 1.2× |
| Cancer | Plumeria | 1.2× |
| Leo | Sunflower | 1.2× |
| Virgo | Buttercup | 1.2× |
| Libra | Dahlia | 1.2× |
| Scorpio | Peony | 1.2× |
| Sagittarius | Jasmine | 1.2× |
| Capricorn | Pansy | 1.2× |
| Aquarius | Iris | 1.2× |
| Pisces | Bluebell | 1.2× |

## Background Removal

The app automatically converts white (RGB >248) to transparent using Canvas. This happens during initial image load and results are cached for performance.

**Threshold**: Conservative (248+) - preserves delicate petals and fine lines

## Deployment to Vercel

### Quick Deploy

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Via GitHub

1. Push your code to GitHub
2. Go to [Vercel Dashboard](https://vercel.com)
3. Import your repository
4. Vercel auto-detects Vite configuration
5. Deploy

### Important

Ensure `/public/flowers/` directory contains all 25 JPEG files before deploying.

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- iOS Safari 14+
- Chrome Android

## Performance Tips

1. **Image Optimization**: JPEGs are processed to PNG (transparent) and cached
2. **Lazy Loading**: Flowers load on demand
3. **CSS Transforms**: Using `transform` for smooth animations
4. **Caching**: Processed images cached in memory

## Customization

### Change Colors

Edit `tailwind.config.js`:

```javascript
colors: {
  cream: '#FFFDF5',
  'pastel-rose': '#F4D6D6',
  // ... add your colors
}
```

### Change Fonts

Edit `index.css`:

```css
font-family: 'Your Font Name', serif;
```

### Add More Flowers

1. Add JPEG to `/public/flowers/`
2. Update `src/utils/flowerManifest.js`
3. Optionally update zodiac mappings in `src/utils/zodiacMapping.js`

## Known Issues & Fixes

**Issue**: Flowers appear pixelated on export
- **Fix**: Increase scale in `canvasExport.js` (currently 2x)

**Issue**: White background not fully transparent
- **Fix**: Adjust threshold in `useFlowerProcessing.js` (currently 248)

**Issue**: Slow performance with many flowers
- **Fix**: Reduce floating animation or cache more aggressively

## Future Enhancements

- [ ] Share bouquets via URL (stateful sharing)
- [ ] Pre-made seasonal palettes
- [ ] Save to browser history
- [ ] Custom background colors
- [ ] Text decorations (date, name)
- [ ] Print-optimized layout
- [ ] Animated transitions between zodiac signs
- [ ] Dark mode theme

## License

MIT © 2024

## Support

For issues or suggestions, please create an issue in the repository.

---

Made with 🌸 by Mait
