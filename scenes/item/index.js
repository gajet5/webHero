const path = require('path');

module.exports = [
    require(path.join(__dirname, 'inspect')),
    require(path.join(__dirname, 'buy')),
    ...require(path.join(__dirname, 'sell'))
];