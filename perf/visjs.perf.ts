import { Network } from 'vis-network';
import { DataSet } from 'vis-data';
import type { Test } from 'iperf';
import { mockData } from './utils';

function VisNetworkCaseFactor(nodes: number, edges: number): Test {
  return async ({ container, perf }) => {
    container.style.width = '500px';
    container.style.height = '500px';
    const data = mockData(nodes, edges, { lib: 'vis-network' });

    perf.mark('start init');

    const network = new Network(
      container,
      {
        nodes: new DataSet(data.nodes),
        edges: new DataSet(data.edges),
      },
      {
        layout: {
          improvedLayout: false,
        },
        physics: false,
        nodes: {
          size: 20,
          color: {
            background: 'lightgray',
            border: 'black',
          },
          borderWidth: 1,
        },
      }
    );

    perf.mark('end init');
    perf.measure('init', 'start init', 'end init');

    network.once('beforeDrawing', () => {
      perf.mark('start render');
    });

    await new Promise<void>((resolve) => {
      network.once('afterDrawing', () => {
        perf.mark('end render');
        perf.measure('render', 'start render', 'end render');
        resolve();
      });
    });
  };
}

export const VisNetwork_Canvas_100x100 = VisNetworkCaseFactor(100, 100);
export const VisNetwork_Canvas_1000x0 = VisNetworkCaseFactor(1000, 0);
export const VisNetwork_Canvas_1000x1000 = VisNetworkCaseFactor(1000, 1000);
export const VisNetwork_Canvas_5000x1000 = VisNetworkCaseFactor(5000, 1000);
export const VisNetwork_Canvas_10000x5000 = VisNetworkCaseFactor(10000, 5000);
export const VisNetwork_Canvas_100000x50000 = VisNetworkCaseFactor(
  100000,
  50000
);
