import { useState } from 'react';
import { Download, Trash2, MessageCircle } from 'lucide-react';
import { exportBouquetAsImage } from '../utils/canvasExport';

export default function Controls({
  onSealBouquet,
  onClear,
  onMessageToggle,
  canvasRef,
  message,
  setMessage,
  showMessageInput,
}) {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    try {
      // Hide UI temporarily and export
      const controls = document.querySelector('.controls-section');
      const selector = document.querySelector('div:has(> *:nth-child(1))').parentElement;

      if (controls) controls.style.display = 'none';

      await exportBouquetAsImage(canvasRef, 'my-bouquet');

      if (controls) controls.style.display = 'flex';
    } catch (err) {
      console.error('Export failed:', err);
      alert('Failed to export bouquet. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="controls-section mt-6 flex flex-col gap-4">
      {/* Message input */}
      {showMessageInput && (
        <div className="p-5 bg-transparent border-2 border-amber-800 rounded-2xl">
          <label className="block text-sm font-garamond font-semibold text-amber-950 mb-2">
            Add Your Blessing
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write a message or intention to carry with your garden..."
            className="w-full p-3 border-2 border-amber-800 rounded-xl text-sm focus:outline-none focus:border-green-800 resize-none bg-transparent text-amber-950 placeholder-amber-700"
            rows="3"
          />
          <p className="text-xs text-amber-800 mt-2 italic">
            Your blessing will appear on the harvested image.
          </p>
        </div>
      )}

      {/* Buttons */}
      <div className="flex gap-3">
        <button
          onClick={onMessageToggle}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border-2 border-amber-800 rounded-full font-garamond font-medium text-sm transition text-amber-950 hover:bg-amber-800 hover:bg-opacity-5 active:scale-95"
          title="Add a blessing to your garden"
        >
          <MessageCircle size={18} />
          Blessing
        </button>

        <button
          onClick={handleExport}
          disabled={isExporting}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border-2 border-green-800 rounded-full font-garamond font-medium text-sm transition text-green-900 hover:bg-green-800 hover:bg-opacity-5 disabled:opacity-50 active:scale-95"
          title="Save your garden as a high-resolution image"
        >
          <Download size={18} />
          {isExporting ? 'Harvesting...' : 'Harvest'}
        </button>

        <button
          onClick={onClear}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border-2 border-red-900 rounded-full font-garamond font-medium text-sm transition text-red-900 hover:bg-red-900 hover:bg-opacity-5 active:scale-95"
          title="Clear the garden"
        >
          <Trash2 size={18} />
          Clear
        </button>
      </div>

      {/* Instructions */}
      <div className="text-xs text-center p-4 bg-transparent border-2 border-amber-800 rounded-2xl font-garamond text-amber-950">
        <p>🌸 Use the Seed Library to add more flowers</p>
        <p>✨ Click each flower to rotate, resize, or remove</p>
        <p>🌿 Harvest when your garden is ready</p>
      </div>
    </div>
  );
}
