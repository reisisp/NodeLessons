const {Console} = require('console');
const fs = require('fs');
const readline = require('readline');
const util = require('util');

if (process.argv[2] === 'analysis') {
    console.log('Анализ логов');
    const readFilePromise = util.promisify(fs.readFile);
    readFilePromise(process.argv[3] + '.txt', 'utf8')
        .then((data) => {
            let wins = 0;
            let lose = 0;
            let draws = 0;
            let logs = data.split(data[1]);
            logs.forEach(el => {
                if (el === '1') wins += 1;
                if (el === '0') lose += 1;
                if (el === '2') draws += 1;
            });
            console.log('Number of parties: ' + (logs.length - 1));
            console.log('Wins: ' + wins);
            console.log('Lose: ' + lose);
            console.log('Draws: ' + draws);

        })
        .catch((err) => {
            console.log(err);
        })

} else {

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    const logger = new Console(fs.createWriteStream(process.argv[2] + '.txt'), fs.createWriteStream('err.txt'));
    let game = ['rock', 'scissors', 'paper'];


    rl.on('line', function (cmd) {
        if (game.includes(cmd)) {
            let compTurn = game[Math.floor(Math.random() * game.length)];
            let playerTurn = cmd;

            console.log(compTurn + ' vs ' + playerTurn)

            gameLogic(compTurn, playerTurn);
        } else if (cmd === 'exit') {
            rl.close();
        } else {
            logger.error('Incorrect value: ' + cmd);
            console.log('Incorrect value');
        }
    });

    function gameLogic(comp, player) {
        if (game.indexOf(player) === game.indexOf(comp)) {
            console.log('Draw');
            logger.log(2);
        } else if (game.indexOf(player) === 2 && game.indexOf(comp) === 0) {
            console.log('Player wins');
            logger.log(1);
        } else if (game.indexOf(comp) === 2 && game.indexOf(player) === 0) {
            console.log('Player lose');
            logger.log(0);
        } else if (game.indexOf(player) < game.indexOf(comp)) {
            console.log('Player wins');
            logger.log(1);
        } else {
            console.log('Player lose');
            logger.log(0);
        }
    }
}