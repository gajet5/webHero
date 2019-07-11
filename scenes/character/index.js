const path = require('path');

const characterCreateScene = require(path.join(__basedir, 'scenes', 'character', 'create'));
const characterPlayScene = require(path.join(__basedir, 'scenes', 'character', 'play'));
const characterDeleteScene = require(path.join(__basedir, 'scenes', 'character', 'delete'));

module.exports = {
    characterCreateScene,
    characterPlayScene,
    characterDeleteScene
};
