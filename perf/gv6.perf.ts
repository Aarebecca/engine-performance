import { Canvas, Circle, Rect, Line, Path, Polygon, Polyline, Group, Ellipse } from '@antv/g';
import type { Test } from 'iperf';
import { Renderer as SVGRenderer } from '@antv/g-svg';
import { Renderer as CanvasRenderer } from '@antv/g-canvas';
import { Renderer as WebGLRenderer } from '@antv/g-webgl';
import { mockData, getShapeCtor, getShapeStyleProps } from './utils';
import type { ShapeType } from './utils';

function createShape(type: ShapeType, data: Record<string, any>) {
  const { x, y } = data;

  const Ctor = getShapeCtor(type);
  const style = getShapeStyleProps(type, { x, y }, 6);
  return new Ctor({ style: style });
}

function Gv6CaseFactor(nodes: number, edges: number, type: ShapeType, renderer: 'canvas' | 'svg' | 'webgl' = 'canvas'): Test {
  const test: Test = async ({ container, perf }) => {
    const data = mockData(nodes * 1000, edges * 1000, { lib: 'g' });

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
        const shape = createShape(type, node);
        if (shape) canvas.appendChild(shape);
      });

      return await new Promise<void>((resolve) => {
        canvas.addEventListener(
          'rerender',
          () => {
            resolve();
          },
          { once: true }
        );
      });
    });

    return canvas;
  };

  test.only = true;
  // timeout
  if (nodes === 500) test.iteration = 5;
  if (type === 'text') test.iteration = 5;
  test.after = async (canvas: Canvas) => {
    canvas.destroy();
  };
  return test;
}

// export const Gv6_Canvas_100000x50000_Circle = Gv6CaseFactor(100, 50, 'circle');
// export const Gv6_Canvas_200000x50000_Circle = Gv6CaseFactor(200, 50, 'circle');
// export const Gv6_Canvas_500000x100000_Circle = Gv6CaseFactor(500, 100, 'circle');

// export const Gv6_Canvas_100000x50000_Rect = Gv6CaseFactor(100, 50, 'rect');
// export const Gv6_Canvas_200000x50000_Rect = Gv6CaseFactor(200, 50, 'rect');
// export const Gv6_Canvas_500000x100000_Rect = Gv6CaseFactor(500, 100, 'rect');

// export const Gv6_Canvas_100000x50000_Line = Gv6CaseFactor(100, 50, 'line');
// export const Gv6_Canvas_200000x50000_Line = Gv6CaseFactor(200, 50, 'line');
// export const Gv6_Canvas_500000x100000_Line = Gv6CaseFactor(500, 100, 'line');

// export const Gv6_Canvas_100000x50000_Path = Gv6CaseFactor(100, 50, 'path');
// export const Gv6_Canvas_200000x50000_Path = Gv6CaseFactor(200, 50, 'path');
// export const Gv6_Canvas_500000x100000_Path = Gv6CaseFactor(500, 100, 'path');

// export const Gv6_Canvas_100000x50000_Polygon = Gv6CaseFactor(100, 50, 'polygon');
// export const Gv6_Canvas_200000x50000_Polygon = Gv6CaseFactor(200, 50, 'polygon');
// export const Gv6_Canvas_500000x100000_Polygon = Gv6CaseFactor(500, 100, 'polygon');

// export const Gv6_Canvas_100000x50000_Polyline = Gv6CaseFactor(100, 50, 'polyline');
// export const Gv6_Canvas_200000x50000_Polyline = Gv6CaseFactor(200, 50, 'polyline');
// export const Gv6_Canvas_500000x100000_Polyline = Gv6CaseFactor(500, 100, 'polyline');

// export const Gv6_Canvas_100000x50000_Group = Gv6CaseFactor(100, 50, 'group');
// export const Gv6_Canvas_200000x50000_Group = Gv6CaseFactor(200, 50, 'group');
// export const Gv6_Canvas_500000x100000_Group = Gv6CaseFactor(500, 100, 'group');

// export const Gv6_Canvas_100000x50000_Ellipse = Gv6CaseFactor(100, 50, 'ellipse');
// export const Gv6_Canvas_200000x50000_Ellipse = Gv6CaseFactor(200, 50, 'ellipse');
// export const Gv6_Canvas_500000x100000_Ellipse = Gv6CaseFactor(500, 100, 'ellipse');

export const Gv6_Canvas_100000x50000_Text = Gv6CaseFactor(100, 50, 'text');
export const Gv6_Canvas_200000x50000_Text = Gv6CaseFactor(200, 50, 'text');
export const Gv6_Canvas_500000x100000_Text = Gv6CaseFactor(500, 100, 'text');

// export const G_SVG_100000x50000_Circle = Gv6CaseFactor(100, 50, "circle", "svg");
// export const G_SVG_200000x50000_Circle = Gv6CaseFactor(200, 50, "circle", "svg");

// export const G_WebGL_10000x5000_Circle = Gv6CaseFactor(10, 5, "circle", "webgl");
// export const G_WebGL_100000x50000_Circle = Gv6CaseFactor(100, 50, "circle", "webgl");
