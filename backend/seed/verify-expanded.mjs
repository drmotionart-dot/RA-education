import { computeAxisBounds } from '../src/utils/scoring.js';
import { pathToFileURL } from 'node:url';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const graphs = [
  { label: 'Doctor Specialty', file: 'survey-specialty-doctor.expanded.js' },
  { label: 'Nurse Specialty', file: 'survey-specialty-nurse.expanded.js' },
  { label: 'Doctor Path', file: 'survey-path-doctor.expanded.js' },
  { label: 'Nurse Path', file: 'survey-path-nurse.expanded.js' },
];

for (const g of graphs) {
  const filePath = resolve(__dirname, 'survey', g.file);
  const mod = await import(pathToFileURL(filePath));
  const graph = Object.values(mod).find(v => v && v.nodes && v.axes);

  if (!graph) {
    console.log(`${g.label}: FAILED - no graph export found`);
    continue;
  }

  try {
    const start = Date.now();
    const bounds = computeAxisBounds(graph.nodes, graph.root_node_id);
    const elapsed = Date.now() - start;

    const hasAllAxes = bounds.length === graph.axes.length;
    const missingAxes = graph.axes.filter(a => !bounds.find(b => b.axis_name === a));

    console.log(`${g.label}`);
    console.log(`  Nodes: ${graph.nodes.length} | Axes: ${graph.axes.length} | Bounds: ${bounds.length} | Time: ${elapsed}ms`);
    console.log(`  Root reachable: ${bounds.length > 0} | All axes bounded: ${hasAllAxes}`);
    if (missingAxes.length) console.log(`  WARNING: unbounded axes: ${missingAxes.join(', ')}`);

    // Count terminal nodes (should be only calibration nodes)
    const terminals = graph.nodes.filter(n =>
      n.options && n.options.every(o => !o.next_node_id || !graph.nodes.find(nn => nn.node_id === o.next_node_id))
    );
    const calibTerminals = terminals.filter(t => t.node_id.startsWith('CALIB_'));
    console.log(`  Terminals: ${terminals.length} (calibration: ${calibTerminals.length})`);

    // Calibration reachable?
    const root = graph.nodes.find(n => n.node_id === graph.root_node_id);
    const firstOpt = root?.options?.[0];
    const trace = [];
    let current = firstOpt?.next_node_id;
    const visited = new Set();
    while (current && graph.nodes.find(n => n.node_id === current) && !visited.has(current)) {
      visited.add(current);
      trace.push(current);
      const node = graph.nodes.find(n => n.node_id === current);
      const opt = node?.options?.[0];
      current = opt?.next_node_id;
    }
    const hasCalib = trace.some(id => id.startsWith('CALIB_'));
    console.log(`  First-option path: ${trace.length + 1} nodes, calibration: ${hasCalib}`);
    console.log(`  Calibration terminals only: ${terminals.every(t => t.node_id.startsWith('CALIB_')) || 'mixed (check)'}`);
    console.log();
  } catch (err) {
    console.log(`${g.label}: ERROR - ${err.message}`);
  }
}
