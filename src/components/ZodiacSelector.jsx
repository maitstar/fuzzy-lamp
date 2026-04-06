import { zodiacSigns } from '../utils/zodiacMapping';

export default function ZodiacSelector({
  sunSign,
  moonSign,
  risingSign,
  onSunChange,
  onMoonChange,
  onRisingChange,
}) {
  return (
    <div className="mb-6 p-4 bg-white bg-opacity-50 rounded-lg border border-gray-200">
      <h2 className="text-lg font-serif mb-4 text-gray-700">Your Astrology</h2>
      <div className="grid grid-cols-3 gap-4">
        {/* Sun Sign */}
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-2">
            ☀️ Sun Sign
          </label>
          <select
            value={sunSign}
            onChange={(e) => onSunChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pastel-rose text-sm"
          >
            {zodiacSigns.map(sign => (
              <option key={sign} value={sign}>{sign}</option>
            ))}
          </select>
        </div>

        {/* Moon Sign */}
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-2">
            🌙 Moon Sign
          </label>
          <select
            value={moonSign}
            onChange={(e) => onMoonChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pastel-lavender text-sm"
          >
            {zodiacSigns.map(sign => (
              <option key={sign} value={sign}>{sign}</option>
            ))}
          </select>
        </div>

        {/* Rising Sign */}
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-2">
            ⬆️ Rising Sign
          </label>
          <select
            value={risingSign}
            onChange={(e) => onRisingChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pastel-mint text-sm"
          >
            {zodiacSigns.map(sign => (
              <option key={sign} value={sign}>{sign}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
