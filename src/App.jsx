import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from './components/Header';
import AstrologySelector from './components/AstrologySelector';
import Canvas from './components/Canvas';
import AssetTray from './components/AssetTray';
import Controls from './components/Controls';
import { flowerManifest } from './utils/flowerManifest';
import { zodiacFlowers, flowerScales } from './utils/zodiacMapping';
import { intentionFlowers, getFlowerForIntention } from './utils/intentionMapping';
import { useFlowerBatch } from './hooks/useFlowerProcessing';
import './App.css';

function App() {
  const canvasRef = useRef(null);
  // Zodiac signs for Natal Bloom feature
  const [sunSign, setSunSign] = useState('Leo');
  const [moonSign, setMoonSign] = useState('Pisces');
  const [risingSign, setRisingSign] = useState('Aquarius');
  // Manifestation intention
  const [selectedIntention, setSelectedIntention] = useState('');
  const [flowers, setFlowers] = useState([]);
  const [nextId, setNextId] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSealing, setIsSealing] = useState(false);
  const [message, setMessage] = useState('');
  const [showMessageInput, setShowMessageInput] = useState(false);

  // Process all flower images for background removal
  const imagePaths = flowerManifest.map(f => `/flowers/${f.filename}`);
  const { processed: processedImages, loading: processingImages, progress } = useFlowerBatch(imagePaths);

  // Auto-plant intention flower when selected
  useEffect(() => {
    if (selectedIntention && processedImages) {
      plantIntentionFlower(selectedIntention);
    }
  }, [selectedIntention, processedImages]);

  // Plant a flower based on intention selection
  const plantIntentionFlower = (intention) => {
    const flowerName = getFlowerForIntention(intention);
    if (!flowerName) return;

    const flowerData = flowerManifest.find(f => f.name === flowerName);
    if (!flowerData) return;

    const imagePath = `/flowers/${flowerData.filename}`;
    // Use processed image if available, fallback to original
    const src = processedImages[imagePath] || imagePath;

    // Plant at random position in the garden
    const newFlower = {
      id: nextId,
      name: flowerName,
      src: src,
      originalSrc: imagePath,
      x: 150 + Math.random() * 400,
      y: 150 + Math.random() * 350,
      scale: 0.8 + Math.random() * 0.4,
      rotation: Math.random() * 360,
      zIndex: flowers.length + 1,
      type: 'intention',
    };

    setFlowers([...flowers, newFlower]);
    setNextId(nextId + 1);
    setSelectedIntention(''); // Reset intention selector
  };

  // Plant the 3 zodiac flowers as a cluster (Natal Bloom)
  const plantNatalBloom = () => {
    const newFlowers = [];
    const positions = {
      rising: { x: 200, y: 450, scale: flowerScales.rising, zIndex: 3, baseRotation: -20 },
      moon: { x: 400, y: 400, scale: flowerScales.moon, zIndex: 4, baseRotation: 20 },
      sun: { x: 300, y: 300, scale: flowerScales.sun, zIndex: 5, baseRotation: 0 },
    };

    const addSmallVariation = (pos) => ({
      ...pos,
      x: pos.x + (Math.random() - 0.5) * 30,
      y: pos.y + (Math.random() - 0.5) * 30,
    });

    // Plant Sun Flower
    const sunFlowerName = zodiacFlowers[sunSign];
    const sunFlowerData = flowerManifest.find(f => f.name === sunFlowerName);
    if (sunFlowerData) {
      const sunImagePath = `/flowers/${sunFlowerData.filename}`;
      const src = processedImages[sunImagePath] || sunImagePath;
      const sunPos = addSmallVariation(positions.sun);
      newFlowers.push({
        id: nextId,
        name: sunFlowerName,
        src: src,
        originalSrc: sunImagePath,
        x: sunPos.x,
        y: sunPos.y,
        scale: sunPos.scale,
        rotation: positions.sun.baseRotation + (Math.random() - 0.5) * 20,
        zIndex: 5,
        type: 'sun',
      });
    }

    // Plant Moon Flower
    const moonFlowerName = zodiacFlowers[moonSign];
    const moonFlowerData = flowerManifest.find(f => f.name === moonFlowerName);
    if (moonFlowerData) {
      const moonImagePath = `/flowers/${moonFlowerData.filename}`;
      const src = processedImages[moonImagePath] || moonImagePath;
      const moonPos = addSmallVariation(positions.moon);
      newFlowers.push({
        id: nextId + 1,
        name: moonFlowerName,
        src: src,
        originalSrc: moonImagePath,
        x: moonPos.x,
        y: moonPos.y,
        scale: moonPos.scale,
        rotation: positions.moon.baseRotation + (Math.random() - 0.5) * 20,
        zIndex: 4,
        type: 'moon',
      });
    }

    // Plant Rising Flower
    const risingFlowerName = zodiacFlowers[risingSign];
    const risingFlowerData = flowerManifest.find(f => f.name === risingFlowerName);
    if (risingFlowerData) {
      const risingImagePath = `/flowers/${risingFlowerData.filename}`;
      const src = processedImages[risingImagePath] || risingImagePath;
      const risingPos = addSmallVariation(positions.rising);
      newFlowers.push({
        id: nextId + 2,
        name: risingFlowerName,
        src: src,
        originalSrc: risingImagePath,
        x: risingPos.x,
        y: risingPos.y,
        scale: risingPos.scale,
        rotation: positions.rising.baseRotation + (Math.random() - 0.5) * 20,
        zIndex: 3,
        type: 'rising',
      });
    }

    setFlowers([...flowers, ...newFlowers]);
    setNextId(nextId + 3);
  };

  const addFlowerToCanvas = (flowerName) => {
    const flowerData = flowerManifest.find(f => f.name === flowerName);
    if (!flowerData) return;

    const imagePath = `/flowers/${flowerData.filename}`;
    // Use processed image if available, fallback to original
    const src = processedImages[imagePath] || imagePath;

    const newFlower = {
      id: nextId,
      name: flowerName,
      src: src,
      originalSrc: imagePath,
      x: 150 + Math.random() * 400,
      y: 150 + Math.random() * 350,
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
    if (confirm('Clear the garden? All planted flowers will be removed.')) {
      setFlowers([]);
    }
  };

  if (processingImages) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-b from-green-50 to-green-100">
        <div className="text-center">
          <div className="text-2xl font-serif mb-4">🌿 Awakening the Garden</div>
          <div className="mb-4 text-sm text-green-700">Germinating seeds...</div>
          <div className="w-48 h-1 bg-green-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-500 rounded-full transition-all duration-300"
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
          {/* Astrology & Intention selector */}
          <AstrologySelector
            sunSign={sunSign}
            moonSign={moonSign}
            risingSign={risingSign}
            onSunChange={setSunSign}
            onMoonChange={setMoonSign}
            onRisingChange={setRisingSign}
            selectedIntention={selectedIntention}
            onIntentionChange={setSelectedIntention}
            onNatalBloom={plantNatalBloom}
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
