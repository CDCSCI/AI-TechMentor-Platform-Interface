import { toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';

function nextFrame() {
  return new Promise<void>((resolve) => requestAnimationFrame(() => requestAnimationFrame(() => resolve())));
}

/**
 * Captures an element (expanding any horizontally scrolling areas) and saves it
 * as a single-page PDF sized to the content. Elements with data-export-ignore are skipped.
 */
export async function downloadElementAsPdf(node: HTMLElement, fileName: string) {
  node.classList.add('exporting');
  await nextFrame();
  try {
    const width = node.scrollWidth;
    const height = node.scrollHeight;
    const options = {
      width,
      height,
      pixelRatio: 2,
      backgroundColor: '#faf9f6',
      style: { width: `${width}px`, height: `${height}px` },
      filter: (n: HTMLElement) => !(n instanceof HTMLElement && n.dataset.exportIgnore !== undefined)
    };
    let dataUrl: string;
    try {
      dataUrl = await toPng(node, options);
    } catch {
      dataUrl = await toPng(node, { ...options, skipFonts: true });
    }
    const pdf = new jsPDF({
      orientation: width >= height ? 'landscape' : 'portrait',
      unit: 'px',
      format: [width, height],
      hotfixes: ['px_scaling']
    });
    pdf.addImage(dataUrl, 'PNG', 0, 0, width, height);
    pdf.save(`${fileName}.pdf`);
  } finally {
    node.classList.remove('exporting');
  }
}