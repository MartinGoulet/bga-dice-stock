var DiceStock = /** @class */ (function () {
    function DiceStock(element, settings) {
        var _a, _b, _c, _d;
        this.element = element;
        this.settings = settings;
        this.dice = [];
        this.selectedDice = [];
        this.action = 'move';
        element.classList.add('dice-stock');
        element.style.setProperty('--dice-border-radius', (_a = settings === null || settings === void 0 ? void 0 : settings.radius) !== null && _a !== void 0 ? _a : '8px');
        element.style.setProperty('--dice-size', (_b = settings === null || settings === void 0 ? void 0 : settings.size) !== null && _b !== void 0 ? _b : '40px');
        element.style.setProperty('--lock-color', (_c = settings === null || settings === void 0 ? void 0 : settings.lockColor) !== null && _c !== void 0 ? _c : '#888');
        element.style.setProperty('--space-zone', (_d = settings === null || settings === void 0 ? void 0 : settings.space) !== null && _d !== void 0 ? _d : '10px');
        this.appendChild(element, this.htmlLockDice(element.id));
        this.appendChild(element, this.htmlSelector(element.id));
    }
    DiceStock.prototype.add = function (die) {
        var _this = this;
        // Remove old dice (TODO : Remove from others stocks as well)
        var oldDieDiv = this.getDiceDiv(die);
        oldDieDiv === null || oldDieDiv === void 0 ? void 0 : oldDieDiv.parentNode.removeChild(oldDieDiv);
        // Create the die html element
        var dieDiv = this.createDieElement(die);
        // Add die to the to the right zone
        var divZone = die.locked ? this.getZoneLockedDice(die) : this.getZoneSelector();
        divZone.appendChild(dieDiv);
        setTimeout(function () { return _this.addDiceRollClass(die, dieDiv); }, 100);
        // dieDiv.addEventListener('click', (event) => this.dieClick(die));
        // this.dice.push(die);
    };
    DiceStock.prototype.getDiceDiv = function (die) {
        return document.getElementById("dice-".concat(die.id));
    };
    /////////////////////////////////////////////////////////
    // Events
    DiceStock.prototype.dieClick = function (die) {
        switch (this.action) {
            case 'move':
                // this.toggleLockDice(die);
                break;
        }
    };
    /////////////////////////////////////////////////////////
    // Private
    DiceStock.prototype.addDiceRollClass = function (die, dieDiv) {
        var _this = this;
        dieDiv.dataset.rolled = die.rolled ? 'true' : 'false';
        if (!die.rolled) {
            return this.addRollToDiv(dieDiv, '-');
        }
        dieDiv.addEventListener('animationend', function (e) {
            if (e.animationName === 'rolled-dice') {
                dieDiv.dataset.rolled = 'false';
            }
        });
        setTimeout(function () { return _this.addRollToDiv(dieDiv, Math.random() < 0.5 ? 'odd' : 'even'); }, 200);
    };
    DiceStock.prototype.addRollToDiv = function (dieDiv, rollType, attempt) {
        if (attempt === void 0) { attempt = 0; }
        console.log(dieDiv.id, rollType, dieDiv);
        var dieList = dieDiv.getElementsByClassName('die-list')[0];
        dieList.dataset.rollType = rollType;
        // if (dieList) {
        // } else if (attempt < 5) {
        // setTimeout(() => this.addRollToDiv(dieDiv, rollType, attempt + 1), 200);
        // }
    };
    DiceStock.prototype.appendChild = function (element, html) {
        var div = document.createElement('div');
        div.innerHTML = html;
        element.appendChild(div.childNodes[0]);
    };
    DiceStock.prototype.createDieElement = function (die) {
        var _a, _b, _c, _d, _e, _f;
        var element = document.createElement('div');
        element.id = "dice-".concat(die.id);
        element.classList.add('dice', "dice".concat(die.value));
        element.dataset.id = '' + die.id;
        element.dataset.value = '' + die.value;
        element.innerHTML = "<ol class=\"die-list\" data-roll=\"".concat(die.value, "\">\n            <li class=\"die-item side1 ").concat((_a = this.settings) === null || _a === void 0 ? void 0 : _a.dieClass, "\" data-side=\"1\"></li>\n            <li class=\"die-item side2 ").concat((_b = this.settings) === null || _b === void 0 ? void 0 : _b.dieClass, "\" data-side=\"2\"></li>\n            <li class=\"die-item side3 ").concat((_c = this.settings) === null || _c === void 0 ? void 0 : _c.dieClass, "\" data-side=\"3\"></li>\n            <li class=\"die-item side4 ").concat((_d = this.settings) === null || _d === void 0 ? void 0 : _d.dieClass, "\" data-side=\"4\"></li>\n            <li class=\"die-item side5 ").concat((_e = this.settings) === null || _e === void 0 ? void 0 : _e.dieClass, "\" data-side=\"5\"></li>\n            <li class=\"die-item side6 ").concat((_f = this.settings) === null || _f === void 0 ? void 0 : _f.dieClass, "\" data-side=\"6\"></li>\n        </ol>");
        console.log("Die ".concat(die.id), element);
        return element;
    };
    DiceStock.prototype.getZoneLockedDice = function (die) {
        var lockId = "".concat(this.element.id, "-locked-dice-").concat(die.value);
        return document.getElementById(lockId);
    };
    DiceStock.prototype.getZoneSelector = function () {
        var id = "".concat(this.element.id, "-dice-selector");
        return document.getElementById(id);
    };
    DiceStock.prototype.htmlLockDice = function (id) {
        return "<div id=\"".concat(id, "-locked-dice\" class=\"locked-dice\">\n            <div id=\"").concat(id, "-lock\" class=\"lock\"></div>\n            <div id=\"").concat(id, "-locked-dice-1\"></div>\n            <div id=\"").concat(id, "-locked-dice-2\"></div>\n            <div id=\"").concat(id, "-locked-dice-3\"></div>\n            <div id=\"").concat(id, "-locked-dice-4\"></div>\n            <div id=\"").concat(id, "-locked-dice-5\"></div>\n            <div id=\"").concat(id, "-locked-dice-6\"></div>\n        </div>");
    };
    DiceStock.prototype.htmlSelector = function (id) {
        return "<div id=\"".concat(id, "-dice-selector\" class=\"dice-selector\"></div>");
    };
    return DiceStock;
}());
define({
    DiceStock: DiceStock,
});
