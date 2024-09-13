import { Canvas } from '@antv/g-canvas-legacy';
import { mockData } from './utils';
import type { Test } from 'iperf';
import { getShapeStyleProps } from './utils';
import type { ShapeType } from './utils';

function Gv4CaseFactor(nodes: number, edges: number, type: ShapeType): Test {
  const test: Test = async ({ container, perf }) => {
    const data = mockData(nodes * 1000, edges * 1000, { lib: 'g6v4' });

    let resolve: (canvas: Canvas) => void;
    let promise = new Promise<Canvas>((r) => (resolve = r));

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
        resolve(canvas);
      },
    });

    perf.mark('end init');
    perf.measure('init', 'start init', 'end init');

    const group = canvas.addGroup();

    data.nodes.forEach((node) => {
      if (type === 'group') {
        group.addGroup({
          transform: `translate(${node.x}, ${node.y})`,
        });
      } else {
        group.addShape(type, {
          attrs: getShapeStyleProps(type, node, 4),
        });
      }
    });

    canvas.draw();

    await promise;

    return canvas;
  };

  test.only = true;
  test.after = async (canvas: Canvas) => {
    canvas.destroy();
  };
  // memory leak
  if (['path', 'text'].includes(type)) test.iteration = 5;
  return test;
}

export const Gv4_Canvas_100000x50000_Circle = Gv4CaseFactor(100, 50, 'circle');
export const Gv4_Canvas_200000x50000_Circle = Gv4CaseFactor(200, 50, 'circle');
export const Gv4_Canvas_500000x100000_Circle = Gv4CaseFactor(500, 100, 'circle');

export const Gv4_Canvas_100000x50000_Rect = Gv4CaseFactor(100, 50, 'rect');
export const Gv4_Canvas_200000x50000_Rect = Gv4CaseFactor(200, 50, 'rect');
export const Gv4_Canvas_500000x100000_Rect = Gv4CaseFactor(500, 100, 'rect');

export const Gv4_Canvas_100000x50000_Line = Gv4CaseFactor(100, 50, 'line');
export const Gv4_Canvas_200000x50000_Line = Gv4CaseFactor(200, 50, 'line');
export const Gv4_Canvas_500000x100000_Line = Gv4CaseFactor(500, 100, 'line');

export const Gv4_Canvas_100000x50000_Path = Gv4CaseFactor(100, 50, 'path');
export const Gv4_Canvas_200000x50000_Path = Gv4CaseFactor(200, 50, 'path');
export const Gv4_Canvas_500000x100000_Path = Gv4CaseFactor(500, 100, 'path');

export const Gv4_Canvas_100000x50000_Polygon = Gv4CaseFactor(100, 50, 'polygon');
export const Gv4_Canvas_200000x50000_Polygon = Gv4CaseFactor(200, 50, 'polygon');
export const Gv4_Canvas_500000x100000_Polygon = Gv4CaseFactor(500, 100, 'polygon');

export const Gv4_Canvas_100000x50000_Polyline = Gv4CaseFactor(100, 50, 'polyline');
export const Gv4_Canvas_200000x50000_Polyline = Gv4CaseFactor(200, 50, 'polyline');
export const Gv4_Canvas_500000x100000_Polyline = Gv4CaseFactor(500, 100, 'polyline');

export const Gv4_Canvas_100000x50000_Group = Gv4CaseFactor(100, 50, 'group');
export const Gv4_Canvas_200000x50000_Group = Gv4CaseFactor(200, 50, 'group');
export const Gv4_Canvas_500000x100000_Group = Gv4CaseFactor(500, 100, 'group');

export const Gv4_Canvas_100000x50000_Ellipse = Gv4CaseFactor(100, 50, 'ellipse');
export const Gv4_Canvas_200000x50000_Ellipse = Gv4CaseFactor(200, 50, 'ellipse');
export const Gv4_Canvas_500000x100000_Ellipse = Gv4CaseFactor(500, 100, 'ellipse');

export const Gv4_Canvas_100000x50000_Text = Gv4CaseFactor(100, 50, 'text');
export const Gv4_Canvas_200000x50000_Text = Gv4CaseFactor(200, 50, 'text');
export const Gv4_Canvas_500000x100000_Text = Gv4CaseFactor(500, 100, 'text');
