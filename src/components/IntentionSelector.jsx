import { intentionsList } from '../utils/intentionMapping';

export default function IntentionSelector({
  selectedIntention,
  onIntentionChange,
  sunSign,
  moonSign,
  risingSign,
  onNatalBloom
}) {
  return (
    <div className="mb-6 bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg border border-green-300">
      <div className="flex flex-col gap-4">
        {/* Intention Selector */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-serif text-green-800">Plant Your Intention:</label>
          <select
            value={selectedIntention}
            onChange={(e) => onIntentionChange(e.target.value)}
            className="px-4 py-2 border-2 border-green-300 rounded-lg font-garamond text-gray-700 bg-white hover:border-green-500 focus:border-green-500 transition-colors"
          >
            <option value="">Choose an intention...</option>
            {intentionsList.map(intention => (
              <option key={intention} value={intention}>
                {intention}
              </option>
            ))}
          </select>
          <p className="text-xs text-green-700 italic">Select an intention to automatically plant its corresponding flower</p>
        </div>

        {/* Natal Bloom Button */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-serif text-green-800">Soul Foundation:</label>
          <button
            onClick={onNatalBloom}
            className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all font-garamond shadow-md"
          >
            ✨ Plant Natal Blooms ({sunSign}, {moonSign}, {risingSign})
          </button>
          <p className="text-xs text-green-700 italic">Plant a cluster of 3 flowers based on your Sun, Moon, and Rising signs</p>
        </div>
      </div>
    </div>
  );
}
