import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from './components/Header';
import ZodiacSelector from './components/ZodiacSelector';
import Canvas from './components/Canvas';
import AssetTray from './components/AssetTray';
import Controls from './components/Controls';
import { flowerManifest } from './utils/flowerManifest';
import { zodiacFlowers, flowerScales } from './utils/zodiacMapping';
import { useFlowerBatch } from './hooks/useFlowerProcessing';
import './App.css';

function App() {
  const canvasRef = useRef(null);
  const [sunSign, setSunSign] = useState('Leo');
  const [moonSign, setMoonSign] = useState('Pisces');
  const [risingSign, setRisingSign] = useState('Aquarius');
  const [flowers, setFlowers] = useState([]);
  const [nextId, setNextId] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSealing, setIsSealing] = useState(false);
  const [message, setMessage] = useState('');
  const [showMessageInput, setShowMessageInput] = useState(false);

  // Process all flower images for background removal
  const imagePaths = flowerManifest.map(f => `/flowers/${f.filename}`);
  const { processed: processedImages, loading: processingImages, progress } = useFlowerBatch(imagePaths);

  // Initialize zodiac bouquet
  useEffect(() => {
    generateZodiacBouquet();
  }, [sunSign, moonSign, risingSign, processedImages]);

  const generateZodiacBouquet = () => {
    if (Object.keys(processedImages).length === 0) return;

    const newFlowers = [];
    const canvasWidth = 600;
    const canvasHeight = 600;

    // Fan-shaped positioning for zodiac flowers
    const positions = {
      // Rising: Back-Left (small, z: 3)
      rising: { x: 200, y: 450, scale: flowerScales.rising, zIndex: 3, baseRotation: -20 },
      // Moon: Back-Right (medium, z: 4)
      moon: { x: 400, y: 400, scale: flowerScales.moon, zIndex: 4, baseRotation: 20 },
      // Sun: Front-Center (largest, z: 5)
      sun: { x: 300, y: 300, scale: flowerScales.sun, zIndex: 5, baseRotation: 0 },
    };

    const addSmallVariation = (pos) => ({
      ...pos,
      x: pos.x + (Math.random() - 0.5) * 30,
      y: pos.y + (Math.random() - 0.5) * 30,
    });

    // ===== Sun Flower (Front-Center, z: 5) =====
    const sunFlowerName = zodiacFlowers[sunSign];
    const sunFlowerData = flowerManifest.find(f => f.name === sunFlowerName);
    if (sunFlowerData) {
      const sunImagePath = `/flowers/${sunFlowerData.filename}`;
      if (processedImages[sunImagePath]) {
        const sunPos = addSmallVariation(positions.sun);
        newFlowers.push({
          id: nextId + 1,
          name: sunFlowerName,
          src: processedImages[sunImagePath],
          originalSrc: sunImagePath,
          x: sunPos.x,
          y: sunPos.y,
          scale: sunPos.scale,
          rotation: positions.sun.baseRotation + (Math.random() - 0.5) * 20,
          zIndex: 5,
          type: 'sun',
        });
      }
    }

    // ===== Moon Flower (Back-Right, z: 4) =====
    const moonFlowerName = zodiacFlowers[moonSign];
    const moonFlowerData = flowerManifest.find(f => f.name === moonFlowerName);
    if (moonFlowerData) {
      const moonImagePath = `/flowers/${moonFlowerData.filename}`;
      if (processedImages[moonImagePath]) {
        const moonPos = addSmallVariation(positions.moon);
        newFlowers.push({
          id: nextId + 2,
          name: moonFlowerName,
          src: processedImages[moonImagePath],
          originalSrc: moonImagePath,
          x: moonPos.x,
          y: moonPos.y,
          scale: moonPos.scale,
          rotation: positions.moon.baseRotation + (Math.random() - 0.5) * 20,
          zIndex: 4,
          type: 'moon',
        });
      }
    }

    // ===== Rising Flower (Back-Left, z: 3) =====
    const risingFlowerName = zodiacFlowers[risingSign];
    const risingFlowerData = flowerManifest.find(f => f.name === risingFlowerName);
    if (risingFlowerData) {
      const risingImagePath = `/flowers/${risingFlowerData.filename}`;
      if (processedImages[risingImagePath]) {
        const risingPos = addSmallVariation(positions.rising);
        newFlowers.push({
          id: nextId + 3,
          name: risingFlowerName,
          src: processedImages[risingImagePath],
          originalSrc: risingImagePath,
          x: risingPos.x,
          y: risingPos.y,
          scale: risingPos.scale,
          rotation: positions.rising.baseRotation + (Math.random() - 0.5) * 20,
          zIndex: 3,
          type: 'rising',
        });
      }
    }

    // ===== Auto-Fillers: Ivy & Delphinium (Behind everything, z: 2) =====
    const fillerFlowers = ['Ivy', 'Delphinium'];
    const fillerPositions = [
      { x: 150, y: 500 }, // Left-back
      { x: 450, y: 480 }, // Right-back
      { x: 300, y: 520 }, // Center-back
    ];

    // Add 2-3 random fillers
    const fillerCount = 2 + Math.floor(Math.random() * 2);
    for (let i = 0; i < fillerCount; i++) {
      const fillerName = fillerFlowers[Math.floor(Math.random() * fillerFlowers.length)];
      const fillerData = flowerManifest.find(f => f.name === fillerName);

      if (fillerData) {
        const fillerImagePath = `/flowers/${fillerData.filename}`;
        if (processedImages[fillerImagePath]) {
          const fillerPos = fillerPositions[i % fillerPositions.length];
          const fillerVariation = addSmallVariation(fillerPos);

          newFlowers.push({
            id: nextId + 4 + i,
            name: fillerName,
            src: processedImages[fillerImagePath],
            originalSrc: fillerImagePath,
            x: fillerVariation.x,
            y: fillerVariation.y,
            scale: 0.4 + Math.random() * 0.3, // 0.4-0.7x
            rotation: Math.random() * 360,
            zIndex: 2,
            type: 'filler',
          });
        }
      }
    }

    setFlowers(newFlowers);
    setNextId(nextId + 7); // Reserve IDs for sun, moon, rising, and up to 3 fillers
  };

  const addFlowerToCanvas = (flowerName) => {
    const flowerData = flowerManifest.find(f => f.name === flowerName);
    if (!flowerData) return;

    const imagePath = `/flowers/${flowerData.filename}`;
    if (!processedImages[imagePath]) return;

    const newFlower = {
      id: nextId,
      name: flowerName,
      src: processedImages[imagePath],
      originalSrc: imagePath,
      x: 300 + Math.random() * 100,
      y: 300 + Math.random() * 100,
      scale: 0.8 + Math.random() * 0.4,
      rotation: Math.random() * 360,
      zIndex: flowers.length + 1,
    };

    setFlowers([...flowers, newFlower]);
    setNextId(nextId + 1);
  };

  const updateFlower = (id, updates) => {
    setFlowers(flowers.map(f => f.id === id ? { ...f, ...updates } : f));
  };

  const deleteFlower = (id) => {
    setFlowers(flowers.filter(f => f.id !== id));
  };

  const bringToFront = (id) => {
    const maxZ = Math.max(...flowers.map(f => f.zIndex), 0);
    updateFlower(id, { zIndex: maxZ + 1 });
  };

  const clearCanvas = () => {
    if (confirm('Clear all flowers? You can regenerate the zodiac bouquet.')) {
      setFlowers([]);
    }
  };

  if (processingImages) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-cream">
        <div className="text-center">
          <div className="text-2xl font-serif mb-4">✿ Digital Bouquet</div>
          <div className="mb-4 text-sm text-gray-600">Processing flowers...</div>
          <div className="w-48 h-1 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-pastel-rose rounded-full transition-all duration-300"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-screen flex flex-col bg-cream overflow-hidden">
      {/* Paper texture overlay */}
      <div className="paper-texture" />

      {/* Header */}
      <Header />

      {/* Main content */}
      <div className="flex-1 flex gap-6 p-6 overflow-hidden">
        {/* Left: Canvas area */}
        <div className="flex-1 flex flex-col">
          {/* Zodiac selector */}
          <ZodiacSelector
            sunSign={sunSign}
            moonSign={moonSign}
            risingSign={risingSign}
            onSunChange={setSunSign}
            onMoonChange={setMoonSign}
            onRisingChange={setRisingSign}
          />

          {/* Canvas */}
          <Canvas
            ref={canvasRef}
            flowers={flowers}
            onUpdateFlower={updateFlower}
            onDeleteFlower={deleteFlower}
            onBringToFront={bringToFront}
            isSealing={isSealing}
            message={message}
          />

          {/* Controls */}
          <Controls
            onSealBouquet={() => setIsSealing(true)}
            onClear={clearCanvas}
            onMessageToggle={() => setShowMessageInput(!showMessageInput)}
            canvasRef={canvasRef}
            message={message}
            setMessage={setMessage}
            showMessageInput={showMessageInput}
          />
        </div>

        {/* Right: Asset tray */}
        <AssetTray
          flowers={flowerManifest}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onFlowerSelect={addFlowerToCanvas}
        />
      </div>

      {/* Sealing mode (full-screen capture) */}
      {isSealing && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm">
            <h3 className="text-xl font-serif mb-4">Seal Your Bouquet</h3>
            <p className="text-sm text-gray-600 mb-6">Your bouquet is ready to download!</p>
            <div className="flex gap-4">
              <button
                onClick={() => setIsSealing(false)}
                className="flex-1 px-4 py-2 bg-gray-200 rounded-full hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setIsSealing(false);
                  // Export will be handled in Controls component
                }}
                className="flex-1 px-4 py-2 bg-pastel-rose rounded-full hover:bg-pink-300"
              >
                Download
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
