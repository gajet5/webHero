const Stage = require('telegraf/stage');
const path = require('path');

const accountScene = require(path.join(__dirname, 'account'));
const { characterCreateScene, characterPlayScene, characterDeleteScene, characterInventoryScene } = require(path.join(__dirname, 'character'));
const game = require(path.join(__dirname, 'game'));
const gameEventsStart = require(path.join(__dirname, 'game', 'events', 'start'));
const gameZone = require(path.join(__dirname, 'game', 'zone'));

module.exports = () => {
    return new Stage([
        accountScene,
        characterCreateScene,
        characterPlayScene,
        characterDeleteScene,
        characterInventoryScene,
        game,
        gameEventsStart,
        gameZone
    ]);
};
