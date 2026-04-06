import { useState, useEffect, useCallback } from 'react';

const processedImageCache = new Map();

/**
 * Converts white background to transparent using Canvas
 * Conservative threshold: RGB > 248 (preserves delicate edges)
 */
export function useFlowerProcessing(imagePath) {
  const [processedSrc, setProcessedSrc] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!imagePath) {
      setLoading(false);
      return;
    }

    // Check cache first
    if (processedImageCache.has(imagePath)) {
      setProcessedSrc(processedImageCache.get(imagePath));
      setLoading(false);
      return;
    }

    const processImage = async () => {
      try {
        const img = new Image();
        img.crossOrigin = 'anonymous';

        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');

          // Draw image
          ctx.drawImage(img, 0, 0);

          // Get image data
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const data = imageData.data;

          // Conservative white removal threshold: RGB > 248
          // This preserves delicate edges and fine details
          for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];

            // If pixel is nearly white (R, G, B all > 248)
            if (r > 248 && g > 248 && b > 248) {
              // Make transparent
              data[i + 3] = 0;
            }
          }

          // Put modified data back
          ctx.putImageData(imageData, 0, 0);

          // Convert to PNG data URL
          const pngDataUrl = canvas.toDataURL('image/png');

          // Cache it
          processedImageCache.set(imagePath, pngDataUrl);

          setProcessedSrc(pngDataUrl);
          setLoading(false);
        };

        img.onerror = () => {
          setError(new Error(`Failed to load image: ${imagePath}`));
          setLoading(false);
        };

        img.src = imagePath;
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    processImage();
  }, [imagePath]);

  return { processedSrc, loading, error };
}

/**
 * Batch process multiple images
 */
export function useFlowerBatch(imagePaths) {
  const [processed, setProcessed] = useState({});
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!imagePaths || imagePaths.length === 0) {
      setLoading(false);
      return;
    }

    const processAll = async () => {
      const results = {};
      let completed = 0;

      const processOne = (path) => {
        return new Promise((resolve) => {
          if (processedImageCache.has(path)) {
            results[path] = processedImageCache.get(path);
            completed++;
            setProgress(completed / imagePaths.length);
            resolve();
            return;
          }

          const img = new Image();
          img.crossOrigin = 'anonymous';

          img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');

            ctx.drawImage(img, 0, 0);
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;

            for (let i = 0; i < data.length; i += 4) {
              if (data[i] > 248 && data[i + 1] > 248 && data[i + 2] > 248) {
                data[i + 3] = 0;
              }
            }

            ctx.putImageData(imageData, 0, 0);
            const pngUrl = canvas.toDataURL('image/png');

            processedImageCache.set(path, pngUrl);
            results[path] = pngUrl;

            completed++;
            setProgress(completed / imagePaths.length);
            resolve();
          };

          img.onerror = () => {
            completed++;
            setProgress(completed / imagePaths.length);
            resolve();
          };

          img.src = path;
        });
      };

      await Promise.all(imagePaths.map(processOne));
      setProcessed(results);
      setLoading(false);
    };

    processAll();
  }, [imagePaths]);

  return { processed, loading, progress };
}

export function clearProcessingCache() {
  processedImageCache.clear();
}
