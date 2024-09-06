import Graph from 'graphology';
import Sigma from 'sigma';
import { mockData } from './utils';
import type { Test } from 'iperf';

function SigmaCaseFactor(nodes: number, edges: number): Test {
  return async ({ container, perf }) => {
    const data = mockData(nodes, edges, { lib: 'g' });
    container.style.width = '500px';
    container.style.height = '500px';

    perf.mark('start init');
    const graph = new Graph();
    data.nodes.forEach((node) => graph.addNode(node.id, node));
    data.edges.forEach((edge) => graph.addEdge(edge.source, edge.target, edge));

    perf.mark('end init');
    perf.measure('init', 'start init', 'end init');

    await perf.evaluate('render', async () => {
      const sigma = new Sigma(graph, container, {
        nodeReducer: (id, node) => ({
          x: node.x,
          y: node.y,
          size: 20,
          fill: 'lightgray',
          stroke: 'black',
        }),
      });
    });
  };
}

export const Sigma_WebGL_100x100 = SigmaCaseFactor(100, 100);
export const Sigma_WebGL_1000x0 = SigmaCaseFactor(1000, 0);
export const Sigma_WebGL_1000x1000 = SigmaCaseFactor(1000, 1000);
export const Sigma_WebGL_5000x1000 = SigmaCaseFactor(5000, 1000);
export const Sigma_WebGL_10000x5000 = SigmaCaseFactor(10000, 5000);
export const Sigma_WebGL_100000x50000 = SigmaCaseFactor(100000, 50000);
export const Sigma_WebGL_200000x50000 = SigmaCaseFactor(200000, 50000);
