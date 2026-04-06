/**
 * Manifestation Garden: Intention-to-Flower Mapping
 * When a user selects an intention, the corresponding flower is automatically planted
 */

export const intentionsList = [
  'Wealth',
  'Clarity',
  'Love',
  'Peace',
  'Intuition',
  'Career Growth',
  'Spiritual Awakening',
  'Strength',
  'Wisdom',
  'New Beginnings',
  'Gratitude',
  'Hope',
];

export const intentionFlowers = {
  'Wealth': 'Peony',                  // Traditional symbol of riches
  'Clarity': 'Sunflower',             // Solar energy, visibility
  'Love': 'Rose',                     // Deep connection
  'Peace': 'Lavender',                // Calming properties
  'Intuition': 'Jasmine',             // Sensuality & intuition
  'Career Growth': 'Ivy',             // Climbing/resilience
  'Spiritual Awakening': 'Lotus',     // Would need this flower or map to available
  'Strength': 'Marigold',             // Strength & protection
  'Wisdom': 'Iris',                   // Wisdom & communication
  'New Beginnings': 'Tulip',          // New starts
  'Gratitude': 'Bluebell',            // Gratitude & humility
  'Hope': 'Daffodil',                 // Hope & renewal
};

// Fallback mapping for intentions without exact flowers in library
export const intentionFlowersBackup = {
  'Spiritual Awakening': 'Orchid',    // Alternative if Lotus not available
};

export function getFlowerForIntention(intention) {
  return intentionFlowers[intention] || null;
}
