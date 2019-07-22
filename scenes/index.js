const Stage = require('telegraf/stage');
const path = require('path');

const account = require(path.join(__dirname, 'account'));
const { characterCreate, characterPlay, characterDelete, characterInventory } = require(path.join(__dirname, 'character'));
const game = require(path.join(__dirname, 'game'));
const gameEventsStart = require(path.join(__dirname, 'game', 'events', 'start'));
const gameZonesTown = require(path.join(__dirname, 'game', 'zones', 'town'));
const gameZonesTrade = require(path.join(__dirname, 'game', 'zones', 'trade'));

module.exports = () => {
    return new Stage([
        account,
        characterCreate,
        characterPlay,
        characterDelete,
        characterInventory,
        game,
        gameEventsStart,
        gameZonesTown,
        gameZonesTrade
    ]);
};
