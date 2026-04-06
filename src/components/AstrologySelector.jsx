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
      <div className="p-6 bg-transparent border-2 border-amber-800 rounded-3xl">
        <h2 className="text-2xl font-italiana text-amber-900 mb-6 text-center">Your Soul Blueprint</h2>
        <div className="grid grid-cols-3 gap-4 mb-6">
          {/* Sun Sign */}
          <div className="text-center">
            <label className="block text-sm font-garamond text-amber-900 mb-2 font-semibold">
              ☀️ Sun
            </label>
            <select
              value={sunSign}
              onChange={(e) => onSunChange(e.target.value)}
              className="w-full px-3 py-2 border-2 border-amber-800 rounded-xl focus:outline-none focus:border-green-800 text-sm bg-transparent text-amber-950 cursor-pointer hover:border-green-800"
            >
              {zodiacSigns.map(sign => (
                <option key={sign} value={sign}>{sign}</option>
              ))}
            </select>
          </div>

          {/* Moon Sign */}
          <div className="text-center">
            <label className="block text-sm font-garamond text-amber-900 mb-2 font-semibold">
              🌙 Moon
            </label>
            <select
              value={moonSign}
              onChange={(e) => onMoonChange(e.target.value)}
              className="w-full px-3 py-2 border-2 border-amber-800 rounded-xl focus:outline-none focus:border-blue-900 text-sm bg-transparent text-amber-950 cursor-pointer hover:border-blue-900"
            >
              {zodiacSigns.map(sign => (
                <option key={sign} value={sign}>{sign}</option>
              ))}
            </select>
          </div>

          {/* Rising Sign */}
          <div className="text-center">
            <label className="block text-sm font-garamond text-amber-900 mb-2 font-semibold">
              ⬆️ Rising
            </label>
            <select
              value={risingSign}
              onChange={(e) => onRisingChange(e.target.value)}
              className="w-full px-3 py-2 border-2 border-amber-800 rounded-xl focus:outline-none focus:border-teal-900 text-sm bg-transparent text-amber-950 cursor-pointer hover:border-teal-900"
            >
              {zodiacSigns.map(sign => (
                <option key={sign} value={sign}>{sign}</option>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={onNatalBloom}
          className="w-full px-6 py-3 border-2 border-amber-800 hover:border-green-800 text-amber-950 rounded-full font-garamond font-semibold transition-all duration-300 hover:bg-green-800 hover:bg-opacity-5 active:scale-95"
        >
          ✨ Plant Your Soul Foundation (3 flowers)
        </button>
      </div>

      {/* Intentions */}
      <div className="p-6 bg-transparent border-2 border-amber-800 rounded-3xl">
        <h2 className="text-2xl font-italiana text-amber-900 mb-4 text-center">Plant Your Intention</h2>
        <select
          value={selectedIntention}
          onChange={(e) => onIntentionChange(e.target.value)}
          className="w-full px-4 py-3 border-2 border-amber-800 rounded-xl font-garamond text-amber-950 bg-transparent hover:border-green-800 focus:outline-none focus:border-green-800 cursor-pointer"
        >
          <option value="">Choose an intention...</option>
          {intentionsList.map(intention => (
            <option key={intention} value={intention}>
              🌸 {intention}
            </option>
          ))}
        </select>
        <p className="text-xs text-amber-800 italic mt-2 text-center">A matching flower will plant itself</p>
      </div>
    </div>
  );
}
