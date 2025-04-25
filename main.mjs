/**
 * BitBuffer manages a bit buffer
 */
class BitBuffer {
    constructor() {
        this.data = [];
        this.bitIndex = 0;
    }

    load(base64String) {
        if (base64String === null) throw new Error("cannot load null");
        this.data = this.base64ToArray(base64String);
    }

    toString() {
        return btoa(String.fromCharCode.apply(null, this.data));
    }

    base64ToArray(base64String) {
        return Array.from(atob(base64String)).map(char => char.charCodeAt(0));
    }

    readBits(numBits) {
        let result = 0;
        let readBits = 0;
        let remainingBits = numBits;

        while (remainingBits > 0) {
            const byteIndex = Math.floor(this.bitIndex / 8);
            const bitOffset = this.bitIndex % 8;

            const availableBits = 8 - bitOffset;
            const readAmount = Math.min(remainingBits, availableBits);

            if (byteIndex >= this.data.length) {
                return 0;
            }

            const mask = (1 << readAmount) - 1;
            const readVal = (this.data[byteIndex] >> bitOffset) & mask;

            result |= readVal << readBits;
            readBits += readAmount;
            remainingBits -= readAmount;
            this.bitIndex += readAmount;
        }

        return result;
    }

    writeBits(value, numBits) {
        let remainingBits = numBits;
        let remainingValue = value & ((1 << remainingBits) - 1);

        while (remainingBits > 0) {
            const byteIndex = Math.floor(this.bitIndex / 8);
            const bitOffset = this.bitIndex % 8;

            if (byteIndex >= this.data.length) {
                this.data.push(0);
            }

            const availableBits = 8 - bitOffset;
            const writeBits = Math.min(remainingBits, availableBits);

            const mask = ((1 << writeBits) - 1) << bitOffset;
            const writeVal = remainingValue << bitOffset;

            this.data[byteIndex] = (this.data[byteIndex] & ~mask) | (writeVal & mask);

            remainingValue >>= writeBits;
            remainingBits -= writeBits;
            this.bitIndex += writeBits;
        }
    }
}

/**
 * MaskedBitset represents a bitset with a mask (2 bits per cell)
 */
class MaskedBitset {
    constructor(value = 0, mask = 0) {
        this.value = value;
        this.mask = mask;
    }

    set(k, v) {
        const bit = 1 << k;
        this.value = (this.value & ~bit) | ((-v & bit) >>> 0);
        this.mask |= bit;
    }

    has(k) {
        return (this.mask >> k) & (1 !== 0);
    }

    at(k) {
        return (this.value >> k) & 1;
    }

    get(k) {
        return [this.at(k), this.has(k)];
    }

    delete(k) {
        const bit = 1 << k;
        this.mask &= ~bit;
    }

    allSet() {
        return this.mask === 0b111111;
    }

    copy() {
        return new MaskedBitset(this.value, this.mask);
    }
}

/**
 * Tango models the Tango game
 */
class Tango {
    constructor() {
        this.rows = Array(6).fill(null).map(() => new MaskedBitset());
        this.cols = Array(6).fill(null).map(() => new MaskedBitset());
        this.rowsConstr = Array(6).fill(null).map(() => new MaskedBitset());
        this.colsConstr = Array(6).fill(null).map(() => new MaskedBitset());
    }
    /**
     * Sets a row in the Tango board and updates corresponding column values
     * @param {number} y - The row index (0-5)
     * @param {MaskedBitset} row - The row's MaskedBitset to set
     */
    setRow(y, row) {
        this.rows[y] = row;
        for (let x = 0; x < 6; x++) {
            const [v, ok] = row.get(x);
            if (ok) this.cols[x].set(y, v);
            else this.cols[x].delete(y);
        }
    }

    set(x, y, v) {
        this.rows[y].set(x, v);
        this.cols[x].set(y, v);
    }

    delete(x, y) {
        this.rows[y].delete(x);
        this.cols[x].delete(y);
    }

    update(x, y, v, mask) {
        this.set(x, y, v);
        if (mask === 0) {
            this.delete(x, y);
        }
    }

    debug() {
        let res = "";
        for (let y = 0; y < 6; y++) {
            for (let x = 0; x < 6; x++) {
                const [v, ok] = this.get(x, y);
                if (ok) {
                    res += v === 0 ? "🔵" : "🟡";
                } else {
                    res += "⬛";
                }
            }
            res += "\n";
        }
        return res;
    }

    Load(puzzle) {
        let couldParse = true;
        try {
            const buf = new BitBuffer();
            buf.load(puzzle);
            for (let k = 0; k < 6; k++) {
                this.setRow(k, new MaskedBitset(buf.readBits(6), buf.readBits(6)));
            }
            for (let k = 0; k < 6; k++) {
                this.rowsConstr[k] = new MaskedBitset(buf.readBits(5), buf.readBits(5));
                this.colsConstr[k] = new MaskedBitset(buf.readBits(5), buf.readBits(5));
            }
            return true;
        } catch (e) {
            couldParse = false;
        }
        if (!couldParse) {
            this.rows = Array(6).fill(null).map(() => new MaskedBitset());
            this.cols = Array(6).fill(null).map(() => new MaskedBitset());
            this.rowsConstr = Array(6).fill(null).map(() => new MaskedBitset());
            this.colsConstr = Array(6).fill(null).map(() => new MaskedBitset());
        }
        return couldParse;
    }

    loadPieces(puzzle) {
        let couldParse = true;
        try {
            const buf = new BitBuffer();
            buf.load(puzzle);
            for (let k = 0; k < 6; k++) {
                this.setRow(k, new MaskedBitset(buf.readBits(6), buf.readBits(6)));
            }
            return true;
        } catch (e) {
            couldParse = false;
        }
        if (!couldParse) {
            this.rows = Array(6).fill(null).map(() => new MaskedBitset());
            this.cols = Array(6).fill(null).map(() => new MaskedBitset());
        }
        return couldParse;
    }
    /**
     * Creates a Tango instance from a puzzle string
     * @param {string} puzzle - The puzzle string
     * @returns {[Tango, boolean]} A tuple containing the Tango instance and a boolean indicating if the puzzle was loaded successfully
     */
    static FromString(puzzle) {
        const tango = new Tango();
        const ok = tango.Load(puzzle);
        return [tango, ok];
    }

    /**
     * Creates a Tango instance from a pieces string
     * @param {string} puzzle - The pieces string
     * @returns {[Tango, boolean]} A tuple containing the Tango instance and a boolean indicating if the pieces were loaded successfully
     */
    static FromPiecesString(puzzle) {
        const tango = new Tango();
        const ok = tango.loadPieces(puzzle);
        return [tango, ok];
    }

    save() {
        const buf = new BitBuffer();
        for (let k = 0; k < 6; k++) {
            buf.writeBits(this.rows[k].value, 6);
            buf.writeBits(this.rows[k].mask, 6);
        }
        for (let k = 0; k < 6; k++) {
            buf.writeBits(this.rowsConstr[k].value, 5);
            buf.writeBits(this.rowsConstr[k].mask, 5);
            buf.writeBits(this.colsConstr[k].value, 5);
            buf.writeBits(this.colsConstr[k].mask, 5);
        }

        return buf.toString();
    }

    saveWithoutConstraints() {
        const buf = new BitBuffer();
        for (let k = 0; k < 6; k++) {
            buf.writeBits(this.rows[k].value, 6);
            buf.writeBits(this.rows[k].mask, 6);
        }
        return buf.toString();
    }

    /**
     * Creates a deep copy of this Tango instance
     * @returns {Tango} A new Tango instance with copies of all properties
     */
    copy() {
        const t = new Tango();
        t.rows = this.rows.map(row => row.copy());
        t.cols = this.cols.map(col => col.copy());
        t.rowsConstr = this.rowsConstr.map(rowConstr => rowConstr.copy());
        t.colsConstr = this.colsConstr.map(colConstr => colConstr.copy());
        return t;
    }

    /**
     * Returns the value at a specific position in the Tango board
     * @param {number} x - The x-coordinate (0-5)
     * @param {number} y - The y-coordinate (0-5)
     * @returns {number} The value at the specified position
     */
    at(x, y) {
        return this.rows[y].at(x);
    }
    /**
     * Returns the value and mask at a specific position in the Tango board
     * @param {number} x - The x-coordinate (0-5)
     * @param {number} y - The y-coordinate (0-5)
     * @returns {Array} An array containing the value and mask at the specified position
     */
    get(x, y) {
        return this.rows[y].get(x);
    }

    /**
     * Returns the ternary value at a specific position in the Tango board
     * @param {number} x - The x-coordinate (0-5)
     * @param {number} y - The y-coordinate (0-5)
     * @returns {number} The ternary value at the specified position
     */
    ternary(x, y) {
        const [v, ok] = this.get(x, y);
        return ok ? v : -1;
    }

    /**
     * Returns true if the value at a specific position in the Tango board is set
     * @param {number} x - The x-coordinate (0-5)
     * @param {number} y - The y-coordinate (0-5)
     * @returns {boolean} True if the value is set, false otherwise
     */
    has(x, y) {
        return this.rows[y].has(x);
    }

    /**
     * Checks if a line satisfies a constraint
     * @param {MaskedBitset} line - A valid line to check
     * @param {MaskedBitset} constr - The constraint
     * @returns {boolean} True if the line satisfies the constraint, false otherwise
     */
    checkConstraint(line, constr) {
        if (constr.mask === 0) {
            return true;
        }
        const validA = line & 0b011111;
        const validS = line >> 1;
        return ((validA ^ validS ^ constr.value) & constr.mask) === 0;
    }

    countCompletions(line, constr) {
        let count = 0;
        for (const valid of [
            11, 13, 19, 21, 22, 25, 26, 37, 38, 41, 42, 44, 50, 52,
        ]) {
            if (((line.value ^ valid) & line.mask) !== 0) {
                continue;
            }
            if (!this.checkConstraint(valid, constr)) {
                continue;
            }
            count++;
        }
        return count;
    }

    isValid() {
        for (let i = 0; i < 6; i++) {
            if (this.countCompletions(this.rows[i], this.rowsConstr[i]) === 0) {
                return false;
            }
            if (this.countCompletions(this.cols[i], this.colsConstr[i]) === 0) {
                return false;
            }
        }
        return true;
    }

    isSolved() {
        for (let y = 0; y < 6; y++) {
            if (!this.rows[y].allSet()) {
                return false;
            }
        }
        return this.isValid();
    }


    ruleViolations() {
        const violations = [];

        const invalidTriples = [
            0b000111,
            0b001110,
            0b011100,
            0b111000,
        ];

        function checkTriple(line, i, direction) {
            for (let j = 0; j < 4; j++) {
                if ((line & invalidTriples[j]) !== invalidTriples[j]) continue;
                if (direction === "col") {
                    violations.push({ type: "triple", loc: [[i, j], [i, j + 1], [i, j + 2]] });
                } else {
                    violations.push({ type: "triple", loc: [[j, i], [j + 1, i], [j + 2, i]] });
                }
            }
        }

        function checkConstr(type, line, k, direction, i, j) {
            const [iv, iok] = line.get(i);
            const [jv, jok] = line.get(j);
            if (iok && jok && (iv === jv) !== (type === "eq")) {
                if (direction === "col") {
                    violations.push({ type: type, loc: [[k, i], [k, j]] });
                } else {
                    violations.push({ type: type, loc: [[i, k], [j, k]] });
                }
            }
        }
        function checkMaxCount(line, i, direction) {
            const setValues = [line & 1, (line >> 1) & 1, (line >> 2) & 1, (line >> 3) & 1, (line >> 4) & 1, (line >> 5) & 1];
            const count = setValues.filter(v => v === 1).length;
            if (count > 3) {
                if (direction === "col") {
                    violations.push({
                        type: "count",
                        loc: Array.from({ length: 6 }, (_, j) => [i, j]).filter((_, i) => setValues[i])
                    });
                } else {
                    violations.push({
                        type: "count",
                        loc: Array.from({ length: 6 }, (_, j) => [j, i]).filter((_, i) => setValues[i])
                    });
                }
            }
        }

        for (let i = 0; i < 6; i++) {
            const moonRow = (~this.rows[i].value) & this.rows[i].mask;
            const moonCol = (~this.cols[i].value) & this.cols[i].mask;
            const sunRow = this.rows[i].value & this.rows[i].mask;
            const sunCol = this.cols[i].value & this.cols[i].mask;

            checkTriple(moonRow, i, "row");
            checkTriple(moonCol, i, "col");
            checkTriple(sunRow, i, "row");
            checkTriple(sunCol, i, "col");

            checkMaxCount(moonRow, i, "row");
            checkMaxCount(moonCol, i, "col");
            checkMaxCount(sunRow, i, "row");
            checkMaxCount(sunCol, i, "col");
        }

        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < 5; j++) {
                const [rv, rok] = this.rowsConstr[i].get(j);
                if (rok) {
                    if (rv === 0) checkConstr("eq", this.rows[i], i, "row", j, j + 1);
                    else checkConstr("neq", this.rows[i], i, "row", j, j + 1);
                }
                const [cv, cok] = this.colsConstr[i].get(j);
                if (cok) {
                    if (cv === 0) checkConstr("eq", this.cols[i], i, "col", j, j + 1);
                    else checkConstr("neq", this.cols[i], i, "col", j, j + 1);
                }

            }
        }

        return violations;
    }

    /**
     * Checks if a current puzzle is compatible with a base puzzle
     * @param {Tango|null} base - The base puzzle
     * @param {Tango|null} current - The current puzzle
     * @returns {boolean} True if the current puzzle is compatible with the base puzzle, false otherwise
     */
    static isCompatible(base, current) {
        if (base === null || current === null) {
            return false;
        }
        for (let y = 0; y < 6; y++) {
            for (let x = 0; x < 6; x++) {
                const [v, ok] = base.get(x, y);
                if (!ok) continue; // base has no value, any current value is compatible

                const [cv, cok] = current.get(x, y);
                if (!cok) return false; // current has no value but base does
                if (v !== cv) return false; // current has a value but it's different from base
            }
        }
        return true;
    }
}

/**
 * XMLNode is a class for creating XML nodes in the browser or node
 */
class XMLNode {
    /**
     * @param {string} tag
     * @param {Object} props
     * @param {XMLNode[]} children
     */
    constructor(tag, props = {}, children = []) {
        this.tag = tag;
        this.props = props;
        this.children = children;
    }

    /**
     * Renders the node as XML
     * @param {string} indent - The indentation string if running in node
     * @returns {string} The rendered XML
     */
    Render(indent = "") {
        if (typeof window === 'undefined') {
            return this.renderUsingString(indent);
        }
        return this.renderUsingDOM().outerHTML;
    }

    static escape(str) {
        return str.toString().replace(/"/g, '&quot;').replace(/\n/g, '');
    }

    renderUsingString(indent = "") {
        const propsString = Object.entries(this.props)
            .map(([k, v]) => `${XMLNode.escape(k)}="${XMLNode.escape(v)}"`)
            .join(" ");
        let res = `${indent}<${this.tag}${propsString ? ` ${propsString}` : ""}`;
        if (this.children.length === 0) {
            res += " />";
            return res;
        }
        res += ">";
        for (const child of this.children) {
            res += `\n${child.renderUsingString(`${indent}    `)}`;
        }
        res += `\n${indent}</${this.tag}>`;
        return res;
    }

    renderUsingDOM() {
        const ele = document.createElement(this.tag);
        for (const [k, v] of Object.entries(this.props)) {
            ele.setAttribute(k, v);
        }
        for (const child of this.children) {
            ele.appendChild(child.renderUsingDOM());
        }
        return ele;
    }
}

/**
 * Renderer is a class for rendering the Tango game
 */
export class Renderer {
    /**
     * Creates a new Renderer instance
     * @param {Tango} tango - The Tango game state to render
     * @param {SVGElement} target - The SVG element to render into
     * @param {number} [cellSize=60] - The size of each cell in pixels
     */
    constructor(tango, target, manager) {
        this.original = tango.copy();
        this.tango = tango;
        this.board = null;
        this.symRefs = {};
        this.cellRefs = []
        this.manager = manager;

        this.ensureBoardIsBuiltAndBound(target);
        this.Render();
        this.renderStatic();
    }

    /**
     * Generates SVG path data for a rounded rectangle
     * @param {number} x - X coordinate of top-left corner
     * @param {number} y - Y coordinate of top-left corner 
     * @param {number} width - Width of rectangle
     * @param {number} height - Height of rectangle
     * @param {Object} corners - Corner radius values
     * @param {number} corners.tl - Top-left corner radius
     * @param {number} corners.tr - Top-right corner radius
     * @param {number} corners.br - Bottom-right corner radius
     * @param {number} corners.bl - Bottom-left corner radius
     * @returns {string} SVG path data string
     */
    static roundedRectPath(x, y, width, height, { tl, tr, br, bl }) {
        return [
            `M ${x + tl},${y}`,
            `l ${width - tl - tr},0`,
            tr > 0 ? `a ${tr},${tr} 0 0 1 ${tr},${tr}` : '',
            `l 0,${height - tr - br}`,
            br > 0 ? `a ${br},${br} 0 0 1 ${-br},${br}` : '',
            `l ${-(width - br - bl)},0`,
            bl > 0 ? `a ${bl},${bl} 0 0 1 ${-bl},${-bl}` : '',
            `l 0,${-(height - bl - tl)}`,
            tl > 0 ? `a ${tl},${tl} 0 0 1 ${tl},${-tl}` : '',
            'z'
        ].filter(Boolean).join(' ');
    }

    /**
     * Ensures the board is built and bound to the target
     * @param {SVGElement} target - The SVG element to render into
     */
    ensureBoardIsBuiltAndBound(target) {
        if (target.querySelector('.board')) {
            console.log("🎨 Found pre-baked board, using it");
        } else {
            console.log("🎨 No pre-baked board found, creating one");
            target.insertAdjacentHTML('beforeend', Renderer.CreateBoard(target.dataset.cellSize || 60));
        }
        this.board = target.querySelector('.board');
        this.bindBoard()
    }

    /**
     * Creates a board using XML nodes that can be rendered in the browser or node
     * for baking into a static site improving load performance
     * @param {number} cellSize - The size of each cell in pixels
     * @param {string} indent - The indentation string
     * @returns {string} The rendered board
     */
    static CreateBoard(cellSize, indent = "") {
        const radius = 4 * cellSize / 60;
        const boardChildren = [];

        for (let y = 0; y < 6; y++) {
            for (let x = 0; x < 6; x++) {
                const id = `${x}${y}`;
                const xCoord = x * cellSize;
                const yCoord = y * cellSize;
                const cellChildren = [];

                if (x === 0 || x === 5 || y === 0 || y === 5) {
                    const path = Renderer.roundedRectPath(
                        xCoord, yCoord, cellSize, cellSize,
                        {
                            tl: (x === 0 && y === 0) * radius,
                            tr: (x === 5 && y === 0) * radius,
                            br: (x === 5 && y === 5) * radius,
                            bl: (x === 0 && y === 5) * radius,
                        }
                    );
                    cellChildren.push(
                        new XMLNode("path", { class: "cell", d: path })
                    );
                } else {
                    cellChildren.push(
                        new XMLNode("rect", { x: xCoord, y: yCoord, width: cellSize, height: cellSize, class: "cell" })
                    );
                }

                cellChildren.push(
                    new XMLNode("use", { x: xCoord, y: yCoord, width: cellSize, height: cellSize, href: "#sun" }),
                    new XMLNode("use", { x: xCoord, y: yCoord, width: cellSize, height: cellSize, href: "#moon" })
                );

                boardChildren.push(
                    new XMLNode("g", { class: "cg", "data-id": id }, cellChildren)
                );
            }
        }

        for (let i = 0; i < 6; i++) {
            for (let k = 0; k < 5; k++) {
                const kCoord = k * cellSize;
                const iCoord = i * cellSize;

                const xMid = kCoord + cellSize / 2;
                const yMid = kCoord + cellSize / 2;

                const rowId = `r${k}${i}`;
                const colId = `c${k}${i}`;

                boardChildren.push(
                    new XMLNode("g", { class: "sg", "data-id": rowId }, [
                        new XMLNode("use", { x: xMid, y: iCoord, width: cellSize, height: cellSize, href: "#eq" }),
                        new XMLNode("use", { x: xMid, y: iCoord, width: cellSize, height: cellSize, href: "#cross" })
                    ]),
                    new XMLNode("g", { class: "sg", "data-id": colId }, [
                        new XMLNode("use", { x: iCoord, y: yMid, width: cellSize, height: cellSize, href: "#veq" }),
                        new XMLNode("use", { x: iCoord, y: yMid, width: cellSize, height: cellSize, href: "#cross" })
                    ])
                );
            }
        }

        const board = new XMLNode("g", { class: "board" }, boardChildren);
        return board.Render(indent);
    }

    bindBoard() {
        for (let y = 0; y < 6; y++) {
            for (let x = 0; x < 6; x++) {
                const cellGroup = this.board.querySelector(`.cg[data-id="${x}${y}"]`);
                this.cellRefs.push(cellGroup);
                cellGroup.addEventListener('click', this.handleClick.bind(this, x, y, true));
                cellGroup.addEventListener('contextmenu', this.handleClick.bind(this, x, y, false));
            }
        }
        for (let i = 0; i < 6; i++) {
            for (let k = 0; k < 5; k++) {
                const rowSymbol = this.board.querySelector(`.sg[data-id="r${k}${i}"]`);
                const colSymbol = this.board.querySelector(`.sg[data-id="c${k}${i}"]`);
                this.symRefs[`r${k}${i}`] = rowSymbol;
                this.symRefs[`c${k}${i}`] = colSymbol;
                rowSymbol.addEventListener('contextmenu', (e) => { e.preventDefault(); });
                colSymbol.addEventListener('contextmenu', (e) => { e.preventDefault(); });
            }
        }
    }

    handleClick(x, y, left, event) {
        event.stopPropagation();
        event.preventDefault();
        if (this.original.has(x, y)) {
            return;
        }
        const [v, ok] = this.tango.get(x, y);
        const [nv, nok] = {
            0b000: [0, 1],
            0b001: [1, 1],
            0b010: [0, 1],
            0b011: [0, 0],
            0b100: [1, 1],
            0b101: [0, 0],
            0b110: [1, 1],
            0b111: [0, 1],
        }[1 * ok + 2 * v + 4 * left];
        this.tango.update(x, y, nv, nok);
        this.Render();
        this.Hint();
        this.manager.Update({
            current: this.tango.saveWithoutConstraints(),
        });
    }

    throwConfetti(backoff = 10) {
        if (document.body.dataset.confetti === "false") return;
        if (window.confetti) {
            confetti({
                particleCount: 100,
                startVelocity: 15,
                spread: 360,
                origin: { y: 0.5 },
            });
        } else {
            setTimeout(() => {
                this.throwConfetti(Math.min(backoff * 2, 1000));
            }, backoff);
        }
    }

    Hint() {
        if (this.tango.isSolved()) {
            this.manager.Update({
                status: "solved",
            });
            this.throwConfetti();
        } else {
            this.manager.Update({
                status: "playing",
            });
        }

        this.HintViolations();
    }
    HintViolations() {
        if (document.body.dataset.hint === "false") return;
        const violations = this.tango.ruleViolations();
        this.ClearViolations();
        for (const violation of violations) {
            for (const [x, y] of violation.loc) {
                this.cellRefs[x + y * 6].dataset.violation = violation.type;
            }
        }
    }
    ClearViolations() {
        for (let i = 0; i < 36; i++) {
            delete this.cellRefs[i].dataset.violation;
        }
    }
    renderStatic() {
        for (let y = 0; y < 6; y++) {
            for (let x = 0; x < 6; x++) {
                this.cellRefs[x + y * 6].dataset.original = this.original.has(x, y);
            }
        }
        for (let i = 0; i < 6; i++) {
            for (let k = 0; k < 5; k++) {
                {
                    const cell = this.symRefs[`r${k}${i}`];
                    const [v, ok] = this.tango.rowsConstr[i].get(k);
                    cell.dataset.value = v;
                    cell.dataset.ok = ok;
                }
                {
                    const cell = this.symRefs[`c${k}${i}`];
                    const [v, ok] = this.tango.colsConstr[i].get(k);
                    cell.dataset.value = v;
                    cell.dataset.ok = ok;
                }
            }
        }
    }

    Render() {
        for (let y = 0; y < 6; y++) {
            for (let x = 0; x < 6; x++) {
                const cell = this.cellRefs[x + y * 6];
                const [v, ok] = this.tango.get(x, y);
                cell.dataset.value = v;
                cell.dataset.ok = ok;
            }
        }
    }
}

/**
 * @enum {string}
 */
const Theme = {
    LIGHT: 'light',
    DARK: 'dark',
};

/**
 * @typedef {Object} State
 * @property {boolean} confetti - Whether confetti is enabled
 * @property {string} status - The hint of the game
 * @property {string} current - The current state of the game
 * @property {string} puzzle - The original puzzle being played
 * @property {Theme} theme - The theme of the game
 * @property {string[]} history - The history of the game
 * @property {string[]} future - The future of the game
 */


/** @typedef {Object} StatePropTags
 * @property {Set<string>} local - Properties to persist in localStorage
 * @property {Set<string>} url - Properties to include in URL parameters
 * @property {Set<string>} session - Properties to persist in sessionStorage
 * @property {Set<string>} body - Properties to reflect in document.body.dataset
 * @property {Set<string>} target - Properties to reflect in the target element
 */

/** @type {StatePropTags} */
const StatePropTags = {
    local: new Set(["confetti", "hint", "theme"]),
    url: new Set(["puzzle", "current", "status"]),
    session: new Set(["history", "future"]),
    body: new Set(["confetti", "hint", "status", "theme"]),
    target: new Set(["puzzle"]),
}

class StateManager {
    /**
     * @param {SVGElement} target - The SVG element to render into
     */
    constructor(target) {
        /** @type {State} */
        this.state = {
            confetti: true,
            hint: true,
            status: "playing",
            history: [],
            future: [],
            theme: Theme.DARK,
        }
        this.target = target;
    }

    /**
     * Updates the state of the game
     * @param {Partial<State>} update - The update to apply to the state
     */
    Update(update) {
        if ("current" in update &&
            update.current !== this.state.current &&
            !("history" in update) &&
            !("future" in update) &&
            !("puzzle" in update)
        ) {
            update.history = [...this.state.history, this.state.current];
            update.future = [];
        }
        for (const [k, v] of Object.entries(update)) {
            if (StatePropTags.body.has(k)) {
                document.body.dataset[k] = v;
            }
        }
        for (const [k, v] of Object.entries(update)) {
            if (StatePropTags.target.has(k)) {
                this.target.dataset[k] = v;
            }
        }

        Object.assign(this.state, update);
        const { session, local, url } = this.splitState();
        sessionStorage.setItem("state", JSON.stringify(session));
        localStorage.setItem("state", JSON.stringify(local));

        // Convert game state to query string parameters
        const queryParams = new URLSearchParams(window.location.search);
        if (url.puzzle) queryParams.set('puzzle', url.puzzle);
        if (url.current) queryParams.set('current', url.current);
        if (url.status) queryParams.set('status', url.status);

        window.history.replaceState(
            undefined,
            undefined,
            `?${queryParams.toString()}`);

        if ("history" in update || "future" in update) {
            this.target.dispatchEvent(new CustomEvent("historychange"));
        }
        if ("puzzle" in update) {
            this.target.dispatchEvent(new CustomEvent("puzzlechange"));
        }
    }
    /**
     * Splits the state into config and game state
     * @param {State} state - The state to split
     * @returns {{session: Partial<State>, local: Partial<State>, url: Partial<State>}} The split state
     */
    splitState() {
        const session = {};
        const local = {};
        const url = {};

        for (const [key, value] of Object.entries(this.state)) {
            if (StatePropTags.session.has(key)) {
                session[key] = value;
            }
            if (StatePropTags.local.has(key)) {
                local[key] = value;
            }
            if (StatePropTags.url.has(key)) {
                url[key] = value;
            }
        }

        return { session, local, url };
    }

    loadState() {
        let localState = {};
        let sessionState = {};
        let urlState = {};
        try {
            sessionState = JSON.parse(sessionStorage.getItem("state") || "{}");
        } catch {
            sessionState = {};
        }
        try {
            localState = JSON.parse(localStorage.getItem("state") || "{}");
        } catch {
            localState = {};
        }
        try {
            const queryParams = new URLSearchParams(window.location.search);
            for (const key of StatePropTags.url) {
                urlState[key] = queryParams.get(key);
            }
        } catch {
            urlState = {};
        }
        return { ...sessionState, ...localState, ...urlState };
    }

}

function webMain() {

    const svg = document.querySelector('svg');
    const confettiButton = document.querySelector('.button.confetti');
    const hintButton = document.querySelector('.button.hint');
    const clearButton = document.querySelector('.button.clear');
    const undoButton = document.querySelector('.button.undo');
    const redoButton = document.querySelector('.button.redo');
    const themeButton = document.querySelector('.button.theme');

    const manager = new StateManager(svg);
    manager.Update(manager.loadState());

    const [tango, ok] = Tango.FromString(manager.state.puzzle);
    if (ok) {
        console.log("✅ Could parse base game from state");
    } else {
        console.log("❌ Could not parse base game from state, defaulting to example");
        manager.Update({
            status: "playing",
            puzzle: "",
        });
        tango.Load(manager.state.puzzle);
    }

    const [current, cok] = Tango.FromPiecesString(manager.state.current);
    if (!cok || !Tango.isCompatible(tango, current)) {
        console.log("❌ Current pieces are not compatible with base game, defaulting to clean base game");
        manager.Update({
            status: "playing",
            current: tango.saveWithoutConstraints(),
            puzzle: manager.state.puzzle,
        });
    } else {
        console.log("✅ Current pieces are compatible with base game");
    }

    // Render base game before loading the pieces
    const renderer = new Renderer(tango, svg, manager);
    tango.loadPieces(manager.state.current);
    renderer.Render();
    renderer.Hint();

    // Bind Confetti Button
    confettiButton.addEventListener('click', () => {
        manager.Update({
            confetti: !manager.state.confetti,
        });
    });

    // Bind Hint Button
    hintButton.addEventListener('click', () => {
        manager.Update({
            hint: !manager.state.hint,
        });
        renderer.ClearViolations();
        renderer.Hint();
    });

    // Clear the board
    clearButton.addEventListener('click', () => {
        if (!confirm("Are you sure you want to clear the board? This cannot be undone.")) {
            return;
        }
        manager.Update({
            current: manager.state.puzzle,
            history: [],
            future: [],
        });
        tango.Load(manager.state.current);
        renderer.Render();
        renderer.Hint();
    });

    // Undo the last move
    undoButton.addEventListener('click', () => {
        if (manager.state.history.length === 0) {
            return;
        }
        manager.Update({
            history: manager.state.history.slice(0, -1),
            future: [...manager.state.future, manager.state.current],
            current: manager.state.history.pop(),
        });
        tango.Load(manager.state.current);
        renderer.Render();
    });

    // Redo the last move
    redoButton.addEventListener('click', () => {
        if (manager.state.future.length === 0) {
            return;
        }
        manager.Update({
            history: [...manager.state.history, manager.state.current],
            future: manager.state.future.slice(0, -1),
            current: manager.state.future.pop(),
        });
        tango.Load(manager.state.current);
        renderer.Render();
    });

    svg.addEventListener("historychange", () => {
        undoButton.disabled = manager.state.history.length === 0;
        redoButton.disabled = manager.state.future.length === 0;
    });
    svg.dispatchEvent(new CustomEvent("historychange"));

    svg.addEventListener("updatepuzzle", (e) => {
        const puzzle = e.detail;
        tango.Load(puzzle);

        manager.Update({
            puzzle: puzzle,
            current: tango.saveWithoutConstraints(),
            history: [],
            future: [],
            status: "playing",
        });

        renderer.original = tango.copy();
        renderer.renderStatic();
        renderer.Render();
        renderer.Hint();
    });

    themeButton.addEventListener('click', () => {
        const newTheme = manager.state.theme === Theme.DARK ? Theme.LIGHT : Theme.DARK;
        manager.Update({
            theme: newTheme,
        });
    });


    import("./puzzles.mjs");
}

if (typeof window !== "undefined") webMain();