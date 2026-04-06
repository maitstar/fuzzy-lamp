import { zodiacSigns } from '../utils/zodiacMapping';
import { intentionsList } from '../utils/intentionMapping';

export default function AstrologySelector({
  sunSign,
  moonSign,
  risingSign,
  onSunChange,
  onMoonChange,
  onRisingChange,
  selectedIntention,
  onIntentionChange,
  onNatalBloom,
}) {
  return (
    <div className="mb-8 space-y-6">
      {/* Your Soul Blueprint */}
      <div className="p-6 bg-gradient-to-br from-pink-100 to-purple-100 rounded-3xl shadow-md">
        <h2 className="text-2xl font-italiana text-purple-700 mb-4 text-center">Your Soul Blueprint</h2>
        <div className="grid grid-cols-3 gap-4">
          {/* Sun Sign */}
          <div className="text-center">
            <label className="block text-sm font-garamond text-purple-800 mb-2 font-semibold">
              ☀️ Sun
            </label>
            <select
              value={sunSign}
              onChange={(e) => onSunChange(e.target.value)}
              className="w-full px-3 py-2 border-2 border-purple-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-300 text-sm bg-white text-purple-800 cursor-pointer hover:border-purple-400"
            >
              {zodiacSigns.map(sign => (
                <option key={sign} value={sign}>{sign}</option>
              ))}
            </select>
            <p className="text-xs text-purple-700 mt-1 italic">Your essence</p>
          </div>

          {/* Moon Sign */}
          <div className="text-center">
            <label className="block text-sm font-garamond text-purple-800 mb-2 font-semibold">
              🌙 Moon
            </label>
            <select
              value={moonSign}
              onChange={(e) => onMoonChange(e.target.value)}
              className="w-full px-3 py-2 border-2 border-purple-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-300 text-sm bg-white text-purple-800 cursor-pointer hover:border-purple-400"
            >
              {zodiacSigns.map(sign => (
                <option key={sign} value={sign}>{sign}</option>
              ))}
            </select>
            <p className="text-xs text-purple-700 mt-1 italic">Your heart</p>
          </div>

          {/* Rising Sign */}
          <div className="text-center">
            <label className="block text-sm font-garamond text-purple-800 mb-2 font-semibold">
              ⬆️ Rising
            </label>
            <select
              value={risingSign}
              onChange={(e) => onRisingChange(e.target.value)}
              className="w-full px-3 py-2 border-2 border-purple-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-300 text-sm bg-white text-purple-800 cursor-pointer hover:border-purple-400"
            >
              {zodiacSigns.map(sign => (
                <option key={sign} value={sign}>{sign}</option>
              ))}
            </select>
            <p className="text-xs text-purple-700 mt-1 italic">Your vibe</p>
          </div>
        </div>

        <button
          onClick={onNatalBloom}
          className="w-full mt-5 px-6 py-3 bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500 text-white rounded-full font-garamond font-semibold transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95"
        >
          ✨ Plant Your Soul Foundation (3 flowers)
        </button>
      </div>

      {/* Intentions */}
      <div className="p-6 bg-gradient-to-br from-yellow-50 to-pink-50 rounded-3xl shadow-md">
        <h2 className="text-2xl font-italiana text-pink-600 mb-4 text-center">Plant Your Intention</h2>
        <div className="flex gap-2 items-center">
          <select
            value={selectedIntention}
            onChange={(e) => onIntentionChange(e.target.value)}
            className="flex-1 px-4 py-3 border-2 border-pink-300 rounded-2xl font-garamond text-purple-800 bg-white hover:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-300 cursor-pointer"
          >
            <option value="">Choose an intention...</option>
            {intentionsList.map(intention => (
              <option key={intention} value={intention}>
                🌸 {intention}
              </option>
            ))}
          </select>
        </div>
        <p className="text-xs text-pink-700 italic mt-2 text-center">Select and a matching flower will plant itself</p>
      </div>
    </div>
  );
}
