const path = require('path');

module.exports = [
    require(path.join(__dirname, 'create')),
    require(path.join(__dirname, 'play')),
    require(path.join(__dirname, 'remove')),
    require(path.join(__dirname, 'inventory'))
];
