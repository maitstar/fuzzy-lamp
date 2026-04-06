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
    <div>
      {/* Seed Library */}
      <div className="bg-white bg-opacity-70 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden sticky top-8">
        {/* Header/Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-5 py-3 flex items-center justify-between hover:bg-gray-50 transition text-gray-700"
        >
          <div>
            <h2 className="text-sm font-italiana tracking-widest uppercase">
              🌿 Seed Library
            </h2>
            <p className="text-xs font-garamond text-gray-500">
              {filteredFlowers.length} varieties
            </p>
          </div>
          <div>
            {isOpen ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
          </div>
        </button>

        {/* Content (collapsible) */}
        {isOpen && (
          <div className="border-t border-gray-200">
            {/* Search */}
            <div className="p-4 border-b border-gray-200 bg-gray-50">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 text-gray-400" size={14} />
                <input
                  type="text"
                  placeholder="Search flowers..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-sm focus:outline-none bg-white rounded-sm text-gray-700"
                />
              </div>
            </div>

            {/* Flower Grid */}
            <div className="max-h-64 overflow-y-auto p-3 bg-white">
              {filteredFlowers.length === 0 ? (
                <div className="text-center text-xs text-gray-400 py-6 font-garamond">
                  No flowers found
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  {filteredFlowers.map(flower => (
                    <button
                      key={flower.id}
                      onClick={() => onFlowerSelect(flower.name)}
                      className="p-2 text-left text-xs hover:bg-gray-100 transition duration-200 active:scale-95 text-gray-700 font-garamond"
                    >
                      <span className="mr-1">{flower.emoji}</span>
                      {flower.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Info Footer */}
            <div className="p-3 text-xs text-gray-500 border-t border-gray-200 bg-gray-50 italic font-garamond text-center">
              Click to plant • Drag to position • Double-click to remove
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
