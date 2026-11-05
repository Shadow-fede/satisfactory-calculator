// Satisfactory Game Database - Items, Recipes (Standard & Alternates), Buildings
// Verified & Updated for Satisfactory 1.0 / 1.2.3.1
// Includes official 256px game icon URLs from Satisfactory Tools assets CDN

const ASSET_BASE_ITEMS = "assets/images/items";
const ASSET_BASE_BUILDINGS = "assets/images/buildings";

const BUILDINGS = {
  smelter: {
    id: "smelter",
    slug: "smelter",
    name: "Fonderia",
    nameEn: "Smelter",
    power: 4, // MW
    color: "#ff6d00",
    iconUrl: `${ASSET_BASE_BUILDINGS}/smelter.png`,
    remoteIconUrl: "https://static.satisfactory-calculator.com/img/gameStable1.0/IconDesc_SmelterMk1_256.png",
    emoji: "🔥",
    somersloopSlots: 1,
  },
  foundry: {
    id: "foundry",
    slug: "foundry",
    name: "Fonderia Avanzata",
    nameEn: "Foundry",
    power: 16,
    color: "#e65100",
    iconUrl: `${ASSET_BASE_BUILDINGS}/foundry.png`,
    remoteIconUrl: "https://static.satisfactory-calculator.com/img/gameStable1.0/IconDesc_Foundry_256.png",
    emoji: "🏭",
    somersloopSlots: 2,
  },
  constructor: {
    id: "constructor",
    slug: "constructor",
    name: "Costruttore",
    nameEn: "Constructor",
    power: 4,
    color: "#00b0ff",
    iconUrl: `${ASSET_BASE_BUILDINGS}/constructor.png`,
    remoteIconUrl: "https://static.satisfactory-calculator.com/img/gameStable1.0/IconDesc_ConstructorMk1_256.png",
    emoji: "⚙️",
    somersloopSlots: 1,
  },
  assembler: {
    id: "assembler",
    slug: "assembler",
    name: "Assemblatore",
    nameEn: "Assembler",
    power: 15,
    color: "#fa9549",
    iconUrl: `${ASSET_BASE_BUILDINGS}/assembler.png`,
    remoteIconUrl: "https://static.satisfactory-calculator.com/img/gameStable1.0/IconDesc_AssemblerMk1_256.png",
    emoji: "🔧",
    somersloopSlots: 2,
  },
  manufacturer: {
    id: "manufacturer",
    slug: "manufacturer",
    name: "Produttore",
    nameEn: "Manufacturer",
    power: 55,
    color: "#d500f9",
    iconUrl: `${ASSET_BASE_BUILDINGS}/manufacturer.png`,
    remoteIconUrl: "https://static.satisfactory-calculator.com/img/gameStable1.0/IconDesc_Manufacturer_256.png",
    emoji: "🦾",
    somersloopSlots: 4,
  },
  refinery: {
    id: "refinery",
    slug: "refinery",
    name: "Raffineria",
    nameEn: "Refinery",
    power: 30,
    color: "#00e676",
    iconUrl: `${ASSET_BASE_BUILDINGS}/refinery.png`,
    remoteIconUrl: "https://static.satisfactory-calculator.com/img/gameStable1.0/IconDesc_OilRefinery_256.png",
    emoji: "🧪",
    somersloopSlots: 2,
  },
  blender: {
    id: "blender",
    slug: "blender",
    name: "Miscelatore",
    nameEn: "Blender",
    power: 75,
    color: "#00bfa5",
    iconUrl: `${ASSET_BASE_BUILDINGS}/blender.png`,
    remoteIconUrl: "https://static.satisfactory-calculator.com/img/gameStable1.0/IconDesc_Blender_256.png",
    emoji: "🌀",
    somersloopSlots: 4,
  },
  particle_accelerator: {
    id: "particle_accelerator",
    slug: "particle-accelerator",
    name: "Acceleratore di Particelle",
    nameEn: "Particle Accelerator",
    power: 500, // media (500 - 1500 MW)
    color: "#7c4dff",
    iconUrl: `${ASSET_BASE_BUILDINGS}/particle_accelerator.png`,
    remoteIconUrl: "https://static.satisfactory-calculator.com/img/gameStable1.0/IconDesc_HadronCollider_256.png",
    emoji: "⚛️",
    somersloopSlots: 4,
  },
  packager: {
    id: "packager",
    slug: "packager",
    name: "Confezionatrice",
    nameEn: "Packager",
    power: 10,
    color: "#78909c",
    iconUrl: `${ASSET_BASE_BUILDINGS}/packager.png`,
    remoteIconUrl: "https://static.satisfactory-calculator.com/img/gameStable1.0/IconDesc_Packager_256.png",
    emoji: "📦",
    somersloopSlots: 1,
  },
  water_extractor: {
    id: "water_extractor",
    slug: "water-extractor",
    name: "Estrattore d'Acqua",
    nameEn: "Water Extractor",
    power: 20,
    color: "#29b6f6",
    iconUrl: `${ASSET_BASE_BUILDINGS}/water_extractor.png`,
    remoteIconUrl: "https://static.satisfactory-calculator.com/img/gameStable1.0/Waterpump_256.png",
    emoji: "💧",
    somersloopSlots: 0,
  },
  oil_extractor: {
    id: "oil_extractor",
    slug: "oil-extractor",
    name: "Estrattore Petrolifero",
    nameEn: "Oil Extractor",
    power: 40,
    color: "#37474f",
    iconUrl: `${ASSET_BASE_BUILDINGS}/oil_extractor.png`,
    remoteIconUrl: "https://static.satisfactory-calculator.com/img/gameStable1.0/OilPump_256.png",
    emoji: "🛢️",
    somersloopSlots: 0,
  },
  
  miner_mk1: {
    id: "miner_mk1",
    slug: "miner-mk1",
    name: "Trivella Mk.1",
    nameEn: "Miner Mk.1",
    power: 5,
    baseRate: 60,
    color: "#8d6e63",
    iconUrl: `${ASSET_BASE_BUILDINGS}/miner.png`,
    remoteIconUrl: "https://static.satisfactory-calculator.com/img/gameStable1.0/IconDesc_MinerMk2_256.png",
    emoji: "⛏️",
    somersloopSlots: 0
  },
  miner_mk2: {
    id: "miner_mk2",
    slug: "miner-mk2",
    name: "Trivella Mk.2",
    nameEn: "Miner Mk.2",
    power: 12,
    baseRate: 120,
    color: "#8d6e63",
    iconUrl: `${ASSET_BASE_BUILDINGS}/miner.png`,
    remoteIconUrl: "https://static.satisfactory-calculator.com/img/gameStable1.0/IconDesc_MinerMk2_256.png",
    emoji: "⛏️",
    somersloopSlots: 0
  },
  miner_mk3: {
    id: "miner_mk3",
    slug: "miner-mk3",
    name: "Trivella Mk.3",
    nameEn: "Miner Mk.3",
    power: 30,
    baseRate: 240,
    color: "#8d6e63",
    iconUrl: `${ASSET_BASE_BUILDINGS}/miner.png`,
    remoteIconUrl: "https://static.satisfactory-calculator.com/img/gameStable1.0/IconDesc_MinerMk2_256.png",
    emoji: "⛏️",
    somersloopSlots: 0
  },
  miner: {
    id: "miner",
    slug: "miner-mk2",
    name: "Trivella (Miner Mk.2)",
    nameEn: "Miner Mk.2",
    power: 12,
    color: "#8d6e63",
    iconUrl: `${ASSET_BASE_BUILDINGS}/miner.png`,
    remoteIconUrl: "https://static.satisfactory-calculator.com/img/gameStable1.0/IconDesc_MinerMk2_256.png",
    emoji: "⛏️",
    somersloopSlots: 0,
  }
};


// Logistics & Mining Tiers Configuration for Satisfactory 1.0
const LOGISTICS = {
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

const CATEGORIES = {
  RAW: { id: "raw", name: "Risorse Grezze", nameEn: "Raw Resources", order: 1 },
  INGOT: { id: "ingot", name: "Lingotti", nameEn: "Ingots", order: 2 },
  BASIC: { id: "basic", name: "Componenti Base", nameEn: "Basic Components", order: 3 },
  STEEL: { id: "steel", name: "Acciaio e Derivati", nameEn: "Steel Products", order: 4 },
  ELECTRONICS: { id: "electronics", name: "Elettronica", nameEn: "Electronics", order: 5 },
  PETROCHEMICAL: { id: "petro", name: "Petrolchimici", nameEn: "Petrochemicals", order: 6 },
  ADVANCED: { id: "advanced", name: "Componenti Avanzati", nameEn: "Advanced Components", order: 7 },
  SPACE_ELEVATOR: { id: "space", name: "Ascensore Spaziale", nameEn: "Space Elevator", order: 8 }
};

// Item definitions with official 256px icon URLs and fallback emojis
const ITEMS = {
  // Raw Resources
  iron_ore: { id: "iron_ore", slug: "iron-ore", name: "Minerale di Ferro", nameEn: "Iron Ore", category: "raw", isRaw: true, iconUrl: `${ASSET_BASE_ITEMS}/iron_ore.png`,
    remoteIconUrl: "https://static.satisfactory-calculator.com/img/gameStable1.0/IconDesc_iron_new_256.png", emoji: "🪨" },
  copper_ore: { id: "copper_ore", slug: "copper-ore", name: "Minerale di Rame", nameEn: "Copper Ore", category: "raw", isRaw: true, iconUrl: `${ASSET_BASE_ITEMS}/copper_ore.png`,
    remoteIconUrl: "https://static.satisfactory-calculator.com/img/gameStable1.0/IconDesc_copper_new_256.png", emoji: "🪨" },
  limestone: { id: "limestone", slug: "limestone", name: "Calcare", nameEn: "Limestone", category: "raw", isRaw: true, iconUrl: `${ASSET_BASE_ITEMS}/limestone.png`,
    remoteIconUrl: "https://static.satisfactory-calculator.com/img/gameStable1.0/Stone_256.png", emoji: "🪨" },
  coal: { id: "coal", slug: "coal", name: "Carbone", nameEn: "Coal", category: "raw", isRaw: true, iconUrl: `${ASSET_BASE_ITEMS}/coal.png`,
    remoteIconUrl: "https://static.satisfactory-calculator.com/img/gameStable1.0/IconDesc_CoalOre_256.png", emoji: "⬛" },
  caterium_ore: { id: "caterium_ore", slug: "caterium-ore", name: "Minerale di Caterium", nameEn: "Caterium Ore", category: "raw", isRaw: true, iconUrl: `${ASSET_BASE_ITEMS}/caterium_ore.png`,
    remoteIconUrl: "https://static.satisfactory-calculator.com/img/gameStable1.0/IconDesc_CateriumOre_256.png", emoji: "🪙" },
  raw_quartz: { id: "raw_quartz", slug: "raw-quartz", name: "Quarzo Grezzo", nameEn: "Raw Quartz", category: "raw", isRaw: true, iconUrl: `${ASSET_BASE_ITEMS}/raw_quartz.png`,
    remoteIconUrl: "https://static.satisfactory-calculator.com/img/gameStable1.0/IconDesc_QuartzCrystal_256.png", emoji: "💎" },
  sulfur: { id: "sulfur", slug: "sulfur", name: "Zolfo", nameEn: "Sulfur", category: "raw", isRaw: true, iconUrl: `${ASSET_BASE_ITEMS}/sulfur.png`,
    remoteIconUrl: "https://static.satisfactory-calculator.com/img/gameStable1.0/Sulfur_256.png", emoji: "🟡" },
  bauxite: { id: "bauxite", slug: "bauxite", name: "Bauxite", nameEn: "Bauxite", category: "raw", isRaw: true, iconUrl: `${ASSET_BASE_ITEMS}/bauxite.png`,
    remoteIconUrl: "https://static.satisfactory-calculator.com/img/gameStable1.0/IconDesc_Bauxite_256.png", emoji: "🧱" },
  crude_oil: { id: "crude_oil", slug: "crude-oil", name: "Petrolio Greggio", nameEn: "Crude Oil", category: "raw", isRaw: true, iconUrl: `${ASSET_BASE_ITEMS}/crude_oil.png`,
    remoteIconUrl: "https://static.satisfactory-calculator.com/img/gameStable1.0/LiquidOil_Pipe_256.png", emoji: "🛢️" },
  water: { id: "water", slug: "water", name: "Acqua", nameEn: "Water", category: "raw", isRaw: true, iconUrl: `${ASSET_BASE_ITEMS}/water.png`,
    remoteIconUrl: "https://static.satisfactory-calculator.com/img/gameStable1.0/LiquidWater_Pipe_256.png", emoji: "💧" },
  nitrogen_gas: { id: "nitrogen_gas", slug: "nitrogen-gas", name: "Gas Azoto", nameEn: "Nitrogen Gas", category: "raw", isRaw: true, iconUrl: `${ASSET_BASE_ITEMS}/nitrogen_gas.png`,
    remoteIconUrl: "https://static.satisfactory-calculator.com/img/gameStable1.2/IconDesc_NitrogenGas_256.png", emoji: "💨" },
  sam: { id: "sam", slug: "sam", name: "Minerale SAM", nameEn: "SAM Ore", category: "raw", isRaw: true, iconUrl: `${ASSET_BASE_ITEMS}/sam.png`,
    remoteIconUrl: "https://static.satisfactory-calculator.com/img/gameStable1.0/IconDesc_SameOre_256.png", emoji: "🟣" },

  // Ingots
  iron_ingot: { id: "iron_ingot", slug: "iron-ingot", name: "Lingotto di Ferro", nameEn: "Iron Ingot", category: "ingot", iconUrl: `${ASSET_BASE_ITEMS}/iron_ingot.png`,
    remoteIconUrl: "https://static.satisfactory-calculator.com/img/gameStable1.0/IconDesc_IronIngot_256.png", emoji: "🪙" },
  copper_ingot: { id: "copper_ingot", slug: "copper-ingot", name: "Lingotto di Rame", nameEn: "Copper Ingot", category: "ingot", iconUrl: `${ASSET_BASE_ITEMS}/copper_ingot.png`,
    remoteIconUrl: "https://static.satisfactory-calculator.com/img/gameStable1.0/IconDesc_CopperIngot_256.png", emoji: "🟤" },
  caterium_ingot: { id: "caterium_ingot", slug: "caterium-ingot", name: "Lingotto di Caterium", nameEn: "Caterium Ingot", category: "ingot", iconUrl: `${ASSET_BASE_ITEMS}/caterium_ingot.png`,
    remoteIconUrl: "https://static.satisfactory-calculator.com/img/gameStable1.0/IconDesc_CateriumIngot_256.png", emoji: "🟡" },
  steel_ingot: { id: "steel_ingot", slug: "steel-ingot", name: "Lingotto d'Acciaio", nameEn: "Steel Ingot", category: "ingot", iconUrl: `${ASSET_BASE_ITEMS}/steel_ingot.png`,
    remoteIconUrl: "https://static.satisfactory-calculator.com/img/gameStable1.0/IconDesc_SteelIngot_256.png", emoji: "🩶" },
  aluminum_ingot: { id: "aluminum_ingot", slug: "aluminum-ingot", name: "Lingotto d'Alluminio", nameEn: "Aluminum Ingot", category: "ingot", iconUrl: `${ASSET_BASE_ITEMS}/aluminum_ingot.png`,
    remoteIconUrl: "https://static.satisfactory-calculator.com/img/gameStable1.0/IconDesc_AluminiumIngot_256.png", emoji: "⚪" },

  // Basic Components
  iron_plate: { id: "iron_plate", slug: "iron-plate", name: "Piastra di Ferro", nameEn: "Iron Plate", category: "basic", iconUrl: `${ASSET_BASE_ITEMS}/iron_plate.png`,
    remoteIconUrl: "https://static.satisfactory-calculator.com/img/gameStable1.0/IconDesc_IronPlates_256.png", emoji: "⏹️" },
  iron_rod: { id: "iron_rod", slug: "iron-rod", name: "Tondino di Ferro", nameEn: "Iron Rod", category: "basic", iconUrl: `${ASSET_BASE_ITEMS}/iron_rod.png`,
    remoteIconUrl: "https://static.satisfactory-calculator.com/img/gameStable1.0/IconDesc_IronRods_256.png", emoji: "🥢" },
  wire: { id: "wire", slug: "wire", name: "Filo di Rame", nameEn: "Wire", category: "basic", iconUrl: `${ASSET_BASE_ITEMS}/wire.png`,
    remoteIconUrl: "https://static.satisfactory-calculator.com/img/gameStable1.0/IconDesc_Wire_256.png", emoji: "➰" },
  cable: { id: "cable", slug: "cable", name: "Cavo", nameEn: "Cable", category: "basic", iconUrl: `${ASSET_BASE_ITEMS}/cable.png`,
    remoteIconUrl: "https://static.satisfactory-calculator.com/img/gameStable1.0/IconDesc_Cables_256.png", emoji: "🔌" },
  screw: { id: "screw", slug: "screw", name: "Vite", nameEn: "Screw", category: "basic", iconUrl: `${ASSET_BASE_ITEMS}/screw.png`,
    remoteIconUrl: "https://static.satisfactory-calculator.com/img/gameStable1.0/IconDesc_IronScrews_256.png", emoji: "🔩" },
  concrete: { id: "concrete", slug: "concrete", name: "Cemento", nameEn: "Concrete", category: "basic", iconUrl: `${ASSET_BASE_ITEMS}/concrete.png`,
    remoteIconUrl: "https://static.satisfactory-calculator.com/img/gameStable1.0/IconDesc_Concrete_256.png", emoji: "🧱" },
  copper_sheet: { id: "copper_sheet", slug: "copper-sheet", name: "Lamiera di Rame", nameEn: "Copper Sheet", category: "basic", iconUrl: `${ASSET_BASE_ITEMS}/copper_sheet.png`,
    remoteIconUrl: "https://static.satisfactory-calculator.com/img/gameStable1.0/IconDesc_CopperSheet_256.png", emoji: "🟧" },
  quickwire: { id: "quickwire", slug: "quickwire", name: "Superfilo (Quickwire)", nameEn: "Quickwire", category: "electronics", iconUrl: `${ASSET_BASE_ITEMS}/quickwire.png`,
    remoteIconUrl: "https://static.satisfactory-calculator.com/img/gameStable1.0/IconDesc_Quickwire_256.png", emoji: "⚡" },
  silica: { id: "silica", slug: "silica", name: "Silice", nameEn: "Silica", category: "basic", iconUrl: `${ASSET_BASE_ITEMS}/silica.png`,
    remoteIconUrl: "https://static.satisfactory-calculator.com/img/gameStable1.0/IconDesc_Silica_256.png", emoji: "⏳" },
  quartz_crystal: { id: "quartz_crystal", slug: "quartz-crystal", name: "Cristallo di Quarzo", nameEn: "Quartz Crystal", category: "basic", iconUrl: `${ASSET_BASE_ITEMS}/quartz_crystal.png`,
    remoteIconUrl: "https://static.satisfactory-calculator.com/img/gameStable1.0/IconDesc_QuartzResource_256.png", emoji: "🔷" },

  // Steel Products
  steel_beam: { id: "steel_beam", slug: "steel-beam", name: "Trave d'Acciaio", nameEn: "Steel Beam", category: "steel", iconUrl: `${ASSET_BASE_ITEMS}/steel_beam.png`,
    remoteIconUrl: "https://static.satisfactory-calculator.com/img/gameStable1.0/IconDesc_SteelBeam_256.png", emoji: "🔲" },
  steel_pipe: { id: "steel_pipe", slug: "steel-pipe", name: "Tubo d'Acciaio", nameEn: "Steel Pipe", category: "steel", iconUrl: `${ASSET_BASE_ITEMS}/steel_pipe.png`,
    remoteIconUrl: "https://static.satisfactory-calculator.com/img/gameStable1.0/IconDesc_SteelPipe_256.png", emoji: "🚰" },
  encased_industrial_beam: { id: "encased_industrial_beam", slug: "encased-industrial-beam", name: "Trave Industriale Rivestita", nameEn: "Encased Industrial Beam", category: "steel", iconUrl: `${ASSET_BASE_ITEMS}/encased_industrial_beam.png`,
    remoteIconUrl: "https://static.satisfactory-calculator.com/img/gameStable1.0/IconDesc_EncasedSteelBeam_256.png", emoji: "🧱" },

  // Intermediates & Mechanics
  reinforced_iron_plate: { id: "reinforced_iron_plate", slug: "reinforced-iron-plate", name: "Piastra Rinforzata", nameEn: "Reinforced Iron Plate", category: "basic", iconUrl: `${ASSET_BASE_ITEMS}/reinforced_iron_plate.png`,
    remoteIconUrl: "https://static.satisfactory-calculator.com/img/gameStable1.0/IconDesc_ReinforcedIronPlates_256.png", emoji: "🛡️" },
  modular_frame: { id: "modular_frame", slug: "modular-frame", name: "Telaio Modulare", nameEn: "Modular Frame", category: "basic", iconUrl: `${ASSET_BASE_ITEMS}/modular_frame.png`,
    remoteIconUrl: "https://static.satisfactory-calculator.com/img/gameStable1.0/IconDesc_ModularFrame_256.png", emoji: "📦" },
  heavy_modular_frame: { id: "heavy_modular_frame", slug: "heavy-modular-frame", name: "Telaio Modulare Pesante", nameEn: "Heavy Modular Frame", category: "advanced", iconUrl: `${ASSET_BASE_ITEMS}/heavy_modular_frame.png`,
    remoteIconUrl: "https://static.satisfactory-calculator.com/img/gameStable1.0/IconDesc_ModularFrameHeavy_256.png", emoji: "🗄️" },
  fused_modular_frame: { id: "fused_modular_frame", slug: "fused-modular-frame", name: "Telaio Modulare Fuso", nameEn: "Fused Modular Frame", category: "advanced", iconUrl: `${ASSET_BASE_ITEMS}/fused_modular_frame.png`,
    remoteIconUrl: "https://static.satisfactory-calculator.com/img/gameStable1.0/IconDesc_FusedModularFrame_256.png", emoji: "🧊" },
  rotor: { id: "rotor", slug: "rotor", name: "Rotore", nameEn: "Rotor", category: "basic", iconUrl: `${ASSET_BASE_ITEMS}/rotor.png`,
    remoteIconUrl: "https://static.satisfactory-calculator.com/img/gameStable1.0/IconDesc_Rotor_256.png", emoji: "🌀" },
  stator: { id: "stator", slug: "stator", name: "Statore", nameEn: "Stator", category: "basic", iconUrl: `${ASSET_BASE_ITEMS}/stator.png`,
    remoteIconUrl: "https://static.satisfactory-calculator.com/img/gameStable1.0/IconDesc_Stator_256.png", emoji: "🧲" },
  motor: { id: "motor", slug: "motor", name: "Motore", nameEn: "Motor", category: "basic", iconUrl: `${ASSET_BASE_ITEMS}/motor.png`,
    remoteIconUrl: "https://static.satisfactory-calculator.com/img/gameStable1.0/IconDesc_Engine_256.png", emoji: "⚙️" },
  turbo_motor: { id: "turbo_motor", slug: "turbo-motor", name: "Turbo Motore", nameEn: "Turbo Motor", category: "advanced", iconUrl: `${ASSET_BASE_ITEMS}/turbo_motor.png`,
    remoteIconUrl: "https://static.satisfactory-calculator.com/img/gameStable1.0/IconDesc_TurboMotor_256.png", emoji: "🚀" },

  // Electronics
  circuit_board: { id: "circuit_board", slug: "circuit-board", name: "Circuito Stampato", nameEn: "Circuit Board", category: "electronics", iconUrl: `${ASSET_BASE_ITEMS}/circuit_board.png`,
    remoteIconUrl: "https://static.satisfactory-calculator.com/img/gameStable1.0/IconDesc_CircuitBoard_256.png", emoji: "🟩" },
  ai_limiter: { id: "ai_limiter", slug: "ai-limiter", name: "Limitatore IA", nameEn: "AI Limiter", category: "electronics", iconUrl: `${ASSET_BASE_ITEMS}/ai_limiter.png`,
    remoteIconUrl: "https://static.satisfactory-calculator.com/img/gameStable1.0/IconDesc_AILimiter_256.png", emoji: "🧠" },
  computer: { id: "computer", slug: "computer", name: "Computer", nameEn: "Computer", category: "electronics", iconUrl: `${ASSET_BASE_ITEMS}/computer.png`,
    remoteIconUrl: "https://static.satisfactory-calculator.com/img/gameStable1.0/IconDesc_Computer_256.png", emoji: "💻" },
  supercomputer: { id: "supercomputer", slug: "supercomputer", name: "Supercomputer", nameEn: "Supercomputer", category: "electronics", iconUrl: `${ASSET_BASE_ITEMS}/supercomputer.png`,
    remoteIconUrl: "https://static.satisfactory-calculator.com/img/gameStable1.0/IconDesc_QuantumComputer_256.png", emoji: "🖥️" },
  high_speed_connector: { id: "high_speed_connector", slug: "high-speed-connector", name: "Connettore ad Alta Velocità", nameEn: "High-Speed Connector", category: "electronics", iconUrl: `${ASSET_BASE_ITEMS}/high_speed_connector.png`,
    remoteIconUrl: "https://static.satisfactory-calculator.com/img/gameStable1.0/IconDesc_HighSpeedConnector_256.png", emoji: "🔌" },
  radio_control_unit: { id: "radio_control_unit", slug: "radio-control-unit", name: "Unità di Controllo Radio (RCU)", nameEn: "Radio Control Unit", category: "advanced", iconUrl: `${ASSET_BASE_ITEMS}/radio_control_unit.png`,
    remoteIconUrl: "https://static.satisfactory-calculator.com/img/gameStable1.0/IconDesc_RadioControlUnit_256.png", emoji: "📻" },
  crystal_oscillator: { id: "crystal_oscillator", slug: "crystal-oscillator", name: "Oscillatore a Cristallo", nameEn: "Crystal Oscillator", category: "electronics", iconUrl: `${ASSET_BASE_ITEMS}/crystal_oscillator.png`,
    remoteIconUrl: "https://static.satisfactory-calculator.com/img/gameStable1.0/IconDesc_CrystalOscillator_256.png", emoji: "📻" },
  cooling_system: { id: "cooling_system", slug: "cooling-system", name: "Sistema di Raffreddamento", nameEn: "Cooling System", category: "advanced", iconUrl: `${ASSET_BASE_ITEMS}/cooling_system.png`,
    remoteIconUrl: "https://static.satisfactory-calculator.com/img/gameStable1.0/IconDesc_CoolingSystem_256.png", emoji: "❄️" },
  heat_sink: { id: "heat_sink", slug: "heat-sink", name: "Dissipatore Termico", nameEn: "Heat Sink", category: "advanced", iconUrl: `${ASSET_BASE_ITEMS}/heat_sink.png`,
    remoteIconUrl: "https://static.satisfactory-calculator.com/img/gameStable1.0/IconDesc_Heatsink_256.png", emoji: "🪭" },
  electromagnetic_control_rod: { id: "electromagnetic_control_rod", slug: "electromagnetic-control-rod", name: "Barra di Controllo Elettromagnetica", nameEn: "Electromagnetic Control Rod", category: "advanced", iconUrl: `${ASSET_BASE_ITEMS}/electromagnetic_control_rod.png`,
    remoteIconUrl: "https://static.satisfactory-calculator.com/img/gameStable1.0/IconDesc_ElectromagneticControlRod_256.png", emoji: "🧪" },
  battery: { id: "battery", slug: "battery", name: "Batteria", nameEn: "Battery", category: "advanced", iconUrl: `${ASSET_BASE_ITEMS}/battery.png`,
    remoteIconUrl: "https://static.satisfactory-calculator.com/img/gameStable1.0/IconDesc_Battery_256.png", emoji: "🔋" },

  // Petrochemical & Aluminum
  plastic: { id: "plastic", slug: "plastic", name: "Plastica", nameEn: "Plastic", category: "petro", iconUrl: `${ASSET_BASE_ITEMS}/plastic.png`,
    remoteIconUrl: "https://static.satisfactory-calculator.com/img/gameStable1.0/IconDesc_Plastic_256.png", emoji: "🧴" },
  rubber: { id: "rubber", slug: "rubber", name: "Gomma", nameEn: "Rubber", category: "petro", iconUrl: `${ASSET_BASE_ITEMS}/rubber.png`,
    remoteIconUrl: "https://static.satisfactory-calculator.com/img/gameStable1.0/IconDesc_Rubber_256.png", emoji: "🛞" },
  fuel: { id: "fuel", slug: "fuel", name: "Carburante", nameEn: "Fuel", category: "petro", iconUrl: `${ASSET_BASE_ITEMS}/fuel.png`,
    remoteIconUrl: "https://static.satisfactory-calculator.com/img/gameStable1.0/IconDesc_LiquidFuel_Pipe_256.png", emoji: "⛽" },
  petroleum_coke: { id: "petroleum_coke", slug: "petroleum-coke", name: "Coke di Petrolio", nameEn: "Petroleum Coke", category: "petro", iconUrl: `${ASSET_BASE_ITEMS}/petroleum_coke.png`,
    remoteIconUrl: "https://static.satisfactory-calculator.com/img/gameStable1.0/IconDesc_PetroleumCoke_256.png", emoji: "⬛" },
  polymer_resin: { id: "polymer_resin", slug: "polymer-resin", name: "Resina Polimerica", nameEn: "Polymer Resin", category: "petro", iconUrl: `${ASSET_BASE_ITEMS}/polymer_resin.png`,
    remoteIconUrl: "https://static.satisfactory-calculator.com/img/gameStable1.0/IconDesc_PolymerResin_256.png", emoji: "⚪" },
  heavy_oil_residue: { id: "heavy_oil_residue", slug: "heavy-oil-residue", name: "Residuo di Olio Pesante", nameEn: "Heavy Oil Residue", category: "petro", iconUrl: `${ASSET_BASE_ITEMS}/heavy_oil_residue.png`,
    remoteIconUrl: "https://static.satisfactory-calculator.com/img/gameStable1.0/IconDesc_LiquidHeavyOilResidue_Pipe_256.png", emoji: "🛢️" },
  sulfuric_acid: { id: "sulfuric_acid", slug: "sulfuric-acid", name: "Acido Solforico", nameEn: "Sulfuric Acid", category: "petro", iconUrl: `${ASSET_BASE_ITEMS}/sulfuric_acid.png`,
    remoteIconUrl: "https://static.satisfactory-calculator.com/img/gameStable1.0/IconDesc_LiquidSulfuricAcid_Pipe_256.png", emoji: "🧪" },
  nitric_acid: { id: "nitric_acid", slug: "nitric-acid", name: "Acido Nitrico", nameEn: "Nitric Acid", category: "petro", iconUrl: `${ASSET_BASE_ITEMS}/nitric_acid.png`,
    remoteIconUrl: "https://static.satisfactory-calculator.com/img/gameStable1.0/IconDesc_NitricAcid_256.png", emoji: "🧪" },
  compacted_coal: { id: "compacted_coal", slug: "compacted-coal", name: "Carbone Compatto", nameEn: "Compacted Coal", category: "petro", iconUrl: `${ASSET_BASE_ITEMS}/compacted_coal.png`,
    remoteIconUrl: "https://static.satisfactory-calculator.com/img/gameStable1.0/IconDesc_CompactedCoal_256.png", emoji: "📦" },
  alumina_solution: { id: "alumina_solution", slug: "alumina-solution", name: "Soluzione di Allumina", nameEn: "Alumina Solution", category: "advanced", iconUrl: `${ASSET_BASE_ITEMS}/alumina_solution.png`,
    remoteIconUrl: "https://static.satisfactory-calculator.com/img/gameStable1.0/LiquidAlumina_Pipe_256.png", emoji: "💧" },
  aluminum_scrap: { id: "aluminum_scrap", slug: "aluminum-scrap", name: "Scarti d'Alluminio", nameEn: "Aluminum Scrap", category: "advanced", iconUrl: `${ASSET_BASE_ITEMS}/aluminum_scrap.png`,
    remoteIconUrl: "https://static.satisfactory-calculator.com/img/gameStable1.0/IconDesc_AluminiumScrap_256.png", emoji: "🪙" },
  alclad_aluminum_sheet: { id: "alclad_aluminum_sheet", slug: "alclad-aluminum-sheet", name: "Lastra d'Alluminio Alclad", nameEn: "Alclad Aluminum Sheet", category: "advanced", iconUrl: `${ASSET_BASE_ITEMS}/alclad_aluminum_sheet.png`,
    remoteIconUrl: "https://static.satisfactory-calculator.com/img/gameStable1.0/IconDesc_AluminiumSheet_256.png", emoji: "📑" },
  aluminum_casing: { id: "aluminum_casing", slug: "aluminum-casing", name: "Involucro d'Alluminio", nameEn: "Aluminum Casing", category: "advanced", iconUrl: `${ASSET_BASE_ITEMS}/aluminum_casing.png`,
    remoteIconUrl: "https://static.satisfactory-calculator.com/img/gameStable1.0/IconDesc_AluminiumCasing_256.png", emoji: "📦" },

  // Space Elevator Components
  smart_plating: { id: "smart_plating", slug: "smart-plating", name: "Placcatura Intelligente", nameEn: "Smart Plating", category: "space", iconUrl: `${ASSET_BASE_ITEMS}/smart_plating.png`,
    remoteIconUrl: "https://static.satisfactory-calculator.com/img/gameStable1.0/IconDesc_SpelevatorPart_1_256.png", emoji: "🛸" },
  versatile_framework: { id: "versatile_framework", slug: "versatile-framework", name: "Struttura Versatile", nameEn: "Versatile Framework", category: "space", iconUrl: `${ASSET_BASE_ITEMS}/versatile_framework.png`,
    remoteIconUrl: "https://static.satisfactory-calculator.com/img/gameStable1.0/IconDesc_SpelevatorPart_2_256.png", emoji: "🏗️" },
  automated_wiring: { id: "automated_wiring", slug: "automated-wiring", name: "Cablaggio Automatizzato", nameEn: "Automated Wiring", category: "space", iconUrl: `${ASSET_BASE_ITEMS}/automated_wiring.png`,
    remoteIconUrl: "https://static.satisfactory-calculator.com/img/gameStable1.0/SpelevatorPart_3_256.png", emoji: "🧶" },
  modular_engine: { id: "modular_engine", slug: "modular-engine", name: "Motore Modulare", nameEn: "Modular Engine", category: "space", iconUrl: `${ASSET_BASE_ITEMS}/modular_engine.png`,
    remoteIconUrl: "https://static.satisfactory-calculator.com/img/gameStable1.0/IconDesc_SpelevatorPart_4_256.png", emoji: "🚂" },
  adaptive_control_unit: { id: "adaptive_control_unit", slug: "adaptive-control-unit", name: "Unità di Controllo Adattiva", nameEn: "Adaptive Control Unit", category: "space", iconUrl: `${ASSET_BASE_ITEMS}/adaptive_control_unit.png`,
    remoteIconUrl: "https://static.satisfactory-calculator.com/img/gameStable1.0/IconDesc_SpelevatorPart_5_256.png", emoji: "📟" },
  assembly_director_system: { id: "assembly_director_system", slug: "assembly-director-system", name: "Sistema Direttore di Assemblaggio", nameEn: "Assembly Director System", category: "space", iconUrl: `${ASSET_BASE_ITEMS}/assembly_director_system.png`,
    remoteIconUrl: "https://static.satisfactory-calculator.com/img/gameStable1.0/IconDesc_AssemblyDirectorSystem_256.png", emoji: "🛰️" },
  magnetic_field_generator: { id: "magnetic_field_generator", slug: "magnetic-field-generator", name: "Generatore di Campo Magnetico", nameEn: "Magnetic Field Generator", category: "space", iconUrl: `${ASSET_BASE_ITEMS}/magnetic_field_generator.png`,
    remoteIconUrl: "https://static.satisfactory-calculator.com/img/gameStable1.0/IconDesc_MagneticFieldGenerator_256.png", emoji: "🧲" },
  thermal_propulsion_rocket: { id: "thermal_propulsion_rocket", slug: "thermal-propulsion-rocket", name: "Razzo a Propulsione Termica", nameEn: "Thermal Propulsion Rocket", category: "space", iconUrl: `${ASSET_BASE_ITEMS}/thermal_propulsion_rocket.png`,
    remoteIconUrl: "https://static.satisfactory-calculator.com/img/gameStable1.0/IconDesc_ThermalPropulsionRocket_256.png", emoji: "🚀" },
  nuclear_pasta: { id: "nuclear_pasta", slug: "nuclear-pasta", name: "Pasta Nucleare", nameEn: "Nuclear Pasta", category: "space", iconUrl: `${ASSET_BASE_ITEMS}/nuclear_pasta.png`,
    remoteIconUrl: "https://static.satisfactory-calculator.com/img/gameStable1.0/IconDesc_NuclearPasta_256.png", emoji: "🍝" },
  copper_powder: { id: "copper_powder", slug: "copper-powder", name: "Polvere di Rame", nameEn: "Copper Powder", category: "advanced", iconUrl: `${ASSET_BASE_ITEMS}/copper_powder.png`,
    remoteIconUrl: "https://static.satisfactory-calculator.com/img/gameStable1.0/IconDesc_CopperDust_256.png", emoji: "✨" },
  pressure_conversion_cube: { id: "pressure_conversion_cube", slug: "pressure-conversion-cube", name: "Cubo di Conversione di Pressione", nameEn: "Pressure Conversion Cube", category: "advanced", iconUrl: `${ASSET_BASE_ITEMS}/pressure_conversion_cube.png`,
    remoteIconUrl: "https://static.satisfactory-calculator.com/img/gameStable1.0/IconDesc_ConversionCube_256.png", emoji: "🧊" },
  singularity_cell: { id: "singularity_cell", slug: "singularity-cell", name: "Cella di Singolarità", nameEn: "Singularity Cell", category: "space", iconUrl: `${ASSET_BASE_ITEMS}/singularity_cell.png`,
    remoteIconUrl: "https://static.satisfactory-calculator.com/img/gameStable1.0/IconDesc_SingularityCell_256.png", emoji: "🌀" },
  
  power_shard: { id: "power_shard", slug: "power-shard", name: "Frammento Energetico", nameEn: "Power Shard", category: "basic", iconUrl: `${ASSET_BASE_ITEMS}/power_shard.png`, remoteIconUrl: "https://static.satisfactory-calculator.com/img/gameStable1.0/PowerShard_256.png", emoji: "💎" },
  somersloop: { id: "somersloop", slug: "somersloop", name: "Somersloop", nameEn: "Somersloop", category: "basic", iconUrl: `${ASSET_BASE_ITEMS}/somersloop.png`, remoteIconUrl: "https://static.satisfactory-calculator.com/img/gameStable1.0/Wat_1_256.png", emoji: "🔮" },
  dark_matter_residue: { id: "dark_matter_residue", slug: "dark-matter-residue", name: "Residuo di Materia Oscura", nameEn: "Dark Matter Residue", category: "advanced", iconUrl: `${ASSET_BASE_ITEMS}/dark_matter_residue.png`,
    remoteIconUrl: "https://static.satisfactory-calculator.com/img/gameStable1.0/IconDesc_DarkEnergy_256.png", emoji: "🌌" }
};

// All Recipes (Standard and Alternate) - Verified & Updated for Satisfactory 1.0 / 1.2.3.1
// Rates are expressed in ITEMS PER MINUTE for 100% clock speed
const RECIPES = [
  // --- IRON INGOT ---
  {
    id: "iron_ingot_standard",
    name: "Standard: Lingotto di Ferro",
    nameEn: "Iron Ingot",
    isAlternate: false,
    building: "smelter",
    outputItem: "iron_ingot",
    outputs: [{ item: "iron_ingot", rate: 30 }],
    inputs: [{ item: "iron_ore", rate: 30 }]
  },
  {
    id: "iron_alloy_ingot",
    name: "Alternativa: Lingotto in Lega di Ferro",
    nameEn: "Iron Alloy Ingot",
    isAlternate: true,
    building: "foundry",
    outputItem: "iron_ingot",
    outputs: [{ item: "iron_ingot", rate: 50 }],
    inputs: [{ item: "iron_ore", rate: 20 }, { item: "copper_ore", rate: 20 }]
  },
  {
    id: "pure_iron_ingot",
    name: "Alternativa: Lingotto di Ferro Puro",
    nameEn: "Pure Iron Ingot",
    isAlternate: true,
    building: "refinery",
    outputItem: "iron_ingot",
    outputs: [{ item: "iron_ingot", rate: 65 }],
    inputs: [{ item: "iron_ore", rate: 35 }, { item: "water", rate: 20 }]
  },

  // --- COPPER INGOT ---
  {
    id: "copper_ingot_standard",
    name: "Standard: Lingotto di Rame",
    nameEn: "Copper Ingot",
    isAlternate: false,
    building: "smelter",
    outputItem: "copper_ingot",
    outputs: [{ item: "copper_ingot", rate: 30 }],
    inputs: [{ item: "copper_ore", rate: 30 }]
  },
  {
    // Updated in 1.0: 50 Copper Ore + 50 Iron Ore (equal 1:1) -> 100 Copper Ingot / min
    id: "copper_alloy_ingot",
    name: "Alternativa: Lingotto in Lega di Rame (1.0)",
    nameEn: "Copper Alloy Ingot",
    isAlternate: true,
    building: "foundry",
    outputItem: "copper_ingot",
    outputs: [{ item: "copper_ingot", rate: 100 }],
    inputs: [{ item: "copper_ore", rate: 50 }, { item: "iron_ore", rate: 50 }]
  },
  {
    id: "pure_copper_ingot",
    name: "Alternativa: Lingotto di Rame Puro",
    nameEn: "Pure Copper Ingot",
    isAlternate: true,
    building: "refinery",
    outputItem: "copper_ingot",
    outputs: [{ item: "copper_ingot", rate: 37.5 }],
    inputs: [{ item: "copper_ore", rate: 15 }, { item: "water", rate: 10 }]
  },

  // --- CATERIUM INGOT ---
  {
    id: "caterium_ingot_standard",
    name: "Standard: Lingotto di Caterium",
    nameEn: "Caterium Ingot",
    isAlternate: false,
    building: "smelter",
    outputItem: "caterium_ingot",
    outputs: [{ item: "caterium_ingot", rate: 15 }],
    inputs: [{ item: "caterium_ore", rate: 45 }]
  },
  {
    id: "pure_caterium_ingot",
    name: "Alternativa: Lingotto di Caterium Puro",
    nameEn: "Pure Caterium Ingot",
    isAlternate: true,
    building: "refinery",
    outputItem: "caterium_ingot",
    outputs: [{ item: "caterium_ingot", rate: 12 }],
    inputs: [{ item: "caterium_ore", rate: 24 }, { item: "water", rate: 24 }]
  },

  // --- STEEL INGOT ---
  {
    id: "steel_ingot_standard",
    name: "Standard: Lingotto d'Acciaio",
    nameEn: "Steel Ingot",
    isAlternate: false,
    building: "foundry",
    outputItem: "steel_ingot",
    outputs: [{ item: "steel_ingot", rate: 45 }],
    inputs: [{ item: "iron_ore", rate: 45 }, { item: "coal", rate: 45 }]
  },
  {
    id: "solid_steel_ingot",
    name: "Alternativa: Lingotto d'Acciaio Solido",
    nameEn: "Solid Steel Ingot",
    isAlternate: true,
    building: "foundry",
    outputItem: "steel_ingot",
    outputs: [{ item: "steel_ingot", rate: 60 }],
    inputs: [{ item: "iron_ingot", rate: 40 }, { item: "coal", rate: 40 }]
  },
  {
    id: "coke_steel_ingot",
    name: "Alternativa: Acciaio al Coke",
    nameEn: "Coke Steel Ingot",
    isAlternate: true,
    building: "foundry",
    outputItem: "steel_ingot",
    outputs: [{ item: "steel_ingot", rate: 100 }],
    inputs: [{ item: "iron_ore", rate: 75 }, { item: "petroleum_coke", rate: 75 }]
  },
  {
    // Updated in 1.0: 2 Iron Ore (5/min) + 1 Compacted Coal (2.5/min) -> 4 Steel Ingot (10/min) (24s cycle)
    id: "compacted_steel_ingot",
    name: "Alternativa: Acciaio Compatto (1.0)",
    nameEn: "Compacted Steel Ingot",
    isAlternate: true,
    building: "foundry",
    outputItem: "steel_ingot",
    outputs: [{ item: "steel_ingot", rate: 10 }],
    inputs: [{ item: "iron_ore", rate: 5 }, { item: "compacted_coal", rate: 2.5 }]
  },

  // --- ALUMINUM INGOT ---
  {
    id: "aluminum_ingot_standard",
    name: "Standard: Lingotto d'Alluminio",
    nameEn: "Aluminum Ingot",
    isAlternate: false,
    building: "foundry",
    outputItem: "aluminum_ingot",
    outputs: [{ item: "aluminum_ingot", rate: 60 }],
    inputs: [{ item: "aluminum_scrap", rate: 90 }, { item: "silica", rate: 60 }]
  },
  {
    id: "pure_aluminum_ingot",
    name: "Alternativa: Lingotto d'Alluminio Puro",
    nameEn: "Pure Aluminum Ingot",
    isAlternate: true,
    building: "smelter",
    outputItem: "aluminum_ingot",
    outputs: [{ item: "aluminum_ingot", rate: 30 }],
    inputs: [{ item: "aluminum_scrap", rate: 60 }]
  },

  // --- IRON PLATE ---
  {
    id: "iron_plate_standard",
    name: "Standard: Piastra di Ferro",
    nameEn: "Iron Plate",
    isAlternate: false,
    building: "constructor",
    outputItem: "iron_plate",
    outputs: [{ item: "iron_plate", rate: 20 }],
    inputs: [{ item: "iron_ingot", rate: 30 }]
  },
  {
    id: "cast_iron_plate",
    name: "Alternativa: Piastra di Ferro Fuso",
    nameEn: "Cast Iron Plate",
    isAlternate: true,
    building: "constructor",
    outputItem: "iron_plate",
    outputs: [{ item: "iron_plate", rate: 35 }],
    inputs: [{ item: "iron_ingot", rate: 35 }]
  },
  {
    // 1.0 New Recipe: Steel Cast Plate (Foundry, 4s: 1 Iron Ingot + 1 Steel Ingot -> 3 Iron Plate)
    id: "steel_cast_plate",
    name: "Alternativa: Piastra in Acciaio Fuso (1.0)",
    nameEn: "Steel Cast Plate",
    isAlternate: true,
    building: "foundry",
    outputItem: "iron_plate",
    outputs: [{ item: "iron_plate", rate: 45 }],
    inputs: [{ item: "iron_ingot", rate: 15 }, { item: "steel_ingot", rate: 15 }]
  },
  {
    // 1.0 Adjusted: Coated Iron Plate (Assembler, 8s: 5 Iron Ingot + 1 Plastic -> 10 Iron Plate)
    id: "coated_iron_plate",
    name: "Alternativa: Piastra Rivestita (1.0)",
    nameEn: "Coated Iron Plate",
    isAlternate: true,
    building: "assembler",
    outputItem: "iron_plate",
    outputs: [{ item: "iron_plate", rate: 75 }],
    inputs: [{ item: "iron_ingot", rate: 37.5 }, { item: "plastic", rate: 7.5 }]
  },

  // --- IRON ROD ---
  {
    id: "iron_rod_standard",
    name: "Standard: Tondino di Ferro",
    nameEn: "Iron Rod",
    isAlternate: false,
    building: "constructor",
    outputItem: "iron_rod",
    outputs: [{ item: "iron_rod", rate: 15 }],
    inputs: [{ item: "iron_ingot", rate: 15 }]
  },
  {
    id: "steel_rod",
    name: "Alternativa: Tondino d'Acciaio",
    nameEn: "Steel Rod",
    isAlternate: true,
    building: "constructor",
    outputItem: "iron_rod",
    outputs: [{ item: "iron_rod", rate: 48 }],
    inputs: [{ item: "steel_ingot", rate: 12 }]
  },

  // --- SCREW ---
  {
    id: "screw_standard",
    name: "Standard: Vite (da Tondino)",
    nameEn: "Screw",
    isAlternate: false,
    building: "constructor",
    outputItem: "screw",
    outputs: [{ item: "screw", rate: 40 }],
    inputs: [{ item: "iron_rod", rate: 10 }]
  },
  {
    id: "cast_screw",
    name: "Alternativa: Viti Fuse (da Lingotto)",
    nameEn: "Cast Screw",
    isAlternate: true,
    building: "constructor",
    outputItem: "screw",
    outputs: [{ item: "screw", rate: 50 }],
    inputs: [{ item: "iron_ingot", rate: 12.5 }]
  },
  {
    id: "steel_screw",
    name: "Alternativa: Viti d'Acciaio (Alto Rendimento)",
    nameEn: "Steel Screw",
    isAlternate: true,
    building: "constructor",
    outputItem: "screw",
    outputs: [{ item: "screw", rate: 260 }],
    inputs: [{ item: "steel_beam", rate: 5 }]
  },

  // --- WIRE ---
  {
    id: "wire_standard",
    name: "Standard: Filo di Rame",
    nameEn: "Wire",
    isAlternate: false,
    building: "constructor",
    outputItem: "wire",
    outputs: [{ item: "wire", rate: 30 }],
    inputs: [{ item: "copper_ingot", rate: 15 }]
  },
  {
    id: "iron_wire",
    name: "Alternativa: Filo di Ferro",
    nameEn: "Iron Wire",
    isAlternate: true,
    building: "constructor",
    outputItem: "wire",
    outputs: [{ item: "wire", rate: 22.5 }],
    inputs: [{ item: "iron_ingot", rate: 12.5 }]
  },
  {
    id: "caterium_wire",
    name: "Alternativa: Filo di Caterium",
    nameEn: "Caterium Wire",
    isAlternate: true,
    building: "constructor",
    outputItem: "wire",
    outputs: [{ item: "wire", rate: 120 }],
    inputs: [{ item: "caterium_ingot", rate: 15 }]
  },
  {
    id: "fused_wire",
    name: "Alternativa: Filo Fuso (Rame + Caterium)",
    nameEn: "Fused Wire",
    isAlternate: true,
    building: "assembler",
    outputItem: "wire",
    outputs: [{ item: "wire", rate: 90 }],
    inputs: [{ item: "copper_ingot", rate: 12 }, { item: "caterium_ingot", rate: 3 }]
  },

  // --- CABLE ---
  {
    id: "cable_standard",
    name: "Standard: Cavo",
    nameEn: "Cable",
    isAlternate: false,
    building: "constructor",
    outputItem: "cable",
    outputs: [{ item: "cable", rate: 30 }],
    inputs: [{ item: "wire", rate: 60 }]
  },
  {
    id: "quickwire_cable",
    name: "Alternativa: Cavo Superfilo",
    nameEn: "Quickwire Cable",
    isAlternate: true,
    building: "assembler",
    outputItem: "cable",
    outputs: [{ item: "cable", rate: 27.5 }],
    inputs: [{ item: "quickwire", rate: 7.5 }, { item: "rubber", rate: 5 }]
  },
  {
    id: "insulated_cable",
    name: "Alternativa: Cavo Isolato",
    nameEn: "Insulated Cable",
    isAlternate: true,
    building: "assembler",
    outputItem: "cable",
    outputs: [{ item: "cable", rate: 100 }],
    inputs: [{ item: "wire", rate: 45 }, { item: "rubber", rate: 30 }]
  },
  {
    id: "coated_cable",
    name: "Alternativa: Cavo Rivestito",
    nameEn: "Coated Cable",
    isAlternate: true,
    building: "refinery",
    outputItem: "cable",
    outputs: [{ item: "cable", rate: 67.5 }],
    inputs: [{ item: "wire", rate: 37.5 }, { item: "heavy_oil_residue", rate: 15 }]
  },

  // --- CONCRETE ---
  {
    id: "concrete_standard",
    name: "Standard: Cemento",
    nameEn: "Concrete",
    isAlternate: false,
    building: "constructor",
    outputItem: "concrete",
    outputs: [{ item: "concrete", rate: 15 }],
    inputs: [{ item: "limestone", rate: 45 }]
  },
  {
    id: "wet_concrete",
    name: "Alternativa: Cemento Bagnato",
    nameEn: "Wet Concrete",
    isAlternate: true,
    building: "refinery",
    outputItem: "concrete",
    outputs: [{ item: "concrete", rate: 80 }],
    inputs: [{ item: "limestone", rate: 120 }, { item: "water", rate: 100 }]
  },
  {
    id: "rubber_concrete",
    name: "Alternativa: Cemento e Gomma",
    nameEn: "Rubber Concrete",
    isAlternate: true,
    building: "assembler",
    outputItem: "concrete",
    outputs: [{ item: "concrete", rate: 45 }],
    inputs: [{ item: "limestone", rate: 50 }, { item: "rubber", rate: 10 }]
  },
  {
    id: "fine_concrete",
    name: "Alternativa: Cemento Fine",
    nameEn: "Fine Concrete",
    isAlternate: true,
    building: "assembler",
    outputItem: "concrete",
    outputs: [{ item: "concrete", rate: 25 }],
    inputs: [{ item: "silica", rate: 24 }, { item: "limestone", rate: 30 }]
  },

  // --- COPPER SHEET ---
  {
    id: "copper_sheet_standard",
    name: "Standard: Lamiera di Rame",
    nameEn: "Copper Sheet",
    isAlternate: false,
    building: "constructor",
    outputItem: "copper_sheet",
    outputs: [{ item: "copper_sheet", rate: 10 }],
    inputs: [{ item: "copper_ingot", rate: 20 }]
  },
  {
    id: "steamed_copper_sheet",
    name: "Alternativa: Lamiera di Rame al Vapore",
    nameEn: "Steamed Copper Sheet",
    isAlternate: true,
    building: "refinery",
    outputItem: "copper_sheet",
    outputs: [{ item: "copper_sheet", rate: 22.5 }],
    inputs: [{ item: "copper_ingot", rate: 22.5 }, { item: "water", rate: 22.5 }]
  },

  // --- QUICKWIRE ---
  {
    id: "quickwire_standard",
    name: "Standard: Superfilo (Quickwire)",
    nameEn: "Quickwire",
    isAlternate: false,
    building: "constructor",
    outputItem: "quickwire",
    outputs: [{ item: "quickwire", rate: 60 }],
    inputs: [{ item: "caterium_ingot", rate: 12 }]
  },
  {
    id: "fused_quickwire",
    name: "Alternativa: Superfilo Fuso",
    nameEn: "Fused Quickwire",
    isAlternate: true,
    building: "assembler",
    outputItem: "quickwire",
    outputs: [{ item: "quickwire", rate: 90 }],
    inputs: [{ item: "caterium_ingot", rate: 7.5 }, { item: "copper_ingot", rate: 37.5 }]
  },

  // --- REINFORCED IRON PLATE ---
  {
    id: "reinforced_iron_plate_standard",
    name: "Standard: Piastra Rinforzata",
    nameEn: "Reinforced Iron Plate",
    isAlternate: false,
    building: "assembler",
    outputItem: "reinforced_iron_plate",
    outputs: [{ item: "reinforced_iron_plate", rate: 5 }],
    inputs: [{ item: "iron_plate", rate: 30 }, { item: "screw", rate: 60 }]
  },
  {
    id: "bolted_iron_plate",
    name: "Alternativa: Piastra Bullonata",
    nameEn: "Bolted Iron Plate",
    isAlternate: true,
    building: "assembler",
    outputItem: "reinforced_iron_plate",
    outputs: [{ item: "reinforced_iron_plate", rate: 15 }],
    inputs: [{ item: "iron_plate", rate: 90 }, { item: "screw", rate: 250 }]
  },
  {
    id: "stitched_iron_plate",
    name: "Alternativa: Piastra Cucita (No Viti!)",
    nameEn: "Stitched Iron Plate",
    isAlternate: true,
    building: "assembler",
    outputItem: "reinforced_iron_plate",
    outputs: [{ item: "reinforced_iron_plate", rate: 5.625 }],
    inputs: [{ item: "iron_plate", rate: 18.75 }, { item: "wire", rate: 37.5 }]
  },
  {
    id: "adhered_iron_plate",
    name: "Alternativa: Piastra Incollata",
    nameEn: "Adhered Iron Plate",
    isAlternate: true,
    building: "assembler",
    outputItem: "reinforced_iron_plate",
    outputs: [{ item: "reinforced_iron_plate", rate: 3.75 }],
    inputs: [{ item: "iron_plate", rate: 11.25 }, { item: "rubber", rate: 3.75 }]
  },

  // --- ROTOR ---
  {
    id: "rotor_standard",
    name: "Standard: Rotore",
    nameEn: "Rotor",
    isAlternate: false,
    building: "assembler",
    outputItem: "rotor",
    outputs: [{ item: "rotor", rate: 4 }],
    inputs: [{ item: "iron_rod", rate: 20 }, { item: "screw", rate: 100 }]
  },
  {
    id: "copper_rotor",
    name: "Alternativa: Rotore di Rame",
    nameEn: "Copper Rotor",
    isAlternate: true,
    building: "assembler",
    outputItem: "rotor",
    outputs: [{ item: "rotor", rate: 11.25 }],
    inputs: [{ item: "copper_sheet", rate: 22.5 }, { item: "screw", rate: 195 }]
  },
  {
    id: "steel_rotor",
    name: "Alternativa: Rotore d'Acciaio (No Viti!)",
    nameEn: "Steel Rotor",
    isAlternate: true,
    building: "assembler",
    outputItem: "rotor",
    outputs: [{ item: "rotor", rate: 5 }],
    inputs: [{ item: "steel_pipe", rate: 10 }, { item: "wire", rate: 30 }]
  },

  // --- STATOR ---
  {
    id: "stator_standard",
    name: "Standard: Statore",
    nameEn: "Stator",
    isAlternate: false,
    building: "assembler",
    outputItem: "stator",
    outputs: [{ item: "stator", rate: 5 }],
    inputs: [{ item: "steel_pipe", rate: 15 }, { item: "wire", rate: 40 }]
  },
  {
    id: "quickwire_stator",
    name: "Alternativa: Statore a Superfilo",
    nameEn: "Quickwire Stator",
    isAlternate: true,
    building: "assembler",
    outputItem: "stator",
    outputs: [{ item: "stator", rate: 8 }],
    inputs: [{ item: "steel_pipe", rate: 16 }, { item: "quickwire", rate: 60 }]
  },

  // --- MOTOR ---
  {
    id: "motor_standard",
    name: "Standard: Motore",
    nameEn: "Motor",
    isAlternate: false,
    building: "assembler",
    outputItem: "motor",
    outputs: [{ item: "motor", rate: 5 }],
    inputs: [{ item: "rotor", rate: 10 }, { item: "stator", rate: 10 }]
  },
  {
    // Updated in 1.0: 3.75 Rotor + 3.75 Stator + 1.25 Crystal Oscillator -> 7.5 Motor / min (Manufacturer)
    id: "rigor_motor",
    name: "Alternativa: Motore Rinforzato (Rigor Motor 1.0)",
    nameEn: "Rigor Motor",
    isAlternate: true,
    building: "manufacturer",
    outputItem: "motor",
    outputs: [{ item: "motor", rate: 7.5 }],
    inputs: [
      { item: "rotor", rate: 3.75 },
      { item: "stator", rate: 3.75 },
      { item: "crystal_oscillator", rate: 1.25 }
    ]
  },
  {
    // Updated in 1.0: 7.5 Rotor + 3.75 Electromagnetic Control Rod -> 7.5 Motor / min (Assembler)
    id: "electric_motor",
    name: "Alternativa: Motore Elettrico (1.0)",
    nameEn: "Electric Motor",
    isAlternate: true,
    building: "assembler",
    outputItem: "motor",
    outputs: [{ item: "motor", rate: 7.5 }],
    inputs: [{ item: "rotor", rate: 7.5 }, { item: "electromagnetic_control_rod", rate: 3.75 }]
  },

  // --- STEEL BEAM & STEEL PIPE ---
  {
    id: "steel_beam_standard",
    name: "Standard: Trave d'Acciaio",
    nameEn: "Steel Beam",
    isAlternate: false,
    building: "constructor",
    outputItem: "steel_beam",
    outputs: [{ item: "steel_beam", rate: 15 }],
    inputs: [{ item: "steel_ingot", rate: 60 }]
  },
  {
    id: "steel_pipe_standard",
    name: "Standard: Tubo d'Acciaio",
    nameEn: "Steel Pipe",
    isAlternate: false,
    building: "constructor",
    outputItem: "steel_pipe",
    outputs: [{ item: "steel_pipe", rate: 20 }],
    inputs: [{ item: "steel_ingot", rate: 30 }]
  },

  // --- ENCASED INDUSTRIAL BEAM ---
  {
    id: "encased_industrial_beam_standard",
    name: "Standard: Trave Industriale Rivestita",
    nameEn: "Encased Industrial Beam",
    isAlternate: false,
    building: "assembler",
    outputItem: "encased_industrial_beam",
    outputs: [{ item: "encased_industrial_beam", rate: 6 }],
    inputs: [{ item: "steel_beam", rate: 24 }, { item: "concrete", rate: 30 }]
  },
  {
    // Updated in 1.0: 24 Steel Pipe + 20 Concrete -> 4 Encased Industrial Beam / min
    id: "encased_industrial_pipe",
    name: "Alternativa: Tubo Industriale Rivestito (1.0)",
    nameEn: "Encased Industrial Pipe",
    isAlternate: true,
    building: "assembler",
    outputItem: "encased_industrial_beam",
    outputs: [{ item: "encased_industrial_beam", rate: 4 }],
    inputs: [{ item: "steel_pipe", rate: 24 }, { item: "concrete", rate: 20 }]
  },

  // --- MODULAR FRAME ---
  {
    id: "modular_frame_standard",
    name: "Standard: Telaio Modulare",
    nameEn: "Modular Frame",
    isAlternate: false,
    building: "assembler",
    outputItem: "modular_frame",
    outputs: [{ item: "modular_frame", rate: 2 }],
    inputs: [{ item: "reinforced_iron_plate", rate: 3 }, { item: "iron_rod", rate: 12 }]
  },
  {
    id: "bolted_frame",
    name: "Alternativa: Telaio Bullonato",
    nameEn: "Bolted Frame",
    isAlternate: true,
    building: "assembler",
    outputItem: "modular_frame",
    outputs: [{ item: "modular_frame", rate: 5 }],
    inputs: [{ item: "reinforced_iron_plate", rate: 7.5 }, { item: "screw", rate: 140 }]
  },
  {
    id: "steeled_frame",
    name: "Alternativa: Telaio in Acciaio",
    nameEn: "Steeled Frame",
    isAlternate: true,
    building: "assembler",
    outputItem: "modular_frame",
    outputs: [{ item: "modular_frame", rate: 3 }],
    inputs: [{ item: "reinforced_iron_plate", rate: 2 }, { item: "steel_pipe", rate: 10 }]
  },

  // --- HEAVY MODULAR FRAME ---
  {
    // Updated in 1.0: 10 Modular Frame + 40 Steel Pipe + 10 Encased Industrial Beam + 240 Screw -> 2 HMF / min
    id: "heavy_modular_frame_standard",
    name: "Standard: Telaio Modulare Pesante (1.0)",
    nameEn: "Heavy Modular Frame",
    isAlternate: false,
    building: "manufacturer",
    outputItem: "heavy_modular_frame",
    outputs: [{ item: "heavy_modular_frame", rate: 2 }],
    inputs: [
      { item: "modular_frame", rate: 10 },
      { item: "steel_pipe", rate: 40 },
      { item: "encased_industrial_beam", rate: 10 },
      { item: "screw", rate: 240 }
    ]
  },
  {
    id: "heavy_encased_frame",
    name: "Alternativa: Telaio Pesante Rivestito (Ottimale)",
    nameEn: "Heavy Encased Frame",
    isAlternate: true,
    building: "manufacturer",
    outputItem: "heavy_modular_frame",
    outputs: [{ item: "heavy_modular_frame", rate: 2.8125 }],
    inputs: [
      { item: "modular_frame", rate: 7.5 },
      { item: "encased_industrial_beam", rate: 9.375 },
      { item: "steel_pipe", rate: 33.75 },
      { item: "concrete", rate: 20.625 }
    ]
  },
  {
    // Updated in 1.0: 18.75 Modular Frame + 11.25 EIB + 75 Rubber + 390 Screw -> 3.75 HMF / min
    id: "heavy_flexible_frame",
    name: "Alternativa: Telaio Pesante Flessibile (1.0)",
    nameEn: "Heavy Flexible Frame",
    isAlternate: true,
    building: "manufacturer",
    outputItem: "heavy_modular_frame",
    outputs: [{ item: "heavy_modular_frame", rate: 3.75 }],
    inputs: [
      { item: "modular_frame", rate: 18.75 },
      { item: "encased_industrial_beam", rate: 11.25 },
      { item: "rubber", rate: 75 },
      { item: "screw", rate: 390 }
    ]
  },

  // --- FUSED MODULAR FRAME ---
  {
    id: "fused_modular_frame_standard",
    name: "Standard: Telaio Modulare Fuso",
    nameEn: "Fused Modular Frame",
    isAlternate: false,
    building: "blender",
    outputItem: "fused_modular_frame",
    outputs: [{ item: "fused_modular_frame", rate: 1.5 }],
    inputs: [
      { item: "heavy_modular_frame", rate: 1.5 },
      { item: "aluminum_casing", rate: 75 },
      { item: "nitrogen_gas", rate: 37.5 }
    ]
  },
  {
    // Updated in 1.0: 3 HMF + 150 Aluminum Ingot + 24 Nitric Acid + 30 Fuel -> 3 FMF / min
    id: "heat_fused_frame",
    name: "Alternativa: Telaio Termofuso (1.0)",
    nameEn: "Heat-Fused Frame",
    isAlternate: true,
    building: "blender",
    outputItem: "fused_modular_frame",
    outputs: [{ item: "fused_modular_frame", rate: 3 }],
    inputs: [
      { item: "heavy_modular_frame", rate: 3 },
      { item: "aluminum_ingot", rate: 150 },
      { item: "nitric_acid", rate: 24 },
      { item: "fuel", rate: 30 }
    ]
  },

  // --- CIRCUIT BOARD ---
  {
    id: "circuit_board_standard",
    name: "Standard: Circuito Stampato",
    nameEn: "Circuit Board",
    isAlternate: false,
    building: "assembler",
    outputItem: "circuit_board",
    outputs: [{ item: "circuit_board", rate: 7.5 }],
    inputs: [{ item: "copper_sheet", rate: 15 }, { item: "plastic", rate: 30 }]
  },
  {
    id: "silicon_circuit_board",
    name: "Alternativa: Circuito al Silicio",
    nameEn: "Silicon Circuit Board",
    isAlternate: true,
    building: "assembler",
    outputItem: "circuit_board",
    outputs: [{ item: "circuit_board", rate: 12.5 }],
    inputs: [{ item: "copper_sheet", rate: 27.5 }, { item: "silica", rate: 27.5 }]
  },
  {
    // Updated in 1.0: 12.5 Plastic + 37.5 Quickwire -> 8.75 Circuit Board / min
    id: "caterium_circuit_board",
    name: "Alternativa: Circuito al Caterium (1.0)",
    nameEn: "Caterium Circuit Board",
    isAlternate: true,
    building: "assembler",
    outputItem: "circuit_board",
    outputs: [{ item: "circuit_board", rate: 8.75 }],
    inputs: [{ item: "plastic", rate: 12.5 }, { item: "quickwire", rate: 37.5 }]
  },
  {
    // Updated in 1.0: 20 Rubber + 40 Petroleum Coke -> 5 Circuit Board / min
    id: "electrode_circuit_board",
    name: "Alternativa: Circuito a Elettrodi (1.0)",
    nameEn: "Electrode Circuit Board",
    isAlternate: true,
    building: "assembler",
    outputItem: "circuit_board",
    outputs: [{ item: "circuit_board", rate: 5 }],
    inputs: [{ item: "rubber", rate: 20 }, { item: "petroleum_coke", rate: 40 }]
  },

  // --- AI LIMITER ---
  {
    // Updated in 1.0: 25 Copper Sheet + 100 Quickwire -> 5 AI Limiter / min
    id: "ai_limiter_standard",
    name: "Standard: Limitatore IA (1.0)",
    nameEn: "AI Limiter",
    isAlternate: false,
    building: "assembler",
    outputItem: "ai_limiter",
    outputs: [{ item: "ai_limiter", rate: 5 }],
    inputs: [{ item: "copper_sheet", rate: 25 }, { item: "quickwire", rate: 100 }]
  },
  {
    // Updated in 1.0: 28 Plastic + 120 Quickwire -> 8 AI Limiter / min
    id: "plastic_ai_limiter",
    name: "Alternativa: Limitatore IA in Plastica (1.0)",
    nameEn: "Plastic AI Limiter",
    isAlternate: true,
    building: "assembler",
    outputItem: "ai_limiter",
    outputs: [{ item: "ai_limiter", rate: 8 }],
    inputs: [{ item: "plastic", rate: 28 }, { item: "quickwire", rate: 120 }]
  },

  // --- COMPUTER ---
  {
    // HUGE 1.0 OVERHAUL: NO SCREWS! 10 Circuit Board + 20 Cable + 40 Plastic -> 2.5 Computer / min
    id: "computer_standard",
    name: "Standard: Computer (1.0 - Senza Viti!)",
    nameEn: "Computer",
    isAlternate: false,
    building: "manufacturer",
    outputItem: "computer",
    outputs: [{ item: "computer", rate: 2.5 }],
    inputs: [
      { item: "circuit_board", rate: 10 },
      { item: "cable", rate: 20 },
      { item: "plastic", rate: 40 }
    ]
  },
  {
    // Updated in 1.0: 15 Circuit Board + 52.5 Quickwire + 22.5 Rubber -> 3.75 Computer / min
    id: "caterium_computer",
    name: "Alternativa: Computer al Caterium (1.0)",
    nameEn: "Caterium Computer",
    isAlternate: true,
    building: "manufacturer",
    outputItem: "computer",
    outputs: [{ item: "computer", rate: 3.75 }],
    inputs: [
      { item: "circuit_board", rate: 15 },
      { item: "quickwire", rate: 52.5 },
      { item: "rubber", rate: 22.5 }
    ]
  },
  {
    // Updated in 1.0: 5 Circuit Board + 1.67 Crystal Oscillator -> 1.67 Computer / min (Assembler)
    id: "crystal_computer",
    name: "Alternativa: Computer al Cristallo (1.0)",
    nameEn: "Crystal Computer",
    isAlternate: true,
    building: "assembler",
    outputItem: "computer",
    outputs: [{ item: "computer", rate: 1.67 }],
    inputs: [
      { item: "circuit_board", rate: 5 },
      { item: "crystal_oscillator", rate: 1.67 }
    ]
  },

  // --- SUPERCOMPUTER ---
  {
    // Updated in 1.0: 7.5 Computer + 3.75 AI Limiter + 5.625 High-Speed Connector + 52.5 Plastic -> 1.875 Supercomputer / min
    id: "supercomputer_standard",
    name: "Standard: Supercomputer (1.0)",
    nameEn: "Supercomputer",
    isAlternate: false,
    building: "manufacturer",
    outputItem: "supercomputer",
    outputs: [{ item: "supercomputer", rate: 1.875 }],
    inputs: [
      { item: "computer", rate: 7.5 },
      { item: "ai_limiter", rate: 3.75 },
      { item: "high_speed_connector", rate: 5.625 },
      { item: "plastic", rate: 52.5 }
    ]
  },
  {
    // 6 RCU + 6 Cooling System -> 3 Supercomputer / min (Assembler)
    id: "oc_supercomputer",
    name: "Alternativa: Supercomputer Overclockato (1.0)",
    nameEn: "OC Supercomputer",
    isAlternate: true,
    building: "assembler",
    outputItem: "supercomputer",
    outputs: [{ item: "supercomputer", rate: 3 }],
    inputs: [
      { item: "radio_control_unit", rate: 6 },
      { item: "cooling_system", rate: 6 }
    ]
  },
  {
    // 7.2 Computer + 2.4 Electromagnetic Control Rod + 24 Battery + 60 Wire -> 2.4 Supercomputer / min
    id: "super_state_computer",
    name: "Alternativa: Computer a Stato Solido (1.0)",
    nameEn: "Super-State Computer",
    isAlternate: true,
    building: "manufacturer",
    outputItem: "supercomputer",
    outputs: [{ item: "supercomputer", rate: 2.4 }],
    inputs: [
      { item: "computer", rate: 7.2 },
      { item: "electromagnetic_control_rod", rate: 2.4 },
      { item: "battery", rate: 24 },
      { item: "wire", rate: 60 }
    ]
  },

  // --- HIGH-SPEED CONNECTOR ---
  {
    // 210 Quickwire + 37.5 Cable + 3.75 Circuit Board -> 3.75 HSC / min
    id: "high_speed_connector_standard",
    name: "Standard: Connettore ad Alta Velocità (1.0)",
    nameEn: "High-Speed Connector",
    isAlternate: false,
    building: "manufacturer",
    outputItem: "high_speed_connector",
    outputs: [{ item: "high_speed_connector", rate: 3.75 }],
    inputs: [
      { item: "quickwire", rate: 210 },
      { item: "cable", rate: 37.5 },
      { item: "circuit_board", rate: 3.75 }
    ]
  },
  {
    id: "silicon_high_speed_connector",
    name: "Alternativa: Connettore al Silicio",
    nameEn: "Silicon High-Speed Connector",
    isAlternate: true,
    building: "manufacturer",
    outputItem: "high_speed_connector",
    outputs: [{ item: "high_speed_connector", rate: 3 }],
    inputs: [
      { item: "quickwire", rate: 90 },
      { item: "silica", rate: 37.5 },
      { item: "circuit_board", rate: 3 }
    ]
  },

  // --- RADIO CONTROL UNIT ---
  {
    // Updated in 1.0: 40 Aluminum Casing + 1.25 Crystal Oscillator + 2.5 Computer -> 2.5 RCU / min
    id: "radio_control_unit_standard",
    name: "Standard: Unità di Controllo Radio (1.0)",
    nameEn: "Radio Control Unit",
    isAlternate: false,
    building: "manufacturer",
    outputItem: "radio_control_unit",
    outputs: [{ item: "radio_control_unit", rate: 2.5 }],
    inputs: [
      { item: "aluminum_casing", rate: 40 },
      { item: "crystal_oscillator", rate: 1.25 },
      { item: "computer", rate: 2.5 }
    ]
  },
  {
    id: "radio_connection_unit",
    name: "Alternativa: Unità di Connessione Radio",
    nameEn: "Radio Connection Unit",
    isAlternate: true,
    building: "manufacturer",
    outputItem: "radio_control_unit",
    outputs: [{ item: "radio_control_unit", rate: 3.75 }],
    inputs: [
      { item: "heat_sink", rate: 15 },
      { item: "high_speed_connector", rate: 7.5 },
      { item: "quartz_crystal", rate: 45 }
    ]
  },
  {
    // Updated in 1.0: 1.5 Crystal Oscillator + 15 Circuit Board + 90 Aluminum Casing + 45 Rubber -> 4.5 RCU / min
    id: "radio_control_system",
    name: "Alternativa: Sistema di Controllo Radio (1.0)",
    nameEn: "Radio Control System",
    isAlternate: true,
    building: "manufacturer",
    outputItem: "radio_control_unit",
    outputs: [{ item: "radio_control_unit", rate: 4.5 }],
    inputs: [
      { item: "crystal_oscillator", rate: 1.5 },
      { item: "circuit_board", rate: 15 },
      { item: "aluminum_casing", rate: 90 },
      { item: "rubber", rate: 45 }
    ]
  },

  // --- CRYSTAL OSCILLATOR ---
  {
    // Updated in 1.0: 18 Quartz Crystal + 14 Cable + 2.5 Reinforced Iron Plate -> 1 Crystal Oscillator / min
    id: "crystal_oscillator_standard",
    name: "Standard: Oscillatore a Cristallo (1.0)",
    nameEn: "Crystal Oscillator",
    isAlternate: false,
    building: "manufacturer",
    outputItem: "crystal_oscillator",
    outputs: [{ item: "crystal_oscillator", rate: 1 }],
    inputs: [
      { item: "quartz_crystal", rate: 18 },
      { item: "cable", rate: 14 },
      { item: "reinforced_iron_plate", rate: 2.5 }
    ]
  },
  {
    id: "insulated_crystal_oscillator",
    name: "Alternativa: Oscillatore Isolato",
    nameEn: "Insulated Crystal Oscillator",
    isAlternate: true,
    building: "manufacturer",
    outputItem: "crystal_oscillator",
    outputs: [{ item: "crystal_oscillator", rate: 1.875 }],
    inputs: [
      { item: "quartz_crystal", rate: 18.75 },
      { item: "rubber", rate: 13.125 },
      { item: "ai_limiter", rate: 1.875 }
    ]
  },

  // --- QUARTZ CRYSTAL & SILICA ---
  {
    id: "quartz_crystal_standard",
    name: "Standard: Cristallo di Quarzo",
    nameEn: "Quartz Crystal",
    isAlternate: false,
    building: "constructor",
    outputItem: "quartz_crystal",
    outputs: [{ item: "quartz_crystal", rate: 22.5 }],
    inputs: [{ item: "raw_quartz", rate: 37.5 }]
  },
  {
    id: "pure_quartz_crystal",
    name: "Alternativa: Cristallo di Quarzo Puro",
    nameEn: "Pure Quartz Crystal",
    isAlternate: true,
    building: "refinery",
    outputItem: "quartz_crystal",
    outputs: [{ item: "quartz_crystal", rate: 52.5 }],
    inputs: [{ item: "raw_quartz", rate: 67.5 }, { item: "water", rate: 37.5 }]
  },
  {
    id: "silica_standard",
    name: "Standard: Silice",
    nameEn: "Silica",
    isAlternate: false,
    building: "constructor",
    outputItem: "silica",
    outputs: [{ item: "silica", rate: 37.5 }],
    inputs: [{ item: "raw_quartz", rate: 22.5 }]
  },
  {
    // Updated in 1.0: 22.5 Raw Quartz + 37.5 Limestone -> 52.5 Silica / min
    id: "cheap_silica",
    name: "Alternativa: Silice Economica (1.0)",
    nameEn: "Cheap Silica",
    isAlternate: true,
    building: "assembler",
    outputItem: "silica",
    outputs: [{ item: "silica", rate: 52.5 }],
    inputs: [{ item: "raw_quartz", rate: 22.5 }, { item: "limestone", rate: 37.5 }]
  },

  // --- ALUMINUM CHAIN ---
  {
    id: "alumina_solution_standard",
    name: "Standard: Soluzione di Allumina",
    nameEn: "Alumina Solution",
    isAlternate: false,
    building: "refinery",
    outputItem: "alumina_solution",
    outputs: [{ item: "alumina_solution", rate: 120 }, { item: "silica", rate: 50 }],
    inputs: [{ item: "bauxite", rate: 120 }, { item: "water", rate: 180 }]
  },
  {
    id: "sloppy_alumina",
    name: "Alternativa: Allumina Semplice (Sloppy)",
    nameEn: "Sloppy Alumina",
    isAlternate: true,
    building: "refinery",
    outputItem: "alumina_solution",
    outputs: [{ item: "alumina_solution", rate: 240 }],
    inputs: [{ item: "bauxite", rate: 200 }, { item: "water", rate: 200 }]
  },
  {
    id: "aluminum_scrap_standard",
    name: "Standard: Scarti d'Alluminio",
    nameEn: "Aluminum Scrap",
    isAlternate: false,
    building: "refinery",
    outputItem: "aluminum_scrap",
    outputs: [{ item: "aluminum_scrap", rate: 360 }],
    inputs: [{ item: "alumina_solution", rate: 240 }, { item: "coal", rate: 120 }]
  },
  {
    id: "electrode_aluminum_scrap",
    name: "Alternativa: Scarti d'Alluminio a Elettrodi",
    nameEn: "Electrode Aluminum Scrap",
    isAlternate: true,
    building: "refinery",
    outputItem: "aluminum_scrap",
    outputs: [{ item: "aluminum_scrap", rate: 300 }],
    inputs: [{ item: "alumina_solution", rate: 180 }, { item: "petroleum_coke", rate: 60 }]
  },
  {
    id: "instant_scrap",
    name: "Alternativa: Scarti Istantanei",
    nameEn: "Instant Scrap",
    isAlternate: true,
    building: "blender",
    outputItem: "aluminum_scrap",
    outputs: [{ item: "aluminum_scrap", rate: 300 }],
    inputs: [
      { item: "bauxite", rate: 150 },
      { item: "coal", rate: 100 },
      { item: "sulfuric_acid", rate: 50 },
      { item: "water", rate: 60 }
    ]
  },
  {
    id: "alclad_aluminum_sheet_standard",
    name: "Standard: Lastra d'Alluminio Alclad",
    nameEn: "Alclad Aluminum Sheet",
    isAlternate: false,
    building: "assembler",
    outputItem: "alclad_aluminum_sheet",
    outputs: [{ item: "alclad_aluminum_sheet", rate: 30 }],
    inputs: [{ item: "aluminum_ingot", rate: 30 }, { item: "copper_ingot", rate: 10 }]
  },
  {
    id: "aluminum_casing_standard",
    name: "Standard: Involucro d'Alluminio",
    nameEn: "Aluminum Casing",
    isAlternate: false,
    building: "constructor",
    outputItem: "aluminum_casing",
    outputs: [{ item: "aluminum_casing", rate: 60 }],
    inputs: [{ item: "aluminum_ingot", rate: 90 }]
  },
  {
    id: "alclad_casing",
    name: "Alternativa: Involucro Alclad",
    nameEn: "Alclad Casing",
    isAlternate: true,
    building: "assembler",
    outputItem: "aluminum_casing",
    outputs: [{ item: "aluminum_casing", rate: 112.5 }],
    inputs: [{ item: "aluminum_ingot", rate: 150 }, { item: "copper_ingot", rate: 75 }]
  },

  // --- HEAT SINK & COOLING SYSTEM ---
  {
    id: "heat_sink_standard",
    name: "Standard: Dissipatore Termico",
    nameEn: "Heat Sink",
    isAlternate: false,
    building: "assembler",
    outputItem: "heat_sink",
    outputs: [{ item: "heat_sink", rate: 7.5 }],
    inputs: [{ item: "alclad_aluminum_sheet", rate: 37.5 }, { item: "copper_sheet", rate: 22.5 }]
  },
  {
    id: "heat_exchanger",
    name: "Alternativa: Scambiatore di Calore",
    nameEn: "Heat Exchanger",
    isAlternate: true,
    building: "assembler",
    outputItem: "heat_sink",
    outputs: [{ item: "heat_sink", rate: 10 }],
    inputs: [{ item: "aluminum_casing", rate: 30 }, { item: "rubber", rate: 30 }]
  },
  {
    // Updated in 1.0: 12 Heat Sink + 12 Rubber + 30 Water + 150 Nitrogen Gas -> 6 Cooling System / min
    id: "cooling_system_standard",
    name: "Standard: Sistema di Raffreddamento (1.0)",
    nameEn: "Cooling System",
    isAlternate: false,
    building: "blender",
    outputItem: "cooling_system",
    outputs: [{ item: "cooling_system", rate: 6 }],
    inputs: [
      { item: "heat_sink", rate: 12 },
      { item: "rubber", rate: 12 },
      { item: "water", rate: 30 },
      { item: "nitrogen_gas", rate: 150 }
    ]
  },
  {
    // Updated in 1.0: Blender, 10 Heat Sink + 2.5 Motor + 60 Nitrogen Gas -> 5 Cooling System / min
    id: "cooling_device",
    name: "Alternativa: Dispositivo di Raffreddamento (1.0)",
    nameEn: "Cooling Device",
    isAlternate: true,
    building: "blender",
    outputItem: "cooling_system",
    outputs: [{ item: "cooling_system", rate: 5 }],
    inputs: [
      { item: "heat_sink", rate: 10 },
      { item: "motor", rate: 2.5 },
      { item: "nitrogen_gas", rate: 60 }
    ]
  },

  // --- TURBO MOTOR ---
  {
    // Updated in 1.0: 7.5 Motor + 3.75 Radio Control Unit + 7.5 Cooling System + 45 Rubber -> 1.875 Turbo Motor / min
    id: "turbo_motor_standard",
    name: "Standard: Turbo Motore (1.0)",
    nameEn: "Turbo Motor",
    isAlternate: false,
    building: "manufacturer",
    outputItem: "turbo_motor",
    outputs: [{ item: "turbo_motor", rate: 1.875 }],
    inputs: [
      { item: "motor", rate: 7.5 },
      { item: "radio_control_unit", rate: 3.75 },
      { item: "cooling_system", rate: 7.5 },
      { item: "rubber", rate: 45 }
    ]
  },
  {
    // Updated in 1.0: 6.5625 Motor + 8.4375 Radio Control Unit + 4.6875 Electromagnetic Control Rod + 6.5625 Rotor -> 2.8125 Turbo Motor / min
    id: "turbo_electric_motor",
    name: "Alternativa: Turbo Motore Elettrico (1.0)",
    nameEn: "Turbo Electric Motor",
    isAlternate: true,
    building: "manufacturer",
    outputItem: "turbo_motor",
    outputs: [{ item: "turbo_motor", rate: 2.8125 }],
    inputs: [
      { item: "motor", rate: 6.5625 },
      { item: "radio_control_unit", rate: 8.4375 },
      { item: "electromagnetic_control_rod", rate: 4.6875 },
      { item: "rotor", rate: 6.5625 }
    ]
  },
  {
    // Updated in 1.0: 7.5 Motor + 1.875 Pressure Conversion Cube + 45 Nitrogen Gas + 15 Stator -> 3.75 Turbo Motor / min
    id: "turbo_pressure_motor",
    name: "Alternativa: Turbo Motore a Pressione (1.0)",
    nameEn: "Turbo Pressure Motor",
    isAlternate: true,
    building: "manufacturer",
    outputItem: "turbo_motor",
    outputs: [{ item: "turbo_motor", rate: 3.75 }],
    inputs: [
      { item: "motor", rate: 7.5 },
      { item: "pressure_conversion_cube", rate: 1.875 },
      { item: "nitrogen_gas", rate: 45 },
      { item: "stator", rate: 15 }
    ]
  },

  // --- ELECTROMAGNETIC CONTROL ROD & BATTERY ---
  {
    id: "electromagnetic_control_rod_standard",
    name: "Standard: Barra Elettromagnetica",
    nameEn: "Electromagnetic Control Rod",
    isAlternate: false,
    building: "assembler",
    outputItem: "electromagnetic_control_rod",
    outputs: [{ item: "electromagnetic_control_rod", rate: 4 }],
    inputs: [{ item: "stator", rate: 6 }, { item: "ai_limiter", rate: 4 }]
  },
  {
    id: "electromagnetic_connection_rod",
    name: "Alternativa: Barra di Connessione Elettromagnetica",
    nameEn: "Electromagnetic Connection Rod",
    isAlternate: true,
    building: "assembler",
    outputItem: "electromagnetic_control_rod",
    outputs: [{ item: "electromagnetic_control_rod", rate: 8 }],
    inputs: [{ item: "stator", rate: 8 }, { item: "high_speed_connector", rate: 4 }]
  },
  {
    id: "battery_standard",
    name: "Standard: Batteria",
    nameEn: "Battery",
    isAlternate: false,
    building: "blender",
    outputItem: "battery",
    outputs: [{ item: "battery", rate: 20 }],
    inputs: [
      { item: "sulfuric_acid", rate: 50 },
      { item: "alumina_solution", rate: 40 },
      { item: "aluminum_casing", rate: 20 }
    ]
  },
  {
    // Updated in 1.0: 45 Sulfur + 52.5 Alclad Sheet + 60 Plastic + 90 Wire -> 30 Battery / min
    id: "classic_battery",
    name: "Alternativa: Batteria Classica (1.0)",
    nameEn: "Classic Battery",
    isAlternate: true,
    building: "manufacturer",
    outputItem: "battery",
    outputs: [{ item: "battery", rate: 30 }],
    inputs: [
      { item: "sulfur", rate: 45 },
      { item: "alclad_aluminum_sheet", rate: 52.5 },
      { item: "plastic", rate: 60 },
      { item: "wire", rate: 90 }
    ]
  },

  // --- PETROCHEMICALS ---
  {
    id: "plastic_standard",
    name: "Standard: Plastica",
    nameEn: "Plastic",
    isAlternate: false,
    building: "refinery",
    outputItem: "plastic",
    outputs: [{ item: "plastic", rate: 20 }, { item: "heavy_oil_residue", rate: 10 }],
    inputs: [{ item: "crude_oil", rate: 30 }]
  },
  {
    id: "recycled_plastic",
    name: "Alternativa: Plastica Riciclata",
    nameEn: "Recycled Plastic",
    isAlternate: true,
    building: "refinery",
    outputItem: "plastic",
    outputs: [{ item: "plastic", rate: 60 }],
    inputs: [{ item: "fuel", rate: 30 }, { item: "rubber", rate: 30 }]
  },
  {
    id: "residual_plastic",
    name: "Alternativa: Plastica Residua",
    nameEn: "Residual Plastic",
    isAlternate: true,
    building: "refinery",
    outputItem: "plastic",
    outputs: [{ item: "plastic", rate: 20 }],
    inputs: [{ item: "polymer_resin", rate: 60 }, { item: "water", rate: 20 }]
  },
  {
    id: "rubber_standard",
    name: "Standard: Gomma",
    nameEn: "Rubber",
    isAlternate: false,
    building: "refinery",
    outputItem: "rubber",
    outputs: [{ item: "rubber", rate: 20 }, { item: "heavy_oil_residue", rate: 20 }],
    inputs: [{ item: "crude_oil", rate: 30 }]
  },
  {
    id: "recycled_rubber",
    name: "Alternativa: Gomma Riciclata",
    nameEn: "Recycled Rubber",
    isAlternate: true,
    building: "refinery",
    outputItem: "rubber",
    outputs: [{ item: "rubber", rate: 60 }],
    inputs: [{ item: "fuel", rate: 30 }, { item: "plastic", rate: 30 }]
  },
  {
    id: "residual_rubber",
    name: "Alternativa: Gomma Residua",
    nameEn: "Residual Rubber",
    isAlternate: true,
    building: "refinery",
    outputItem: "rubber",
    outputs: [{ item: "rubber", rate: 20 }],
    inputs: [{ item: "polymer_resin", rate: 40 }, { item: "water", rate: 40 }]
  },
  {
    id: "fuel_standard",
    name: "Standard: Carburante",
    nameEn: "Fuel",
    isAlternate: false,
    building: "refinery",
    outputItem: "fuel",
    outputs: [{ item: "fuel", rate: 40 }, { item: "polymer_resin", rate: 30 }],
    inputs: [{ item: "crude_oil", rate: 60 }]
  },
  {
    id: "residual_fuel",
    name: "Alternativa: Carburante Residuo",
    nameEn: "Residual Fuel",
    isAlternate: true,
    building: "refinery",
    outputItem: "fuel",
    outputs: [{ item: "fuel", rate: 40 }],
    inputs: [{ item: "heavy_oil_residue", rate: 60 }]
  },
  {
    id: "diluted_fuel",
    name: "Alternativa: Carburante Diluito",
    nameEn: "Diluted Fuel",
    isAlternate: true,
    building: "blender",
    outputItem: "fuel",
    outputs: [{ item: "fuel", rate: 100 }],
    inputs: [{ item: "heavy_oil_residue", rate: 50 }, { item: "water", rate: 100 }]
  },
  {
    id: "heavy_oil_residue_standard",
    name: "Standard: Residuo di Olio Pesante",
    nameEn: "Heavy Oil Residue",
    isAlternate: false,
    building: "refinery",
    outputItem: "heavy_oil_residue",
    outputs: [{ item: "heavy_oil_residue", rate: 40 }, { item: "polymer_resin", rate: 20 }],
    inputs: [{ item: "crude_oil", rate: 30 }]
  },
  {
    id: "petroleum_coke_standard",
    name: "Standard: Coke di Petrolio",
    nameEn: "Petroleum Coke",
    isAlternate: false,
    building: "refinery",
    outputItem: "petroleum_coke",
    outputs: [{ item: "petroleum_coke", rate: 120 }],
    inputs: [{ item: "heavy_oil_residue", rate: 40 }]
  },
  {
    id: "sulfuric_acid_standard",
    name: "Standard: Acido Solforico",
    nameEn: "Sulfuric Acid",
    isAlternate: false,
    building: "refinery",
    outputItem: "sulfuric_acid",
    outputs: [{ item: "sulfuric_acid", rate: 50 }],
    inputs: [{ item: "sulfur", rate: 50 }, { item: "water", rate: 50 }]
  },
  {
    id: "nitric_acid_standard",
    name: "Standard: Acido Nitrico",
    nameEn: "Nitric Acid",
    isAlternate: false,
    building: "blender",
    outputItem: "nitric_acid",
    outputs: [{ item: "nitric_acid", rate: 30 }],
    inputs: [
      { item: "nitrogen_gas", rate: 120 },
      { item: "water", rate: 30 },
      { item: "iron_plate", rate: 10 }
    ]
  },
  {
    id: "compacted_coal_standard",
    name: "Standard: Carbone Compatto",
    nameEn: "Compacted Coal",
    isAlternate: false,
    building: "assembler",
    outputItem: "compacted_coal",
    outputs: [{ item: "compacted_coal", rate: 25 }],
    inputs: [{ item: "coal", rate: 25 }, { item: "sulfur", rate: 25 }]
  },

  // --- SPACE ELEVATOR COMPONENTS ---
  {
    id: "smart_plating_standard",
    name: "Standard: Placcatura Intelligente (Fase 1)",
    nameEn: "Smart Plating",
    isAlternate: false,
    building: "assembler",
    outputItem: "smart_plating",
    outputs: [{ item: "smart_plating", rate: 2 }],
    inputs: [{ item: "reinforced_iron_plate", rate: 2 }, { item: "rotor", rate: 2 }]
  },
  {
    id: "plastic_smart_plating",
    name: "Alternativa: Placcatura in Plastica",
    nameEn: "Plastic Smart Plating",
    isAlternate: true,
    building: "manufacturer",
    outputItem: "smart_plating",
    outputs: [{ item: "smart_plating", rate: 5 }],
    inputs: [
      { item: "reinforced_iron_plate", rate: 2.5 },
      { item: "rotor", rate: 2.5 },
      { item: "plastic", rate: 7.5 }
    ]
  },
  {
    id: "versatile_framework_standard",
    name: "Standard: Struttura Versatile (Fase 2)",
    nameEn: "Versatile Framework",
    isAlternate: false,
    building: "assembler",
    outputItem: "versatile_framework",
    outputs: [{ item: "versatile_framework", rate: 5 }],
    inputs: [{ item: "modular_frame", rate: 2.5 }, { item: "steel_beam", rate: 30 }]
  },
  {
    id: "flexible_framework",
    name: "Alternativa: Struttura Flessibile",
    nameEn: "Flexible Framework",
    isAlternate: true,
    building: "manufacturer",
    outputItem: "versatile_framework",
    outputs: [{ item: "versatile_framework", rate: 7.5 }],
    inputs: [
      { item: "modular_frame", rate: 3.75 },
      { item: "steel_beam", rate: 22.5 },
      { item: "rubber", rate: 15 }
    ]
  },
  {
    id: "automated_wiring_standard",
    name: "Standard: Cablaggio Automatizzato (Fase 2)",
    nameEn: "Automated Wiring",
    isAlternate: false,
    building: "assembler",
    outputItem: "automated_wiring",
    outputs: [{ item: "automated_wiring", rate: 2.5 }],
    inputs: [{ item: "stator", rate: 2.5 }, { item: "cable", rate: 50 }]
  },
  {
    id: "automated_speed_wiring",
    name: "Alternativa: Cablaggio Rapido Automatizzato",
    nameEn: "Automated Speed Wiring",
    isAlternate: true,
    building: "manufacturer",
    outputItem: "automated_wiring",
    outputs: [{ item: "automated_wiring", rate: 7.5 }],
    inputs: [
      { item: "stator", rate: 3.75 },
      { item: "wire", rate: 30 },
      { item: "high_speed_connector", rate: 10.5 }
    ]
  },
  {
    id: "modular_engine_standard",
    name: "Standard: Motore Modulare (Fase 3)",
    nameEn: "Modular Engine",
    isAlternate: false,
    building: "manufacturer",
    outputItem: "modular_engine",
    outputs: [{ item: "modular_engine", rate: 1 }],
    inputs: [
      { item: "motor", rate: 2 },
      { item: "rubber", rate: 15 },
      { item: "smart_plating", rate: 2 }
    ]
  },
  {
    // Updated in 1.0: 5 Automated Wiring + 5 Circuit Board + 1 Heavy Modular Frame + 2 Computer -> 1 Adaptive Control Unit / min
    id: "adaptive_control_unit_standard",
    name: "Standard: Unità di Controllo Adattiva (1.0)",
    nameEn: "Adaptive Control Unit",
    isAlternate: false,
    building: "manufacturer",
    outputItem: "adaptive_control_unit",
    outputs: [{ item: "adaptive_control_unit", rate: 1 }],
    inputs: [
      { item: "automated_wiring", rate: 5 },
      { item: "circuit_board", rate: 5 },
      { item: "heavy_modular_frame", rate: 1 },
      { item: "computer", rate: 2 }
    ]
  },
  {
    // 1.5 ACU + 0.75 Supercomputer -> 0.75 Assembly Director System / min
    id: "assembly_director_system_standard",
    name: "Standard: Sistema Direttore di Assemblaggio (1.0)",
    nameEn: "Assembly Director System",
    isAlternate: false,
    building: "assembler",
    outputItem: "assembly_director_system",
    outputs: [{ item: "assembly_director_system", rate: 0.75 }],
    inputs: [
      { item: "adaptive_control_unit", rate: 1.5 },
      { item: "supercomputer", rate: 0.75 }
    ]
  },
  {
    // Updated in 1.0: Assembler! 2.5 Versatile Framework + 1 Electromagnetic Control Rod -> 1 Magnetic Field Generator / min (No Battery!)
    id: "magnetic_field_generator_standard",
    name: "Standard: Generatore di Campo Magnetico (1.0)",
    nameEn: "Magnetic Field Generator",
    isAlternate: false,
    building: "assembler",
    outputItem: "magnetic_field_generator",
    outputs: [{ item: "magnetic_field_generator", rate: 1 }],
    inputs: [
      { item: "versatile_framework", rate: 2.5 },
      { item: "electromagnetic_control_rod", rate: 1 }
    ]
  },
  {
    // Updated in 1.0: 2.5 Modular Engine + 1 Turbo Motor + 1 Fused Modular Frame + 3 Cooling System -> 1 Thermal Propulsion Rocket / min
    id: "thermal_propulsion_rocket_standard",
    name: "Standard: Razzo a Propulsione Termica (1.0)",
    nameEn: "Thermal Propulsion Rocket",
    isAlternate: false,
    building: "manufacturer",
    outputItem: "thermal_propulsion_rocket",
    outputs: [{ item: "thermal_propulsion_rocket", rate: 1 }],
    inputs: [
      { item: "modular_engine", rate: 2.5 },
      { item: "turbo_motor", rate: 1 },
      { item: "fused_modular_frame", rate: 1 },
      { item: "cooling_system", rate: 3 }
    ]
  },
  {
    // 100 Copper Powder + 0.5 Pressure Conversion Cube -> 0.5 Nuclear Pasta / min (Particle Accelerator)
    id: "nuclear_pasta_standard",
    name: "Standard: Pasta Nucleare (Fase 4)",
    nameEn: "Nuclear Pasta",
    isAlternate: false,
    building: "particle_accelerator",
    outputItem: "nuclear_pasta",
    outputs: [{ item: "nuclear_pasta", rate: 0.5 }],
    inputs: [
      { item: "copper_powder", rate: 100 },
      { item: "pressure_conversion_cube", rate: 0.5 }
    ]
  },
  {
    id: "copper_powder_standard",
    name: "Standard: Polvere di Rame",
    nameEn: "Copper Powder",
    isAlternate: false,
    building: "constructor",
    outputItem: "copper_powder",
    outputs: [{ item: "copper_powder", rate: 50 }],
    inputs: [{ item: "copper_ingot", rate: 300 }]
  },
  {
    id: "pressure_conversion_cube_standard",
    name: "Standard: Cubo di Conversione di Pressione",
    nameEn: "Pressure Conversion Cube",
    isAlternate: false,
    building: "assembler",
    outputItem: "pressure_conversion_cube",
    outputs: [{ item: "pressure_conversion_cube", rate: 1 }],
    inputs: [
      { item: "fused_modular_frame", rate: 1 },
      { item: "radio_control_unit", rate: 2 }
    ]
  },
  {
    id: "dark_matter_residue_standard",
    name: "Standard: Residuo di Materia Oscura (1.0)",
    nameEn: "Dark Matter Residue",
    isAlternate: false,
    building: "particle_accelerator",
    outputItem: "dark_matter_residue",
    outputs: [{ item: "dark_matter_residue", rate: 100 }],
    inputs: [{ item: "sam", rate: 10 }]
  },
  {
    id: "singularity_cell_standard",
    name: "Standard: Cella di Singolarità (Fase 5)",
    nameEn: "Singularity Cell",
    isAlternate: false,
    building: "particle_accelerator",
    outputItem: "singularity_cell",
    outputs: [{ item: "singularity_cell", rate: 1 }],
    inputs: [
      { item: "nuclear_pasta", rate: 1 },
      { item: "dark_matter_residue", rate: 20 },
      { item: "iron_plate", rate: 100 }
    ]
  }
];

// Helper maps
const RECIPES_BY_ITEM = {};
RECIPES.forEach(r => {
  if (!RECIPES_BY_ITEM[r.outputItem]) {
    RECIPES_BY_ITEM[r.outputItem] = [];
  }
  RECIPES_BY_ITEM[r.outputItem].push(r);
});

// Default recipe for an item is the first standard recipe (or first recipe if no standard)
const DEFAULT_RECIPES = {};
Object.keys(ITEMS).forEach(itemId => {
  const recipes = RECIPES_BY_ITEM[itemId];
  if (recipes && recipes.length > 0) {
    const standard = recipes.find(r => !r.isAlternate);
    DEFAULT_RECIPES[itemId] = standard ? standard.id : recipes[0].id;
  }
});

// Helper functions for rendering game icons with fallback
function renderItemIcon(itemOrId, className = "game-icon") {
  const item = typeof itemOrId === "string" ? ITEMS[itemOrId] : itemOrId;
  if (!item) return `<span class="${className}">📦</span>`;
  const localUrl = item.iconUrl || `assets/images/items/${item.id}.png`;
  const remoteUrl = item.remoteIconUrl || "";
  const emoji = item.emoji || "📦";
  const name = item.name || "";
  return `
    <span class="icon-frame" title="${name}">
      <img src="${localUrl}" alt="${name}" class="${className}" referrerpolicy="no-referrer" loading="lazy" onerror="if (!this.dataset.fallbackTried && '${remoteUrl}') { this.dataset.fallbackTried = '1'; this.src = '${remoteUrl}'; } else { this.style.display = 'none'; if (this.nextElementSibling) this.nextElementSibling.style.display = 'inline-block'; }" />
      <span class="emoji-fallback" style="display:none;">${emoji}</span>
    </span>
  `;
}

function renderBuildingIcon(buildingOrId, className = "game-icon") {
  const b = typeof buildingOrId === "string" ? BUILDINGS[buildingOrId] : buildingOrId;
  if (!b) return `<span class="${className}">🏭</span>`;
  const localUrl = b.iconUrl || `assets/images/buildings/${b.id}.png`;
  const remoteUrl = b.remoteIconUrl || "";
  const emoji = b.emoji || "🏭";
  const name = b.name || "";
  return `
    <span class="icon-frame" title="${name}">
      <img src="${localUrl}" alt="${name}" class="${className}" referrerpolicy="no-referrer" loading="lazy" onerror="if (!this.dataset.fallbackTried && '${remoteUrl}') { this.dataset.fallbackTried = '1'; this.src = '${remoteUrl}'; } else { this.style.display = 'none'; if (this.nextElementSibling) this.nextElementSibling.style.display = 'inline-block'; }" />
      <span class="emoji-fallback" style="display:none;">${emoji}</span>
    </span>
  `;
}


// Export to window for browser
if (typeof window !== "undefined") {
  window.BUILDINGS = BUILDINGS;
  window.LOGISTICS = LOGISTICS;
  window.CATEGORIES = CATEGORIES;
  window.ITEMS = ITEMS;
  window.RECIPES = RECIPES;
  window.RECIPES_BY_ITEM = RECIPES_BY_ITEM;
  window.DEFAULT_RECIPES = DEFAULT_RECIPES;
  window.renderItemIcon = renderItemIcon;
  window.renderBuildingIcon = renderBuildingIcon;

  window.gameData = {
    BUILDINGS,
    LOGISTICS,
    CATEGORIES,
    ITEMS,
    RECIPES,
    RECIPES_BY_ITEM,
    DEFAULT_RECIPES,
    renderItemIcon,
    renderBuildingIcon
  };
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    BUILDINGS,
    LOGISTICS,
    CATEGORIES,
    ITEMS,
    RECIPES,
    RECIPES_BY_ITEM,
    DEFAULT_RECIPES,
    renderItemIcon,
    renderBuildingIcon
  };
}
