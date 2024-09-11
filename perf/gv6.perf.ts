import { Canvas, Circle } from '@antv/g';
import type { Test } from 'iperf';
import { Renderer as SVGRenderer } from '@antv/g-svg';
import { Renderer as CanvasRenderer } from '@antv/g-canvas';
import { Renderer as WebGLRenderer } from '@antv/g-webgl';
import { mockData } from './utils';

function Gv6CaseFactor(
  nodes: number,
  edges: number,
  renderer: 'canvas' | 'svg' | 'webgl' = 'canvas'
): Test {
  return async ({ container, perf }) => {
    const data = mockData(nodes, edges, { lib: 'g' });

    perf.mark('start init');
    const canvas = new Canvas({
      container,
      width: 500,
      height: 500,
      devicePixelRatio: 2,
      renderer: {
        canvas: new CanvasRenderer(),
        svg: new SVGRenderer(),
        webgl: new WebGLRenderer(),
      }[renderer],
    });
    await canvas.ready;
    perf.mark('end init');
    perf.measure('init', 'start init', 'end init');

    await perf.evaluate('render', async () => {
      data.nodes.forEach((node) => {
        const circle = new Circle({
          style: {
            r: 10,
            cx: node.x,
            cy: node.y,
            fill: 'lightgray',
            stroke: 'black',
            // @ts-expect-error reserve key for batch
            batchKey: 'circle',
          },
        });
        canvas.appendChild(circle);
      });

      await new Promise<void>((resolve) => {
        canvas.addEventListener('afterrender', () => resolve(), { once: true });
      });
    });
  };
}

export const Gv6_Canvas_100000x50000 = Gv6CaseFactor(100000, 50000);
Gv6_Canvas_100000x50000.only = true;
export const Gv6_Canvas_200000x50000 = Gv6CaseFactor(200000, 50000);
Gv6_Canvas_200000x50000.only = true;
export const Gv6_Canvas_500000x100000 = Gv6CaseFactor(500000, 100000);
Gv6_Canvas_500000x100000.only = true;

export const G_SVG_100000x50000 = Gv6CaseFactor(100000, 50000, 'svg');
export const G_SVG_200000x50000 = Gv6CaseFactor(200000, 50000, 'svg');

export const G_WebGL_10000x5000 = Gv6CaseFactor(10000, 5000, 'webgl');
export const G_WebGL_100000x50000 = Gv6CaseFactor(100000, 50000, 'webgl');
