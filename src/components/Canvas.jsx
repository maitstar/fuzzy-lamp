import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import FlowerElement from './FlowerElement';
import BouquetRibbon from './BouquetRibbon';

const Canvas = forwardRef(function Canvas(
  { flowers, onUpdateFlower, onDeleteFlower, onBringToFront, isSealing, message },
  ref
) {
  return (
    <div
      ref={ref}
      className="flex items-center justify-center overflow-hidden relative meadow-canvas"
      style={{
        flex: 1,
        minHeight: '500px',
        width: '100%',
      }}
    >
      {/* Grass texture overlay */}
      <div className="grass-texture" />

      {/* Container for flowers */}
      <div className="relative w-full h-full z-10">
        {/* Flowers */}
        {flowers.map(flower => (
          <FlowerElement
            key={flower.id}
            flower={flower}
            onUpdate={onUpdateFlower}
            onDelete={onDeleteFlower}
            onBringToFront={onBringToFront}
            isSealing={isSealing}
          />
        ))}

        {/* Bouquet Ribbon Wrap (z-index: 10) */}
        {flowers.length > 0 && <BouquetRibbon isSealing={isSealing} />}

        {/* Empty state */}
        {flowers.length === 0 && !isSealing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm font-serif pointer-events-none"
          >
            Drag flowers here to arrange
          </motion.div>
        )}

        {/* Message overlay (shown during sealing) */}
        {isSealing && message && (
          <div className="absolute bottom-8 left-8 right-8 text-center font-serif text-gray-700 text-sm px-4 py-3 bg-white bg-opacity-70 rounded-lg">
            {message}
          </div>
        )}
      </div>
    </div>
  );
});

export default Canvas;
