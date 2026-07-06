/*
  normalizeScores: maps raw accumulated axis deltas to 0-1 range
  using pre-computed axis_bounds (min, max) from the survey graph.
  Missing axes default to 0.5. Clamped to [0, 1].
*/
export function normalizeScores(rawScores, boundsMap, axes) {
  const normalized = {};
  for (const axis of (axes || [])) {
    const bounds = boundsMap[axis];
    if (bounds && bounds.max !== bounds.min) {
      const rawVal = rawScores[axis] ?? 0;
      normalized[axis] = Math.max(0, Math.min(1, (rawVal - bounds.min) / (bounds.max - bounds.min)));
    } else {
      normalized[axis] = 0.5;
    }
  }
  return normalized;
}

/*
  computeEuclideanSimilarity: returns 0-1 where 1 = perfect match.
  similarity = 1 - (euclidean_distance / sqrt(num_axes))
  All missing axis values (in either vector) default to 0.5.
*/
export function computeEuclideanSimilarity(userVector, targetVector, axes) {
  let sumSq = 0;
  for (const axis of (axes || [])) {
    const diff = (userVector[axis] ?? 0.5) - (targetVector[axis] ?? 0.5);
    sumSq += diff * diff;
  }
  const euclidean = Math.sqrt(sumSq);
  const maxDist = Math.sqrt(axes.length);
  return 1 - (euclidean / maxDist);
}

/*
  generateWhySummary: returns the 2-3 axis names with the smallest
  absolute difference between user and target values — these are the
  axes that most strongly drove the match.
*/
export function generateWhySummary(userVector, targetVector, axes) {
  const diffs = [];
  for (const axis of (axes || [])) {
    const userVal = userVector[axis] ?? 0.5;
    const targetVal = targetVector[axis] ?? 0.5;
    diffs.push({ axis, absDiff: Math.abs(userVal - targetVal) });
  }
  diffs.sort((a, b) => a.absDiff - b.absDiff);
  return diffs.slice(0, 3).map(a => a.axis);
}

/*
  computeAxisBounds: computes per-axis theoretical min/max cumulative
  delta reachable along any root-to-leaf path in the survey graph.

  Uses DAG DP (shortest/longest path) per axis — O(N × E × A) where
  N = nodes, E = edges (options), A = axes. Handles convergent branches
  correctly (calibration nodes reachable from multiple paths).
*/
export function computeAxisBounds(nodes, rootNodeId) {
  const nodeMap = {};
  for (const node of nodes) {
    nodeMap[node.node_id] = node;
  }

  if (!nodeMap[rootNodeId]) {
    throw new Error(`Root node "${rootNodeId}" not found in graph`);
  }

  const allAxes = new Set();
  for (const node of nodes) {
    for (const opt of (node.options || [])) {
      if (opt.axis_deltas) {
        for (const axis of Object.keys(opt.axis_deltas)) {
          allAxes.add(axis);
        }
      }
    }
  }

  if (allAxes.size === 0) return [];

  const axisList = [...allAxes];

  // Build reverse edge list: child → [{ parentId, deltas }]
  const parentEdges = {};
  for (const node of nodes) {
    parentEdges[node.node_id] = [];
  }
  for (const node of nodes) {
    for (const opt of (node.options || [])) {
      if (opt.next_node_id && nodeMap[opt.next_node_id]) {
        parentEdges[opt.next_node_id].push({
          parentId: node.node_id,
          deltas: opt.axis_deltas || {},
        });
      }
    }
  }

  // Compute in-degree for topological sort
  const inDegree = {};
  for (const node of nodes) {
    inDegree[node.node_id] = 0;
  }
  for (const node of nodes) {
    for (const opt of (node.options || [])) {
      if (opt.next_node_id && nodeMap[opt.next_node_id]) {
        inDegree[opt.next_node_id]++;
      }
    }
  }

  // Identify terminal options (null or missing next_node_id)
  const terminalEdges = [];
  for (const node of nodes) {
    for (const opt of (node.options || [])) {
      if (!opt.next_node_id || !nodeMap[opt.next_node_id]) {
        terminalEdges.push({ parentId: node.node_id, deltas: opt.axis_deltas || {} });
      }
    }
  }

  // DP arrays: per-node, per-axis min/max cumulative delta
  const dpMin = {};
  const dpMax = {};
  for (const node of nodes) {
    dpMin[node.node_id] = {};
    dpMax[node.node_id] = {};
    for (const axis of axisList) {
      dpMin[node.node_id][axis] = Infinity;
      dpMax[node.node_id][axis] = -Infinity;
    }
  }

  // Root starts at zero for all axes
  for (const axis of axisList) {
    dpMin[rootNodeId][axis] = 0;
    dpMax[rootNodeId][axis] = 0;
  }

  // Kahn's algorithm for topological order
  const queue = [rootNodeId];
  const order = [];

  while (queue.length > 0) {
    const nodeId = queue.shift();
    order.push(nodeId);

    for (const opt of (nodeMap[nodeId].options || [])) {
      if (opt.next_node_id && nodeMap[opt.next_node_id]) {
        inDegree[opt.next_node_id]--;
        if (inDegree[opt.next_node_id] === 0) {
          queue.push(opt.next_node_id);
        }
      }
    }
  }

  // Process in topological order, propagating min/max through reverse edges
  for (const nodeId of order) {
    if (nodeId === rootNodeId) continue;

    for (const edge of parentEdges[nodeId]) {
      const pMin = dpMin[edge.parentId];
      const pMax = dpMax[edge.parentId];
      if (!pMin) continue;

      for (const axis of axisList) {
        const delta = edge.deltas[axis] || 0;
        const candidateMin = pMin[axis] + delta;
        const candidateMax = pMax[axis] + delta;
        if (candidateMin < dpMin[nodeId][axis]) dpMin[nodeId][axis] = candidateMin;
        if (candidateMax > dpMax[nodeId][axis]) dpMax[nodeId][axis] = candidateMax;
      }
    }
  }

  // Aggregate min/max across all terminal edges
  const axisBounds = {};
  for (const axis of axisList) {
    axisBounds[axis] = { min: Infinity, max: -Infinity };
  }

  for (const edge of terminalEdges) {
    const pMin = dpMin[edge.parentId];
    const pMax = dpMax[edge.parentId];
    if (!pMin) continue;

    for (const axis of axisList) {
      const delta = edge.deltas[axis] || 0;
      const valMin = pMin[axis] + delta;
      const valMax = pMax[axis] + delta;
      if (valMin < axisBounds[axis].min) axisBounds[axis].min = valMin;
      if (valMax > axisBounds[axis].max) axisBounds[axis].max = valMax;
    }
  }

  // Also check leaf nodes (no options) as terminals
  for (const node of nodes) {
    if (!node.options || node.options.length === 0) {
      for (const axis of axisList) {
        const val = dpMin[node.node_id][axis];
        if (val < axisBounds[axis].min) axisBounds[axis].min = val;
        if (val > axisBounds[axis].max) axisBounds[axis].max = val;
      }
    }
  }

  const result = [];
  for (const axis of axisList) {
    result.push({
      axis_name: axis,
      min: axisBounds[axis].min === Infinity ? 0 : axisBounds[axis].min,
      max: axisBounds[axis].max === -Infinity ? 0 : axisBounds[axis].max,
    });
  }

  return result;
}
