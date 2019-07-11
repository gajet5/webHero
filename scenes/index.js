const Stage = require('telegraf/stage');
const path = require('path');

const accountScene = require(path.join(__basedir, 'scenes', 'account'));
const { characterCreateScene, characterPlayScene, characterDeleteScene } = require(path.join(__basedir, 'scenes', 'character'));

module.exports = () => {
    return new Stage([
        accountScene,
        characterCreateScene,
        characterPlayScene,
        characterDeleteScene
    ]);
};