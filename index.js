/** prompt is used to  */
const prompt = require('prompt');

colors = {
    reset: '\033[0m',

    //text color

    black: '\033[30m',
    red: '\033[31m',
    green: '\033[32m',
    yellow: '\033[33m',
    blue: '\033[34m',
    magenta: '\033[35m',
    cyan: '\033[36m',
    white: '\033[37m',
}

 turn = 0;

 space = {
    1: ' ',
    2: ' ',
    3: ' ',
    4: ' ',
    5: ' ',
    6: ' ',
    7: ' ',
    8: ' ',
    9: ' '
};

/** Possible winning combinations */
 combos = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]];

function displayGame() {
    console.log('\033[36m \n' +
        ' ' + space[1] + ' | ' + space[2] + ' | ' + space[3] + '\n' +
        ' ---------\n' +
        ' ' + space[4] + ' | ' + space[5] + ' | ' + space[6] + '\n' +
        ' ---------\n' +
        ' ' + space[7] + ' | ' + space[8] + ' | ' + space[9] + '\n');

}

/** The play function passes the player input of space, determines if it is a valid move, then places the mark, also detects stalemates */
function play(player) {

    console.log('\033[32m Your turn ' + player);
    prompt.start();
    turn++;
    prompt.get(['space'], function (err, result) {

        if (checkSpace(result.space)) {
            placeSpace(result.space, player);
            displayGame();
            if (checkWinningCombos(player)) {
                console.log('\033[35m' + player + ' Wins!' + '\033[0m');
                return;
            }
            if (player === 'X') {
                play('O');
            } else {
                play('X');
            }
        } else {
            if (turn <= 9) {
                console.log('\033[31m Invalid space selected... Try again'); turn--;
            } else {
                console.log('\033[33m Stalemate!! Next game!');
                console.log('\033[0m')
                return;
            }
            play(player);
        }
    });
}

/** Places the playername (X or O) into available space */
function placeSpace(boardSpace, playerName) {
    space[boardSpace] = playerName;
}

/** Checks to see if the space is open */
function checkSpace(boardSpace) {
    return parseFloat(boardSpace) && space[boardSpace] === ' ';
}

/** Checks against potential winning combinations */
function checkWinningCombos(player) {
    for (var a = 0; a < combos.length; a++) {
        var playerNameCount = 0;
        for (var b = 0; b < combos[a].length; b++) {
            if (space[combos[a][b]] === player) {
                playerNameCount++;
            }
            if (playerNameCount === 3) {
                return true;
            }
        }
    }
    return false;
}

/** Initial print of the board */
console.log('\033[36m Locations: \n' +
    ' 1 | 2 | 3 \n' +
    ' --------- \n' +
    ' 4 | 5 | 6 \n' +
    ' --------- \n' +
    ' 7 | 8 | 9 \n');

/** Initializing game */
play('X')