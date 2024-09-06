import type { Test } from 'iperf';
import { Graph } from 'g6v5';
import { mockData } from './utils';
import { Renderer as SVGRenderer } from '@antv/g-svg';
import { Renderer as CanvasRenderer } from '@antv/g-canvas';
import { Renderer as WebGLRenderer } from '@antv/g-webgl';

function G6V5CaseFactor(
  nodes: number,
  edges: number,
  renderer: 'canvas' | 'svg' | 'webgl' = 'canvas'
): Test {
  return async ({ container, perf }) => {
    const data = mockData(nodes, edges, { lib: 'g6v5' });

    perf.mark('start init');
    const graph = new Graph({
      container,
      animation: false,
      devicePixelRatio: 2,
      data,
      renderer: {
        canvas: () => new CanvasRenderer(),
        svg: () => new SVGRenderer(),
        webgl: () => new WebGLRenderer(),
      }[renderer],
      node: {
        style: {
          fill: 'lightgray',
          stroke: 'black',
          lineWidth: 1,
          size: 20,
        },
      },
    });
    perf.mark('end init');
    perf.measure('init', 'start init', 'end init');

    await perf.evaluate('render', async () => {
      await graph.render();
    });
  };
}

export const G6v5_Canvas_100x100 = G6V5CaseFactor(100, 100);
export const G6v5_Canvas_1000x0 = G6V5CaseFactor(1000, 0);
export const G6v5_Canvas_1000x1000 = G6V5CaseFactor(1000, 1000);
export const G6v5_Canvas_5000x1000 = G6V5CaseFactor(5000, 1000);
export const G6v5_Canvas_10000x5000 = G6V5CaseFactor(10000, 5000);

export const G6v5_SVG_100x100 = G6V5CaseFactor(100, 100, 'svg');
export const G6v5_SVG_1000x0 = G6V5CaseFactor(1000, 0, 'svg');
export const G6v5_SVG_1000x1000 = G6V5CaseFactor(1000, 1000, 'svg');
export const G6v5_SVG_5000x1000 = G6V5CaseFactor(5000, 1000, 'svg');
export const G6v5_SVG_10000x5000 = G6V5CaseFactor(10000, 5000, 'svg');

export const G6v5_WebGL_100x100 = G6V5CaseFactor(100, 100, 'webgl');
export const G6v5_WebGL_1000x0 = G6V5CaseFactor(1000, 0, 'webgl');
export const G6v5_WebGL_1000x1000 = G6V5CaseFactor(1000, 1000, 'webgl');
export const G6v5_WebGL_5000x1000 = G6V5CaseFactor(5000, 1000, 'webgl');
