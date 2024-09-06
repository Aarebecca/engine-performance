import { defineConfig } from 'iperf';

export default defineConfig({
  perf: {
    report: {
      dir: './reports',
    },
  },
});
