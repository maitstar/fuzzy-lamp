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
    <div className="mb-6 space-y-5">
      {/* Your Astrology */}
      <div className="p-6 bg-white bg-opacity-40 backdrop-blur-sm rounded-lg">
        <h3 className="text-sm font-italia text-gray-700 mb-4 text-center tracking-wide uppercase">Your Cosmic Blueprint</h3>
        <div className="grid grid-cols-3 gap-3 mb-5">
          {/* Sun */}
          <div>
            <label className="block text-xs font-garamond text-gray-600 mb-1 uppercase tracking-widest">☀️ Sun</label>
            <select
              value={sunSign}
              onChange={(e) => onSunChange(e.target.value)}
              className="w-full px-2 py-2 text-xs bg-white bg-opacity-70 rounded-sm focus:outline-none text-gray-700 cursor-pointer hover:bg-opacity-100 transition font-garamond"
            >
              {zodiacSigns.map(sign => (
                <option key={sign} value={sign}>{sign}</option>
              ))}
            </select>
          </div>

          {/* Moon */}
          <div>
            <label className="block text-xs font-garamond text-gray-600 mb-1 uppercase tracking-widest">🌙 Moon</label>
            <select
              value={moonSign}
              onChange={(e) => onMoonChange(e.target.value)}
              className="w-full px-2 py-2 text-xs bg-white bg-opacity-70 rounded-sm focus:outline-none text-gray-700 cursor-pointer hover:bg-opacity-100 transition font-garamond"
            >
              {zodiacSigns.map(sign => (
                <option key={sign} value={sign}>{sign}</option>
              ))}
            </select>
          </div>

          {/* Rising */}
          <div>
            <label className="block text-xs font-garamond text-gray-600 mb-1 uppercase tracking-widest">⬆️ Rising</label>
            <select
              value={risingSign}
              onChange={(e) => onRisingChange(e.target.value)}
              className="w-full px-2 py-2 text-xs bg-white bg-opacity-70 rounded-sm focus:outline-none text-gray-700 cursor-pointer hover:bg-opacity-100 transition font-garamond"
            >
              {zodiacSigns.map(sign => (
                <option key={sign} value={sign}>{sign}</option>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={onNatalBloom}
          className="w-full px-4 py-2 bg-white bg-opacity-60 hover:bg-opacity-80 text-gray-700 rounded-sm font-garamond text-sm transition-all duration-300 uppercase tracking-widest active:scale-95"
        >
          Plant Soul Foundation
        </button>
      </div>

      {/* Intentions */}
      <div className="p-6 bg-white bg-opacity-40 backdrop-blur-sm rounded-lg">
        <h3 className="text-sm font-italiana text-gray-700 mb-3 text-center tracking-wide uppercase">Select Intention</h3>
        <select
          value={selectedIntention}
          onChange={(e) => onIntentionChange(e.target.value)}
          className="w-full px-3 py-2 bg-white bg-opacity-70 hover:bg-opacity-100 rounded-sm font-garamond text-gray-700 focus:outline-none text-sm transition cursor-pointer"
        >
          <option value="">Choose an intention...</option>
          {intentionsList.map(intention => (
            <option key={intention} value={intention}>
              {intention}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
