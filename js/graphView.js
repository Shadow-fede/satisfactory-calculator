// Production Graph (DAG Flowchart) Renderer
// Interactive SVG-based factory flow diagram with left-to-right topological layout,
// smooth Bezier links, flow rate badges, pan/zoom, draggable nodes, and connection highlighting.

class ProductionGraphView {
  constructor(containerElement, options = {}) {
    this.container = containerElement;
    this.onRecipeChange = options.onRecipeChange || (() => {});
    this.onClockChange = options.onClockChange || (() => {});
    this.onSomersloopToggle = options.onSomersloopToggle || (() => {});
    this.zoom = 1;
    this.panX = 50;
    this.panY = 50;
    this.isPanning = false;
    this.dragStart = { x: 0, y: 0 };
    this.draggingNode = null;
    this.nodePositions = new Map();
    this.hoveredNodeId = null;
    this.currentData = null;
    this.wrapper = null;
    this.isFullscreen = false;
    this.fullscreenListenersBound = false;
  }

  render(calculationResult) {
    if (!this.container) return;
    this.currentData = calculationResult;
    const { graph, overrides } = calculationResult;

    // PRESERVE DOM WRAPPER IF ALREADY EXISTING!
    // Never clear this.container if wrapper exists: removing the fullscreen element
    // from DOM triggers browser native exitFullscreen. Keeping the wrapper preserves fullscreen!
    const existingWrapper = this.container.querySelector(".graph-wrapper");
    if (existingWrapper && this.wrapper && this.mainGroup && this.svgContainer) {
      this.computeAutoLayout(graph);
      this.renderGraphContent(graph, overrides);
      this.updateFullscreenButton(this.isFullscreen);
      return;
    }

    this.container.innerHTML = "";

    // Create wrapper & toolbar
    const wrapper = document.createElement("div");
    wrapper.className = "graph-wrapper" + (this.isFullscreen ? " is-fullscreen" : "");
    this.wrapper = wrapper;

    const toolbar = document.createElement("div");
    toolbar.className = "graph-toolbar";
    toolbar.innerHTML = `
      <div class="graph-toolbar-left">
        <span class="graph-title">
          <i class="fas fa-project-diagram"></i> Diagramma di Flusso di Produzione
          <span class="fullscreen-hint" id="graph-fs-hint" style="${this.isFullscreen ? 'display:inline-flex;' : 'display:none;'}">
            <i class="fas fa-expand-arrows-alt"></i> Schermo Intero attivo (Premi <strong>F</strong> o <strong>Esc</strong> per uscire)
          </span>
        </span>
        <span class="graph-subtitle">Trascina lo sfondo per spostarti, rotellina per zoomare, trascina i nodi per riordinarli.</span>
      </div>
      <div class="graph-toolbar-actions">
        <button class="btn btn-sm btn-outline" id="graph-zoom-in" title="Zoom Avanti (+)"><i class="fas fa-plus"></i></button>
        <button class="btn btn-sm btn-outline" id="graph-zoom-out" title="Zoom Indietro (-)"><i class="fas fa-minus"></i></button>
        <button class="btn btn-sm btn-outline" id="graph-zoom-reset" title="Ripristina Zoom al 100%">100%</button>
        <button class="btn btn-sm btn-outline" id="graph-fit" title="Adatta allo Schermo (Fit)"><i class="fas fa-compress-arrows-alt"></i> Adatta</button>
        <button class="btn btn-sm btn-outline" id="graph-relayout" title="Ridisponi Automaticamente i Nodi"><i class="fas fa-sync-alt"></i> Auto-Layout</button>
        <button class="btn btn-sm btn-primary ${this.isFullscreen ? 'btn-active-fullscreen' : ''}" id="graph-fullscreen-toggle" title="${this.isFullscreen ? 'Esci da Schermo Intero (Esc o F)' : 'Attiva Schermo Intero (F)'}">
          <i class="fas ${this.isFullscreen ? 'fa-compress' : 'fa-expand'}"></i> ${this.isFullscreen ? 'Esci da Schermo Intero' : 'Schermo Intero'}
        </button>
      </div>
    `;
    wrapper.appendChild(toolbar);

    // SVG container
    const svgContainer = document.createElement("div");
    svgContainer.className = "graph-canvas-container";

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("class", "graph-svg");
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "100%");

    // Definitions for arrowheads and filters
    const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
    defs.innerHTML = `
      <marker id="arrow" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 1 L 10 5 L 0 9 z" fill="#fa9549" />
      </marker>
      <marker id="arrow-highlight" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M 0 1 L 10 5 L 0 9 z" fill="#00e5ff" />
      </marker>
      <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="2" stdDeviation="4" flood-color="#fa9549" flood-opacity="0.3"/>
      </filter>
    `;
    svg.appendChild(defs);

    // Main transform group for pan and zoom
    const mainGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
    mainGroup.setAttribute("class", "main-transform-group");
    svg.appendChild(mainGroup);

    svgContainer.appendChild(svg);
    wrapper.appendChild(svgContainer);
    this.container.appendChild(wrapper);

    this.svg = svg;
    this.mainGroup = mainGroup;
    this.svgContainer = svgContainer;

    // Compute automatic layout if positions not yet initialized
    this.computeAutoLayout(graph);

    // Render elements inside mainGroup
    this.renderGraphContent(graph, overrides);

    // Setup interactions
    this.bindEvents();

    // Toolbar buttons
    document.getElementById("graph-zoom-in")?.addEventListener("click", () => this.adjustZoom(1.2));
    document.getElementById("graph-zoom-out")?.addEventListener("click", () => this.adjustZoom(0.8));
    document.getElementById("graph-zoom-reset")?.addEventListener("click", () => {
      this.zoom = 1;
      this.panX = 60;
      this.panY = 60;
      this.updateTransform();
    });
    document.getElementById("graph-fit")?.addEventListener("click", () => this.fitToScreen(graph));
    document.getElementById("graph-relayout")?.addEventListener("click", () => {
      this.nodePositions.clear();
      this.computeAutoLayout(graph);
      this.renderGraphContent(graph, overrides);
      this.fitToScreen(graph);
    });
    document.getElementById("graph-fullscreen-toggle")?.addEventListener("click", () => this.toggleFullscreen());

    // Setup global fullscreen listeners (F, Esc, fullscreenchange)
    this.setupFullscreenListeners();
    this.updateFullscreenButton(this.isFullscreen);

    // Initial transform
    this.updateTransform();
  }

  // Automatic topological layout: Raw resources on left -> Process steps -> Target on right
  computeAutoLayout(graph) {
    const { nodes, links } = graph;

    // Calculate maximum depth / rank from target backwards
    // In our DAG, Target is depth 0, its ingredients depth 1, etc.
    // For Left-to-Right flow:
    // Leftmost = highest depth (Raw resources), Rightmost = depth 0 (Target item).
    let maxDepth = 0;
    nodes.forEach(n => {
      if (n.depth > maxDepth) maxDepth = n.depth;
    });

    // Group nodes by visual column rank: rank = maxDepth - node.depth
    const columns = {};
    for (let r = 0; r <= maxDepth; r++) {
      columns[r] = [];
    }

    nodes.forEach(node => {
      const colRank = maxDepth - node.depth;
      if (!columns[colRank]) columns[colRank] = [];
      columns[colRank].push(node);
    });

    // Dimensions
    const nodeWidth = 270;
    const nodeHeight = 150;
    const colSpacing = 160;
    const rowSpacing = 40;

    Object.keys(columns).forEach(rankStr => {
      const colRank = parseInt(rankStr, 10);
      const colNodes = columns[colRank];
      const startX = 80 + colRank * (nodeWidth + colSpacing);

      const totalColHeight = colNodes.length * nodeHeight + (colNodes.length - 1) * rowSpacing;
      const startY = Math.max(60, 350 - totalColHeight / 2);

      colNodes.forEach((node, index) => {
        if (!this.nodePositions.has(node.id)) {
          const y = startY + index * (nodeHeight + rowSpacing);
          this.nodePositions.set(node.id, { x: startX, y, width: nodeWidth, height: nodeHeight });
        }
      });
    });
  }

  renderGraphContent(graph, overrides) {
    if (!this.mainGroup) return;
    this.mainGroup.innerHTML = "";

    const { nodes, links } = graph;

    // Groups for links and nodes
    const linksGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
    linksGroup.setAttribute("class", "links-layer");

    const badgesGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
    badgesGroup.setAttribute("class", "badges-layer");

    const nodesGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
    nodesGroup.setAttribute("class", "nodes-layer");

    this.mainGroup.appendChild(linksGroup);
    this.mainGroup.appendChild(badgesGroup);
    this.mainGroup.appendChild(nodesGroup);

    // Format helper
    const formatNumber = (num, decimals = 1) => {
      if (!num) return "0";
      if (Number.isInteger(num)) return num.toString();
      return Number(num.toFixed(decimals)).toString();
    };

    // Render Links
    links.forEach(link => {
      const srcPos = this.nodePositions.get(link.source);
      const tgtPos = this.nodePositions.get(link.target);
      if (!srcPos || !tgtPos) return;

      const x1 = srcPos.x + srcPos.width;
      const y1 = srcPos.y + srcPos.height / 2;
      const x2 = tgtPos.x;
      const y2 = tgtPos.y + tgtPos.height / 2;

      const dx = Math.max(40, (x2 - x1) * 0.5);
      const d = `M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`;

      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path.setAttribute("d", d);
      path.setAttribute("class", "graph-link");
      path.setAttribute("id", link.id);
      path.setAttribute("data-source", link.source);
      path.setAttribute("data-target", link.target);
      path.setAttribute("marker-end", "url(#arrow)");
      linksGroup.appendChild(path);

      // Flow rate badge on mid-point
      const midX = (x1 + x2) / 2;
      const midY = (y1 + y2) / 2;

      const badgeGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
      badgeGroup.setAttribute("class", "rate-badge-group");
      badgeGroup.setAttribute("transform", `translate(${midX}, ${midY})`);

      const text = `${formatNumber(link.rate)}/m`;
      const badgeWidth = text.length * 7 + 14;

      const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      rect.setAttribute("x", -badgeWidth / 2);
      rect.setAttribute("y", -11);
      rect.setAttribute("width", badgeWidth);
      rect.setAttribute("height", 20);
      rect.setAttribute("rx", 10);
      rect.setAttribute("class", "link-badge-bg");

      const textEl = document.createElementNS("http://www.w3.org/2000/svg", "text");
      textEl.setAttribute("text-anchor", "middle");
      textEl.setAttribute("dy", 3.5);
      textEl.setAttribute("class", "link-badge-text");
      textEl.textContent = text;

      badgeGroup.appendChild(rect);
      badgeGroup.appendChild(textEl);
      badgesGroup.appendChild(badgeGroup);
    });

    // Render Nodes
    nodes.forEach(node => {
      const pos = this.nodePositions.get(node.id);
      if (!pos) return;

      const nodeG = document.createElementNS("http://www.w3.org/2000/svg", "g");
      nodeG.setAttribute("class", `graph-node ${node.isTarget ? 'node-target' : ''} ${node.isRaw ? 'node-raw' : ''}`);
      nodeG.setAttribute("id", `graph-node-${node.id}`);
      nodeG.setAttribute("transform", `translate(${pos.x}, ${pos.y})`);
      nodeG.setAttribute("data-node-id", node.id);

      // Card background
      const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      rect.setAttribute("width", pos.width);
      rect.setAttribute("height", pos.height);
      rect.setAttribute("rx", 8);
      rect.setAttribute("class", "graph-node-rect");
      rect.setAttribute("stroke", node.somersloop ? "#ba68c8" : (node.building?.color || "#fa9549"));
      if (node.somersloop) {
        rect.setAttribute("stroke-width", "2.5");
        nodeG.classList.add("node-somersloop-active");
      }

      // Left accent color bar
      const bar = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      bar.setAttribute("width", 5);
      bar.setAttribute("height", pos.height);
      bar.setAttribute("rx", 2);
      bar.setAttribute("fill", node.building?.color || "#fa9549");

      // ForeignObject for rich interactive HTML content inside SVG node!
      const foreign = document.createElementNS("http://www.w3.org/2000/svg", "foreignObject");
      foreign.setAttribute("x", 6);
      foreign.setAttribute("y", 0);
      foreign.setAttribute("width", pos.width - 6);
      foreign.setAttribute("height", pos.height);

      const foreignDiv = document.createElement("div");
      foreignDiv.className = "graph-node-html";

      const availableRecipes = (window.gameData?.RECIPES_BY_ITEM || {})[node.itemId] || [];
      const hasAlternates = availableRecipes.length > 1;

      let subText = "";
      if (node.isRaw) {
        const rawIconHtml = window.renderItemIcon ? window.renderItemIcon(node.item, "game-icon game-icon-xs") : "⛏️";
        subText = `<div class="gnode-sub raw">${rawIconHtml} <span>Risorsa Grezza</span></div>`;
      } else {
        const ceilCount = node.machineCountCeil;
        const exactCount = formatNumber(node.machineCountExact, 2);
        const bIconHtml = window.renderBuildingIcon ? window.renderBuildingIcon(node.building, "game-icon game-icon-xs") : "🏭";
        const clock = node.clockSpeedPercent || 100;
        const shards = node.totalPowerShards || 0;
        const somersloop = node.somersloop || false;

        subText = `
          <div class="gnode-building-row">
            <span class="gnode-building-name">${bIconHtml} ${node.building?.name || ""}</span>
            <span class="gnode-ceil-pill" title="Numero reale di macchine (arrotondato per eccesso)">
              <strong>${ceilCount}x</strong> <small>(${exactCount})</small>
            </span>
          </div>

          <div class="gnode-modifiers-row">
            <div class="gnode-clock-col" title="Overclock macchina">
              <select class="gnode-clock-select" data-item-id="${node.itemId}">
                <option value="100" ${clock === 100 ? "selected" : ""}>100%</option>
                <option value="150" ${clock === 150 ? "selected" : ""}>150% 💎1</option>
                <option value="200" ${clock === 200 ? "selected" : ""}>200% 💎2</option>
                <option value="250" ${clock === 250 ? "selected" : ""}>250% 💎3</option>
              </select>
            </div>
            ${shards > 0 ? `
              <span class="gnode-shard-pill" title="${shards}x Frammenti Energetici totali">
                <img src="assets/images/items/power_shard.png" class="game-icon-xs"> ${shards}x
              </span>
            ` : ""}
            <button class="gnode-sloop-btn ${somersloop ? 'active' : ''}" data-item-id="${node.itemId}" title="${somersloop ? 'Somersloop ATTIVO: Raddoppia output (2x), dimezza ingredienti! Clicca per disattivare' : 'Attiva Amplificazione Somersloop (2x output)'}">
              <img src="assets/images/items/somersloop.png" class="game-icon-xs">
              <span>x2</span>
              ${somersloop ? `<span class="gnode-sloop-qty">${node.totalSomersloops || 1}x</span>` : ''}
            </button>
          </div>
        `;
      }

      // Recipe line or dropdown
      let recipeLine = "";
      if (!node.isRaw && availableRecipes.length > 0) {
        if (hasAlternates) {
          recipeLine = `
            <div class="gnode-recipe-row">
              <select class="gnode-recipe-select" data-item-id="${node.itemId}">
                ${availableRecipes.map(r => `
                  <option value="${r.id}" ${r.id === node.recipe?.id ? "selected" : ""}>
                    ${r.isAlternate ? "⭐ " : ""}${r.nameEn || r.name}
                  </option>
                `).join("")}
              </select>
            </div>
          `;
        } else {
          recipeLine = `<div class="gnode-recipe-name">${node.recipe?.nameEn || node.recipe?.name || ""}</div>`;
        }
      }

      const itemIconHtml = window.renderItemIcon ? window.renderItemIcon(node.item, "game-icon game-icon-sm") : (node.item?.emoji || "📦");

      foreignDiv.innerHTML = `
        <div class="gnode-header">
          <span class="gnode-icon-slot">${itemIconHtml}</span>
          <div class="gnode-title-group">
            <span class="gnode-title">${node.item?.name || node.itemId}</span>
            <span class="gnode-rate">${formatNumber(node.rate)} / m</span>
          </div>
        </div>
        ${recipeLine}
        ${subText}
      `;

      foreign.appendChild(foreignDiv);

      nodeG.appendChild(rect);
      nodeG.appendChild(bar);
      nodeG.appendChild(foreign);

      // Node recipe change listener
      const select = foreignDiv.querySelector(".gnode-recipe-select");
      if (select) {
        select.addEventListener("mousedown", (e) => e.stopPropagation());
        select.addEventListener("change", (e) => {
          e.stopPropagation();
          const itemId = e.target.dataset.itemId;
          const newRecipeId = e.target.value;
          this.onRecipeChange(itemId, newRecipeId);
        });
      }

      // Node clock change listener
      const clockSelect = foreignDiv.querySelector(".gnode-clock-select");
      if (clockSelect) {
        clockSelect.addEventListener("mousedown", (e) => e.stopPropagation());
        clockSelect.addEventListener("change", (e) => {
          e.stopPropagation();
          const itemId = e.target.dataset.itemId;
          const newClock = parseFloat(e.target.value);
          this.onClockChange(itemId, newClock);
        });
      }

      // Node somersloop toggle listener
      const sloopBtn = foreignDiv.querySelector(".gnode-sloop-btn");
      if (sloopBtn) {
        sloopBtn.addEventListener("mousedown", (e) => e.stopPropagation());
        sloopBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          const itemId = e.currentTarget.dataset.itemId;
          this.onSomersloopToggle(itemId);
        });
      }

      // Node Drag & Hover events
      this.attachNodeDragEvents(nodeG, node);

      nodesGroup.appendChild(nodeG);
    });
  }

  attachNodeDragEvents(nodeG, node) {
    let startX = 0;
    let startY = 0;
    let initialNodeX = 0;
    let initialNodeY = 0;
    let hasMoved = false;

    nodeG.addEventListener("mousedown", (e) => {
      if (e.target.closest("select, option, button, input, label")) return;
      e.stopPropagation();

      const pos = this.nodePositions.get(node.id);
      if (!pos) return;

      startX = e.clientX;
      startY = e.clientY;
      initialNodeX = pos.x;
      initialNodeY = pos.y;
      hasMoved = false;

      const onMouseMove = (moveEvt) => {
        const dx = (moveEvt.clientX - startX) / this.zoom;
        const dy = (moveEvt.clientY - startY) / this.zoom;
        if (Math.abs(dx) > 3 || Math.abs(dy) > 3) hasMoved = true;

        pos.x = initialNodeX + dx;
        pos.y = initialNodeY + dy;
        nodeG.setAttribute("transform", `translate(${pos.x}, ${pos.y})`);

        this.updateLinksForNode(node.id);
      };

      const onMouseUp = () => {
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("mouseup", onMouseUp);
      };

      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
    });

    // Hover highlighting
    nodeG.addEventListener("mouseenter", () => {
      this.highlightConnections(node.id);
    });

    nodeG.addEventListener("mouseleave", () => {
      this.clearHighlight();
    });
  }

  updateLinksForNode(nodeId) {
    if (!this.currentData || !this.mainGroup) return;

    const links = this.currentData.graph.links;
    links.forEach(link => {
      if (link.source === nodeId || link.target === nodeId) {
        const srcPos = this.nodePositions.get(link.source);
        const tgtPos = this.nodePositions.get(link.target);
        if (!srcPos || !tgtPos) return;

        const x1 = srcPos.x + srcPos.width;
        const y1 = srcPos.y + srcPos.height / 2;
        const x2 = tgtPos.x;
        const y2 = tgtPos.y + tgtPos.height / 2;

        const dx = Math.max(40, (x2 - x1) * 0.5);
        const d = `M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`;

        const path = document.getElementById(link.id);
        if (path) path.setAttribute("d", d);
      }
    });
  }

  highlightConnections(nodeId) {
    if (!this.mainGroup) return;
    this.mainGroup.classList.add("has-highlight");

    const links = this.mainGroup.querySelectorAll(".graph-link");
    const activeNodes = new Set([nodeId]);

    links.forEach(link => {
      const src = link.getAttribute("data-source");
      const tgt = link.getAttribute("data-target");
      if (src === nodeId || tgt === nodeId) {
        link.classList.add("link-highlight");
        link.setAttribute("marker-end", "url(#arrow-highlight)");
        activeNodes.add(src);
        activeNodes.add(tgt);
      } else {
        link.classList.add("link-dimmed");
      }
    });

    const nodes = this.mainGroup.querySelectorAll(".graph-node");
    nodes.forEach(n => {
      const nId = n.getAttribute("data-node-id");
      if (activeNodes.has(nId)) {
        n.classList.add("node-highlight");
      } else {
        n.classList.add("node-dimmed");
      }
    });
  }

  clearHighlight() {
    if (!this.mainGroup) return;
    this.mainGroup.classList.remove("has-highlight");

    const links = this.mainGroup.querySelectorAll(".graph-link");
    links.forEach(l => {
      l.classList.remove("link-highlight", "link-dimmed");
      l.setAttribute("marker-end", "url(#arrow)");
    });

    const nodes = this.mainGroup.querySelectorAll(".graph-node");
    nodes.forEach(n => n.classList.remove("node-highlight", "node-dimmed"));
  }

  // Pan & Zoom interaction
  bindEvents() {
    if (!this.svgContainer) return;

    // Pan with left-click drag on canvas background
    this.svgContainer.addEventListener("mousedown", (e) => {
      if (e.target.closest(".graph-node")) return; // Don't pan if clicking node
      this.isPanning = true;
      this.dragStart = { x: e.clientX - this.panX, y: e.clientY - this.panY };
      this.svgContainer.style.cursor = "grabbing";
    });

    window.addEventListener("mousemove", (e) => {
      if (!this.isPanning) return;
      this.panX = e.clientX - this.dragStart.x;
      this.panY = e.clientY - this.dragStart.y;
      this.updateTransform();
    });

    window.addEventListener("mouseup", () => {
      if (this.isPanning) {
        this.isPanning = false;
        if (this.svgContainer) this.svgContainer.style.cursor = "grab";
      }
    });

    // Zoom with mouse wheel
    this.svgContainer.addEventListener("wheel", (e) => {
      e.preventDefault();
      const rect = this.svgContainer.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const zoomFactor = e.deltaY < 0 ? 1.15 : 0.87;
      const newZoom = Math.min(3, Math.max(0.2, this.zoom * zoomFactor));

      // Zoom towards mouse pointer
      this.panX = mouseX - (mouseX - this.panX) * (newZoom / this.zoom);
      this.panY = mouseY - (mouseY - this.panY) * (newZoom / this.zoom);
      this.zoom = newZoom;

      this.updateTransform();
    }, { passive: false });
  }

  adjustZoom(factor) {
    const rect = this.svgContainer.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const newZoom = Math.min(3, Math.max(0.2, this.zoom * factor));
    this.panX = centerX - (centerX - this.panX) * (newZoom / this.zoom);
    this.panY = centerY - (centerY - this.panY) * (newZoom / this.zoom);
    this.zoom = newZoom;

    this.updateTransform();
  }

  fitToScreen(graph) {
    if (!graph || !graph.nodes || graph.nodes.length === 0) return;

    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    graph.nodes.forEach(node => {
      const pos = this.nodePositions.get(node.id);
      if (pos) {
        if (pos.x < minX) minX = pos.x;
        if (pos.y < minY) minY = pos.y;
        if (pos.x + pos.width > maxX) maxX = pos.x + pos.width;
        if (pos.y + pos.height > maxY) maxY = pos.y + pos.height;
      }
    });

    const rect = this.svgContainer.getBoundingClientRect();
    const width = rect.width || 1000;
    const height = rect.height || 600;

    const graphWidth = maxX - minX + 100;
    const graphHeight = maxY - minY + 100;

    const zoomX = width / graphWidth;
    const zoomY = height / graphHeight;
    this.zoom = Math.min(1.2, Math.max(0.3, Math.min(zoomX, zoomY) * 0.9));

    this.panX = (width - (maxX + minX) * this.zoom) / 2;
    this.panY = (height - (maxY + minY) * this.zoom) / 2;

    this.updateTransform();
  }

  updateTransform() {
    if (!this.mainGroup) return;
    this.mainGroup.setAttribute("transform", `translate(${this.panX}, ${this.panY}) scale(${this.zoom})`);

    const resetBtn = document.getElementById("graph-zoom-reset");
    if (resetBtn) {
      resetBtn.textContent = `${Math.round(this.zoom * 100)}%`;
    }
  }

  setupFullscreenListeners() {
    if (this.fullscreenListenersBound) return;
    this.fullscreenListenersBound = true;

    const onFsChange = () => {
      const isFs = !!(
        document.fullscreenElement === this.wrapper ||
        document.webkitFullscreenElement === this.wrapper ||
        document.mozFullScreenElement === this.wrapper ||
        document.msFullscreenElement === this.wrapper
      );
      this.isFullscreen = isFs;
      if (this.wrapper) {
        if (isFs) {
          this.wrapper.classList.add("is-fullscreen");
          document.body.classList.add("graph-fs-active");
        } else {
          this.wrapper.classList.remove("is-fullscreen");
          document.body.classList.remove("graph-fs-active");
        }
      }
      this.updateFullscreenButton(isFs);
      setTimeout(() => this.fitToScreen(this.currentData?.graph), 120);
    };

    document.addEventListener("fullscreenchange", onFsChange);
    document.addEventListener("webkitfullscreenchange", onFsChange);
    document.addEventListener("mozfullscreenchange", onFsChange);
    document.addEventListener("MSFullscreenChange", onFsChange);

    document.addEventListener("keydown", (e) => {
      if (!this.container || this.container.style.display === "none") return;
      const tag = document.activeElement ? document.activeElement.tagName.toUpperCase() : "";
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;

      if (e.key === "f" || e.key === "F") {
        e.preventDefault();
        this.toggleFullscreen();
      } else if (e.key === "Escape" && (this.isFullscreen || this.wrapper?.classList.contains("is-fullscreen"))) {
        e.preventDefault();
        this.exitFullscreen();
      }
    });
  }

  toggleFullscreen() {
    const isCurrentlyFs = this.isFullscreen || (this.wrapper && this.wrapper.classList.contains("is-fullscreen"));
    if (isCurrentlyFs) {
      this.exitFullscreen();
    } else {
      this.enterFullscreen();
    }
  }

  enterFullscreen() {
    if (!this.wrapper) return;
    this.isFullscreen = true;
    this.wrapper.classList.add("is-fullscreen");
    document.body.classList.add("graph-fs-active");

    const el = this.wrapper;
    const req = el.requestFullscreen ||
                el.webkitRequestFullscreen ||
                el.mozRequestFullScreen ||
                el.msRequestFullscreen;

    if (req && !document.fullscreenElement) {
      try {
        const p = req.call(el);
        if (p && p.catch) p.catch(() => {});
      } catch (err) {}
    }

    this.updateFullscreenButton(true);
    setTimeout(() => {
      this.fitToScreen(this.currentData?.graph);
    }, 120);
  }

  exitFullscreen() {
    this.isFullscreen = false;
    if (this.wrapper) {
      this.wrapper.classList.remove("is-fullscreen");
    }
    document.body.classList.remove("graph-fs-active");

    const exit = document.exitFullscreen ||
                 document.webkitExitFullscreen ||
                 document.mozCancelFullScreen ||
                 document.msExitFullscreen;

    const isNative = !!(
      document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.mozFullScreenElement ||
      document.msFullscreenElement
    );

    if (exit && isNative) {
      try {
        const p = exit.call(document);
        if (p && p.catch) p.catch(() => {});
      } catch (err) {}
    }

    this.updateFullscreenButton(false);
    setTimeout(() => {
      this.fitToScreen(this.currentData?.graph);
    }, 120);
  }

  updateFullscreenButton(isFullscreen) {
    const btn = document.getElementById("graph-fullscreen-toggle");
    const navBtn = document.getElementById("btn-fullscreen-graph");
    const hint = document.getElementById("graph-fs-hint");

    const html = isFullscreen
      ? `<i class="fas fa-compress"></i> Esci da Schermo Intero`
      : `<i class="fas fa-expand"></i> Schermo Intero`;
    const title = isFullscreen
      ? `Esci dallo Schermo Intero (Esc o tasto F)`
      : `Attiva Schermo Intero (Tasto F)`;

    [btn, navBtn].forEach(b => {
      if (!b) return;
      b.innerHTML = html;
      b.title = title;
      if (isFullscreen) {
        b.classList.add("btn-active-fullscreen");
      } else {
        b.classList.remove("btn-active-fullscreen");
      }
    });

    if (hint) {
      hint.style.display = isFullscreen ? "inline-flex" : "none";
    }
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { ProductionGraphView };
}
