// Satisfactory Production Calculator Engine
// Handles recipe resolution, hierarchical tree calculation, DAG graph generation,
// machine aggregation, ceiling calculation (arrotondamento per eccesso),
// Power Shards Overclocking, Somersloop Production Doubling (1.0 Alien Tech),
// and Miner Logistics / Conveyor Belt limits.

class SatisfactoryCalculator {
  constructor(gameData) {
    this.gameData = gameData;
    this.items = gameData.ITEMS;
    this.recipes = gameData.RECIPES;
    this.recipesByItem = gameData.RECIPES_BY_ITEM;
    this.defaultRecipes = { ...gameData.DEFAULT_RECIPES };
    this.buildings = gameData.BUILDINGS;
    this.logistics = gameData.LOGISTICS || {
      MINERS: {
        miner_mk1: { id: "miner_mk1", name: "Trivella Mk.1", nameEn: "Miner Mk.1", power: 5, baseRate: 60 },
        miner_mk2: { id: "miner_mk2", name: "Trivella Mk.2", nameEn: "Miner Mk.2", power: 12, baseRate: 120 },
        miner_mk3: { id: "miner_mk3", name: "Trivella Mk.3", nameEn: "Miner Mk.3", power: 30, baseRate: 240 }
      },
      PURITIES: {
        impure: { id: "impure", name: "Impura (0.5x)", multiplier: 0.5 },
        normal: { id: "normal", name: "Normale (1.0x)", multiplier: 1.0 },
        pure: { id: "pure", name: "Pura (2.0x)", multiplier: 2.0 }
      },
      BELTS: {
        belt_mk1: { id: "belt_mk1", name: "Nastro Mk.1", rate: 60 },
        belt_mk2: { id: "belt_mk2", name: "Nastro Mk.2", rate: 120 },
        belt_mk3: { id: "belt_mk3", name: "Nastro Mk.3", rate: 270 },
        belt_mk4: { id: "belt_mk4", name: "Nastro Mk.4", rate: 480 },
        belt_mk5: { id: "belt_mk5", name: "Nastro Mk.5", rate: 780 },
        belt_mk6: { id: "belt_mk6", name: "Nastro Mk.6 (1.0)", rate: 1200 }
      },
      PIPES: {
        pipe_mk1: { id: "pipe_mk1", name: "Condotto Mk.1 (300 m³/m)", rate: 300 },
        pipe_mk2: { id: "pipe_mk2", name: "Condotto Mk.2 (600 m³/m)", rate: 600 }
      }
    };
  }

  // Get current active recipe for an item, taking overrides into account
  getActiveRecipe(itemId, overrides = {}) {
    if (overrides[itemId]) {
      const found = this.recipes.find(r => r.id === overrides[itemId]);
      if (found) return found;
    }
    const defaultRecipeId = this.defaultRecipes[itemId];
    if (defaultRecipeId) {
      const found = this.recipes.find(r => r.id === defaultRecipeId);
      if (found) return found;
    }
    const available = this.recipesByItem[itemId];
    return available && available.length > 0 ? available[0] : null;
  }

  // Calculate full production chain for a target item, output rate, and configuration options
  calculate(targetItemId, targetRate, options = {}) {
    const targetItem = this.items[targetItemId];
    if (!targetItem) {
      throw new Error(`Item ${targetItemId} non trovato.`);
    }

    // Parse options with backward-compatibility
    let recipeOverrides = {};
    let clockOverrides = {};
    let somersloopOverrides = {};
    let logisticsSettings = {
      minerTier: "miner_mk2",
      nodePurity: "normal",
      beltTier: "belt_mk5",
      pipeTier: "pipe_mk2",
      globalClock: 100,
      minerClock: 100,
      purityPerResource: {}
    };

    if (options && typeof options === "object") {
      if (options.recipeOverrides || options.clockOverrides || options.somersloopOverrides || options.logisticsSettings) {
        recipeOverrides = options.recipeOverrides || {};
        clockOverrides = options.clockOverrides || {};
        somersloopOverrides = options.somersloopOverrides || {};
        logisticsSettings = { ...logisticsSettings, ...(options.logisticsSettings || {}) };
      } else {
        // Legacy call format: options was just recipeOverrides
        recipeOverrides = options;
      }
    }

    let nodeCounter = 0;
    const visitedInChain = new Set();

    // 1. Build Hierarchical Tree
    const buildTreeNode = (itemId, requiredRate, parentId = null, depth = 0) => {
      const item = this.items[itemId];
      const isRaw = !!(item && item.isRaw);
      const nodeId = `node_${++nodeCounter}_${itemId}`;

      if (isRaw) {
        return {
          id: nodeId,
          itemId,
          item,
          isRaw: true,
          rate: requiredRate,
          depth,
          parentId,
          recipe: null,
          building: this.buildings[logisticsSettings.minerTier] || this.buildings.miner || null,
          machineCountExact: 0,
          machineCountCeil: 0,
          clockSpeedPercent: 100,
          somersloop: false,
          powerShards: 0,
          somersloops: 0,
          powerExact: 0,
          powerCeil: 0,
          children: []
        };
      }

      // Check for cycles in current branch
      if (visitedInChain.has(itemId) && depth > 10) {
        console.warn(`Possibile ciclo di ricette rilevato per ${itemId}`);
        return {
          id: nodeId,
          itemId,
          item,
          isCycle: true,
          rate: requiredRate,
          depth,
          parentId,
          children: []
        };
      }

      const recipe = this.getActiveRecipe(itemId, recipeOverrides);
      if (!recipe) {
        // Fallback treated as raw/external
        return {
          id: nodeId,
          itemId,
          item: item || { id: itemId, name: itemId, isRaw: true },
          isRaw: true,
          rate: requiredRate,
          depth,
          parentId,
          children: []
        };
      }

      // Somersloop Amplification (Alien Tech 1.0)
      // When active, output is doubled (2x) without requiring extra input materials!
      const hasSomersloop = !!(somersloopOverrides[itemId]);
      const somersloopMultiplier = hasSomersloop ? 2.0 : 1.0;
      const somersloopPowerMultiplier = hasSomersloop ? 4.0 : 1.0; // 4x power cost in 1.0

      // Clock Speed (Power Shards)
      const clockSpeedPercent = clockOverrides[itemId] !== undefined
        ? clockOverrides[itemId]
        : (logisticsSettings.globalClock || 100);
      const clockFactor = Math.max(0.01, clockSpeedPercent / 100);
      const powerShardsPerMachine = clockSpeedPercent > 100 ? Math.min(3, Math.ceil((clockSpeedPercent - 100) / 50)) : 0;

      // Primary output rate per single machine at 100% clock with Somersloop
      const primaryOutput = recipe.outputs.find(o => o.item === itemId) || recipe.outputs[0];
      const baseOutputPerMachine = primaryOutput.rate * somersloopMultiplier;
      const actualOutputPerMachine = baseOutputPerMachine * clockFactor;

      // Number of machines needed
      const machineCountExact = requiredRate / actualOutputPerMachine;
      const machineCountCeil = Math.ceil(machineCountExact);

      // Building Somersloop requirements
      const building = this.buildings[recipe.building] || {
        name: recipe.building,
        power: 15,
        color: "#fa9549",
        icon: "🏭",
        somersloopSlots: 1
      };
      const somersloopSlotsPerMachine = hasSomersloop ? (building.somersloopSlots !== undefined ? building.somersloopSlots : 1) : 0;
      const totalSomersloops = somersloopSlotsPerMachine * machineCountCeil;
      const totalPowerShards = powerShardsPerMachine * machineCountCeil;

      // Power Calculation:
      // Standard Satisfactory overclock curve: power = basePower * (clockFactor)^1.321928 * somersloopPowerMultiplier
      const powerExponent = 1.321928;
      const powerPerMachine = building.power * Math.pow(clockFactor, powerExponent) * somersloopPowerMultiplier;
      const powerExact = machineCountExact * powerPerMachine;
      const powerCeil = machineCountCeil * powerPerMachine;

      visitedInChain.add(itemId);

      // Recursively calculate inputs for this recipe:
      // Somersloop doubles OUTPUT without doubling inputs!
      // So cycles per minute needed = requiredRate / (primaryOutput.rate * somersloopMultiplier)
      const recipeCyclesPerMinute = requiredRate / (primaryOutput.rate * somersloopMultiplier);
      const children = recipe.inputs.map(input => {
        const inputRateRequired = input.rate * recipeCyclesPerMinute;
        return buildTreeNode(input.item, inputRateRequired, nodeId, depth + 1);
      });

      visitedInChain.delete(itemId);

      return {
        id: nodeId,
        itemId,
        item,
        isRaw: false,
        recipe,
        building,
        rate: requiredRate,
        depth,
        parentId,
        somersloop: hasSomersloop,
        somersloopSlotsPerMachine,
        totalSomersloops,
        clockSpeedPercent,
        clockFactor,
        powerShardsPerMachine,
        totalPowerShards,
        machineCountExact,
        machineCountCeil,
        powerExact,
        powerCeil,
        children
      };
    };

    const tree = buildTreeNode(targetItemId, targetRate, null, 0);

    // 2. Aggregate Totals across all nodes in the tree
    const totals = {
      items: Object.create(null),
      recipesUsed: Object.create(null),
      buildings: Object.create(null),
      rawResources: Object.create(null),
      byproducts: Object.create(null),
      powerShards: {
        total: 0,
        productionShards: 0,
        minerShards: 0,
        byItem: Object.create(null)
      },
      somersloops: {
        total: 0,
        byItem: Object.create(null)
      },
      power: {
        totalExact: 0,
        totalCeilDedicated: 0,
        totalCeilAggregated: 0,
        productionExact: 0,
        productionCeil: 0,
        rawExact: 0,
        rawCeil: 0
      }
    };

    // Helper to traverse and aggregate
    const traverseAggregate = (node) => {
      if (!totals.items[node.itemId]) {
        totals.items[node.itemId] = {
          item: node.item,
          totalRate: 0
        };
      }
      totals.items[node.itemId].totalRate += node.rate;

      if (node.isRaw) {
        if (!totals.rawResources[node.itemId]) {
          totals.rawResources[node.itemId] = {
            item: node.item,
            rate: 0
          };
        }
        totals.rawResources[node.itemId].rate += node.rate;
      } else if (node.recipe) {
        const rId = node.recipe.id;
        if (!totals.recipesUsed[rId]) {
          totals.recipesUsed[rId] = {
            recipe: node.recipe,
            building: node.building,
            machineCountExact: 0,
            producedRate: 0,
            powerExact: 0,
            clockSpeedPercent: node.clockSpeedPercent,
            somersloop: node.somersloop,
            powerShardsPerMachine: node.powerShardsPerMachine,
            somersloopSlotsPerMachine: node.somersloopSlotsPerMachine
          };
        }
        totals.recipesUsed[rId].machineCountExact += node.machineCountExact;
        totals.recipesUsed[rId].producedRate += node.rate;
        totals.recipesUsed[rId].powerExact += node.powerExact;

        // Check if recipe has byproducts (outputs other than primary)
        node.recipe.outputs.forEach(out => {
          if (out.item !== node.itemId) {
            const somersloopMult = node.somersloop ? 2.0 : 1.0;
            const byRate = out.rate * somersloopMult * (node.rate / (node.recipe.outputs[0].rate * somersloopMult));
            if (!totals.byproducts[out.item]) {
              totals.byproducts[out.item] = {
                item: this.items[out.item] || { id: out.item, name: out.item },
                rate: 0
              };
            }
            totals.byproducts[out.item].rate += byRate;
          }
        });

        // Track Shards and Somersloops
        if (node.totalPowerShards > 0) {
          totals.powerShards.productionShards += node.totalPowerShards;
          totals.powerShards.byItem[node.itemId] = (totals.powerShards.byItem[node.itemId] || 0) + node.totalPowerShards;
        }
        if (node.totalSomersloops > 0) {
          totals.somersloops.total += node.totalSomersloops;
          totals.somersloops.byItem[node.itemId] = (totals.somersloops.byItem[node.itemId] || 0) + node.totalSomersloops;
        }
      }

      if (node.children) {
        node.children.forEach(traverseAggregate);
      }
    };

    traverseAggregate(tree);

    // Compute ceilings and building groups
    // A) Per-recipe ceiling
    Object.keys(totals.recipesUsed).forEach(rId => {
      const recEntry = totals.recipesUsed[rId];
      recEntry.machineCountCeil = Math.ceil(recEntry.machineCountExact);
      const clockFactor = Math.max(0.01, recEntry.clockSpeedPercent / 100);
      const somersloopPowerMult = recEntry.somersloop ? 4.0 : 1.0;
      const powerPerMachine = recEntry.building.power * Math.pow(clockFactor, 1.321928) * somersloopPowerMult;
      recEntry.powerCeil = recEntry.machineCountCeil * powerPerMachine;
    });

    // B) Aggregated buildings (grouping by machine type)
    let totalDedicatedCeilMachines = 0;
    let totalProductionExactPower = 0;
    let totalProductionCeilDedicatedPower = 0;
    let totalProductionCeilAggregatedPower = 0;

    Object.values(totals.recipesUsed).forEach(recEntry => {
      const bId = recEntry.building.id;
      if (!totals.buildings[bId]) {
        totals.buildings[bId] = {
          building: recEntry.building,
          countExact: 0,
          countCeilDedicated: 0,
          countCeilAggregated: 0,
          powerExact: 0,
          powerCeilDedicated: 0,
          powerCeilAggregated: 0,
          recipes: []
        };
      }
      totals.buildings[bId].countExact += recEntry.machineCountExact;
      totals.buildings[bId].countCeilDedicated += recEntry.machineCountCeil;
      totals.buildings[bId].powerExact += recEntry.powerExact;
      totals.buildings[bId].powerCeilDedicated += recEntry.powerCeil;
      totals.buildings[bId].recipes.push(recEntry);
      totalDedicatedCeilMachines += recEntry.machineCountCeil;
    });

    // Finalize building aggregated ceiling and production power
    let totalAggregatedCeilMachines = 0;
    Object.keys(totals.buildings).forEach(bId => {
      const b = totals.buildings[bId];
      b.countCeilAggregated = Math.ceil(b.countExact);
      // Average power per machine for aggregated
      const avgPowerPerMachine = b.countExact > 0 ? b.powerExact / b.countExact : b.building.power;
      b.powerCeilAggregated = b.countCeilAggregated * avgPowerPerMachine;

      totalAggregatedCeilMachines += b.countCeilAggregated;
      totalProductionExactPower += b.powerExact;
      totalProductionCeilDedicatedPower += b.powerCeilDedicated;
      totalProductionCeilAggregatedPower += b.powerCeilAggregated;
    });

    // 3. Process Raw Resources & Logistics
    const minerTierKey = logisticsSettings.minerTier || "miner_mk2";
    const defaultPurityKey = logisticsSettings.nodePurity || "normal";
    const beltTierKey = logisticsSettings.beltTier || "belt_mk5";
    const minerClock = logisticsSettings.minerClock || 100;
    const minerClockFactor = Math.max(0.01, minerClock / 100);
    const minerShardsPerMachine = minerClock > 100 ? Math.min(3, Math.ceil((minerClock - 100) / 50)) : 0;

    const minerDefs = {
      miner_mk1: { id: "miner_mk1", name: "Trivella Mk.1", nameEn: "Miner Mk.1", power: 5, baseRate: 60 },
      miner_mk2: { id: "miner_mk2", name: "Trivella Mk.2", nameEn: "Miner Mk.2", power: 12, baseRate: 120 },
      miner_mk3: { id: "miner_mk3", name: "Trivella Mk.3", nameEn: "Miner Mk.3", power: 30, baseRate: 240 }
    };
    const minerDef = minerDefs[minerTierKey] || minerDefs.miner_mk2;

    const purities = {
      impure: { id: "impure", name: "Impura", mult: 0.5 },
      normal: { id: "normal", name: "Normale", mult: 1.0 },
      pure: { id: "pure", name: "Pura", mult: 2.0 }
    };

    const beltLimits = {
      belt_mk1: 60,
      belt_mk2: 120,
      belt_mk3: 270,
      belt_mk4: 480,
      belt_mk5: 780,
      belt_mk6: 1200
    };
    const beltLimit = beltLimits[beltTierKey] || 780;

    let totalRawExactPower = 0;
    let totalRawCeilPower = 0;
    let totalRawShards = 0;
    let totalMinersCeil = 0;
    let totalExtractorsCeil = 0;

    Object.keys(totals.rawResources).forEach(itemId => {
      const res = totals.rawResources[itemId];
      const purityKey = (logisticsSettings.purityPerResource && logisticsSettings.purityPerResource[itemId]) || defaultPurityKey;
      const purity = purities[purityKey] || purities.normal;

      if (itemId === "water") {
        const pipeLimit = logisticsSettings.pipeTier === "pipe_mk1" ? 300 : 600;
        res.extractorCountExact = res.rate / 120;
        res.extractorCountCeil = Math.ceil(res.extractorCountExact);
        res.extractorType = "Estrattore d'Acqua (120 m³/min)";
        res.powerExact = res.extractorCountExact * 20;
        res.powerCeil = res.extractorCountCeil * 20;
        res.pipesNeeded = Math.ceil(res.rate / pipeLimit);
        res.pipeType = logisticsSettings.pipeTier === "pipe_mk1" ? "Condotto Mk.1 (300 m³/min)" : "Condotto Mk.2 (600 m³/min)";
        totalExtractorsCeil += res.extractorCountCeil;
      } else if (itemId === "crude_oil") {
        const oilRatePerNode = 120 * purity.mult;
        res.extractorCountExact = res.rate / oilRatePerNode;
        res.extractorCountCeil = Math.ceil(res.extractorCountExact);
        res.purityName = purity.name;
        res.purityKey = purityKey;
        res.extractorType = `Estrattore Petrolifero (Nodo ${purity.name}: ${oilRatePerNode} m³/min)`;
        res.powerExact = res.extractorCountExact * 40;
        res.powerCeil = res.extractorCountCeil * 40;
        res.pipesNeeded = Math.ceil(res.rate / 600);
        res.pipeType = "Condotto Mk.2 (600 m³/min)";
        totalExtractorsCeil += res.extractorCountCeil;
      } else if (itemId === "nitrogen_gas") {
        res.extractorCountExact = res.rate / 120;
        res.extractorCountCeil = Math.ceil(res.extractorCountExact);
        res.extractorType = "Pressurizzatore Risorsa (120 m³/min)";
        res.powerExact = res.extractorCountExact * 150;
        res.powerCeil = res.extractorCountCeil * 150;
        res.pipesNeeded = Math.ceil(res.rate / 600);
        res.pipeType = "Condotto Gas Mk.2";
        totalExtractorsCeil += res.extractorCountCeil;
      } else {
        // Solid ores with Belt Cap and Overclocking
        const rawNodeRate = minerDef.baseRate * purity.mult * minerClockFactor;
        const effectiveMinerRate = Math.min(beltLimit, rawNodeRate);
        const isBeltCapped = rawNodeRate > beltLimit;

        res.minerTierName = minerDef.name;
        res.minerTierKey = minerTierKey;
        res.purityName = purity.name;
        res.purityKey = purityKey;
        res.rawNodeRate = rawNodeRate;
        res.nodeRate = effectiveMinerRate;
        res.isBeltCapped = isBeltCapped;
        res.beltLimit = beltLimit;
        res.minerClock = minerClock;

        res.minerCountExact = res.rate / effectiveMinerRate;
        res.minerCountCeil = Math.ceil(res.minerCountExact);
        res.extractorType = `${minerDef.name} (Nodo ${purity.name}: ${effectiveMinerRate}/min)`;

        const minerPowerPerUnit = minerDef.power * Math.pow(minerClockFactor, 1.321928);
        res.powerExact = res.minerCountExact * minerPowerPerUnit;
        res.powerCeil = res.minerCountCeil * minerPowerPerUnit;

        res.beltsNeeded = Math.ceil(res.rate / beltLimit);
        res.beltType = (logisticsSettings.beltTier || "belt_mk5").replace("belt_", "Nastro ").toUpperCase() + ` (${beltLimit}/min)`;

        res.powerShards = minerShardsPerMachine * res.minerCountCeil;
        totalRawShards += res.powerShards;
        totalMinersCeil += res.minerCountCeil;
      }

      totalRawExactPower += res.powerExact;
      totalRawCeilPower += res.powerCeil;
    });

    totals.powerShards.minerShards = totalRawShards;
    totals.powerShards.total = totals.powerShards.productionShards + totalRawShards;

    totals.power = {
      totalExact: Math.round((totalProductionExactPower + totalRawExactPower) * 10) / 10,
      totalCeilDedicated: Math.round((totalProductionCeilDedicatedPower + totalRawCeilPower) * 10) / 10,
      totalCeilAggregated: Math.round((totalProductionCeilAggregatedPower + totalRawCeilPower) * 10) / 10,
      productionExact: Math.round(totalProductionExactPower * 10) / 10,
      productionCeil: Math.round(totalProductionCeilAggregatedPower * 10) / 10,
      rawExact: Math.round(totalRawExactPower * 10) / 10,
      rawCeil: Math.round(totalRawCeilPower * 10) / 10
    };

    totals.logistics = {
      minerTierKey,
      minerTierName: minerDef.name,
      nodePurityKey: defaultPurityKey,
      beltTierKey,
      beltLimit,
      pipeTierKey: logisticsSettings.pipeTier || "pipe_mk2",
      minerClock,
      totalMinersCeil,
      totalExtractorsCeil
    };

    totals.summary = {
      totalExactMachines: Object.values(totals.recipesUsed).reduce((acc, r) => acc + r.machineCountExact, 0),
      totalDedicatedCeilMachines,
      totalAggregatedCeilMachines,
      totalMinersCeil,
      totalExtractorsCeil,
      totalPowerShards: totals.powerShards.total,
      totalSomersloops: totals.somersloops.total
    };

    // 4. Build Graph (DAG) for visual flow diagram
    const graph = this.buildDAG(tree);

    return {
      targetItem,
      targetRate,
      recipeOverrides,
      clockOverrides,
      somersloopOverrides,
      logisticsSettings,
      tree,
      totals,
      graph
    };
  }

  // Generate DAG from tree structure
  buildDAG(tree) {
    const nodes = [];
    const links = [];
    const nodeMap = new Map();

    const processTreeNode = (node) => {
      const key = node.id;
      const isTarget = node.depth === 0;

      const dagNode = {
        id: key,
        itemId: node.itemId,
        item: node.item,
        rate: node.rate,
        isRaw: node.isRaw,
        isTarget,
        recipe: node.recipe,
        building: node.building,
        somersloop: node.somersloop || false,
        somersloopSlotsPerMachine: node.somersloopSlotsPerMachine || 0,
        totalSomersloops: node.totalSomersloops || 0,
        clockSpeedPercent: node.clockSpeedPercent || 100,
        clockFactor: node.clockFactor || 1.0,
        powerShardsPerMachine: node.powerShardsPerMachine || 0,
        totalPowerShards: node.totalPowerShards || 0,
        machineCountExact: node.machineCountExact,
        machineCountCeil: node.machineCountCeil,
        powerExact: node.powerExact || 0,
        powerCeil: node.powerCeil || 0,
        depth: node.depth,
        childrenCount: node.children ? node.children.length : 0
      };

      nodeMap.set(key, dagNode);
      nodes.push(dagNode);

      if (node.children && node.children.length > 0) {
        node.children.forEach(child => {
          const childDagNode = processTreeNode(child);
          links.push({
            id: `link_${childDagNode.id}_to_${dagNode.id}`,
            source: childDagNode.id,
            target: dagNode.id,
            sourceItemId: childDagNode.itemId,
            targetItemId: dagNode.itemId,
            rate: childDagNode.rate
          });
        });
      }

      return dagNode;
    };

    processTreeNode(tree);

    return { nodes, links };
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { SatisfactoryCalculator };
}
