const path = require('path');

module.exports = [
    require(path.join(__dirname, 'options')),
    require(path.join(__dirname, 'list'))
];
