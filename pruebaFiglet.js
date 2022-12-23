const chalk= require('chalk');
const figlet = require('figlet');

figlet('Nati Otero', function(err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(chalk.green(data));
});
