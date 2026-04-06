import html2canvas from 'html2canvas';

/**
 * Export bouquet canvas to PNG with optional message
 */
export async function exportBouquetAsImage(canvasRef, bouquetName = 'bouquet') {
  if (!canvasRef.current) return;

  try {
    const canvas = await html2canvas(canvasRef.current, {
      backgroundColor: '#FFFDF5',
      scale: 2, // 2x for better quality
      logging: false,
      useCORS: true,
      allowTaint: true,
      pixelRatio: 2,
    });

    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = `${bouquetName}-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    return canvas.toDataURL('image/png');
  } catch (err) {
    console.error('Export failed:', err);
    throw err;
  }
}

/**
 * Export with custom dimensions (for print quality)
 */
export async function exportBouquetWithDimensions(
  canvasRef,
  width = 2048,
  height = 2048,
  bouquetName = 'bouquet'
) {
  if (!canvasRef.current) return;

  try {
    // Temporarily resize container
    const container = canvasRef.current;
    const originalStyle = {
      width: container.style.width,
      height: container.style.height,
      transform: container.style.transform,
    };

    container.style.width = `${width}px`;
    container.style.height = `${height}px`;

    const canvas = await html2canvas(container, {
      backgroundColor: '#FFFDF5',
      scale: 1,
      logging: false,
      useCORS: true,
      allowTaint: true,
      width,
      height,
    });

    // Restore original style
    Object.assign(container.style, originalStyle);

    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = `${bouquetName}-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    return canvas.toDataURL('image/png');
  } catch (err) {
    console.error('Export failed:', err);
    throw err;
  }
}

/**
 * Get canvas as data URL without downloading
 */
export async function getCanvasDataUrl(canvasRef, scale = 2) {
  if (!canvasRef.current) return null;

  try {
    const canvas = await html2canvas(canvasRef.current, {
      backgroundColor: '#FFFDF5',
      scale,
      logging: false,
      useCORS: true,
      allowTaint: true,
    });

    return canvas.toDataURL('image/png');
  } catch (err) {
    console.error('Canvas conversion failed:', err);
    throw err;
  }
}
