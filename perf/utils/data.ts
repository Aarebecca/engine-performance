interface MockDataOptions {
  lib?: 'g6v5' | 'g6v4' | 'g' | 'cytoscape' | 'vis-network';
  size?: [number, number];
}

export function mockData<T extends Record<string, any>>(
  nodes: number,
  edges: number,
  options?: MockDataOptions
): T {
  const { lib, size: [width, height] = [500, 500] } = options || {};
  const data = {
    nodes: Array.from({ length: nodes }, (_, i) => {
      const datum = { id: `node-${i}` };
      const position = {
        x: Math.random() * width,
        y: Math.random() * height,
      };

      if (lib === 'g6v5') Object.assign(datum, { style: position });
      else if (lib === 'g6v4' || lib === 'g' || lib === 'vis-network')
        Object.assign(datum, position);
      else if (lib === 'cytoscape')
        Object.assign(datum, { position, data: { id: datum.id, ...position } });
      else Object.assign(datum, position);

      return datum;
    }),
    edges: Array.from({ length: edges }, (_, i) => {
      const [sourceKey, targetKey] =
        lib === 'vis-network' ? ['from', 'to'] : ['source', 'target'];

      const datum = {
        id: `edge-${i}`,
        [sourceKey]: `node-${i % nodes}`,
        [targetKey]: `node-${(i + 1) % nodes}`,
      };

      if (lib === 'cytoscape') Object.assign(datum, { data: datum });

      return datum;
    }),
  };
  return data as unknown as T;
}
