var DEFAULT_WIDTH = 100;
var DEFAULT_HEIGHT = 80;
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

        this.output = Type.untyped();

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
        this.type = Type.untyped();
    }
}

class Type {
    constructor(name) {
        this.name = name;
    }

    /**
     * @returns {Type}
     */
    static untyped() {
        return new Type("Untyped"); // reserved name, todo: add checks elsewhere
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

    createInput() {
        var inputs = this.getInputs();
        var newInput = new Input("input" + (inputs.length + 1));
        this.addInput(newInput);
    }

    addInput(input) {
        var blueprint = this._getBlueprint();
        blueprint.inputs.push(input);
    }

    getInputs() {
        return this._getBlueprint().inputs;
    }

    getOutput() {
        return this._getBlueprint().output;
    }

    getContents() {
        return this._getBlueprint().contents;
    }

    setContents(newValue) {
        return this._getBlueprint().contents = newValue;
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

    getConnection(fromBlock, toBlock, inputIndex) {
        return _.findWhere(this.connections, {
            fromBlockId: fromBlock.id,
            toBlockId: toBlock.id,
            inputIndex: inputIndex
        });
    }

    getConnectionFromId(fromBlockId) {
        return _.findWhere(this.connections, {
            fromBlockId: fromBlockId
        });
    }

    getConnectionToId(toBlockId, inputIndex) {
        return _.findWhere(this.connections, {
            toBlockId: toBlockId,
            inputIndex: inputIndex
        });
    }

    createConnection(fromBlock, toBlock, inputIndex) {
        // if there's already an existing connection to this input, remove it
        var matchingConnections = _.where(this.connections, {
            toBlockId: toBlock.id,
            inputIndex: inputIndex
        });
        if (matchingConnections.length > 0) {
            this.removeConnections(matchingConnections);
        }

        var connection = new Connection(fromBlock.id, toBlock.id, inputIndex);
        this.connections.push(connection);
    }

    removeConnections(connections) {
        this.connections = _.difference(this.connections, connections);
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