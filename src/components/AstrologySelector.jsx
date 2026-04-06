import { zodiacSigns } from '../utils/zodiacMapping';
import { intentionsList } from '../utils/intentionMapping';

export default function AstrologySelector({
  sunSign, moonSign, risingSign,
  onSunChange, onMoonChange, onRisingChange,
  selectedIntention, onIntentionChange,
  onNatalBloom,
}) {
  return (
    <div className="space-y-4">

      {/* ── Soul Blueprint ── */}
      <div>
        <p className="text-xs uppercase tracking-widest text-stone-400 mb-3 font-garamond">Your Cosmic Blueprint</p>

        <div className="space-y-2">
          {/* Sun */}
          <div className="flex items-center gap-3">
            <span className="text-sm w-6">☀️</span>
            <div className="flex-1">
              <select
                value={sunSign}
                onChange={e => onSunChange(e.target.value)}
                className="w-full text-sm text-stone-700 bg-white border border-stone-200 rounded px-2 py-1.5 focus:outline-none focus:border-stone-400 font-garamond cursor-pointer"
              >
                {zodiacSigns.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <span className="text-xs text-stone-400 w-8">Sun</span>
          </div>

          {/* Moon */}
          <div className="flex items-center gap-3">
            <span className="text-sm w-6">🌙</span>
            <div className="flex-1">
              <select
                value={moonSign}
                onChange={e => onMoonChange(e.target.value)}
                className="w-full text-sm text-stone-700 bg-white border border-stone-200 rounded px-2 py-1.5 focus:outline-none focus:border-stone-400 font-garamond cursor-pointer"
              >
                {zodiacSigns.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <span className="text-xs text-stone-400 w-8">Moon</span>
          </div>

          {/* Rising */}
          <div className="flex items-center gap-3">
            <span className="text-sm w-6">⬆️</span>
            <div className="flex-1">
              <select
                value={risingSign}
                onChange={e => onRisingChange(e.target.value)}
                className="w-full text-sm text-stone-700 bg-white border border-stone-200 rounded px-2 py-1.5 focus:outline-none focus:border-stone-400 font-garamond cursor-pointer"
              >
                {zodiacSigns.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <span className="text-xs text-stone-400 w-8">Rising</span>
          </div>
        </div>

        <button
          onClick={onNatalBloom}
          className="mt-3 w-full text-xs py-2 px-3 bg-stone-800 text-white rounded font-garamond tracking-wide hover:bg-stone-700 uppercase"
        >
          ✨ Plant Soul Foundation
        </button>
      </div>

      {/* ── Intention ── */}
      <div>
        <p className="text-xs uppercase tracking-widest text-stone-400 mb-2 font-garamond">Plant an Intention</p>
        <select
          value={selectedIntention}
          onChange={e => onIntentionChange(e.target.value)}
          className="w-full text-sm text-stone-700 bg-white border border-stone-200 rounded px-2 py-1.5 focus:outline-none focus:border-green-600 font-garamond cursor-pointer"
        >
          <option value="">Choose an intention...</option>
          {intentionsList.map(i => <option key={i} value={i}>{i}</option>)}
        </select>
        <p className="text-xs text-stone-400 mt-1 italic">A flower will plant itself</p>
      </div>

    </div>
  );
}
