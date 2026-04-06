import { useState } from 'react';
import { Download, Trash2, MessageCircle } from 'lucide-react';
import { exportBouquetAsImage } from '../utils/canvasExport';

export default function Controls({ onSealBouquet, onClear, onMessageToggle, canvasRef, message, setMessage, showMessageInput }) {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    try {
      const controls = document.querySelector('.controls-section');
      if (controls) controls.style.visibility = 'hidden';
      await exportBouquetAsImage(canvasRef, 'manifestation-garden');
      if (controls) controls.style.visibility = 'visible';
    } catch (err) {
      console.error('Export failed:', err);
      alert('Export failed — please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="controls-section mt-3 flex flex-col gap-2">
      {showMessageInput && (
        <textarea
          value={message}
          onChange={e => setMessage(e.target.value)}
          placeholder="Write a blessing for your garden..."
          className="w-full p-2 text-sm border border-stone-200 rounded text-stone-700 placeholder-stone-400 resize-none focus:outline-none focus:border-stone-400 font-garamond bg-white"
          rows="2"
        />
      )}

      <div className="flex gap-2">
        <button
          onClick={onMessageToggle}
          className="flex items-center gap-1 px-3 py-1.5 text-xs text-stone-600 border border-stone-200 rounded font-garamond hover:bg-stone-50 uppercase tracking-wide"
        >
          <MessageCircle size={13} /> Bless
        </button>
        <button
          onClick={handleExport}
          disabled={isExporting}
          className="flex items-center gap-1 px-3 py-1.5 text-xs text-white bg-stone-700 rounded font-garamond hover:bg-stone-800 disabled:opacity-50 uppercase tracking-wide"
        >
          <Download size={13} /> {isExporting ? 'Saving...' : 'Save'}
        </button>
        <button
          onClick={onClear}
          className="flex items-center gap-1 px-3 py-1.5 text-xs text-stone-600 border border-stone-200 rounded font-garamond hover:bg-stone-50 uppercase tracking-wide"
        >
          <Trash2 size={13} /> Clear
        </button>
      </div>
    </div>
  );
}
