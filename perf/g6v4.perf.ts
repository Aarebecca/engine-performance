import type { Test } from 'iperf';
import { Graph } from 'g6v4';
import { mockData } from './utils';

function G6V4CaseFactor(
  nodes: number,
  edges: number,
  renderer = 'canvas'
): Test {
  return async ({ container, perf }) => {
    const data = mockData(nodes, edges, { lib: 'g6v4' });

    perf.mark('start init');
    const graph = new Graph({
      container,
      width: 500,
      height: 500,
      renderer,
      defaultNode: {
        style: {
          fill: 'lightgray',
          stroke: 'black',
          lineWidth: 1,
          size: 20,
        },
      },
    });
    graph.data(data);
    perf.mark('end init');
    perf.measure('init', 'start init', 'end init');

    await perf.evaluate('render', async () => {
      graph.render();
    });
  };
}

export const G6v4_Canvas_100x100 = G6V4CaseFactor(100, 100);
export const G6v4_Canvas_1000x0 = G6V4CaseFactor(1000, 0);
export const G6v4_Canvas_1000x1000 = G6V4CaseFactor(1000, 1000);
export const G6v4_Canvas_5000x1000 = G6V4CaseFactor(5000, 1000);
export const G6v4_Canvas_10000x5000 = G6V4CaseFactor(10000, 5000);
export const G6v4_Canvas_100000x50000 = G6V4CaseFactor(100000, 50000);
G6v4_Canvas_100000x50000.iteration = 5;

export const G6v4_SVG_100x100 = G6V4CaseFactor(100, 100, 'svg');
export const G6v4_SVG_1000x0 = G6V4CaseFactor(1000, 0, 'svg');
export const G6v4_SVG_1000x1000 = G6V4CaseFactor(1000, 1000, 'svg');
export const G6v4_SVG_5000x1000 = G6V4CaseFactor(5000, 1000, 'svg');
export const G6v4_SVG_10000x5000 = G6V4CaseFactor(10000, 5000, 'svg');
