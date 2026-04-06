# Flower Lookup Test

This document verifies that flower names correctly map to your actual JPEG filenames with numeric suffixes.

## Test Cases

### Zodiac Flowers
When a user selects zodiac signs, these should load:

| Zodiac Sign | Flower Name | Expected Filename |
|-------------|-------------|-------------------|
| Aries | Honeysuckle | Honeysuckle.jpeg ✓ |
| Taurus | Rose | Rose.jpeg ✓ |
| Gemini | Lavender | Lavender.jpeg ✓ |
| Cancer | Plumeria | plumeria.jpeg ✓ |
| Leo | Sunflower | Sunflower_10.jpeg ✓ |
| Virgo | Buttercup | Buttercup.jpeg ✓ |
| Libra | Dahlia | Dahlia.jpeg ✓ |
| Scorpio | Peony | Peony_01.jpeg ✓ |
| Sagittarius | Jasmine | Jasmine.jpeg ✓ |
| Capricorn | Pansy | Pansy.jpeg ✓ |
| Aquarius | Iris | Iris_06.jpeg ✓ |
| Pisces | Bluebell | Bluebell_09.jpeg ✓ |

### Asset Tray Flowers (Searchable)
When user searches or browses the Asset Tray:

| Display Name | Expected Filename |
|--------------|-------------------|
| Honeysuckle | Honeysuckle.jpeg ✓ |
| Buttercup | Buttercup.jpeg ✓ |
| Violet | Violet.jpeg ✓ |
| Dahlia | Dahlia.jpeg ✓ |
| Ivy | Ivy.jpeg ✓ |
| Jasmine | Jasmine.jpeg ✓ |
| Pansy | Pansy.jpeg ✓ |
| Marigold | Marigold.jpeg ✓ |
| Rose | Rose.jpeg ✓ |
| Sweet Pea | SweetPea.jpeg ✓ |
| Delphinium | Delphinium.jpeg ✓ |
| Plumeria | plumeria.jpeg ✓ |
| Lavender | Lavender.jpeg ✓ |
| Peony | Peony_01.jpeg ✓ |
| Chrysanthemum | Chrysanthemum_02.jpeg ✓ |
| Zinnia | Zinnia_03.jpeg ✓ |
| Cosmos | Cosmos_04.jpeg ✓ |
| Daisy | Daisy_05.jpeg ✓ |
| Iris | Iris_06.jpeg ✓ |
| Forget-me-not | Forget-me-not_07.jpeg ✓ |
| Daffodil | Daffodil_08.jpeg ✓ |
| Bluebell | Bluebell_09.jpeg ✓ |
| Sunflower | Sunflower_10.jpeg ✓ |
| Tulip | Tulip_11.jpeg ✓ |
| Hydrangea | Hydrangea_12.jpeg ✓ |
| Orchid | Orchid_14.jpeg ✓ |
| Lily | Lily_15.jpeg ✓ |
| Poppy | Poppy_02.jpeg ✓ |
| Peony Main | Peony_Main.jpeg ✓ |

## How the Lookup Works

1. User selects "Bluebell" from zodiac selector or flower tray
2. `getFlowerByName('Bluebell')` searches flowerManifest for name match
3. Returns: `{ id: 'bluebell', name: 'Bluebell', filename: 'Bluebell_09.jpeg' }`
4. `getFlowerPath('Bluebell_09.jpeg')` returns: `/flowers/Bluebell_09.jpeg`
5. Image loads from: `http://localhost:5173/flowers/Bluebell_09.jpeg`

## Verification

To test in your app:

1. Start the dev server: `npm run dev`
2. Select "Leo" for Sun sign (should show Sunflower_10.jpeg)
3. Search for "Bluebell" in the Asset Tray
4. Click to add Bluebell to canvas
5. Check browser Network tab to confirm:
   - Request to `/flowers/Bluebell_09.jpeg`
   - Status 200 (file found)

If files return 404:
- Check filename casing matches exactly
- Verify files exist in `/public/flowers/`
- Clear browser cache and hard refresh (Cmd+Shift+R)

## Notes

- Filenames are case-sensitive on Linux/Mac
- The app automatically removes white backgrounds during load
- Images are cached after first processing for performance
