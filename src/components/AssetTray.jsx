import { useState } from 'react';
import { Search, ChevronUp, ChevronDown } from 'lucide-react';
import { searchFlowers } from '../utils/flowerManifest';

export default function AssetTray({ flowers, searchQuery, onSearchChange, onFlowerSelect }) {
  const [isOpen, setIsOpen] = useState(true);
  const filteredFlowers = searchQuery.trim() === '' ? flowers : searchFlowers(searchQuery);

  return (
    <div>
      {/* Header toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-1 mb-2"
      >
        <p className="text-xs uppercase tracking-widest text-stone-400 font-garamond">Seed Library</p>
        <span className="text-stone-400">{isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}</span>
      </button>

      {isOpen && (
        <>
          {/* Search */}
          <div className="relative mb-2">
            <Search className="absolute left-2 top-2 text-stone-400" size={13} />
            <input
              type="text"
              placeholder="Search flowers..."
              value={searchQuery}
              onChange={e => onSearchChange(e.target.value)}
              className="w-full pl-7 pr-2 py-1.5 text-xs border border-stone-200 rounded bg-white text-stone-700 focus:outline-none focus:border-stone-400 font-garamond"
            />
          </div>

          {/* Flower grid */}
          <div className="grid grid-cols-2 gap-1 max-h-72 overflow-y-auto">
            {filteredFlowers.length === 0 ? (
              <p className="col-span-2 text-center text-xs text-stone-400 py-4 font-garamond italic">No flowers found</p>
            ) : (
              filteredFlowers.map(flower => (
                <button
                  key={flower.id}
                  onClick={() => onFlowerSelect(flower.name)}
                  className="text-left text-xs px-2 py-1.5 rounded hover:bg-stone-100 text-stone-700 font-garamond active:scale-95 flex items-center gap-1"
                >
                  <span>{flower.emoji}</span>
                  <span className="truncate">{flower.name}</span>
                </button>
              ))
            )}
          </div>

          <p className="text-xs text-stone-400 italic mt-2 font-garamond">Click to plant • Drag to move • Double-click to remove</p>
        </>
      )}
    </div>
  );
}
