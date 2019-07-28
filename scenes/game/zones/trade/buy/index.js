const path = require('path');

module.exports = [
    require(path.join(__dirname, 'category')),
    require(path.join(__dirname, 'list'))
];