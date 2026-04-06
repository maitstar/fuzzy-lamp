# Flowers Directory Setup

This guide explains how to set up the `/public/flowers/` directory for the Digital Bouquet app.

## Required Flower Files

The app expects 25 JPEG flower images in `/public/flowers/`. Here's the complete list:

### Named Flowers (13)
- `Honeysuckle.jpeg`
- `Buttercup.jpeg`
- `Violet.jpeg`
- `Dahlia.jpeg`
- `Ivy.jpeg`
- `Jasmine.jpeg`
- `Pansy.jpeg`
- `Marigold.jpeg`
- `Rose.jpeg`
- `SweetPea.jpeg`
- `Delphinium.jpeg`
- `Plumeria.jpeg`
- `Lavender.jpeg`

### Numbered Flowers (12)
- `Peony.jpeg`
- `Chrysanthemum.jpeg`
- `Zinnia.jpeg`
- `Cosmos.jpeg`
- `Daisy.jpeg`
- `Iris.jpeg`
- `Forget-me-not.jpeg`
- `Daffodil.jpeg`
- `Bluebell.jpeg`
- `Sunflower.jpeg`
- `Tulip.jpeg`
- `Hydrangea.jpeg`

## Directory Structure

```
digital-bouquet/
├── public/
│   └── flowers/
│       ├── Honeysuckle.jpeg
│       ├── Buttercup.jpeg
│       ├── ... (rest of flowers)
│       └── Hydrangea.jpeg
├── src/
├── package.json
└── ... (other files)
```

## Image Requirements

- **Format**: JPEG (.jpeg or .jpg)
- **Background**: White (RGB 255, 255, 255 or very close)
- **Size**: 400-600px square recommended (will be scaled)
- **Quality**: High quality watercolor style
- **Transparency**: White background will be automatically removed by the app

## How to Add Flowers

1. Create the `/public/flowers/` directory if it doesn't exist
2. Add your 25 JPEG flower images to this directory
3. **Important**: File names must match the list above exactly (case-sensitive on Linux/Mac)
4. Run `npm run dev` to test
5. The app will automatically:
   - Detect all flower files
   - Process white backgrounds to transparency
   - Make them available in the Flower Tray

## Testing the Setup

After adding the flowers:

```bash
npm run dev
```

The app should:
1. Show "Processing flowers..." splash screen
2. Process all 25 flowers (remove white backgrounds)
3. Populate the Flower Tray with all flowers
4. Allow you to drag flowers onto the canvas

If flowers don't appear:
- Check browser console for errors
- Verify file names match exactly (case-sensitive)
- Ensure JPEG files are valid image files
- Check that `/public/flowers/` path is correct

## Image Optimization Tips

For best results:

1. **Remove Extra White**: Crop flowers to minimize surrounding space
2. **Consistent Background**: All backgrounds should be white or near-white (RGB >240)
3. **High Quality**: Use high-res source images (1000px+ is fine, will be scaled down)
4. **Watercolor Style**: For aesthetic consistency with the app design

### Tools to Prepare Images

- **Remove Background**: Remove.bg, Photoshop, GIMP
- **Crop & Resize**: ImageMagick, Photopea, Preview (Mac)
- **Batch Processing**: Batch processing tools for multiple images at once

Example ImageMagick command:
```bash
convert input.jpg -fuzz 5% -transparent white output.jpeg
```

## Troubleshooting

### Flowers not loading
- Check browser Network tab for 404 errors
- Verify file names are exactly as listed above
- Ensure files are in `/public/flowers/` not `/src/public/flowers/`

### White background not fully removed
- Edit threshold in `src/hooks/useFlowerProcessing.js`
- Change the RGB threshold from `248` to `240` for more aggressive removal
- Or prepare images with purer white backgrounds

### Performance issues with 25 flowers
- Images are cached after first processing
- If still slow, reduce flower count temporarily for testing
- Clear browser cache and hard refresh

### Images appear pixelated on export
- Increase the `scale` parameter in `src/utils/canvasExport.js` from `2` to `3`
- Or use higher resolution source images

## Next Steps

Once flowers are set up:

1. Run `npm run dev` to start the dev server
2. Test zodiac bouquet generation
3. Test dragging, rotating, resizing flowers
4. Test export functionality
5. Deploy to Vercel when ready

---

Need help? Check the main README.md for more details.
