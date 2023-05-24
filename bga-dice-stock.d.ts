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
declare type DiceClickAction = 'none' | 'move' | 'select_single' | 'select_multiple';
declare class DiceStock {
    protected element: HTMLElement;
    protected settings?: DiceStockSettings;
    protected dice: IDice[];
    protected selectedDice: IDice[];
    protected action: DiceClickAction;
    constructor(element: HTMLElement, settings?: DiceStockSettings);
    add(die: IDice): void;
    private getDiceDiv;
    private dieClick;
    private addDiceRollClass;
    private addRollToDiv;
    private appendChild;
    createDieElement(die: IDice): HTMLDivElement;
    private getZoneLockedDice;
    private getZoneSelector;
    private htmlLockDice;
    private htmlSelector;
}
declare const define: any;
