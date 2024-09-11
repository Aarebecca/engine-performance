import { Canvas } from '@antv/g-canvas-legacy';
import { mockData } from './utils';
import type { Test } from 'iperf';

export function GV4CaseFactor(nodes: number, edges: number): Test {
  return async ({ container, perf }) => {
    const data = mockData(nodes, edges, { lib: 'g6v4' });

    let resolve: () => void;
    let promise = new Promise<void>((r) => (resolve = r));

    perf.mark('start init');
    const canvas = new Canvas({
      container,
      width: 500,
      height: 500,
      pixelRatio: 2,
      autoDraw: false,
      drawFrameCallback: () => {
        perf.mark('end render');
        perf.measure('render', 'end init', 'end render');
        resolve();
      },
    });

    perf.mark('end init');
    perf.measure('init', 'start init', 'end init');

    const group = canvas.addGroup();

    data.nodes.forEach((node) => {
      const { x, y } = node;
      group.addShape('circle', {
        attrs: {
          x,
          y,
          r: 20,
          fill: '#d3d3d3',
          stroke: '#000000',
        },
      });
    });

    canvas.draw();

    await promise;
  };
}

export const Gv4_Canvas_100000x50000 = GV4CaseFactor(100000, 50000);
Gv4_Canvas_100000x50000.only = true;
export const Gv4_Canvas_200000x50000 = GV4CaseFactor(200000, 50000);
Gv4_Canvas_200000x50000.only = true;
export const Gv4_Canvas_500000x100000 = GV4CaseFactor(500000, 100000);
Gv4_Canvas_500000x100000.only = true;
