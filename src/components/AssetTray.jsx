import { useState } from 'react';
import { Search, ChevronUp, ChevronDown } from 'lucide-react';
import { searchFlowers } from '../utils/flowerManifest';

export default function AssetTray({
  flowers,
  searchQuery,
  onSearchChange,
  onFlowerSelect,
}) {
  const [isOpen, setIsOpen] = useState(true);
  const filteredFlowers = searchQuery.trim() === ''
    ? flowers
    : searchFlowers(searchQuery);

  return (
    <div className="fixed bottom-6 right-6 max-w-sm z-40">
      {/* Floating Seed Library */}
      <div className="bg-amber-50 backdrop-blur-sm rounded-3xl border-2 border-amber-800 shadow-2xl overflow-hidden">
        {/* Header/Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-6 py-4 flex items-center justify-between bg-amber-100 hover:bg-amber-200 transition text-amber-950 border-b-2 border-amber-800"
        >
          <div>
            <h2 className="text-lg font-italiana tracking-wide">
              🌿 Seed Library
            </h2>
            <p className="text-xs font-garamond">
              {filteredFlowers.length} seeds
            </p>
          </div>
          <div>
            {isOpen ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
          </div>
        </button>

        {/* Content (collapsible) */}
        {isOpen && (
          <div className="border-t-2 border-amber-800">
            {/* Search */}
            <div className="p-4 border-b border-amber-800 bg-amber-50">
              <div className="relative">
                <Search className="absolute left-3 top-3 text-amber-700" size={16} />
                <input
                  type="text"
                  placeholder="Find a flower..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 border-2 border-amber-800 rounded-xl text-sm focus:outline-none focus:border-green-800 bg-transparent text-amber-950"
                />
              </div>
            </div>

            {/* Flower Grid */}
            <div className="max-h-56 overflow-y-auto p-3 bg-amber-50">
              {filteredFlowers.length === 0 ? (
                <div className="text-center text-sm text-amber-700 py-6 font-garamond">
                  No flowers found 🌸
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  {filteredFlowers.map(flower => (
                    <button
                      key={flower.id}
                      onClick={() => onFlowerSelect(flower.name)}
                      className="p-2 text-left text-xs border-2 border-amber-800 rounded-xl transition duration-200 hover:border-green-800 hover:bg-green-800 hover:bg-opacity-5 active:scale-95 text-amber-950 font-garamond font-medium"
                    >
                      {flower.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Info Footer */}
            <div className="p-3 text-xs text-amber-800 border-t border-amber-800 bg-amber-100 italic font-garamond">
              Click a seed to plant it. Drag to move. Double-click to remove.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
