var game = {
    gamedatas: {
        players: {
            '20000123': { player_hero: 'moon-elf', player_color: '#ff0000' },
            '20000124': { player_hero: 'barbarian', player_color: '#00ff00' },
            '20000125': { player_hero: 'moon-elf', player_color: '#0000ff' }
        }
    },
    stocks: {}
};
function createElement(type, options) {
    var element = document.createElement(type);
    element.id = options.id;
    return element;
}
function initManager() {
    var _this = this;
    Object.keys(this.game.gamedatas.players).forEach(function (player_id) {
        var player = _this.game.gamedatas.players[player_id];
        var stockId = "dice-stock-".concat(player_id);
        document.getElementById('stocks').appendChild(createElement('div', { id: stockId }));
        _this.game.stocks[player_id] = new DiceStock(document.getElementById(stockId), {
            dieClass: "".concat(player.player_hero, "-dice"),
            lockColor: player.player_color
        });
    });
}
function addDice() {
    for (var player_id in game.stocks) {
        var stock = game.stocks[player_id];
        stock.add({ id: getDiceId(), value: getNumber(), locked: false, rolled: true });
        stock.add({ id: getDiceId(), value: getNumber(), locked: false, rolled: true });
        stock.add({ id: getDiceId(), value: getNumber(), locked: false, rolled: true });
        stock.add({ id: getDiceId(), value: getNumber(), locked: false, rolled: true });
        stock.add({ id: getDiceId(), value: getNumber(), locked: false, rolled: true });
    }
}
var diceId = 1;
function getDiceId() {
    return '' + diceId++;
}
function getNumber() {
    return Math.floor(Math.random() * 6 + 1);
}
window.addEventListener('load', function () {
    setTimeout(addDice, 100);
    document.getElementById('btnMode').addEventListener('click', function () {
        document.querySelector('body').classList.toggle('mode_3d');
    });
    document.getElementById('btnReroll').addEventListener('click', function () {
        diceId = 1;
        addDice();
    });
    setTimeout(function () {
        var div = document.getElementById('dice-1');
        console.log('dice-1', div);
    }, 3000);
});
