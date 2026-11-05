// Production Tree View Renderer
// Displays hierarchical production breakdown with inline recipe switcher,
// machine badges (exact + rounded up ceil), clock speeds, and collapsible branches.

class ProductionTreeView {
  constructor(containerElement, options = {}) {
    this.container = containerElement;
    this.onRecipeChange = options.onRecipeChange || (() => {});
    this.onClockChange = options.onClockChange || (() => {});
    this.onSomersloopToggle = options.onSomersloopToggle || (() => {});
    this.collapsedNodes = new Set();
  }

  render(calculationResult) {
    if (!this.container) return;
    this.container.innerHTML = "";

    const { tree, overrides } = calculationResult;

    const wrapper = document.createElement("div");
    wrapper.className = "tree-root-wrapper";

    // Controls header: Expand All, Collapse All
    const controlsBar = document.createElement("div");
    controlsBar.className = "tree-toolbar";
    controlsBar.innerHTML = `
      <div class="tree-toolbar-left">
        <span class="tree-title"><i class="fas fa-sitemap"></i> Albero di Produzione Gerarchico</span>
        <span class="tree-subtitle">Mostra la catena di fornitura passo-passo. Puoi cambiare ricetta direttamente su ciascun componente!</span>
      </div>
      <div class="tree-toolbar-actions">
        <button class="btn btn-sm btn-outline" id="tree-expand-all">
          <i class="fas fa-expand-arrows-alt"></i> Espandi Tutto
        </button>
        <button class="btn btn-sm btn-outline" id="tree-collapse-all">
          <i class="fas fa-compress-arrows-alt"></i> Contrai Tutto
        </button>
      </div>
    `;

    wrapper.appendChild(controlsBar);

    const treeContainer = document.createElement("div");
    treeContainer.className = "tree-nodes-container";

    const rootNodeElement = this.renderTreeNode(tree, overrides, true);
    treeContainer.appendChild(rootNodeElement);

    wrapper.appendChild(treeContainer);
    this.container.appendChild(wrapper);

    // Bind Expand / Collapse All buttons
    document.getElementById("tree-expand-all")?.addEventListener("click", () => {
      this.collapsedNodes.clear();
      this.render(calculationResult);
    });

    document.getElementById("tree-collapse-all")?.addEventListener("click", () => {
      // Collect all non-leaf node IDs
      const collectNodeIds = (node) => {
        if (node.children && node.children.length > 0) {
          this.collapsedNodes.add(node.id);
          node.children.forEach(collectNodeIds);
        }
      };
      if (tree.children) {
        tree.children.forEach(collectNodeIds);
      }
      this.render(calculationResult);
    });
  }

  renderTreeNode(node, overrides, isRoot = false) {
    const nodeEl = document.createElement("div");
    nodeEl.className = `tree-node depth-${node.depth} ${node.isRaw ? "node-raw" : "node-process"}`;
    nodeEl.dataset.nodeId = node.id;

    const hasChildren = node.children && node.children.length > 0;
    const isCollapsed = this.collapsedNodes.has(node.id);

    // Format rate nicely
    const formatNumber = (num, decimals = 2) => {
      if (num === 0) return "0";
      if (Number.isInteger(num)) return num.toString();
      const rounded = Number(num.toFixed(decimals));
      return rounded.toString();
    };

    // Build the Card Header & Content
    const card = document.createElement("div");
    card.className = `tree-card ${isRoot ? "tree-card-root" : ""} ${node.somersloop ? "card-somersloop-active" : ""}`;

    // Available recipes for this item
    const availableRecipes = (window.gameData?.RECIPES_BY_ITEM || {})[node.itemId] || [];
    const hasAlternateRecipes = availableRecipes.length > 1;

    let recipeSelectorHtml = "";
    if (!node.isRaw && availableRecipes.length > 0) {
      const activeRecipeId = node.recipe?.id;
      recipeSelectorHtml = `
        <div class="recipe-selector-box">
          <label class="recipe-label">
            <span class="recipe-label-text">Ricetta:</span>
            <select class="recipe-select ${hasAlternateRecipes ? "has-alternates" : ""}" data-item-id="${node.itemId}">
              ${availableRecipes.map(r => `
                <option value="${r.id}" ${r.id === activeRecipeId ? "selected" : ""}>
                  ${r.isAlternate ? "⭐ " : ""}${r.name} (${formatNumber(r.outputs.find(o => o.item === node.itemId)?.rate || 0)}/min)
                </option>
              `).join("")}
            </select>
          </label>
          ${hasAlternateRecipes ? `<span class="badge badge-alt-count">${availableRecipes.length} varianti</span>` : ""}
        </div>
      `;
    }

    // Machine info and CEILING display
    let machineInfoHtml = "";
    if (node.isRaw) {
      const iconHtml = window.renderItemIcon ? window.renderItemIcon(node.item, "game-icon game-icon-sm") : "⛏️";
      machineInfoHtml = `
        <div class="node-machine-badge machine-raw">
          <span class="machine-icon">${iconHtml}</span>
          <span class="machine-name">Risorsa Naturale Grezza</span>
          <span class="machine-rates">${formatNumber(node.rate)} / min</span>
        </div>
      `;
    } else if (node.building && node.recipe) {
      const exact = formatNumber(node.machineCountExact, 2);
      const ceil = node.machineCountCeil;
      const clockPct = formatNumber(node.clockSpeedPercent, 1);
      const powerExact = formatNumber(node.powerExact, 1);
      const powerCeil = formatNumber(node.powerCeil, 1);
      const bIconHtml = window.renderBuildingIcon ? window.renderBuildingIcon(node.building, "game-icon game-icon-sm") : "🏭";

      machineInfoHtml = `
        <div class="node-machine-row">
          <div class="node-machine-badge" style="border-left-color: ${node.building.color || '#fa9549'}">
            <span class="machine-icon">${bIconHtml}</span>
            <div class="machine-text-col">
              <span class="machine-name">${node.building.name}</span>
              <span class="machine-exact-count">Esatto: <strong>${exact}</strong> macchine</span>
            </div>
          </div>

          <div class="node-ceiling-badge" title="Arrotondato per eccesso: numero reale di macchine da costruire">
            <span class="ceiling-label">COSTRUISCI:</span>
            <span class="ceiling-number">${ceil}x</span>
            <span class="ceiling-building">${node.building.name}</span>
          </div>

          <div class="node-clock-badge">
            <span class="clock-label">Carico: <strong>${clockPct}%</strong></span>
            <span class="power-label">⚡ ${powerExact} MW <small>(max ${powerCeil} MW)</small></span>
          </div>
        </div>
      `;
    }

    const itemIconHtml = window.renderItemIcon ? window.renderItemIcon(node.item, "game-icon game-icon-md") : (node.item?.emoji || "📦");

    card.innerHTML = `
      <div class="tree-card-header">
        <div class="card-item-info">
          ${hasChildren ? `
            <button class="btn-toggle-collapse" title="${isCollapsed ? 'Espandi' : 'Comprimi'}">
              <i class="fas ${isCollapsed ? 'fa-chevron-right' : 'fa-chevron-down'}"></i>
            </button>
          ` : '<span class="leaf-dot"></span>'}
          <span class="item-icon-slot">${itemIconHtml}</span>
          <div class="item-name-group">
            <span class="item-name">${node.item?.name || node.itemId}</span>
            <span class="item-name-en">${node.item?.nameEn || ""}</span>
          </div>
        </div>

        <div class="card-rate-badge">
          <span class="rate-value">${formatNumber(node.rate)}</span>
          <span class="rate-unit">/ min</span>
        </div>
      </div>

      <div class="tree-card-body">
        ${recipeSelectorHtml}
        ${machineInfoHtml}
        ${!node.isRaw ? `
        <div class="node-modifiers-row">
          <div class="clock-control-group">
            <span class="modifier-label"><img src="assets/images/items/power_shard.png" class="game-icon-xs" alt=""> Overclock:</span>
            <div class="clock-pills">
              <button class="btn-clock-pill ${node.clockSpeedPercent === 100 ? 'active' : ''}" data-item-id="${node.itemId}" data-clock="100">100%</button>
              <button class="btn-clock-pill ${node.clockSpeedPercent === 150 ? 'active' : ''}" data-item-id="${node.itemId}" data-clock="150" title="Richiede 1 Frammento Energetico per macchina">150% 💎1</button>
              <button class="btn-clock-pill ${node.clockSpeedPercent === 200 ? 'active' : ''}" data-item-id="${node.itemId}" data-clock="200" title="Richiede 2 Frammenti Energetici per macchina">200% 💎2</button>
              <button class="btn-clock-pill ${node.clockSpeedPercent === 250 ? 'active' : ''}" data-item-id="${node.itemId}" data-clock="250" title="Richiede 3 Frammenti Energetici per macchina">250% 💎3</button>
            </div>
            ${node.totalPowerShards > 0 ? `
              <span class="badge-shards-tag" title="${node.totalPowerShards} Frammenti totali (${node.powerShardsPerMachine}x per macchina)">
                <img src="assets/images/items/power_shard.png" class="game-icon-xs" alt=""> ${node.totalPowerShards}x Frammenti
              </span>
            ` : ""}
          </div>

          <div class="somersloop-control-group">
            <button class="btn-somersloop-toggle ${node.somersloop ? 'active' : ''}" data-item-id="${node.itemId}" title="${node.somersloop ? 'Somersloop ATTIVO: Raddoppia output (2x), dimezza ingredienti! Clicca per disattivare' : 'Attiva Amplificazione Somersloop (+100% output senza ingredienti extra)'}">
              <img src="assets/images/items/somersloop.png" class="game-icon-xs" alt="">
              <span>${node.somersloop ? 'x2 Somersloop ATTIVO' : 'Attiva x2 Somersloop'}</span>
              ${node.somersloop ? `<span class="sloop-count-badge">${node.totalSomersloops || 1}x</span>` : ''}
            </button>
          </div>
        </div>
        ` : ""}
      </div>
    `;

    // Clock pills listeners
    card.querySelectorAll(".btn-clock-pill").forEach(pill => {
      pill.addEventListener("click", (e) => {
        const itemId = e.target.dataset.itemId;
        const clock = parseFloat(e.target.dataset.clock);
        this.onClockChange(itemId, clock);
      });
    });

    // Somersloop toggle listener
    const sloopBtn = card.querySelector(".btn-somersloop-toggle");
    if (sloopBtn) {
      sloopBtn.addEventListener("click", (e) => {
        const itemId = e.currentTarget.dataset.itemId;
        this.onSomersloopToggle(itemId);
      });
    }

    // Event listener for recipe change inside this node
    const select = card.querySelector(".recipe-select");
    if (select) {
      select.addEventListener("change", (e) => {
        const itemId = e.target.dataset.itemId;
        const newRecipeId = e.target.value;
        this.onRecipeChange(itemId, newRecipeId);
      });
    }

    // Toggle collapse on click
    const toggleBtn = card.querySelector(".btn-toggle-collapse");
    if (toggleBtn) {
      toggleBtn.addEventListener("click", () => {
        if (this.collapsedNodes.has(node.id)) {
          this.collapsedNodes.delete(node.id);
        } else {
          this.collapsedNodes.add(node.id);
        }
        // Toggle view
        const childrenContainer = nodeEl.querySelector(".tree-children");
        if (childrenContainer) {
          const nowCollapsed = this.collapsedNodes.has(node.id);
          childrenContainer.style.display = nowCollapsed ? "none" : "flex";
          toggleBtn.innerHTML = `<i class="fas ${nowCollapsed ? 'fa-chevron-right' : 'fa-chevron-down'}"></i>`;
        }
      });
    }

    nodeEl.appendChild(card);

    // Render children branches
    if (hasChildren) {
      const childrenWrapper = document.createElement("div");
      childrenWrapper.className = "tree-children";
      if (isCollapsed) {
        childrenWrapper.style.display = "none";
      }

      node.children.forEach(child => {
        const childEl = this.renderTreeNode(child, overrides, false);
        childrenWrapper.appendChild(childEl);
      });

      nodeEl.appendChild(childrenWrapper);
    }

    return nodeEl;
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { ProductionTreeView };
}
