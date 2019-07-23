const path = require('path');

module.exports = [
    ...require(path.join(__dirname, 'events')),
    ...require(path.join(__dirname, 'zones'))
];
