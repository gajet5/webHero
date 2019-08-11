const path = require('path');

module.exports = [
    require(path.join(__dirname, 'welcome')),
    require(path.join(__dirname, 'info')),
    require(path.join(__dirname, 'findEnemy'))
];
