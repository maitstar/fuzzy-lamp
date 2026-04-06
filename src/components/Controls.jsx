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
        <div className="p-4 bg-white bg-opacity-70 rounded-lg border border-gray-200">
          <label className="block text-xs font-semibold text-gray-600 mb-2">
            Add a Message
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write a blessing or intention to accompany your garden..."
            className="w-full p-3 border border-green-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
            rows="3"
          />
          <p className="text-xs text-gray-500 mt-2">
            Your blessing will appear on the final image.
          </p>
        </div>
      )}

      {/* Buttons */}
      <div className="flex gap-3">
        <button
          onClick={onMessageToggle}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-green-200 hover:bg-green-300 rounded-full font-sans font-medium text-sm transition text-green-800"
          title="Add a blessing to your garden"
        >
          <MessageCircle size={18} />
          Blessing
        </button>

        <button
          onClick={handleExport}
          disabled={isExporting}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-green-500 hover:bg-green-600 text-white rounded-full font-sans font-medium text-sm transition disabled:opacity-50 hover:shadow-lg"
          title="Save your garden as a high-resolution image"
        >
          <Download size={18} />
          {isExporting ? 'Harvesting...' : 'Harvest'}
        </button>

        <button
          onClick={onClear}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gray-200 hover:bg-gray-300 rounded-full font-sans font-medium text-sm transition"
          title="Clear the garden"
        >
          <Trash2 size={18} />
          Clear
        </button>
      </div>

      {/* Instructions */}
      <div className="text-xs text-green-800 text-center p-3 bg-gradient-to-r from-green-100 to-green-50 rounded-lg font-garamond border border-green-200">
        <p>🌱 Use the Seed Library to add more flowers to your manifestation garden</p>
        <p>↻ Click each flower to rotate, resize, or remove it</p>
        <p>🌿 Harvest your sacred garden when it's ready to share</p>
      </div>
    </div>
  );
}
