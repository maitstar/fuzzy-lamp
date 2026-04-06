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
        <div className="p-5 bg-gradient-to-br from-yellow-50 to-pink-50 rounded-2xl border-2 border-pink-200">
          <label className="block text-sm font-garamond font-semibold text-pink-700 mb-2">
            Add Your Blessing
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write a message or intention to carry with your garden..."
            className="w-full p-3 border-2 border-pink-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 resize-none bg-white text-purple-900 placeholder-purple-300"
            rows="3"
          />
          <p className="text-xs text-pink-600 mt-2 italic">
            Your blessing will appear on the harvested image.
          </p>
        </div>
      )}

      {/* Buttons */}
      <div className="flex gap-3">
        <button
          onClick={onMessageToggle}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-yellow-200 to-orange-200 hover:from-yellow-300 hover:to-orange-300 rounded-full font-garamond font-medium text-sm transition text-orange-800 shadow-md hover:shadow-lg active:scale-95"
          title="Add a blessing to your garden"
        >
          <MessageCircle size={18} />
          Blessing
        </button>

        <button
          onClick={handleExport}
          disabled={isExporting}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500 text-white rounded-full font-garamond font-medium text-sm transition disabled:opacity-50 shadow-md hover:shadow-lg active:scale-95"
          title="Save your garden as a high-resolution image"
        >
          <Download size={18} />
          {isExporting ? 'Harvesting...' : 'Harvest'}
        </button>

        <button
          onClick={onClear}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-red-200 to-pink-200 hover:from-red-300 hover:to-pink-300 rounded-full font-garamond font-medium text-sm transition text-red-800 shadow-md hover:shadow-lg active:scale-95"
          title="Clear the garden"
        >
          <Trash2 size={18} />
          Clear
        </button>
      </div>

      {/* Instructions */}
      <div className="text-xs text-center p-4 bg-gradient-to-r from-purple-50 via-pink-50 to-yellow-50 rounded-2xl font-garamond border-2 border-purple-200 text-purple-800">
        <p>🌸 Use the Seed Library to add more flowers</p>
        <p>✨ Click each flower to rotate, resize, or remove</p>
        <p>🌿 Harvest when your garden is ready</p>
      </div>
    </div>
  );
}
