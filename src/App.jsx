import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import Header from './components/Header';
import AstrologySelector from './components/AstrologySelector';
import Canvas from './components/Canvas';
import AssetTray from './components/AssetTray';
import Controls from './components/Controls';
import { flowerManifest } from './utils/flowerManifest';
import { zodiacFlowers, flowerScales } from './utils/zodiacMapping';
import { getFlowerForIntention } from './utils/intentionMapping';
import { useFlowerBatch } from './hooks/useFlowerProcessing';
import './App.css';

function App() {
  const canvasRef = useRef(null);
  const [sunSign, setSunSign] = useState('Aries');
  const [moonSign, setMoonSign] = useState('Taurus');
  const [risingSign, setRisingSign] = useState('Gemini');
  const [selectedIntention, setSelectedIntention] = useState('');
  const [flowers, setFlowers] = useState([]);
  const [nextId, setNextId] = useState(100);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSealing, setIsSealing] = useState(false);
  const [message, setMessage] = useState('');
  const [showMessageInput, setShowMessageInput] = useState(false);
  const [hasAutoPlanted, setHasAutoPlanted] = useState(false);

  const imagePaths = useMemo(() => flowerManifest.map(f => `/flowers/${f.filename}`), []);
  const { processed: processedImages } = useFlowerBatch(imagePaths);

  // Helper: get image src with fallback
  const getSrc = useCallback((imagePath) => {
    return processedImages[imagePath] || imagePath;
  }, [processedImages]);

  // Update flower srcs when processed (transparent) images become available
  // processedImages only changes once (batch completes), so no loop risk
  useEffect(() => {
    if (Object.keys(processedImages).length === 0) return;
    setFlowers(prev => prev.map(f => ({
      ...f,
      src: processedImages[f.originalSrc] || f.originalSrc,
    })));
  }, [processedImages]);

  // Auto-plant 3 zodiac flowers on first load
  useEffect(() => {
    if (hasAutoPlanted) return;
    setHasAutoPlanted(true);

    const positions = [
      { x: 80,  y: 280, scale: flowerScales.rising, rotation: -15, sign: 'Aries',  type: 'rising' },
      { x: 200, y: 180, scale: flowerScales.moon,   rotation:  20, sign: 'Taurus', type: 'moon'   },
      { x: 140, y: 100, scale: flowerScales.sun,    rotation:   0, sign: 'Gemini', type: 'sun'    },
    ];

    const autoFlowers = positions.map((pos, i) => {
      const flowerName = zodiacFlowers[pos.sign];
      const flowerData = flowerManifest.find(f => f.name === flowerName);
      if (!flowerData) return null;
      const imagePath = `/flowers/${flowerData.filename}`;
      return {
        id: i,
        name: flowerName,
        src: imagePath,
        originalSrc: imagePath,
        x: pos.x + (Math.random() - 0.5) * 20,
        y: pos.y + (Math.random() - 0.5) * 20,
        scale: pos.scale,
        rotation: pos.rotation + (Math.random() - 0.5) * 10,
        zIndex: i + 1,
        type: pos.type,
      };
    }).filter(Boolean);

    setFlowers(autoFlowers);
  }, []);

  // Plant intention flower — uses functional updates to avoid stale closures
  useEffect(() => {
    if (!selectedIntention) return;
    const flowerName = getFlowerForIntention(selectedIntention);
    if (!flowerName) { setSelectedIntention(''); return; }
    const flowerData = flowerManifest.find(f => f.name === flowerName);
    if (!flowerData) { setSelectedIntention(''); return; }

    const imagePath = `/flowers/${flowerData.filename}`;
    setFlowers(prev => [...prev, {
      id: Date.now(),
      name: flowerName,
      src: getSrc(imagePath),
      originalSrc: imagePath,
      x: 120 + Math.random() * 500,
      y: 100 + Math.random() * 350,
      scale: 0.7 + Math.random() * 0.5,
      rotation: (Math.random() - 0.5) * 30,
      zIndex: Date.now(),
      type: 'intention',
    }]);
    setSelectedIntention('');
  }, [selectedIntention]);

  // Plant natal bloom (3 zodiac flowers)
  const plantNatalBloom = useCallback(() => {
    const signsConfig = [
      { sign: sunSign,    x: 140, y: 100, scale: flowerScales.sun,    rotation:   0, type: 'sun' },
      { sign: moonSign,   x: 200, y: 200, scale: flowerScales.moon,   rotation:  20, type: 'moon' },
      { sign: risingSign, x:  80, y: 280, scale: flowerScales.rising, rotation: -15, type: 'rising' },
    ];

    const newFlowers = signsConfig.map((cfg, i) => {
      const flowerName = zodiacFlowers[cfg.sign];
      const flowerData = flowerManifest.find(f => f.name === flowerName);
      if (!flowerData) return null;
      const imagePath = `/flowers/${flowerData.filename}`;
      return {
        id: Date.now() + i,
        name: flowerName,
        src: getSrc(imagePath),
        originalSrc: imagePath,
        x: cfg.x + (Math.random() - 0.5) * 30,
        y: cfg.y + (Math.random() - 0.5) * 30,
        scale: cfg.scale,
        rotation: cfg.rotation + (Math.random() - 0.5) * 15,
        zIndex: Date.now() + i,
        type: cfg.type,
      };
    }).filter(Boolean);

    setFlowers(prev => [...prev, ...newFlowers]);
  }, [sunSign, moonSign, risingSign, getSrc]);

  // Add flower from seed library
  const addFlowerToCanvas = useCallback((flowerName) => {
    const flowerData = flowerManifest.find(f => f.name === flowerName);
    if (!flowerData) return;
    const imagePath = `/flowers/${flowerData.filename}`;
    setFlowers(prev => [...prev, {
      id: Date.now(),
      name: flowerName,
      src: getSrc(imagePath),
      originalSrc: imagePath,
      x: 150 + Math.random() * 450,
      y: 80  + Math.random() * 380,
      scale: 0.7 + Math.random() * 0.5,
      rotation: (Math.random() - 0.5) * 40,
      zIndex: Date.now(),
    }]);
  }, [getSrc]);

  const updateFlower = useCallback((id, updates) => {
    setFlowers(prev => prev.map(f => f.id === id ? { ...f, ...updates } : f));
  }, []);

  const deleteFlower = useCallback((id) => {
    setFlowers(prev => prev.filter(f => f.id !== id));
  }, []);

  const bringToFront = useCallback((id) => {
    setFlowers(prev => {
      const maxZ = Math.max(...prev.map(f => f.zIndex), 0);
      return prev.map(f => f.id === id ? { ...f, zIndex: maxZ + 1 } : f);
    });
  }, []);

  const clearCanvas = () => {
    if (confirm('Clear the garden?')) setFlowers([]);
  };

  return (
    <div className="w-full flex flex-col" style={{ minHeight: '100vh', background: '#faf8f5' }}>
      <Header />

      {/* Two-column layout: Garden LEFT, Controls RIGHT */}
      <div className="flex flex-1 gap-0 min-h-0">

        {/* LEFT: Garden canvas — main feature, takes all remaining space */}
        <div className="flex-1 flex flex-col p-6">
          <Canvas
            ref={canvasRef}
            flowers={flowers}
            onUpdateFlower={updateFlower}
            onDeleteFlower={deleteFlower}
            onBringToFront={bringToFront}
            isSealing={isSealing}
            message={message}
          />
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

        {/* RIGHT: Sidebar — zodiac + intention + seed library */}
        <div className="w-72 flex flex-col gap-4 p-6 overflow-y-auto border-l border-stone-100">
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
          <AssetTray
            flowers={flowerManifest}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onFlowerSelect={addFlowerToCanvas}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
