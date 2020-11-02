const chalk = require('chalk');
var beep = require('beepbeep')
let msg = chalk.bgYellow(chalk.blue('Some text ') + chalk.black('to test library'));
console.log(msg);
beep(2);