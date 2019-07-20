const Stage = require('telegraf/stage');
const path = require('path');

const accountScene = require(path.join(__dirname, 'account'));
const { characterCreate, characterPlay, characterDelete, characterInventory } = require(path.join(__dirname, 'character'));
const game = require(path.join(__dirname, 'game'));
const gameEventsStart = require(path.join(__dirname, 'game', 'events', 'start'));
const gameZoneTown = require(path.join(__dirname, 'game', 'zone', 'town'));

module.exports = () => {
    return new Stage([
        accountScene,
        characterCreate,
        characterPlay,
        characterDelete,
        characterInventory,
        game,
        gameEventsStart,
        gameZoneTown
    ]);
};
