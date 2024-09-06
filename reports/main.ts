import { Chart } from '@antv/g2';
import data from './13849761_2024-09-06_10-49-38.json';

const reports = data.reports;

const x = [
  '100x100',
  '1000x0',
  '1000x1000',
  '5000x1000',
  '10000x5000',
  '100000x50000',
  '200000x50000',
];

const value = Object.entries(reports)
  .reduce((acc, [key, values]) => {
    const [, lib, renderer, scale] = key.match(/([\S]+)_([\S]+)_([\S]+)/) || [];
    values.time.forEach(({ key, avg }) => {
      if (key === 'render') acc.push({ lib, renderer, scale, key, avg });
    });
    return acc;
  }, [] as Record<string, any>)
  .sort((a, b) => x.indexOf(a.scale) - x.indexOf(b.scale));

const chart = new Chart({
  container: 'container',
  autoFit: true,
  paddingLeft: 60,
  paddingBottom: 40,
});

const facetRect = chart.facetRect().data(value).encode('y', 'renderer');

facetRect
  .interval()
  .encode('x', 'scale')
  .encode('y', 'avg')
  .encode('color', 'lib')
  .scale('y', {
    type: 'sqrt',
    nice: true,
  })
  .axis('x', {
    title: '图规模(节点数x边数)',
  })
  .axis('y', {
    title: '平均渲染耗时/ms',
  })
  .transform({
    type: 'dodgeX',
  })
  .tooltip({
    title: 'lib',
  })
  .interaction('elementHighlight', { background: true });

chart.render();
