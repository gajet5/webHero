const Stage = require('telegraf/stage');
const path = require('path');

const accountScene = require(path.join(__basedir, 'scenes', 'account'));
const { characterCreateScene, characterPlayScene, characterDeleteScene } = require(path.join(__basedir, 'scenes', 'character'));
const game = require(path.join(__basedir, 'scenes', 'game'));
const gameEventsStart = require(path.join(__basedir, 'scenes', 'game', 'events', 'start'));
const gameZones = require(path.join(__basedir, 'scenes', 'game', 'zones'));

module.exports = () => {
    return new Stage([
        accountScene,
        characterCreateScene,
        characterPlayScene,
        characterDeleteScene,
        game,
        gameEventsStart,
        gameZones
    ]);
};