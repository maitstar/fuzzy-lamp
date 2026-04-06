// Canvas and state management
let canvas;
let ctx;

function initCanvas() {
  canvas = document.getElementById('bouquetCanvas');
  if (!canvas) {
    console.error('Canvas element not found');
    return false;
  }
  ctx = canvas.getContext('2d');
  return true;
}

// Resize canvas to maintain aspect ratio and responsiveness
function resizeCanvas() {
  if (!canvas) return;
  const wrapper = canvas.parentElement;
  const maxSize = Math.min(wrapper.clientWidth, window.innerHeight * 0.7);
  canvas.width = maxSize;
  canvas.height = maxSize;
  updateBouquet();
}

window.addEventListener('resize', resizeCanvas);

// Image cache
const imageCache = {};
let imagesLoaded = false;

// Load all flower images
async function loadImages() {
  const imagesToLoad = [];

  // Load zodiac flowers
  for (const flower of Object.values(zodiacFlowers)) {
    const path = getFlowerPath(flower);
    if (path && !imageCache[flower]) {
      imagesToLoad.push(loadImage(flower, path));
    }
  }

  // Load accent flowers
  for (const flower of accentFlowers) {
    const path = getFlowerPath(flower);
    if (path && !imageCache[flower]) {
      imagesToLoad.push(loadImage(flower, path));
    }
  }

  await Promise.all(imagesToLoad);
  imagesLoaded = true;
  updateBouquet();
}

function loadImage(name, path) {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = path;
    img.onload = () => {
      imageCache[name] = img;
      resolve();
    };
    img.onerror = () => {
      console.warn(`Failed to load image: ${path}`);
      resolve();
    };
  });
}

// State
const state = {
  sunSign: 'Leo',
  moonSign: 'Pisces',
  risingSign: 'Aquarius',
  accents: [] // Array of {flower: name, x, y, id}
};

let nextAccentId = 0;
let draggedAccent = null;
let dragOffsetX = 0;
let dragOffsetY = 0;

// Initialize select dropdowns
function initializeSelects() {
  const sunSelect = document.getElementById('sunSign');
  const moonSelect = document.getElementById('moonSign');
  const risingSelect = document.getElementById('risingSign');

  if (!sunSelect || !moonSelect || !risingSelect) {
    console.error('Select elements not found');
    return;
  }

  zodiacSigns.forEach(sign => {
    const opt1 = document.createElement('option');
    opt1.value = sign;
    opt1.textContent = sign;
    sunSelect.appendChild(opt1);

    const opt2 = document.createElement('option');
    opt2.value = sign;
    opt2.textContent = sign;
    moonSelect.appendChild(opt2);

    const opt3 = document.createElement('option');
    opt3.value = sign;
    opt3.textContent = sign;
    risingSelect.appendChild(opt3);
  });

  sunSelect.value = state.sunSign;
  moonSelect.value = state.moonSign;
  risingSelect.value = state.risingSign;
}

// Initialize accents tray
function initializeAccentsTray() {
  const tray = document.getElementById('accentsTray');
  accentFlowers.forEach(flower => {
    const div = document.createElement('div');
    div.className = 'accent-flower';
    div.textContent = flower.replace(/_\d+$/, '');
    div.draggable = true;
    div.dataset.flower = flower;

    div.addEventListener('dragstart', (e) => {
      e.dataTransfer.effectAllowed = 'copy';
      e.dataTransfer.setData('flower', flower);
    });

    tray.appendChild(div);
  });
}

// Canvas rendering functions
function renderFlower(img, x, y, scale, rotation = 0) {
  if (!img) return;

  ctx.save();
  ctx.translate(x, y);
  ctx.rotate((rotation * Math.PI) / 180);
  ctx.globalCompositeOperation = 'multiply';
  ctx.globalAlpha = 0.95;

  const w = img.width * scale;
  const h = img.height * scale;
  ctx.drawImage(img, -w / 2, -h / 2, w, h);

  ctx.restore();
}

function updateBouquet() {
  if (!canvas || !ctx) return; // Safety check

  // Update state from selectors
  const sunSelect = document.getElementById('sunSign');
  const moonSelect = document.getElementById('moonSign');
  const risingSelect = document.getElementById('risingSign');

  if (sunSelect) state.sunSign = sunSelect.value;
  if (moonSelect) state.moonSign = moonSelect.value;
  if (risingSelect) state.risingSign = risingSelect.value;

  // Clear canvas
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  if (!imagesLoaded) return;

  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const baseScale = canvas.width / 400; // Scale factor based on canvas size

  // Get flower images
  const sunFlower = zodiacFlowers[state.sunSign];
  const moonFlower = zodiacFlowers[state.moonSign];
  const risingFlower = zodiacFlowers[state.risingSign];

  // Render in order: rising (back) -> sun (middle) -> moon (top)
  const rImg = imageCache[risingFlower];
  if (rImg) renderFlower(rImg, centerX, centerY, 0.7 * baseScale, 0);

  const sImg = imageCache[sunFlower];
  if (sImg) renderFlower(sImg, centerX, centerY, 1.2 * baseScale, 0);

  const mImg = imageCache[moonFlower];
  if (mImg) renderFlower(mImg, centerX, centerY, 0.9 * baseScale, -30);

  // Render accents on top
  state.accents.forEach(accent => {
    const aImg = imageCache[accent.flower];
    if (aImg) {
      ctx.save();
      ctx.globalCompositeOperation = 'multiply';
      ctx.globalAlpha = 0.95;
      const scale = 0.5 * baseScale;
      const w = aImg.width * scale;
      const h = aImg.height * scale;
      ctx.drawImage(aImg, accent.x - w / 2, accent.y - h / 2, w, h);
      ctx.restore();
    }
  });
}

// Update placed accents UI
function updateAccentsUI() {
  const container = document.getElementById('placedAccents');
  const list = document.getElementById('accentList');

  if (state.accents.length === 0) {
    container.style.display = 'none';
    return;
  }

  container.style.display = 'block';
  list.innerHTML = '';

  state.accents.forEach((accent, idx) => {
    const item = document.createElement('div');
    item.className = 'placed-accent-item';

    const name = document.createElement('span');
    name.textContent = accent.flower.replace(/_\d+$/, '');

    const btn = document.createElement('button');
    btn.textContent = '✕ Remove';
    btn.onclick = () => removeAccent(idx);

    item.appendChild(name);
    item.appendChild(btn);
    list.appendChild(item);
  });
}

// Canvas drag-and-drop handlers
canvas.addEventListener('dragover', (e) => {
  e.preventDefault();
  e.dataTransfer.dropEffect = 'copy';
});

canvas.addEventListener('drop', (e) => {
  e.preventDefault();
  const flower = e.dataTransfer.getData('flower');
  if (flower) {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    addAccent(flower, x, y);
  }
});

// Click on canvas to remove accents
canvas.addEventListener('click', (e) => {
  if (!imagesLoaded) return;

  const rect = canvas.getBoundingClientRect();
  const clickX = e.clientX - rect.left;
  const clickY = e.clientY - rect.top;
  const baseScale = canvas.width / 400;

  // Check if click is near an accent
  for (let i = state.accents.length - 1; i >= 0; i--) {
    const accent = state.accents[i];
    const img = imageCache[accent.flower];
    if (!img) continue;

    const scale = 0.5 * baseScale;
    const w = img.width * scale;
    const h = img.height * scale;

    const hitbox = 30; // Extra clickable area
    if (
      Math.abs(clickX - accent.x) < w / 2 + hitbox &&
      Math.abs(clickY - accent.y) < h / 2 + hitbox
    ) {
      removeAccent(i);
      return;
    }
  }
});

function addAccent(flower, x, y) {
  state.accents.push({
    flower: flower,
    x: x,
    y: y,
    id: nextAccentId++
  });
  updateBouquet();
  updateAccentsUI();
}

function removeAccent(idx) {
  state.accents.splice(idx, 1);
  updateBouquet();
  updateAccentsUI();
}

// Export/Download functionality
function downloadBouquet() {
  const link = document.createElement('a');
  link.href = canvas.toDataURL('image/png');
  link.download = `zodiac-bouquet-${state.sunSign}-${state.moonSign}-${state.risingSign}.png`;
  link.click();
}

// Reset bouquet
function resetBouquet() {
  state.accents = [];
  state.sunSign = 'Leo';
  state.moonSign = 'Pisces';
  state.risingSign = 'Aquarius';

  document.getElementById('sunSign').value = state.sunSign;
  document.getElementById('moonSign').value = state.moonSign;
  document.getElementById('risingSign').value = state.risingSign;

  updateBouquet();
  updateAccentsUI();
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOMContentLoaded fired');

  if (!initCanvas()) {
    console.error('initCanvas failed');
    return;
  }
  console.log('Canvas initialized');

  resizeCanvas();
  console.log('Canvas resized');

  initializeSelects();
  console.log('Selects initialized');

  initializeAccentsTray();
  console.log('Accents tray initialized');

  loadImages();
  console.log('Started loading images');

  // Also log to the page
  const info = document.createElement('div');
  info.style.cssText = 'position: fixed; bottom: 10px; right: 10px; background: white; padding: 10px; border: 1px solid red; z-index: 9999; max-width: 200px; font-size: 10px; white-space: pre-wrap;';
  info.textContent = 'App initialized\nCanvas: ' + (canvas ? 'yes' : 'no') + '\nImagesLoaded: ' + imagesLoaded;
  document.body.appendChild(info);
});
