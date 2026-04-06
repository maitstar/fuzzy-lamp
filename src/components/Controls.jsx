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
        <div className="p-4 bg-white bg-opacity-60 rounded-lg">
          <label className="block text-xs font-garamond font-semibold text-gray-700 mb-2 uppercase tracking-widest">
            Add Your Blessing
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write a message for your garden..."
            className="w-full p-3 text-sm focus:outline-none resize-none bg-white text-gray-700 placeholder-gray-400 rounded-sm"
            rows="3"
          />
          <p className="text-xs text-gray-500 mt-2 italic">
            Will appear on the harvested image.
          </p>
        </div>
      )}

      {/* Buttons */}
      <div className="flex gap-3">
        <button
          onClick={onMessageToggle}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-white bg-opacity-60 hover:bg-opacity-80 text-gray-700 rounded-sm font-garamond font-medium text-xs transition active:scale-95 uppercase tracking-widest"
          title="Add a blessing to your garden"
        >
          <MessageCircle size={16} />
          Message
        </button>

        <button
          onClick={handleExport}
          disabled={isExporting}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-white bg-opacity-60 hover:bg-opacity-80 text-gray-700 rounded-sm font-garamond font-medium text-xs transition disabled:opacity-50 active:scale-95 uppercase tracking-widest"
          title="Save your garden as a high-resolution image"
        >
          <Download size={16} />
          {isExporting ? 'Saving...' : 'Save'}
        </button>

        <button
          onClick={onClear}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-white bg-opacity-60 hover:bg-opacity-80 text-gray-700 rounded-sm font-garamond font-medium text-xs transition active:scale-95 uppercase tracking-widest"
          title="Clear the garden"
        >
          <Trash2 size={16} />
          Clear
        </button>
      </div>

      {/* Instructions */}
      <div className="text-xs text-center p-3 bg-white bg-opacity-40 rounded-lg font-garamond text-gray-600">
        <p>Use Seed Library to add flowers • Click to edit • Save when ready</p>
      </div>
    </div>
  );
}
