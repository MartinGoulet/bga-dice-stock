interface IDice {
    id: string;
    value: number;
    locked: boolean;
    rolled: boolean;
}

interface DiceStockSettings {
    /**
     * Class added to each die face for showing the right image;
     */
    dieClass: string;

    /**
     * CSS to set the border radius of a die. '8px' if unset;
     */
    radius?: string;

    /**
     * CSS to set the size of a die. '45px' if unset;
     */
    size?: string;

    /**
     * CSS to set the color of the lock zone. '#000' if unset;
     */
    lockColor?: string;

    /**
     * CSS to set the space between the lock space and the selector space. '10px' if unset;
     */
    space?: string;
}

type DiceClickAction = 'none' | 'move' | 'select_single' | 'select_multiple';

class DiceStock {
    protected dice: IDice[] = [];
    protected selectedDice: IDice[] = [];
    protected action: DiceClickAction = 'move';

    constructor(protected element: HTMLElement, protected settings?: DiceStockSettings) {
        element.classList.add('dice-stock');
        element.style.setProperty('--dice-border-radius', settings?.radius ?? '8px');
        element.style.setProperty('--dice-size', settings?.size ?? '40px');
        element.style.setProperty('--lock-color', settings?.lockColor ?? '#888');
        element.style.setProperty('--space-zone', settings?.space ?? '10px');

        this.appendChild(element, this.htmlLockDice(element.id));
        this.appendChild(element, this.htmlSelector(element.id));
    }

    public add(die: IDice) {
        // Remove old dice (TODO : Remove from others stocks as well)
        const oldDieDiv = this.getDiceDiv(die);
        oldDieDiv?.parentNode.removeChild(oldDieDiv);

        // Create the die html element
        const dieDiv = this.createDieElement(die);

        // Add die to the to the right zone
        const divZone = die.locked ? this.getZoneLockedDice(die) : this.getZoneSelector();
        divZone.appendChild(dieDiv);

        setTimeout(() => this.addDiceRollClass(die, dieDiv), 100);

        // dieDiv.addEventListener('click', (event) => this.dieClick(die));
        // this.dice.push(die);
    }

    private getDiceDiv(die: IDice): HTMLDivElement {
        return document.getElementById(`dice-${die.id}`) as HTMLDivElement;
    }

    /////////////////////////////////////////////////////////
    // Events

    private dieClick(die: IDice) {
        switch (this.action) {
            case 'move':
                // this.toggleLockDice(die);
                break;
        }
    }

    /////////////////////////////////////////////////////////
    // Private

    private addDiceRollClass(die: IDice, dieDiv: HTMLElement) {
        dieDiv.dataset.rolled = die.rolled ? 'true' : 'false';
        if (!die.rolled) {
            return this.addRollToDiv(dieDiv, '-');
        }

        dieDiv.addEventListener('animationend', (e) => {
            if (e.animationName === 'rolled-dice') {
                dieDiv.dataset.rolled = 'false';
            }
        });

        setTimeout(() => this.addRollToDiv(dieDiv, Math.random() < 0.5 ? 'odd' : 'even'), 200);
    }

    private addRollToDiv(dieDiv: HTMLElement, rollType: string, attempt: number = 0) {
        console.log(dieDiv.id, rollType, dieDiv);
        const dieList = dieDiv.getElementsByClassName('die-list')[0] as HTMLElement;
        dieList.dataset.rollType = rollType;
        // if (dieList) {
        // } else if (attempt < 5) {
        // setTimeout(() => this.addRollToDiv(dieDiv, rollType, attempt + 1), 200);
        // }
    }

    private appendChild(element: HTMLElement, html: string) {
        const div = document.createElement('div');
        div.innerHTML = html;
        element.appendChild(div.childNodes[0]);
    }

    public createDieElement(die: IDice): HTMLDivElement {
        const element = document.createElement('div');
        element.id = `dice-${die.id}`;
        element.classList.add('dice', `dice${die.value}`);
        element.dataset.id = '' + die.id;
        element.dataset.value = '' + die.value;

        element.innerHTML = `<ol class="die-list" data-roll="${die.value}">
            <li class="die-item side1 ${this.settings?.dieClass}" data-side="1"></li>
            <li class="die-item side2 ${this.settings?.dieClass}" data-side="2"></li>
            <li class="die-item side3 ${this.settings?.dieClass}" data-side="3"></li>
            <li class="die-item side4 ${this.settings?.dieClass}" data-side="4"></li>
            <li class="die-item side5 ${this.settings?.dieClass}" data-side="5"></li>
            <li class="die-item side6 ${this.settings?.dieClass}" data-side="6"></li>
        </ol>`;

        console.log(`Die ${die.id}`, element);

        return element;
    }

    private getZoneLockedDice(die: IDice): HTMLElement {
        const lockId = `${this.element.id}-locked-dice-${die.value}`;
        return document.getElementById(lockId);
    }

    private getZoneSelector(): HTMLElement {
        const id = `${this.element.id}-dice-selector`;
        return document.getElementById(id);
    }

    private htmlLockDice(id: string): string {
        return `<div id="${id}-locked-dice" class="locked-dice">
            <div id="${id}-lock" class="lock"></div>
            <div id="${id}-locked-dice-1"></div>
            <div id="${id}-locked-dice-2"></div>
            <div id="${id}-locked-dice-3"></div>
            <div id="${id}-locked-dice-4"></div>
            <div id="${id}-locked-dice-5"></div>
            <div id="${id}-locked-dice-6"></div>
        </div>`;
    }

    private htmlSelector(id: string): string {
        return `<div id="${id}-dice-selector" class="dice-selector"></div>`;
    }
}
