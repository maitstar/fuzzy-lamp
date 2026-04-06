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
      <div className="bg-white bg-opacity-98 backdrop-blur-sm rounded-3xl border-2 border-pink-300 shadow-2xl overflow-hidden">
        {/* Header/Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-6 py-4 flex items-center justify-between bg-gradient-to-r from-pink-300 to-purple-300 hover:from-pink-400 hover:to-purple-400 transition text-white"
        >
          <div>
            <h2 className="text-lg font-italiana tracking-wide">
              🌿 Seed Library
            </h2>
            <p className="text-xs font-garamond opacity-90">
              {filteredFlowers.length} seeds
            </p>
          </div>
          <div>
            {isOpen ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
          </div>
        </button>

        {/* Content (collapsible) */}
        {isOpen && (
          <div className="border-t-2 border-pink-200">
            {/* Search */}
            <div className="p-4 border-b border-pink-200 bg-gradient-to-r from-pink-50 to-purple-50">
              <div className="relative">
                <Search className="absolute left-3 top-3 text-pink-400" size={16} />
                <input
                  type="text"
                  placeholder="Find a flower..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 border-2 border-pink-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 bg-white text-purple-900"
                />
              </div>
            </div>

            {/* Flower Grid */}
            <div className="max-h-56 overflow-y-auto p-3 bg-white">
              {filteredFlowers.length === 0 ? (
                <div className="text-center text-sm text-purple-400 py-6 font-garamond">
                  No flowers found 🌸
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  {filteredFlowers.map(flower => (
                    <button
                      key={flower.id}
                      onClick={() => onFlowerSelect(flower.name)}
                      className="p-2 text-left text-xs bg-gradient-to-br from-pink-100 to-purple-100 hover:from-pink-200 hover:to-purple-200 rounded-2xl transition duration-200 border-2 border-pink-200 hover:border-pink-400 hover:shadow-md active:scale-95"
                    >
                      <div className="font-garamond font-medium text-purple-800 truncate">
                        {flower.name}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Info Footer */}
            <div className="p-3 text-xs text-purple-700 border-t border-pink-200 bg-gradient-to-r from-yellow-50 to-pink-50 italic font-garamond">
              Click a seed to plant it. Drag to move. Double-click to remove.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
