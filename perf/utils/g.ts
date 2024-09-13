import type { DisplayObject } from '@antv/g';
import { Circle, Rect, Line, Path, Polygon, Polyline, Group, Ellipse, Text } from '@antv/g';

export type ShapeType = 'circle' | 'rect' | 'line' | 'path' | 'polygon' | 'polyline' | 'group' | 'text' | 'ellipse';

export function getShapeStyleProps(type: ShapeType, position: { x: number; y: number }, version: 4 | 6): Record<string, any> {
  const commonStyle = {
    fill: 'lightgray',
    stroke: 'black',
    batchKey: 'circle',
    lineWidth: 1,
  };

  const { x, y } = position;

  switch (type) {
    case 'circle':
      return {
        ...commonStyle,
        r: 10,
        ...(version === 6 ? { cx: x, cy: y } : { x, y }),
      };
    case 'rect':
      return {
        ...commonStyle,
        x: x,
        y: y,
        width: 20,
        height: 20,
      };
    case 'line':
      return {
        ...commonStyle,
        x1: x,
        y1: y,
        x2: x + 20,
        y2: y + 20,
      };
    case 'path':
      return {
        ...commonStyle,
        [version === 6 ? 'd' : 'path']: [
          ['M', x, y],
          ['L', x + 20, y + 20],
        ],
      };
    case 'polygon':
      return {
        ...commonStyle,
        points: [
          [x, y],
          [x + 20, y],
          [x + 20, y + 20],
          [x, y + 20],
        ],
      };
    case 'polyline':
      return {
        ...commonStyle,
        points: [
          [x, y],
          [x + 20, y],
          [x + 20, y + 20],
          [x, y + 20],
        ],
      };
    case 'group':
      return version === 6
        ? {
            transform: `translate(${x}, ${y})`,
          }
        : {};
    case 'text':
      return {
        ...commonStyle,
        x: x,
        y: y,
        text: 'Hello World',
        fontSize: 12,
        fontFamily: 'Arial',
        fill: 'black',
      };
    case 'ellipse':
      return {
        ...commonStyle,
        rx: 10,
        ry: 20,
        cx: x,
        cy: y,
      };
  }
}

export function getShapeCtor(type: ShapeType): new (...args) => DisplayObject {
  switch (type) {
    case 'circle':
      return Circle;
    case 'rect':
      return Rect;
    case 'line':
      return Line;
    case 'path':
      return Path;
    case 'polygon':
      return Polygon;
    case 'polyline':
      return Polyline;
    case 'group':
      return Group;
    case 'text':
      return Text;
    case 'ellipse':
      return Ellipse;
  }
}
