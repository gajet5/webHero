const path = require('path');

module.exports = [
    require(path.join(__dirname, 'one')),
    require(path.join(__dirname, 'many'))
];