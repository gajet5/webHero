const path = require('path');

const characterCreate = require(path.join(__dirname, 'create'));
const characterPlay = require(path.join(__dirname, 'play'));
const characterDelete = require(path.join(__dirname, 'delete'));
const characterInventory = require(path.join(__dirname, 'inventory'));

module.exports = {
    characterCreate,
    characterPlay,
    characterDelete,
    characterInventory
};
