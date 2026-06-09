// Datos del juego usando arreglos y objetos ES6+ estructurados
const minecraftItems = [
    { 
        id: 'diamond_block', 
        image: 'images/bloque_diamante.webp', 
        concept: 'Destructuring (Objetos)', 
        code: 'const block = { type: "💎", level: 4 };\nconst { type, level } = block;\nconsole.log(type); // Resultado: "💎"' 
    },
    { 
        id: 'pickaxe', 
        image: 'images/pico_diamante.webp', 
        concept: 'Arrow Functions (Funciones Flecha)', 
        code: 'const mine = (block) => `Picando bloque de ${block}`;\nconsole.log(mine("💎")); // "Picando bloque de 💎"' 
    },
    { 
        id: 'tnt', 
        image: 'images/tnt.webp', 
        concept: 'Template Literals (Plantillas de cadena)', 
        code: 'const power = 100;\nconst alert = `¡Peligro! TNT con poder de: ${power}💥`;\nconsole.log(alert);' 
    },
    { 
        id: 'creeper', 
        image: 'images/creeper.webp', 
        concept: 'Rest Parameters (...args)', 
        code: 'const explode = (...blocks) => `Destruidos: ${blocks.length} bloques`;\nconsole.log(explode("🪵", "🧱", "🌿")); // "Destruidos: 3 bloques"' 
    },
    { 
        id: 'enderman', 
        image: 'images/enderman.webp', 
        concept: 'Optional Chaining (?.)', 
        code: 'const enderman = { name: "Ender", inventory: null };\nconst block = enderman.inventory?.heldBlock;\nconsole.log(block); // Resultado: undefined (no lanza error)' 
    },
    { 
        id: 'zombie', 
        image: 'images/zombie.webp', 
        concept: 'Classes (Clases ES6)', 
        code: 'class Mob {\n  constructor(name) { this.name = name; }\n  attack() { return `${this.name} te ataca!`; }\n}\nconst zombie = new Mob("Zombie");\nconsole.log(zombie.attack()); // "Zombie te ataca!"' 
    },
    { 
        id: 'villager', 
        image: 'images/aldeano.webp', 
        concept: 'Shorthand Property Names', 
        code: 'const job = "Farming";\nconst level = 2;\nconst villager = { job, level }; // Equivale a { job: job, level: level }\nconsole.log(villager.job); // "Farming"' 
    },
    { 
        id: 'pig', 
        image: 'images/cerdo.webp', 
        concept: 'Array.prototype.find()', 
        code: 'const mobs = [{id: "🐮"}, {id: "🐷"}, {id: "🐔"}];\nconst pig = mobs.find(m => m.id === "🐷");\nconsole.log(pig); // { id: "🐷" }' 
    },
    { 
        id: 'chicken', 
        image: 'images/pollo.webp', 
        concept: 'Array.prototype.map()', 
        code: 'const eggs = [1, 2, 3];\nconst chickens = eggs.map(e => "🐔");\nconsole.log(chickens); // ["🐔", "🐔", "🐔"]' 
    },
    { 
        id: 'spider', 
        image: 'images/araña.webp', 
        concept: 'Promises (Promesas)', 
        code: 'const climbWall = () => new Promise((resolve) => {\n  setTimeout(() => resolve("¡Araña en el techo!"), 500);\n});\nclimbWall().then(console.log);' 
    },
    { 
        id: 'grass_block', 
        image: 'images/bloque_pasto.webp', 
        concept: 'Spread Operator (Arrays)', 
        code: 'const inventory = ["🧱", "🪵"];\nconst fullInventory = [...inventory, "🌿", "🌻"];\nconsole.log(fullInventory); // ["🧱", "🪵", "🌿", "🌻"]' 
    },
    { 
        id: 'stone_block', 
        image: 'images/bloque_piedra.webp', 
        concept: 'Let & Const (Scope)', 
        code: '{\n  const stone = "🪨";\n  let durability = 100;\n}\n// stone y durability no existen fuera de este bloque' 
    },
    { 
        id: 'skeleton', 
        image: 'images/esqueleto_arquero.webp', 
        concept: 'Default Parameters', 
        code: 'const shootBow = (arrows = 1) => `Disparando ${arrows} flecha(s)`;\nconsole.log(shootBow()); // "Disparando 1 flecha(s)"' 
    },
    { 
        id: 'torch', 
        image: 'images/antorcha.webp', 
        concept: 'Array.prototype.filter()', 
        code: 'const caveBlocks = ["🪨", "💎", "🪨"];\nconst ores = caveBlocks.filter(b => b === "💎");\nconsole.log(ores); // ["💎"]' 
    }
];
