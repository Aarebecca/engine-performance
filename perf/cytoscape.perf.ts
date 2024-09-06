import cytoscape from 'cytoscape';
import type { Test } from 'iperf';
import { mockData } from './utils';

function CytoscapeCaseFactor(nodes: number, edges: number): Test {
  return async ({ container, perf }) => {
    container.style.width = '500px';
    container.style.height = '500px';
    const data = mockData(nodes, edges, { lib: 'cytoscape' });

    perf.mark('start init');

    const cy = cytoscape({
      container,
      elements: data as any,
      pixelRatio: 2,
      layout: {
        name: 'null',
      },
    });

    perf.mark('end init');
    perf.measure('init', 'start init', 'end init');

    cy.nodes().forEach((node) => {
      node.position({
        x: node.data('x'),
        y: node.data('y'),
      });
      node.style({
        'background-color': 'lightgray',
        'border-width': 1,
        'border-color': 'black',
      });
    });

    await new Promise<void>((resolve) => {
      cy.one('render', () => {
        perf.mark('end render');
        perf.measure('render', 'end init', 'end render');
        resolve();
      });
    });
  };
}

export const Cytoscape_Canvas_100x100 = CytoscapeCaseFactor(100, 100);
export const Cytoscape_Canvas_1000x0 = CytoscapeCaseFactor(1000, 0);
export const Cytoscape_Canvas_1000x1000 = CytoscapeCaseFactor(1000, 1000);
export const Cytoscape_Canvas_5000x1000 = CytoscapeCaseFactor(5000, 1000);
export const Cytoscape_Canvas_10000x5000 = CytoscapeCaseFactor(10000, 5000);
export const Cytoscape_Canvas_100000x50000 = CytoscapeCaseFactor(100000, 50000);
