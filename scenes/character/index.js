const path = require('path');

const characterCreateScene = require(path.join(__dirname, 'create'));
const characterPlayScene = require(path.join(__dirname, 'play'));
const characterDeleteScene = require(path.join(__dirname, 'delete'));
const characterInventoryScene = require(path.join(__dirname, 'inventory'));

module.exports = {
    characterCreateScene,
    characterPlayScene,
    characterDeleteScene,
    characterInventoryScene
};
