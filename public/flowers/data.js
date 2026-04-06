// Zodiac Sign to Flower Mapping
const zodiacFlowers = {
  "Aries": "Honeysuckle",
  "Taurus": "Rose",
  "Gemini": "Lavender",
  "Cancer": "plumeria",
  "Leo": "Sunflower_10",
  "Virgo": "Buttercup",
  "Libra": "Hydrangea_12",
  "Scorpio": "Peony_Main",
  "Sagittarius": "Jasmine",
  "Capricorn": "Pansy",
  "Aquarius": "Iris_06",
  "Pisces": "Lily_15"
};

// Accent flowers available for dragging
const accentFlowers = ["Ivy", "Bluebell_09", "Forget-me-not_07"];

// Flower file mapping (name -> JPEG filename without extension)
const flowerFiles = {
  "Honeysuckle": "Honeysuckle.jpeg",
  "Rose": "Rose.jpeg",
  "Lavender": "Lavender.jpeg",
  "plumeria": "plumeria.jpeg",
  "Sunflower_10": "Sunflower_10.jpeg",
  "Buttercup": "Buttercup.jpeg",
  "Hydrangea_12": "Hydrangea_12.jpeg",
  "Peony_Main": "Peony_Main.jpeg",
  "Jasmine": "Jasmine.jpeg",
  "Pansy": "Pansy.jpeg",
  "Iris_06": "Iris_06.jpeg",
  "Lily_15": "Lily_15.jpeg",
  "Ivy": "Ivy.jpeg",
  "Bluebell_09": "Bluebell_09.jpeg",
  "Forget-me-not_07": "Forget-me-not_07.jpeg",
  // Additional flowers for variety
  "Carnation_13": "Carnation_13.jpeg",
  "Chrysanthemum_02": "Chrysanthemum_02.jpeg",
  "Cosmos_04": "Cosmos_04.jpeg",
  "Daffodil_08": "Daffodil_08.jpeg",
  "Dahlia": "Dahlia.jpeg",
  "Daisy_05": "Daisy_05.jpeg",
  "Delphinium": "Delphinium.jpeg",
  "Marigold": "Marigold.jpeg",
  "Orchid_14": "Orchid_14.jpeg",
  "Poppy": "Poppy.jpeg",
  "Poppy_02": "Poppy_02.jpeg",
  "Peony_01": "Peony_01.jpeg",
  "SweetPea": "SweetPea.jpeg",
  "Tulip_11": "Tulip_11.jpeg",
  "Violet": "Violet.jpeg",
  "Zinnia_03": "Zinnia_03.jpeg"
};

// Zodiac signs in order
const zodiacSigns = [
  "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
  "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"
];

// Get flower filename for a given flower name
function getFlowerPath(flowerName) {
  return flowerFiles[flowerName] || null;
}
