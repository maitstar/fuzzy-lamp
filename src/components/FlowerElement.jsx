import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Trash2, RotateCw } from 'lucide-react';

export default function FlowerElement({
  flower,
  onUpdate,
  onDelete,
  onBringToFront,
  isSealing,
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [isRotating, setIsRotating] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const elementRef = useRef(null);

  const handleDragStart = (e) => {
    setIsDragging(true);
    onBringToFront(flower.id);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleDragMove = (e) => {
    if (!isDragging || isSealing) return;

    const deltaX = e.clientX - dragStart.x;
    const deltaY = e.clientY - dragStart.y;

    onUpdate(flower.id, {
      x: flower.x + deltaX,
      y: flower.y + deltaY,
    });

    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleRotate = () => {
    if (isSealing) return;
    const newRotation = (flower.rotation + 45) % 360;
    onUpdate(flower.id, { rotation: newRotation });
  };

  const handleScaleChange = (e) => {
    if (isSealing) return;
    const scale = Math.min(Math.max(parseFloat(e.target.value), 0.3), 2);
    onUpdate(flower.id, { scale });
  };

  const handleDelete = () => {
    if (confirm(`Delete ${flower.name}?`)) {
      onDelete(flower.id);
    }
  };

  const handleDoubleClick = () => {
    onDelete(flower.id);
  };

  return (
    <motion.div
      ref={elementRef}
      className={`absolute cursor-grab active:cursor-grabbing group transition-all duration-200 ${
        isSealing ? '' : 'hover:ring-2 hover:ring-offset-2 hover:ring-pastel-rose hover:drop-shadow-lg'
      }`}
      style={{
        left: `${flower.x}px`,
        top: `${flower.y}px`,
        zIndex: flower.zIndex,
        transform: `translate(-50%, -50%)`,
      }}
      draggable={!isSealing}
      onDragStart={handleDragStart}
      onDrag={handleDragMove}
      onDragEnd={handleDragEnd}
      onMouseEnter={() => !isSealing && setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
      onDoubleClick={handleDoubleClick}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      transition={{ duration: 0.6, type: 'spring', bounce: 0.6 }}
      whileDrag={{ scale: 1.08, filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.15))' }}
    >
      {/* Dirt mound shadow at base */}
      <div className="dirt-mound" style={{ width: `${flower.scale * 100}px` }} />

      {/* Flower image */}
      <motion.div
        className={`relative ${!isSealing && 'flower-sway'}`}
        style={{
          width: `${flower.scale * 120}px`,
          height: `${flower.scale * 120}px`,
        }}
        animate={{ rotate: flower.rotation }}
        transition={{ duration: 0.5 }}
      >
        <motion.img
          src={flower.src}
          alt={flower.name}
          className="w-full h-full object-contain drop-shadow-md pointer-events-none"
          style={{ mixBlendMode: 'multiply' }}
          onError={(e) => {
            console.error(`Failed to load flower: ${flower.name}`);
            e.target.src = flower.originalSrc;
          }}
        />
      </motion.div>

      {/* Controls (only visible when not sealing) */}
      {!isSealing && showControls && (
        <motion.div
          className="absolute -top-14 left-1/2 transform -translate-x-1/2 flex gap-3 bg-white rounded-full px-4 py-3 shadow-xl border border-gray-100"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Rotate button */}
          <button
            onClick={handleRotate}
            className="p-2 hover:bg-pastel-lavender rounded-full transition text-gray-700 hover:text-gray-900"
            title="Rotate flower (45°)"
          >
            <RotateCw size={16} />
          </button>

          {/* Scale slider container */}
          <div className="flex items-center gap-2">
            <label className="text-xs text-gray-500 font-medium whitespace-nowrap">Size:</label>
            <input
              type="range"
              min="0.3"
              max="2"
              step="0.1"
              value={flower.scale}
              onChange={handleScaleChange}
              className="w-24 h-2 bg-gradient-to-r from-pastel-lavender to-pastel-rose rounded-full appearance-none cursor-pointer accent-pastel-rose"
              style={{
                WebkitAppearance: 'none',
                appearance: 'none',
                background: `linear-gradient(to right, #D4B5E8 0%, #E8A8C4 ${(flower.scale - 0.3) / 1.7 * 100}%, #E8D4E0 ${(flower.scale - 0.3) / 1.7 * 100}%, #E8D4E0 100%)`,
              }}
              title={`Resize flower (${(flower.scale * 100).toFixed(0)}%)`}
            />
          </div>

          {/* Delete button */}
          <button
            onClick={handleDelete}
            className="p-2 hover:bg-red-100 text-red-500 rounded-full transition hover:text-red-700"
            title="Delete flower"
          >
            <Trash2 size={16} />
          </button>
        </motion.div>
      )}

      {/* Tooltip with flower name */}
      {!isSealing && showControls && (
        <motion.div
          className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs font-serif text-gray-700 bg-white px-3 py-2 rounded-lg shadow-lg border border-gray-100 whitespace-nowrap font-medium"
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {flower.name}
        </motion.div>
      )}
    </motion.div>
  );
}
