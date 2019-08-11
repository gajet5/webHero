const path = require('path');

module.exports = [
    require(path.join(__dirname, 'router')),
    require(path.join(__dirname, 'town')),
    ...require(path.join(__dirname, 'trade')),
    ...require(path.join(__dirname, 'hunting'))
];
