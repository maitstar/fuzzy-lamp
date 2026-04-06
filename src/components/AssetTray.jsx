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
      {/* Floating Garden Bed */}
      <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-t-2xl border-2 border-gray-300 shadow-2xl overflow-hidden">
        {/* Header/Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-6 py-4 flex items-center justify-between bg-gradient-to-r from-pastel-peach to-pastel-rose hover:from-opacity-90 hover:to-opacity-90 transition"
        >
          <div>
            <h2 className="text-lg font-italiana text-gray-800 tracking-wide">
              🌿 Garden Bed
            </h2>
            <p className="text-xs text-gray-600 font-garamond">
              {filteredFlowers.length} flowers available
            </p>
          </div>
          <div className="text-gray-800">
            {isOpen ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
          </div>
        </button>

        {/* Content (collapsible) */}
        {isOpen && (
          <div className="border-t-2 border-gray-300">
            {/* Search */}
            <div className="p-4 border-b border-gray-200 bg-gray-50">
              <div className="relative">
                <Search className="absolute left-3 top-3 text-gray-400" size={16} />
                <input
                  type="text"
                  placeholder="Search flowers..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pastel-rose"
                />
              </div>
            </div>

            {/* Flower Grid */}
            <div className="max-h-56 overflow-y-auto p-3 bg-white">
              {filteredFlowers.length === 0 ? (
                <div className="text-center text-sm text-gray-400 py-6">
                  No flowers found
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  {filteredFlowers.map(flower => (
                    <button
                      key={flower.id}
                      onClick={() => onFlowerSelect(flower.name)}
                      className="p-2 text-left text-xs bg-gradient-to-br from-pastel-lavender to-pastel-mint hover:from-pastel-rose hover:to-pastel-peach rounded-lg transition duration-200 border border-gray-200 hover:border-gray-400 hover:shadow-md"
                    >
                      <div className="font-medium text-gray-800 truncate">
                        {flower.name}
                      </div>
                      <div className="text-xs text-gray-600 truncate opacity-75">
                        {flower.filename}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Info Footer */}
            <div className="p-3 text-xs text-gray-600 border-t border-gray-200 bg-gray-50 italic font-garamond">
              Click to add. Drag on canvas to position. Double-click flowers to remove.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
