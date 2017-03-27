var DEFAULT_WIDTH = 100;
var DEFAULT_HEIGHT = 100;
var IO_LINE_LENGTH = 5;

var nextId = (function () {
    var idCounter = 0;
    return function () {
        idCounter += 1;
        return idCounter;
    }
})();

class BlockBlueprint {
    constructor(name) {
        this.id = nextId();
        this.name = name;

        this.inputs = [];

        this.output = Type.createEmpty();

        // contents is either javascript text, or a Module
        this.contents = "";
    }

    /**
     * @returns {BlockBlueprint}
     */
    static create() {
        var name = "Unnamed"; // todo get unique name
        return new BlockBlueprint(name);
    }
}

class Input {
    constructor(name) {
        this.name = name;
        this.type = Type.createEmpty();
        this.isLazy = true;
    }
}

class Type {
    constructor(name) {
        this.name = name;
    }

    /**
     * @returns {Type}
     */
    static createEmpty() {
        return new Type("");
    }
}

class Block {
    constructor(blueprint_id, x, y) {
        this.blueprint_id = blueprint_id;
        this.x = x;
        this.y = y;
        this.width = DEFAULT_WIDTH;
        this.height = DEFAULT_HEIGHT;
        this.id = nextId();
        this.name = "block" + this.id; //default
        this.module = null; // the module that holds this block, it's a two way reference
    }

    /**
     * @param x {Number}
     * @param y {Number}
     * @returns {Block}
     */
    static create(x, y) {
        var blueprint = program.createEmptyBlueprint();
        return new Block(blueprint.id, x, y);
    }

    /**
     * Create a backward reference for easy lookup
     * @param module {Module}
     */
    setModule(module) {
        return this.module = module;
    }

    getModule() {
        return this.module || this.setModule(program.topLevelModule.findModuleForBlockId(this.id));
    }

    /**
     * @returns {{x: Number, y: Number}}
     */
    getOutputPosition() {
        return {
            x: this.x + this.width/2,
            y: this.y + this.height + this.getIOLineLength()
        }
    }

    getIOLineLength() {
        return IO_LINE_LENGTH;
    }


    /**
     * @returns {{x: Number, y: Number}}
     */
    getInputPosition(index) {
        var blueprint = this._getBlueprint();
        var dx = blueprint.inputs.length == 0 ?
            0 :
            (index + 1)/(blueprint.inputs.length + 1) * this.width;
        return {
            x: this.x + dx,
            y: this.y - this.getIOLineLength()
        }
    }

    addInput(input) {
        var blueprint = this._getBlueprint();
        blueprint.inputs.push(input);
    }

    getInputs() {
        return this._getBlueprint().inputs;
    }

    _getBlueprint() {
        return program.findBlueprint(this.blueprint_id);
    }
}

class GhostBlock {
    constructor(x, y) {
        this.x = x - DEFAULT_WIDTH/2;
        this.y = y - DEFAULT_HEIGHT/2;
        this.width = DEFAULT_WIDTH;
        this.height = DEFAULT_HEIGHT;
    }
}

class Connection {
    constructor(fromBlockId, toBlockId, inputIndex) {
        this.fromBlockId = fromBlockId;
        this.toBlockId = toBlockId;
        this.inputIndex = inputIndex;
    }
}

class Module {
    constructor() {
        this.connections = [];
        this.blocks = [];
    }

    /**
     * @param id {Number}
     * @returns {Block}
     */
    findBlock(id) {
        for (var i=0; i<this.blocks.length; i++) {
            if (this.blocks[i].id === id) {
                return this.blocks[i];
            }
        }
    }

    addBlock(block) {
        block.setModule(this);
        this.blocks.push(block);
    }

    findModuleForBlockId(blockId) {
        if (this.findBlock(blockId)) {
            return this;
        } else {
            throw Error("Not implemented");
            // search through child modules
        }
    }

    createConnection(fromBlock, toBlock, inputIndex) {
        var connection = new Connection(fromBlock.id, toBlock.id, inputIndex);
        this.connections.push(connection);
    }
}

class Program {
    constructor() {
        this.topLevelModule = new Module();
        this.blueprints = [];
        this.types = [];
    }

    /**
     * @param id {Number}
     * @returns {Block}
     */
    findBlueprint(id) {
        for (var i=0; i < this.blueprints.length; i++) {
            if (this.blueprints[i].id === id) {
                return this.blueprints[i];
            }
        }
    }

    /**
     * @returns {BlockBlueprint}
     */
    createEmptyBlueprint() {
        var bp = BlockBlueprint.create();
        this.blueprints.push(bp);
        return bp;
    }
}