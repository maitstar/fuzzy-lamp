// List of all available flowers - synced with /public/flowers/
// Updated to match actual filenames with numeric suffixes
export const flowerManifest = [
  // Named flowers (no numeric suffix)
  { id: 'honeysuckle', name: 'Honeysuckle', filename: 'Honeysuckle.jpeg' },
  { id: 'buttercup', name: 'Buttercup', filename: 'Buttercup.jpeg' },
  { id: 'violet', name: 'Violet', filename: 'Violet.jpeg' },
  { id: 'dahlia', name: 'Dahlia', filename: 'Dahlia.jpeg' },
  { id: 'ivy', name: 'Ivy', filename: 'Ivy.jpeg' },
  { id: 'jasmine', name: 'Jasmine', filename: 'Jasmine.jpeg' },
  { id: 'pansy', name: 'Pansy', filename: 'Pansy.jpeg' },
  { id: 'marigold', name: 'Marigold', filename: 'Marigold.jpeg' },
  { id: 'rose', name: 'Rose', filename: 'Rose.jpeg' },
  { id: 'sweetpea', name: 'Sweet Pea', filename: 'SweetPea.jpeg' },
  { id: 'delphinium', name: 'Delphinium', filename: 'Delphinium.jpeg' },
  { id: 'plumeria', name: 'Plumeria', filename: 'plumeria.jpeg' },
  { id: 'lavender', name: 'Lavender', filename: 'Lavender.jpeg' },

  // Numbered flowers (with numeric suffixes)
  { id: 'peony-01', name: 'Peony', filename: 'Peony_01.jpeg' },
  { id: 'chrysanthemum', name: 'Chrysanthemum', filename: 'Chrysanthemum_02.jpeg' },
  { id: 'zinnia', name: 'Zinnia', filename: 'Zinnia_03.jpeg' },
  { id: 'cosmos', name: 'Cosmos', filename: 'Cosmos_04.jpeg' },
  { id: 'daisy', name: 'Daisy', filename: 'Daisy_05.jpeg' },
  { id: 'iris', name: 'Iris', filename: 'Iris_06.jpeg' },
  { id: 'forgetmenot', name: 'Forget-me-not', filename: 'Forget-me-not_07.jpeg' },
  { id: 'daffodil', name: 'Daffodil', filename: 'Daffodil_08.jpeg' },
  { id: 'bluebell', name: 'Bluebell', filename: 'Bluebell_09.jpeg' },
  { id: 'sunflower', name: 'Sunflower', filename: 'Sunflower_10.jpeg' },
  { id: 'tulip', name: 'Tulip', filename: 'Tulip_11.jpeg' },
  { id: 'hydrangea', name: 'Hydrangea', filename: 'Hydrangea_12.jpeg' },

  // Additional flowers from your collection
  { id: 'orchid', name: 'Orchid', filename: 'Orchid_14.jpeg' },
  { id: 'lily', name: 'Lily', filename: 'Lily_15.jpeg' },
  { id: 'poppy', name: 'Poppy', filename: 'Poppy_02.jpeg' },
  { id: 'peony-main', name: 'Peony Main', filename: 'Peony_Main.jpeg' },
];

export function getFlowerPath(filename) {
  return `/flowers/${filename}`;
}

export function getFlowerByName(name) {
  return flowerManifest.find(f => f.name.toLowerCase() === name.toLowerCase());
}

export function searchFlowers(query) {
  const lower = query.toLowerCase();
  return flowerManifest.filter(f => f.name.toLowerCase().includes(lower));
}
