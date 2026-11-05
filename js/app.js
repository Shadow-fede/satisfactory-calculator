// Main Application Controller for Satisfactory Calculator
// Coordinates UI, state management, calculation triggers, tree view, graph view, and machinery summaries.

document.addEventListener("DOMContentLoaded", () => {
  // Ensure game data is loaded
  if (typeof BUILDINGS === "undefined" || typeof ITEMS === "undefined" || typeof RECIPES === "undefined") {
    console.error("Game data not found!");
    return;
  }

  window.gameData = {
    BUILDINGS,
    CATEGORIES,
    ITEMS,
    RECIPES,
    RECIPES_BY_ITEM,
    DEFAULT_RECIPES,
    renderItemIcon: window.renderItemIcon || renderItemIcon,
    renderBuildingIcon: window.renderBuildingIcon || renderBuildingIcon
  };

  const calculator = new SatisfactoryCalculator(window.gameData);

  // Application State
  const state = {
    targetItemId: "heavy_modular_frame", // default popular advanced item
    targetRate: 2,                        // items/min
    recipeOverrides: {},                  // itemId -> recipeId
    clockOverrides: {},                   // itemId -> clockPercent (100 to 250)
    somersloopOverrides: {},              // itemId -> boolean
    logisticsSettings: {
      minerTier: "miner_mk2",
      nodePurity: "normal",
      beltTier: "belt_mk5",
      pipeTier: "pipe_mk2",
      globalClock: 100,
      minerClock: 100,
      purityPerResource: {}
    },
    activeView: "tree",                  // 'tree' or 'graph'
    currentResult: null,
    searchQuery: "",
    selectedCategory: "all"
  };

  // DOM Elements
  const itemPickerBtn = document.getElementById("item-picker-btn");
  const itemPickerModal = document.getElementById("item-picker-modal");
  const closeModalBtn = document.getElementById("close-item-modal");
  const modalItemSearch = document.getElementById("modal-item-search");
  const modalCategoryFilters = document.getElementById("modal-category-filters");
  const modalItemsGrid = document.getElementById("modal-items-grid");

  const currentItemIcon = document.getElementById("current-item-icon");
  const currentItemName = document.getElementById("current-item-name");
  const currentItemEn = document.getElementById("current-item-en");
  const targetRateInput = document.getElementById("target-rate-input");
  const ratePresets = document.querySelectorAll(".btn-rate-preset");

  const tabTreeBtn = document.getElementById("tab-tree-btn");
  const tabGraphBtn = document.getElementById("tab-graph-btn");
  const treeContainer = document.getElementById("tree-view-container");
  const graphContainer = document.getElementById("graph-view-container");

  const machinesTableBody = document.getElementById("machines-table-body");
  const rawResourcesGrid = document.getElementById("raw-resources-grid");
  const totalPowerBadge = document.getElementById("stat-total-power");
  const totalPowerPeakBadge = document.getElementById("stat-total-power-peak");
  const totalMachinesBadge = document.getElementById("stat-total-machines");
  const totalRawBadge = document.getElementById("stat-total-raw");
  const totalShardsBadge = document.getElementById("stat-total-shards");
  const totalSomersloopsBadge = document.getElementById("stat-total-somersloops");

  const settingMinerTier = document.getElementById("setting-miner-tier");
  const settingNodePurity = document.getElementById("setting-node-purity");
  const settingBeltTier = document.getElementById("setting-belt-tier");
  const settingGlobalClock = document.getElementById("setting-global-clock");
  const btnSloopTarget = document.getElementById("btn-sloop-target");
  const btnSloopAll = document.getElementById("btn-sloop-all");
  const btnSloopReset = document.getElementById("btn-sloop-reset");

  const activeOverridesCount = document.getElementById("active-overrides-count");
  const btnResetRecipes = document.getElementById("btn-reset-recipes");
  const btnCopyList = document.getElementById("btn-copy-shopping-list");
  const btnFullscreenGraph = document.getElementById("btn-fullscreen-graph");
  const factoryPresets = document.querySelectorAll(".preset-btn");

  // Initialize Views
  const handleRecipeChange = (itemId, newRecipeId) => {
    state.recipeOverrides[itemId] = newRecipeId;
    updateCalculation();
  };

  const handleClockChange = (itemId, newClock) => {
    state.clockOverrides[itemId] = newClock;
    updateCalculation();
  };

  const handleSomersloopToggle = (itemId) => {
    state.somersloopOverrides[itemId] = !state.somersloopOverrides[itemId];
    updateCalculation();
  };

  const treeView = new ProductionTreeView(treeContainer, {
    onRecipeChange: handleRecipeChange,
    onClockChange: handleClockChange,
    onSomersloopToggle: handleSomersloopToggle
  });

  const graphView = new ProductionGraphView(graphContainer, {
    onRecipeChange: handleRecipeChange,
    onClockChange: handleClockChange,
    onSomersloopToggle: handleSomersloopToggle
  });

  // Main calculation update
  const updateCalculation = () => {
    try {
      const result = calculator.calculate(state.targetItemId, state.targetRate, {
        recipeOverrides: state.recipeOverrides,
        clockOverrides: state.clockOverrides,
        somersloopOverrides: state.somersloopOverrides,
        logisticsSettings: state.logisticsSettings
      });
      state.currentResult = result;

      // Update Top Item Header Display
      const item = result.targetItem;
      if (currentItemIcon) currentItemIcon.innerHTML = window.renderItemIcon ? window.renderItemIcon(item, "game-icon game-icon-lg") : (item.emoji || "📦");
      if (currentItemName) currentItemName.textContent = item.name;
      if (currentItemEn) currentItemEn.textContent = item.nameEn ? `(${item.nameEn})` : "";

      // Update Overrides Badge
      const overrideKeys = Object.keys(state.recipeOverrides);
      if (activeOverridesCount) {
        activeOverridesCount.textContent = `${overrideKeys.length} personalizzat${overrideKeys.length === 1 ? 'a' : 'e'}`;
        activeOverridesCount.style.display = overrideKeys.length > 0 ? "inline-block" : "none";
      }

      // Render Active View
      if (state.activeView === "tree") {
        treeContainer.style.display = "block";
        graphContainer.style.display = "none";
        if (btnFullscreenGraph) btnFullscreenGraph.style.display = "none";
        treeView.render(result);
      } else {
        treeContainer.style.display = "none";
        graphContainer.style.display = "block";
        if (btnFullscreenGraph) btnFullscreenGraph.style.display = "inline-flex";
        graphView.render(result);
      }

      // Update Machinery Summary Table
      renderMachinerySummary(result.totals);

      // Update Raw Resources Summary
      renderRawResources(result.totals);

      // Update Stat Badges
      renderStats(result.totals);

    } catch (err) {
      console.error("Errore durante il calcolo:", err);
    }
  };

  // Render Machinery Summary Table
  const renderMachinerySummary = (totals) => {
    if (!machinesTableBody) return;
    machinesTableBody.innerHTML = "";

    const buildingEntries = Object.values(totals.buildings);
    if (buildingEntries.length === 0) {
      machinesTableBody.innerHTML = `<tr><td colspan="6" class="text-center py-4">Nessun macchinario richiesto (risorsa grezza).</td></tr>`;
      return;
    }

    // Sort by number of machines descending
    buildingEntries.sort((a, b) => b.countCeilAggregated - a.countCeilAggregated);

    buildingEntries.forEach(bEntry => {
      const b = bEntry.building;
      const countExact = Number(bEntry.countExact.toFixed(2));
      const countCeil = bEntry.countCeilAggregated; // ARROTONDATO PER ECCESSO
      const countDedicatedCeil = bEntry.countCeilDedicated;

      // Recipe breakdown text
      const recipesHtml = bEntry.recipes.map(r => {
        const rExact = Number(r.machineCountExact.toFixed(2));
        const rCeil = r.machineCountCeil;
        const clock = Number(r.clockSpeedPercent.toFixed(1));
        return `
          <div class="summary-recipe-item">
            <span class="sr-name">${r.recipe.isAlternate ? "⭐ " : ""}${r.recipe.nameEn || r.recipe.name}</span>
            <span class="sr-rate">(${Number(r.producedRate.toFixed(1))}/min)</span>
            <span class="sr-machines">➔ <strong>${rCeil}x</strong> <small>(${rExact} macchine a ${clock}%)</small></span>
          </div>
        `;
      }).join("");

      // Power
      const powerExact = Number(bEntry.powerExact.toFixed(1));
      const powerCeil = Number(bEntry.powerCeilAggregated.toFixed(1));

      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td class="col-building">
          <div class="building-badge-cell" style="border-left-color: ${b.color || '#fa9549'}">
            <span class="b-icon">${window.renderBuildingIcon ? window.renderBuildingIcon(b, "game-icon game-icon-md") : (b.emoji || "🏭")}</span>
            <div class="b-names">
              <span class="b-name-it">${b.name}</span>
              <span class="b-name-en">${b.nameEn || ""}</span>
            </div>
          </div>
        </td>
        <td class="col-ceiling text-center">
          <div class="ceiling-highlight" title="Arrotondato per eccesso: il totale reale di macchine fisiche da piazzare">
            <span class="ceil-num">${countCeil}x</span>
            <span class="ceil-tag">MACCHINE</span>
          </div>
        </td>
        <td class="col-exact text-center">
          <span class="exact-badge">${countExact}</span>
          ${countDedicatedCeil !== countCeil ? `<div class="sub-dedicated" title="Se costruisci linee separate per ricetta: ${countDedicatedCeil}x">${countDedicatedCeil}x (dedicate)</div>` : ""}
        </td>
        <td class="col-recipes">
          ${recipesHtml}
        </td>
        <td class="col-modifiers text-center">
          <div class="modifiers-summary-cell">
            ${bEntry.recipes.map(r => {
              const clock = r.clockSpeedPercent || 100;
              const shards = (r.powerShardsPerMachine || 0) * r.machineCountCeil;
              const sloop = r.somersloop;
              const sloopQty = (r.somersloopSlotsPerMachine || 0) * r.machineCountCeil;
              return `
                <div class="mod-summary-line">
                  <span class="mod-clock-tag ${clock > 100 ? 'is-overclocked' : ''}">${clock}%</span>
                  ${shards > 0 ? `<span class="mod-shard-badge"><img src="assets/images/items/power_shard.png" class="game-icon-xs"> ${shards}x</span>` : ''}
                  ${sloop ? `<span class="mod-sloop-badge" title="Somersloop 2x Output"><img src="assets/images/items/somersloop.png" class="game-icon-xs"> 2x (${sloopQty}x)</span>` : ''}
                </div>
              `;
            }).join("")}
          </div>
        </td>
        <td class="col-power text-right">
          <div class="power-cell">
            <span class="p-exact">⚡ ${powerExact} MW</span>
            <span class="p-ceil"><small>Picco: ${powerCeil} MW</small></span>
          </div>
        </td>
      `;
      machinesTableBody.appendChild(tr);
    });
  };

  // Render Raw Resources Grid with Logistics & Purity Selectors
  const renderRawResources = (totals) => {
    if (!rawResourcesGrid) return;
    rawResourcesGrid.innerHTML = "";

    const rawEntries = Object.values(totals.rawResources);
    if (rawEntries.length === 0) {
      rawResourcesGrid.innerHTML = `<div class="text-muted">Nessuna risorsa grezza richiesta.</div>`;
      return;
    }

    rawEntries.sort((a, b) => b.rate - a.rate);

    rawEntries.forEach(res => {
      const card = document.createElement("div");
      card.className = "raw-res-card";

      const rateFormatted = Number(res.rate.toFixed(1));
      let extractorInfo = "";
      let logisticsExtra = "";

      if (res.item.id === "water") {
        extractorInfo = `<strong>${res.extractorCountCeil}x</strong> ${res.extractorType} <small>(${Number(res.extractorCountExact.toFixed(2))})</small>`;
        logisticsExtra = `<span class="raw-pipe-info"><i class="fas fa-tint"></i> Richiede ${res.pipesNeeded}x ${res.pipeType}</span>`;
      } else if (res.item.id === "crude_oil") {
        extractorInfo = `<strong>${res.extractorCountCeil}x</strong> ${res.extractorType} <small>(${Number(res.extractorCountExact.toFixed(2))})</small>`;
        logisticsExtra = `<span class="raw-pipe-info"><i class="fas fa-tint"></i> Richiede ${res.pipesNeeded}x Condotti Mk.2</span>`;
      } else if (res.item.id === "nitrogen_gas") {
        extractorInfo = `<strong>${res.extractorCountCeil}x</strong> ${res.extractorType} <small>(${Number(res.extractorCountExact.toFixed(2))})</small>`;
      } else {
        extractorInfo = `<strong>${res.minerCountCeil}x</strong> ${res.extractorType} <small>(${Number(res.minerCountExact.toFixed(2))} esatti)</small>`;
        logisticsExtra = `
          <div class="raw-logistics-line">
            <span class="raw-belt-info"><i class="fas fa-stream"></i> ${res.beltsNeeded}x ${res.beltType}</span>
            ${res.isBeltCapped ? `
              <span class="badge-belt-warning" title="La produzione del nodo (${res.rawNodeRate}/m) è limitata dalla velocità massima del nastro (${res.beltLimit}/m)!">
                <i class="fas fa-exclamation-triangle"></i> Nastro Capped a ${res.beltLimit}/m
              </span>
            ` : ""}
          </div>
        `;
      }

      // Purity selection for solid ores and crude oil
      let puritySelectorHtml = "";
      if (res.item.id !== "water" && res.item.id !== "nitrogen_gas") {
        const currentPurity = res.purityKey || state.logisticsSettings.nodePurity || "normal";
        puritySelectorHtml = `
          <div class="raw-purity-control">
            <label class="raw-purity-label">Purezza:</label>
            <select class="raw-purity-select" data-item-id="${res.item.id}">
              <option value="impure" ${currentPurity === 'impure' ? 'selected' : ''}>Impura (0.5x)</option>
              <option value="normal" ${currentPurity === 'normal' ? 'selected' : ''}>Normale (1.0x)</option>
              <option value="pure" ${currentPurity === 'pure' ? 'selected' : ''}>Pura (2.0x)</option>
            </select>
          </div>
        `;
      }

      card.innerHTML = `
        <div class="raw-card-top">
          <span class="raw-icon">${window.renderItemIcon ? window.renderItemIcon(res.item, "game-icon game-icon-md") : (res.item.emoji || "🪨")}</span>
          <div class="raw-title-group">
            <span class="raw-name">${res.item.name}</span>
            <span class="raw-name-en">${res.item.nameEn || ""}</span>
          </div>
          <span class="raw-rate-pill">${rateFormatted} / min</span>
        </div>
        <div class="raw-card-mid">
          ${puritySelectorHtml}
        </div>
        <div class="raw-card-bottom">
          <span class="raw-extractor-label"><i class="fas fa-tools"></i> ${extractorInfo}</span>
          ${logisticsExtra}
        </div>
      `;

      const puritySel = card.querySelector(".raw-purity-select");
      if (puritySel) {
        puritySel.addEventListener("change", (e) => {
          const rawId = e.target.dataset.itemId;
          state.logisticsSettings.purityPerResource[rawId] = e.target.value;
          updateCalculation();
        });
      }

      rawResourcesGrid.appendChild(card);
    });
  };

  // Render Stats
  const renderStats = (totals) => {
    if (totalPowerBadge) totalPowerBadge.textContent = `${totals.power.totalExact} MW`;
    if (totalPowerPeakBadge) totalPowerPeakBadge.textContent = `${totals.power.totalCeilAggregated} MW`;
    if (totalMachinesBadge) totalMachinesBadge.textContent = `${totals.summary.totalAggregatedCeilMachines} (${totals.summary.totalDedicatedCeilMachines})`;
    if (totalRawBadge) {
      const rawCount = Object.keys(totals.rawResources).length;
      totalRawBadge.textContent = `${rawCount} tip${rawCount === 1 ? 'o' : 'i'}`;
    }
    if (totalShardsBadge) {
      totalShardsBadge.textContent = `${totals.summary.totalPowerShards || 0}`;
    }
    if (totalSomersloopsBadge) {
      totalSomersloopsBadge.textContent = `${totals.summary.totalSomersloops || 0}`;
    }
  };

  // View Switchers (Tree vs Graph)
  tabTreeBtn?.addEventListener("click", () => {
    state.activeView = "tree";
    tabTreeBtn.classList.add("active");
    tabGraphBtn.classList.remove("active");
    updateCalculation();
  });

  tabGraphBtn?.addEventListener("click", () => {
    state.activeView = "graph";
    tabGraphBtn.classList.add("active");
    tabTreeBtn.classList.remove("active");
    updateCalculation();
  });

  // Fullscreen Graph Button (Header View Action)
  btnFullscreenGraph?.addEventListener("click", () => {
    graphView.toggleFullscreen();
  });

  // Target Rate Input Change
  targetRateInput?.addEventListener("input", (e) => {
    const val = parseFloat(e.target.value);
    if (!isNaN(val) && val > 0) {
      state.targetRate = val;
      updateCalculation();
    }
  });

  // Target Rate Preset Buttons (+1, +5, +10, +50, -1, ecc.)
  ratePresets.forEach(btn => {
    btn.addEventListener("click", () => {
      const delta = parseFloat(btn.dataset.delta || 0);
      const setVal = parseFloat(btn.dataset.set || 0);
      if (setVal > 0) {
        state.targetRate = setVal;
      } else if (delta !== 0) {
        state.targetRate = Math.max(1, state.targetRate + delta);
      }
      if (targetRateInput) targetRateInput.value = state.targetRate;
      updateCalculation();
    });
  });

  // Reset All Recipes Button
  // Factory Options & Logistics Listeners
  settingMinerTier?.addEventListener("change", (e) => {
    state.logisticsSettings.minerTier = e.target.value;
    updateCalculation();
  });

  settingNodePurity?.addEventListener("change", (e) => {
    state.logisticsSettings.nodePurity = e.target.value;
    state.logisticsSettings.purityPerResource = {}; // reset per-resource overrides
    updateCalculation();
  });

  settingBeltTier?.addEventListener("change", (e) => {
    state.logisticsSettings.beltTier = e.target.value;
    updateCalculation();
  });

  settingGlobalClock?.addEventListener("change", (e) => {
    state.logisticsSettings.globalClock = parseFloat(e.target.value);
    state.clockOverrides = {}; // apply to all
    updateCalculation();
  });

  // Somersloop Quick Action Buttons
  btnSloopTarget?.addEventListener("click", () => {
    const curr = !!state.somersloopOverrides[state.targetItemId];
    state.somersloopOverrides[state.targetItemId] = !curr;
    btnSloopTarget.classList.toggle("active", !curr);
    updateCalculation();
  });

  btnSloopAll?.addEventListener("click", () => {
    if (!state.currentResult) return;
    const craftableItems = Object.keys(state.currentResult.totals.items).filter(id => !window.gameData.ITEMS[id]?.isRaw);
    const allActive = craftableItems.every(id => state.somersloopOverrides[id]);
    craftableItems.forEach(id => {
      state.somersloopOverrides[id] = !allActive;
    });
    btnSloopAll.classList.toggle("active", !allActive);
    updateCalculation();
  });

  btnSloopReset?.addEventListener("click", () => {
    state.somersloopOverrides = {};
    btnSloopTarget?.classList.remove("active");
    btnSloopAll?.classList.remove("active");
    updateCalculation();
  });

  btnResetRecipes?.addEventListener("click", () => {
    state.recipeOverrides = {};
    state.clockOverrides = {};
    state.somersloopOverrides = {};
    state.logisticsSettings.purityPerResource = {};
    if (settingGlobalClock) settingGlobalClock.value = "100";
    btnSloopTarget?.classList.remove("active");
    btnSloopAll?.classList.remove("active");
    updateCalculation();
  });

  // Quick Factory Presets
  factoryPresets.forEach(btn => {
    btn.addEventListener("click", () => {
      const itemId = btn.dataset.item;
      const rate = parseFloat(btn.dataset.rate || 10);
      if (itemId && window.gameData.ITEMS[itemId]) {
        state.targetItemId = itemId;
        state.targetRate = rate;
        if (targetRateInput) targetRateInput.value = rate;
        updateCalculation();
      }
    });
  });

  // Copy Shopping List to Clipboard
  btnCopyList?.addEventListener("click", () => {
    if (!state.currentResult) return;
    const { targetItem, targetRate, totals } = state.currentResult;

    let text = `=========================================\n`;
    text += `🏭 SATISFACTORY CALCOLATORE - PIANO DI PRODUZIONE\n`;
    text += `Target: ${targetItem.name} (${targetItem.nameEn}) @ ${targetRate}/min\n`;
    text += `=========================================\n\n`;

    text += `📋 MACCHINARI NECESSARI (ARROTONDATI PER ECCESSO):\n`;
    Object.values(totals.buildings).forEach(b => {
      text += ` • ${b.countCeilAggregated}x ${b.building.name} (esatto: ${b.countExact.toFixed(2)}x) - ${b.powerCeilAggregated} MW\n`;
      b.recipes.forEach(r => {
        let modInfo = [];
        if (r.clockSpeedPercent && r.clockSpeedPercent !== 100) {
          const shards = Math.min(3, Math.ceil((r.clockSpeedPercent - 100) / 50));
          modInfo.push(`OC: ${r.clockSpeedPercent}% [${shards}x 💎]`);
        }
        if (r.somersloop) {
          const slotReq = (r.building.somersloopSlots || 1) * r.machineCountCeil;
          modInfo.push(`Somersloop 2x [${slotReq}x 🔮]`);
        }
        const modStr = modInfo.length > 0 ? ` (${modInfo.join(", ")})` : "";
        text += `    - ${r.recipe.name}: ${r.machineCountCeil}x (${r.producedRate.toFixed(1)}/min)${modStr}\n`;
      });
    });

    if (totals.powerShards.total > 0 || totals.somersloops.total > 0) {
      text += `\n💎 ARTEFATTI & OVERCLOCK:\n`;
      if (totals.powerShards.total > 0) {
        text += ` • Frammenti Energetici totali: ${totals.powerShards.total}x (Fabbrica: ${totals.powerShards.productionShards}x, Trivelle: ${totals.powerShards.minerShards}x)\n`;
      }
      if (totals.somersloops.total > 0) {
        text += ` • Somersloop necessari: ${totals.somersloops.total}x (Produzione x2 applicata)\n`;
      }
    }

    text += `\n⚡ CONSUMO ENERGETICO TOTALE:\n`;
    text += ` • Reale al carico: ${totals.power.totalExact} MW\n`;
    text += ` • Picco installato: ${totals.power.totalCeilAggregated} MW\n\n`;

    text += `⛏️ RISORSE GREZZE & LOGISTICA:\n`;
    Object.values(totals.rawResources).forEach(res => {
      let extInfo = "";
      if (res.extractorType) {
        extInfo = ` -> ${res.minerCountCeil || 1}x ${res.extractorType}`;
        if (res.beltsNeeded) extInfo += ` [${res.beltsNeeded}x ${res.beltType}]`;
      }
      text += ` • ${res.item.name}: ${res.rate.toFixed(1)} / min${extInfo}\n`;
    });

    if (Object.keys(totals.byproducts).length > 0) {
      text += `\n🧪 SOTTOPRODOTTI GENERATI:\n`;
      Object.values(totals.byproducts).forEach(bp => {
        text += ` • ${bp.item.name}: ${bp.rate.toFixed(1)} / min\n`;
      });
    }

    navigator.clipboard.writeText(text).then(() => {
      const origText = btnCopyList.innerHTML;
      btnCopyList.innerHTML = `<i class="fas fa-check"></i> Copiato negli appunti!`;
      btnCopyList.classList.add("btn-success");
      setTimeout(() => {
        btnCopyList.innerHTML = origText;
        btnCopyList.classList.remove("btn-success");
      }, 2500);
    });
  });

  // ==========================================
  // Item Picker Modal Logic
  // ==========================================
  const openItemModal = () => {
    if (itemPickerModal) {
      itemPickerModal.classList.add("active");
      renderModalItems();
      if (modalItemSearch) modalItemSearch.focus();
    }
  };

  const closeItemModal = () => {
    if (itemPickerModal) itemPickerModal.classList.remove("active");
  };

  itemPickerBtn?.addEventListener("click", openItemModal);
  closeModalBtn?.addEventListener("click", closeItemModal);
  itemPickerModal?.addEventListener("click", (e) => {
    if (e.target === itemPickerModal) closeItemModal();
  });

  // Category filters inside modal
  const renderModalCategories = () => {
    if (!modalCategoryFilters) return;
    modalCategoryFilters.innerHTML = "";

    const allBtn = document.createElement("button");
    allBtn.className = `btn btn-sm ${state.selectedCategory === 'all' ? 'btn-primary' : 'btn-outline'}`;
    allBtn.textContent = "Tutti";
    allBtn.addEventListener("click", () => {
      state.selectedCategory = "all";
      renderModalCategories();
      renderModalItems();
    });
    modalCategoryFilters.appendChild(allBtn);

    const categories = Object.values(window.gameData.CATEGORIES).sort((a, b) => a.order - b.order);
    categories.forEach(cat => {
      const btn = document.createElement("button");
      btn.className = `btn btn-sm ${state.selectedCategory === cat.id ? 'btn-primary' : 'btn-outline'}`;
      btn.textContent = cat.name;
      btn.addEventListener("click", () => {
        state.selectedCategory = cat.id;
        renderModalCategories();
        renderModalItems();
      });
      modalCategoryFilters.appendChild(btn);
    });
  };

  const renderModalItems = () => {
    if (!modalItemsGrid) return;
    modalItemsGrid.innerHTML = "";

    const query = (state.searchQuery || "").toLowerCase().trim();
    const items = Object.values(window.gameData.ITEMS);

    const filtered = items.filter(it => {
      // Must have recipes to be craftable (or allow all)
      const hasRecipes = (window.gameData.RECIPES_BY_ITEM[it.id] || []).length > 0;
      if (!hasRecipes && !it.isRaw) return false;

      // Category filter
      if (state.selectedCategory !== "all" && it.category !== state.selectedCategory) {
        return false;
      }

      // Search query
      if (query) {
        const nameIt = (it.name || "").toLowerCase();
        const nameEn = (it.nameEn || "").toLowerCase();
        return nameIt.includes(query) || nameEn.includes(query) || it.id.includes(query);
      }

      return true;
    });

    filtered.forEach(it => {
      const card = document.createElement("div");
      const isSelected = it.id === state.targetItemId;
      card.className = `modal-item-card ${isSelected ? 'selected' : ''}`;
      card.dataset.itemId = it.id;

      const recipeCount = (window.gameData.RECIPES_BY_ITEM[it.id] || []).length;

      const iconHtml = window.renderItemIcon ? window.renderItemIcon(it, "game-icon game-icon-md") : (it.emoji || "📦");
      card.innerHTML = `
        <span class="m-item-icon">${iconHtml}</span>
        <div class="m-item-text">
          <span class="m-item-title">${it.name}</span>
          <span class="m-item-sub">${it.nameEn || ""}</span>
        </div>
        ${recipeCount > 1 ? `<span class="m-recipe-tag" title="${recipeCount} ricette">${recipeCount} varianti</span>` : ""}
      `;

      card.addEventListener("click", () => {
        state.targetItemId = it.id;
        closeItemModal();
        updateCalculation();
      });

      modalItemsGrid.appendChild(card);
    });
  };

  modalItemSearch?.addEventListener("input", (e) => {
    state.searchQuery = e.target.value;
    renderModalItems();
  });

  // Initial initialization
  renderModalCategories();
  updateCalculation();
});
