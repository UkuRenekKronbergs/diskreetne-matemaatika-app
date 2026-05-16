/* ===== Graph editor =====
 * Interactive graph editor on canvas with:
 *  - Add/remove vertices, edges
 *  - Weighted edges
 *  - Show adjacency matrix, degree sequence
 *  - Algorithm runners: Kruskal, Prim, Dijkstra, Floyd-Warshall
 *  - Detect Euler / Hamilton properties
 */

(function () {
  'use strict';

  const CANVAS_HEIGHT = 420;
  const VERTEX_RADIUS = 22;

  let graph = {
    vertices: [], // {id, x, y, label}
    edges: [],    // {u, v, w}  (u, v are ids; for undirected, store smaller id first)
    nextId: 1,
    directed: false,
  };

  let mode = 'add-vertex'; // add-vertex | add-edge | move | delete
  let pending = null; // for add-edge: source vertex
  let dragging = null;
  let highlightEdges = new Set(); // for algorithm visualizations
  let highlightVertices = new Set();
  let stepInfo = '';

  function $(id) { return document.getElementById(id); }
  function edgeKey(u, v) {
    if (graph.directed) return `${u}->${v}`;
    return u < v ? `${u}-${v}` : `${v}-${u}`;
  }

  // ---- Render ----
  function render() {
    const canvas = $('graphCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Edges
    graph.edges.forEach(e => {
      const u = graph.vertices.find(v => v.id === e.u);
      const v = graph.vertices.find(v => v.id === e.v);
      if (!u || !v) return;
      const key = edgeKey(e.u, e.v);
      const hl = highlightEdges.has(key);
      ctx.strokeStyle = hl ? '#5cb8ff' : '#7a8a9c';
      ctx.lineWidth = hl ? 3 : 1.5;
      ctx.beginPath();
      ctx.moveTo(u.x, u.y);
      ctx.lineTo(v.x, v.y);
      ctx.stroke();

      // Arrowhead for directed
      if (graph.directed) {
        const dx = v.x - u.x, dy = v.y - u.y;
        const len = Math.hypot(dx, dy);
        if (len > 0) {
          const ux = dx / len, uy = dy / len;
          const ex = v.x - ux * (VERTEX_RADIUS + 4);
          const ey = v.y - uy * (VERTEX_RADIUS + 4);
          ctx.beginPath();
          ctx.moveTo(ex, ey);
          ctx.lineTo(ex - 10 * ux + 5 * uy, ey - 10 * uy - 5 * ux);
          ctx.lineTo(ex - 10 * ux - 5 * uy, ey - 10 * uy + 5 * ux);
          ctx.closePath();
          ctx.fillStyle = hl ? '#5cb8ff' : '#7a8a9c';
          ctx.fill();
        }
      }

      // Weight label
      if (e.w != null) {
        const mx = (u.x + v.x) / 2, my = (u.y + v.y) / 2;
        const dx = v.x - u.x, dy = v.y - u.y;
        const len = Math.hypot(dx, dy) || 1;
        const ox = -dy / len * 14, oy = dx / len * 14;
        ctx.fillStyle = '#1a212b';
        ctx.fillRect(mx + ox - 12, my + oy - 10, 24, 18);
        ctx.fillStyle = '#fbbf24';
        ctx.font = '12px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(String(e.w), mx + ox, my + oy);
      }
    });

    // Pending edge preview
    if (mode === 'add-edge' && pending != null) {
      const u = graph.vertices.find(v => v.id === pending);
      if (u && lastMouse) {
        ctx.strokeStyle = '#5cb8ff';
        ctx.setLineDash([4, 4]);
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(u.x, u.y);
        ctx.lineTo(lastMouse.x, lastMouse.y);
        ctx.stroke();
        ctx.setLineDash([]);
      }
    }

    // Vertices
    graph.vertices.forEach(v => {
      const hl = highlightVertices.has(v.id);
      const isPending = pending === v.id;
      ctx.beginPath();
      ctx.arc(v.x, v.y, VERTEX_RADIUS, 0, 2 * Math.PI);
      ctx.fillStyle = hl ? '#5cb8ff' : (isPending ? '#fbbf24' : '#232c38');
      ctx.fill();
      ctx.strokeStyle = '#7a8a9c';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.fillStyle = hl ? '#0f1419' : '#e8edf3';
      ctx.font = 'bold 13px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(v.label, v.x, v.y);
    });

    updateInfo();
  }

  // ---- Info pane ----
  function updateInfo() {
    const info = $('graphInfo');
    if (!info) return;
    const n = graph.vertices.length;
    const m = graph.edges.length;

    // Degree sequence
    const degs = {};
    graph.vertices.forEach(v => degs[v.id] = 0);
    if (graph.directed) {
      const inDeg = {}, outDeg = {};
      graph.vertices.forEach(v => { inDeg[v.id] = 0; outDeg[v.id] = 0; });
      graph.edges.forEach(e => { outDeg[e.u]++; inDeg[e.v]++; });
      info.innerHTML = `
        <strong>Suunatud graaf:</strong> n=${n}, m=${m}<br>
        <strong>Sisseasted:</strong> ${graph.vertices.map(v => `${v.label}:${inDeg[v.id]}`).join(', ')}<br>
        <strong>Väljaasted:</strong> ${graph.vertices.map(v => `${v.label}:${outDeg[v.id]}`).join(', ')}
      `;
      return;
    }

    graph.edges.forEach(e => { degs[e.u]++; degs[e.v]++; });
    const degSeq = graph.vertices.map(v => degs[v.id]).sort((a,b) => b-a);
    const degSum = degSeq.reduce((a,b) => a+b, 0);
    const oddCount = degSeq.filter(d => d%2 === 1).length;
    const connected = isConnected();
    const eulerian = connected && oddCount === 0 && n > 0;
    const hasEulerPath = connected && (oddCount === 0 || oddCount === 2);

    info.innerHTML = `
      <strong>n</strong> = ${n} tippu, <strong>m</strong> = ${m} serva<br>
      <strong>Tipuastmete järjend:</strong> (${degSeq.join(', ')})<br>
      <strong>Astmete summa:</strong> ${degSum} = 2·${m} ✓<br>
      <strong>Paaritu astmega tippe:</strong> ${oddCount}<br>
      <strong>Sidus:</strong> ${connected ? '✓ jah' : '✗ ei'}<br>
      <strong>Euleri graaf:</strong> ${eulerian ? '✓ jah' : (hasEulerPath ? 'leidub Euleri ahel (mitte kinnine)' : '✗ ei')}<br>
      <strong>Diraci tingimus Hamiltoni jaoks:</strong> ${n >= 3 && degSeq.every(d => d >= n/2) ? '✓ täidetud (piisav)' : '✗ ei täida (võib siiski olla Hamiltoni)'}<br>
    `;
  }

  function isConnected() {
    if (graph.vertices.length === 0) return false;
    const adj = {};
    graph.vertices.forEach(v => adj[v.id] = []);
    graph.edges.forEach(e => { adj[e.u].push(e.v); adj[e.v].push(e.u); });
    const seen = new Set([graph.vertices[0].id]);
    const queue = [graph.vertices[0].id];
    while (queue.length) {
      const u = queue.shift();
      for (const v of adj[u]) if (!seen.has(v)) { seen.add(v); queue.push(v); }
    }
    return seen.size === graph.vertices.length;
  }

  // ---- Mouse handlers ----
  let lastMouse = null;
  function handleMouse(canvas) {
    canvas.addEventListener('mousedown', e => {
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) * (canvas.width / rect.width);
      const y = (e.clientY - rect.top) * (canvas.height / rect.height);
      const hit = vertexAt(x, y);

      if (mode === 'add-vertex' && !hit) {
        const label = String.fromCharCode(64 + graph.nextId); // A, B, C, ...
        graph.vertices.push({id: graph.nextId++, x, y, label});
        render();
      } else if (mode === 'add-edge' && hit) {
        if (pending == null) {
          pending = hit.id;
        } else if (pending !== hit.id) {
          const w = $('edgeWeight').value ? +$('edgeWeight').value : null;
          const k = edgeKey(pending, hit.id);
          if (!graph.edges.find(e => edgeKey(e.u, e.v) === k)) {
            graph.edges.push({u: pending, v: hit.id, w});
          }
          pending = null;
        } else {
          pending = null;
        }
        render();
      } else if (mode === 'move' && hit) {
        dragging = hit;
      } else if (mode === 'delete' && hit) {
        graph.edges = graph.edges.filter(e => e.u !== hit.id && e.v !== hit.id);
        graph.vertices = graph.vertices.filter(v => v.id !== hit.id);
        render();
      } else if (mode === 'delete' && !hit) {
        const edge = edgeAt(x, y);
        if (edge) {
          graph.edges = graph.edges.filter(e => e !== edge);
          render();
        }
      }
    });
    canvas.addEventListener('mousemove', e => {
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) * (canvas.width / rect.width);
      const y = (e.clientY - rect.top) * (canvas.height / rect.height);
      lastMouse = {x, y};
      if (dragging) {
        dragging.x = x; dragging.y = y; render();
      } else if (mode === 'add-edge' && pending != null) {
        render();
      }
    });
    canvas.addEventListener('mouseup', () => { dragging = null; });
    canvas.addEventListener('mouseleave', () => { dragging = null; lastMouse = null; });
  }

  function vertexAt(x, y) {
    for (let i = graph.vertices.length - 1; i >= 0; i--) {
      const v = graph.vertices[i];
      if (Math.hypot(v.x - x, v.y - y) <= VERTEX_RADIUS) return v;
    }
    return null;
  }
  function edgeAt(x, y) {
    for (const e of graph.edges) {
      const u = graph.vertices.find(v => v.id === e.u);
      const v = graph.vertices.find(v => v.id === e.v);
      if (!u || !v) continue;
      const d = distToSegment(x, y, u.x, u.y, v.x, v.y);
      if (d < 6) return e;
    }
    return null;
  }
  function distToSegment(x, y, x1, y1, x2, y2) {
    const A = x - x1, B = y - y1, C = x2 - x1, D = y2 - y1;
    const dot = A*C + B*D;
    const len = C*C + D*D;
    let t = len ? dot / len : -1;
    t = Math.max(0, Math.min(1, t));
    const xx = x1 + t*C, yy = y1 + t*D;
    return Math.hypot(x - xx, y - yy);
  }

  // ---- Adjacency matrix ----
  function showMatrix() {
    const n = graph.vertices.length;
    if (!n) return '<em>Tühi graaf</em>';
    const ids = graph.vertices.map(v => v.id);
    const labels = graph.vertices.map(v => v.label);
    const idx = {};
    ids.forEach((id, i) => idx[id] = i);
    const M = Array.from({length: n}, () => Array(n).fill(0));
    graph.edges.forEach(e => {
      M[idx[e.u]][idx[e.v]] = e.w != null ? e.w : 1;
      if (!graph.directed) M[idx[e.v]][idx[e.u]] = e.w != null ? e.w : 1;
    });
    let html = '<table class="truth-table"><thead><tr><th></th>' + labels.map(l => `<th>${l}</th>`).join('') + '</tr></thead><tbody>';
    for (let i = 0; i < n; i++) {
      html += `<tr><th>${labels[i]}</th>${M[i].map(v => `<td>${v}</td>`).join('')}</tr>`;
    }
    html += '</tbody></table>';
    return html;
  }

  // ---- Algorithms ----
  function kruskal() {
    if (!isConnected()) { stepInfo = '⚠ Graaf ei ole sidus — toespuud ei leidu.'; return []; }
    const sorted = [...graph.edges].filter(e => e.w != null).sort((a,b) => a.w - b.w);
    if (sorted.length < graph.edges.length) { stepInfo = '⚠ Mõnel serval pole kaalu.'; return []; }
    const parent = {};
    graph.vertices.forEach(v => parent[v.id] = v.id);
    function find(x) { while (parent[x] !== x) x = parent[x] = parent[parent[x]]; return x; }
    function union(a, b) { parent[find(a)] = find(b); }
    const mst = [];
    let totalW = 0;
    const steps = [];
    for (const e of sorted) {
      const fa = find(e.u), fb = find(e.v);
      if (fa !== fb) {
        union(fa, fb);
        mst.push(e);
        totalW += e.w;
        steps.push(`Lisame serva ${vlbl(e.u)}–${vlbl(e.v)} (kaal ${e.w})`);
      } else {
        steps.push(`Jätame vahele ${vlbl(e.u)}–${vlbl(e.v)} (tekiks tsükkel)`);
      }
    }
    stepInfo = steps.join('<br>') + `<br><strong>Kogu kaal: ${totalW}</strong>`;
    return mst;
  }
  function prim() {
    if (!graph.vertices.length) return [];
    if (!isConnected()) { stepInfo = '⚠ Graaf ei ole sidus.'; return []; }
    const inTree = new Set([graph.vertices[0].id]);
    const mst = [];
    const steps = [`Alustame tipust ${graph.vertices[0].label}`];
    let totalW = 0;
    while (inTree.size < graph.vertices.length) {
      let best = null;
      for (const e of graph.edges) {
        if (e.w == null) continue;
        const uIn = inTree.has(e.u), vIn = inTree.has(e.v);
        if (uIn !== vIn) {
          if (!best || e.w < best.w) best = e;
        }
      }
      if (!best) break;
      mst.push(best);
      const newV = inTree.has(best.u) ? best.v : best.u;
      inTree.add(newV);
      totalW += best.w;
      steps.push(`Lisame ${vlbl(best.u)}–${vlbl(best.v)} (kaal ${best.w}), uus tipp: ${vlbl(newV)}`);
    }
    stepInfo = steps.join('<br>') + `<br><strong>Kogu kaal: ${totalW}</strong>`;
    return mst;
  }
  function dijkstra(startId, endId) {
    if (!startId || !endId) { stepInfo = 'Vali algustipp ja lõpptipp!'; return []; }
    const adj = {};
    graph.vertices.forEach(v => adj[v.id] = []);
    graph.edges.forEach(e => {
      const w = e.w != null ? e.w : 1;
      adj[e.u].push({v: e.v, w, edge: e});
      if (!graph.directed) adj[e.v].push({v: e.u, w, edge: e});
    });
    const L = {}, prev = {};
    graph.vertices.forEach(v => { L[v.id] = Infinity; prev[v.id] = null; });
    L[startId] = 0;
    const S = new Set();
    const steps = [];
    while (!S.has(endId)) {
      let u = null;
      for (const v of graph.vertices) {
        if (!S.has(v.id) && (u === null || L[v.id] < L[u])) u = v.id;
      }
      if (u === null || L[u] === Infinity) {
        stepInfo = steps.join('<br>') + '<br>⚠ Ühendust ei leidu!';
        return [];
      }
      S.add(u);
      steps.push(`Lisame tipu ${vlbl(u)} hulka S (L=${L[u]})`);
      for (const {v, w, edge} of adj[u]) {
        if (!S.has(v) && L[u] + w < L[v]) {
          L[v] = L[u] + w;
          prev[v] = {from: u, edge};
        }
      }
    }
    // Reconstruct path
    const pathEdges = [];
    let cur = endId;
    while (prev[cur]) {
      pathEdges.push(prev[cur].edge);
      cur = prev[cur].from;
    }
    stepInfo = steps.join('<br>') + `<br><strong>Lühim tee ${vlbl(startId)} → ${vlbl(endId)}: ${L[endId]}</strong>`;
    return pathEdges;
  }
  function floydWarshall() {
    const n = graph.vertices.length;
    if (!n) return [];
    const idx = {}; graph.vertices.forEach((v, i) => idx[v.id] = i);
    const labels = graph.vertices.map(v => v.label);
    const INF = Infinity;
    const A = Array.from({length: n}, (_, i) => Array(n).fill(INF));
    for (let i = 0; i < n; i++) A[i][i] = 0;
    graph.edges.forEach(e => {
      const w = e.w != null ? e.w : 1;
      A[idx[e.u]][idx[e.v]] = w;
      if (!graph.directed) A[idx[e.v]][idx[e.u]] = w;
    });
    const snapshots = [tableHtml(A, labels)];
    for (let k = 0; k < n; k++) {
      for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
          if (A[i][k] + A[k][j] < A[i][j]) A[i][j] = A[i][k] + A[k][j];
        }
      }
      snapshots.push(`<strong>Pärast k=${labels[k]}:</strong>` + tableHtml(A, labels));
    }
    stepInfo = snapshots.join('<br><br>');
    return [];
  }
  function tableHtml(M, labels) {
    let h = '<table class="truth-table" style="margin: 6px 0;"><thead><tr><th></th>';
    h += labels.map(l => `<th>${l}</th>`).join('') + '</tr></thead><tbody>';
    for (let i = 0; i < M.length; i++) {
      h += `<tr><th>${labels[i]}</th>`;
      for (let j = 0; j < M.length; j++) {
        const v = M[i][j];
        h += `<td>${v === Infinity ? '∞' : v}</td>`;
      }
      h += '</tr>';
    }
    return h + '</tbody></table>';
  }
  function vlbl(id) { const v = graph.vertices.find(x => x.id === id); return v ? v.label : '?'; }

  // ---- Preset graphs ----
  function loadPreset(name) {
    highlightEdges.clear(); highlightVertices.clear(); pending = null;
    graph.vertices = []; graph.edges = []; graph.nextId = 1;
    const cx = 350, cy = 200, r = 140;
    if (name === 'k4') {
      for (let i = 0; i < 4; i++) {
        const a = (i / 4) * 2 * Math.PI - Math.PI / 2;
        graph.vertices.push({id: graph.nextId++, x: cx + r * Math.cos(a), y: cy + r * Math.sin(a), label: 'ABCD'[i]});
      }
      for (let i = 0; i < 4; i++) for (let j = i+1; j < 4; j++) {
        graph.edges.push({u: i+1, v: j+1, w: null});
      }
    } else if (name === 'k5') {
      for (let i = 0; i < 5; i++) {
        const a = (i / 5) * 2 * Math.PI - Math.PI / 2;
        graph.vertices.push({id: graph.nextId++, x: cx + r * Math.cos(a), y: cy + r * Math.sin(a), label: 'ABCDE'[i]});
      }
      for (let i = 0; i < 5; i++) for (let j = i+1; j < 5; j++) {
        graph.edges.push({u: i+1, v: j+1, w: null});
      }
    } else if (name === 'cycle6') {
      for (let i = 0; i < 6; i++) {
        const a = (i / 6) * 2 * Math.PI - Math.PI / 2;
        graph.vertices.push({id: graph.nextId++, x: cx + r * Math.cos(a), y: cy + r * Math.sin(a), label: 'ABCDEF'[i]});
      }
      for (let i = 0; i < 6; i++) {
        graph.edges.push({u: i+1, v: ((i+1)%6)+1, w: null});
      }
    } else if (name === 'mst-example') {
      // Match the konspekt example: u-3-v, u-2-w, u-3-x, w-3-x, w-?, v-2-y, etc.
      // From p89: u-w(2), v-y(2), v-w(3), u-x(3), u-v(3), x-y(5), w-x(4)
      const pos = {u: [200, 100], v: [500, 100], w: [200, 280], x: [350, 280], y: [500, 280]};
      Object.entries(pos).forEach(([k, [x, y]]) => {
        graph.vertices.push({id: graph.nextId++, x, y, label: k});
      });
      const ids = Object.fromEntries(graph.vertices.map(v => [v.label, v.id]));
      const adds = [['u','w',2],['v','y',2],['v','w',3],['u','x',3],['u','v',3],['x','y',5],['w','x',4]];
      adds.forEach(([a,b,w]) => graph.edges.push({u: ids[a], v: ids[b], w}));
    } else if (name === 'dijkstra-example') {
      graph.directed = true;
      const pos = {
        '1': [100, 200], '2': [220, 100], '3': [220, 300],
        '4': [400, 100], '5': [400, 300], '6': [520, 200], '7': [620, 200]
      };
      Object.entries(pos).forEach(([k, [x, y]]) => {
        graph.vertices.push({id: graph.nextId++, x, y, label: k});
      });
      const ids = Object.fromEntries(graph.vertices.map(v => [v.label, v.id]));
      const adds = [
        ['1','2',1], ['1','3',1], ['2','4',10],
        ['3','5',2], ['5','4',5], ['5','6',1],
        ['4','7',3], ['6','7',2],
      ];
      adds.forEach(([a,b,w]) => graph.edges.push({u: ids[a], v: ids[b], w}));
      updateDirectedUI();
    }
    render();
  }

  function updateDirectedUI() {
    const cb = $('directedCheckbox');
    if (cb) cb.checked = graph.directed;
  }

  // ---- Init ----
  window.initGraphEditor = function () {
    const view = $('view');
    if (!view) return;
    view.innerHTML = `
      <h1>Graafiredaktor</h1>
      <p>Joonista graaf hiirega: vali režiim ja kliki lõuendile. Kuva naabrusmaatriks, leia minimaalne toespuu või lühim tee.</p>

      <div class="card">
        <div class="graph-controls">
          <button class="btn small" data-mode="add-vertex">+ Lisa tipp</button>
          <button class="btn small secondary" data-mode="add-edge">+ Lisa serv</button>
          <button class="btn small secondary" data-mode="move">↔ Liiguta</button>
          <button class="btn small danger" data-mode="delete">🗑 Kustuta</button>
          <label style="display:flex; align-items:center; gap:6px; font-size:13px;">
            Kaal: <input type="number" id="edgeWeight" placeholder="nt 3" style="width:80px;">
          </label>
          <label style="display:flex; align-items:center; gap:6px; font-size:13px;">
            <input type="checkbox" id="directedCheckbox"> Suunatud
          </label>
        </div>
        <div class="graph-controls">
          <strong>Eelseaded:</strong>
          <button class="btn small secondary" data-preset="k4">K₄</button>
          <button class="btn small secondary" data-preset="k5">K₅</button>
          <button class="btn small secondary" data-preset="cycle6">C₆</button>
          <button class="btn small secondary" data-preset="mst-example">Toespuu näide</button>
          <button class="btn small secondary" data-preset="dijkstra-example">Dijkstra näide</button>
          <button class="btn small secondary" id="clearGraph">Tühjenda</button>
        </div>

        <canvas id="graphCanvas" class="graph-canvas" width="700" height="${CANVAS_HEIGHT}"></canvas>

        <p style="font-size: 13px; color: var(--fg-3); margin-top:6px;">
          <strong>Hetkel:</strong> <span id="modeIndicator">Lisa tipp</span> — kliki lõuendile.
        </p>
      </div>

      <div class="tabs">
        <button class="tab active" data-tab="info">Info</button>
        <button class="tab" data-tab="matrix">Naabrusmaatriks</button>
        <button class="tab" data-tab="algorithms">Algoritmid</button>
      </div>

      <div class="tab-panel active" data-panel="info">
        <div class="graph-info" id="graphInfo"></div>
      </div>

      <div class="tab-panel" data-panel="matrix">
        <div id="matrixView"></div>
      </div>

      <div class="tab-panel" data-panel="algorithms">
        <div class="card">
          <h3>Toespuu (minimaalse kaaluga)</h3>
          <p>Vajab kaalutud sidusat graafi.</p>
          <div class="btn-row">
            <button class="btn small" id="runKruskal">Kruskali algoritm</button>
            <button class="btn small" id="runPrim">Primi algoritm</button>
          </div>
        </div>
        <div class="card">
          <h3>Lühim tee — Dijkstra</h3>
          <div class="input-row">
            <select id="dijkstraStart"></select>
            <select id="dijkstraEnd"></select>
            <button class="btn small" id="runDijkstra">Dijkstra</button>
          </div>
        </div>
        <div class="card">
          <h3>Lühimad teed kõigi paaride vahel — Floyd–Warshall</h3>
          <button class="btn small" id="runFloyd">Floyd–Warshall</button>
        </div>
        <div class="card">
          <h3>Algoritmi käik</h3>
          <div id="algoSteps" style="font-family: 'SF Mono', monospace; font-size: 13px; max-height: 320px; overflow:auto;"></div>
        </div>
      </div>
    `;

    // Mode buttons
    view.querySelectorAll('[data-mode]').forEach(b => {
      b.addEventListener('click', () => {
        mode = b.dataset.mode;
        pending = null;
        $('modeIndicator').textContent = b.textContent;
        render();
      });
    });
    $('directedCheckbox').addEventListener('change', e => {
      graph.directed = e.target.checked;
      render();
    });
    $('clearGraph').addEventListener('click', () => {
      graph.vertices = []; graph.edges = []; graph.nextId = 1;
      highlightEdges.clear(); highlightVertices.clear();
      stepInfo = '';
      render();
      updateAlgoSteps();
    });
    view.querySelectorAll('[data-preset]').forEach(b => {
      b.addEventListener('click', () => loadPreset(b.dataset.preset));
    });

    // Tabs
    view.querySelectorAll('.tab').forEach(t => {
      t.addEventListener('click', () => {
        view.querySelectorAll('.tab').forEach(x => x.classList.remove('active'));
        view.querySelectorAll('.tab-panel').forEach(x => x.classList.remove('active'));
        t.classList.add('active');
        view.querySelector(`.tab-panel[data-panel="${t.dataset.tab}"]`).classList.add('active');
        if (t.dataset.tab === 'matrix') $('matrixView').innerHTML = showMatrix();
        if (t.dataset.tab === 'algorithms') populateAlgoDropdowns();
      });
    });

    // Algorithm runners
    $('runKruskal').addEventListener('click', () => {
      const mst = kruskal();
      highlightEdges.clear();
      mst.forEach(e => highlightEdges.add(edgeKey(e.u, e.v)));
      render();
      updateAlgoSteps();
    });
    $('runPrim').addEventListener('click', () => {
      const mst = prim();
      highlightEdges.clear();
      mst.forEach(e => highlightEdges.add(edgeKey(e.u, e.v)));
      render();
      updateAlgoSteps();
    });
    $('runDijkstra').addEventListener('click', () => {
      const s = +$('dijkstraStart').value;
      const e = +$('dijkstraEnd').value;
      const path = dijkstra(s, e);
      highlightEdges.clear();
      path.forEach(ed => highlightEdges.add(edgeKey(ed.u, ed.v)));
      highlightVertices.clear();
      highlightVertices.add(s); highlightVertices.add(e);
      render();
      updateAlgoSteps();
    });
    $('runFloyd').addEventListener('click', () => {
      floydWarshall();
      updateAlgoSteps();
    });

    function populateAlgoDropdowns() {
      const opts = graph.vertices.map(v => `<option value="${v.id}">${v.label}</option>`).join('');
      $('dijkstraStart').innerHTML = opts;
      $('dijkstraEnd').innerHTML = opts;
    }
    function updateAlgoSteps() {
      $('algoSteps').innerHTML = stepInfo || '<em>Jooksuta algoritmi.</em>';
    }

    handleMouse($('graphCanvas'));
    loadPreset('k4'); // default
    render();
    populateAlgoDropdowns();
    updateAlgoSteps();
  };
})();
