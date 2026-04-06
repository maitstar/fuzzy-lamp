// List of all available flowers - synced with /public/flowers/
// Updated to match actual filenames with numeric suffixes
export const flowerManifest = [
  // Named flowers (no numeric suffix)
  { id: 'honeysuckle', name: 'Honeysuckle', filename: 'Honeysuckle.jpeg', emoji: '🌼' },
  { id: 'buttercup', name: 'Buttercup', filename: 'Buttercup.jpeg', emoji: '🌻' },
  { id: 'violet', name: 'Violet', filename: 'Violet.jpeg', emoji: '💜' },
  { id: 'dahlia', name: 'Dahlia', filename: 'Dahlia.jpeg', emoji: '🌺' },
  { id: 'ivy', name: 'Ivy', filename: 'Ivy.jpeg', emoji: '🍃' },
  { id: 'jasmine', name: 'Jasmine', filename: 'Jasmine.jpeg', emoji: '✨' },
  { id: 'pansy', name: 'Pansy', filename: 'Pansy.jpeg', emoji: '🌷' },
  { id: 'marigold', name: 'Marigold', filename: 'Marigold.jpeg', emoji: '🌼' },
  { id: 'rose', name: 'Rose', filename: 'Rose.jpeg', emoji: '🌹' },
  { id: 'sweetpea', name: 'Sweet Pea', filename: 'SweetPea.jpeg', emoji: '💐' },
  { id: 'delphinium', name: 'Delphinium', filename: 'Delphinium.jpeg', emoji: '💙' },
  { id: 'plumeria', name: 'Plumeria', filename: 'plumeria.jpeg', emoji: '🌺' },
  { id: 'lavender', name: 'Lavender', filename: 'Lavender.jpeg', emoji: '💜' },

  // Numbered flowers (with numeric suffixes)
  { id: 'peony-01', name: 'Peony', filename: 'Peony_01.jpeg', emoji: '🌸' },
  { id: 'chrysanthemum', name: 'Chrysanthemum', filename: 'Chrysanthemum_02.jpeg', emoji: '🌼' },
  { id: 'zinnia', name: 'Zinnia', filename: 'Zinnia_03.jpeg', emoji: '🌻' },
  { id: 'cosmos', name: 'Cosmos', filename: 'Cosmos_04.jpeg', emoji: '🌺' },
  { id: 'daisy', name: 'Daisy', filename: 'Daisy_05.jpeg', emoji: '🌼' },
  { id: 'iris', name: 'Iris', filename: 'Iris_06.jpeg', emoji: '💜' },
  { id: 'forgetmenot', name: 'Forget-me-not', filename: 'Forget-me-not_07.jpeg', emoji: '💙' },
  { id: 'daffodil', name: 'Daffodil', filename: 'Daffodil_08.jpeg', emoji: '🌻' },
  { id: 'bluebell', name: 'Bluebell', filename: 'Bluebell_09.jpeg', emoji: '💙' },
  { id: 'sunflower', name: 'Sunflower', filename: 'Sunflower_10.jpeg', emoji: '🌻' },
  { id: 'tulip', name: 'Tulip', filename: 'Tulip_11.jpeg', emoji: '🌷' },
  { id: 'hydrangea', name: 'Hydrangea', filename: 'Hydrangea_12.jpeg', emoji: '💜' },

  // Additional flowers from your collection
  { id: 'orchid', name: 'Orchid', filename: 'Orchid_14.jpeg', emoji: '🌸' },
  { id: 'lily', name: 'Lily', filename: 'Lily_15.jpeg', emoji: '🌷' },
  { id: 'poppy', name: 'Poppy', filename: 'Poppy_02.jpeg', emoji: '🌺' },
  { id: 'peony-main', name: 'Peony Main', filename: 'Peony_Main.jpeg', emoji: '🌸' },
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
