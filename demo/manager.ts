type StocksType = { [player_id: string]: DiceStock };
interface MyGame {
    gamedatas: any;
    stocks: StocksType;
}

const game: MyGame = {
    gamedatas: {
        players: {
            '20000123': { player_hero: 'moon-elf', player_color: '#ff0000' },
            '20000124': { player_hero: 'barbarian', player_color: '#00ff00' },
            '20000125': { player_hero: 'moon-elf', player_color: '#0000ff' },
        },
    },
    stocks: {},
};

function createElement(type: string, options: { id: string }) {
    const element = document.createElement(type);
    element.id = options.id;
    return element;
}

function initManager() {
    Object.keys(this.game.gamedatas.players).forEach((player_id) => {
        const player = this.game.gamedatas.players[player_id];
        const stockId = `dice-stock-${player_id}`;

        document.getElementById('stocks').appendChild(createElement('div', { id: stockId }));
        this.game.stocks[player_id] = new DiceStock(document.getElementById(stockId), {
            dieClass: `${player.player_hero}-dice`,
            lockColor: player.player_color,
        });
    });
}

function addDice() {
    for (const player_id in game.stocks) {
        const stock = game.stocks[player_id];
        stock.add({ id: getDiceId(), value: getNumber(), locked: false, rolled: true });
        stock.add({ id: getDiceId(), value: getNumber(), locked: false, rolled: true });
        stock.add({ id: getDiceId(), value: getNumber(), locked: false, rolled: true });
        stock.add({ id: getDiceId(), value: getNumber(), locked: false, rolled: true });
        stock.add({ id: getDiceId(), value: getNumber(), locked: false, rolled: true });
    }
}

let diceId = 1;
function getDiceId() {
    return '' + diceId++;
}

function getNumber() {
    return Math.floor(Math.random() * 6 + 1);
}

window.addEventListener('load', () => {
    setTimeout(addDice, 100);

    document.getElementById('btnMode').addEventListener('click', () => {
        document.querySelector('body').classList.toggle('mode_3d');
    });
    document.getElementById('btnReroll').addEventListener('click', () => {
        diceId = 1;
        addDice();
    });

    setTimeout(() => {
        const div = document.getElementById('dice-1');
        console.log('dice-1', div);
    }, 3000);
});
