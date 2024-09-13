import { Chart } from '@antv/g2';
import graphEngine from './graph-engine.json';
import renderEngine from './render-engine.json';
import renderEngineShapes from './render-engine-shapes.json';
import { data } from 'vis-network';

const dataset = {
  'render-engine': renderEngine,
  'render-engine-shapes': renderEngineShapes,
  'graph-engine': graphEngine,
} as const;

function renderSelect() {
  const select = document.createElement('select');
  Object.keys(dataset).forEach((key) => {
    const option = document.createElement('option');
    option.value = key;
    option.textContent = key;
    select.appendChild(option);
  });
  document.body.prepend(select);

  select.onchange = () => renderChart(select.value as any);
  select.value = 'graph-engine';
  renderChart('graph-engine');
}

function renderChart(dataKey: keyof typeof dataset) {
  if (!dataset[dataKey]) return;
  const data = dataset[dataKey];
  const reports = data.reports;

  const x = ['100x100', '1000x0', '1000x1000', '5000x1000', '10000x5000', '100000x50000', '200000x50000', '500000x100000'];

  const value = Object.entries(reports)
    .reduce((acc, [key, values]) => {
      const [lib, renderer, scale, shape] = key.split('_');
      values.time.forEach(({ key, avg }) => {
        if (key === 'render') acc.push({ lib, renderer, scale, key, avg, shape });
      });
      return acc;
    }, [] as Record<string, any>)
    .sort((a, b) => x.indexOf(a.scale) - x.indexOf(b.scale));

  const chart = new Chart({
    container: 'container',
    autoFit: true,
  });

  const commonOptions = { type: 'facetRect', paddingLeft: 40, paddingBottom: 40, data: value } as const;

  if (dataKey === 'render-engine-shapes') {
    chart.options({
      ...commonOptions,
      encode: { y: 'scale' },
      axis: {
        x: { title: '图规模(节点数x边数)' },
        y: { title: '渲染引擎' },
      },
      children: [
        {
          type: 'interval',
          encode: { x: 'shape', y: 'avg', color: 'lib' },
          scale: {
            y: { type: 'sqrt', nice: true },
          },
          transform: [{ type: 'dodgeX' }],
        },
      ],
    });
  } else {
    chart.options({
      ...commonOptions,
      encode: { y: 'renderer' },
      children: [
        {
          type: 'interval',
          encode: { x: 'scale', y: 'avg', color: 'lib' },
          transform: [{ type: 'dodgeX' }],
          scale: {
            y: { type: 'sqrt', nice: true },
          },
          axis: {
            x: { title: '图规模(节点数x边数)' },
            y: { title: '平均渲染耗时/ms' },
          },
          interaction: {
            tooltip: { shared: true },
            elementHighlight: { background: true },
          },
        },
      ],
    });
  }

  chart.render();
}

renderSelect();
