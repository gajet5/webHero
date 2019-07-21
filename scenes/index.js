const Stage = require('telegraf/stage');
const path = require('path');

const account = require(path.join(__dirname, 'account'));
const { characterCreate, characterPlay, characterDelete, characterInventory } = require(path.join(__dirname, 'character'));
const game = require(path.join(__dirname, 'game'));
const gameEventsStart = require(path.join(__dirname, 'game', 'events', 'start'));
const gameZoneTown = require(path.join(__dirname, 'game', 'zone', 'town'));
const gameZoneTrade = require(path.join(__dirname, 'game', 'zone', 'trade'));

module.exports = () => {
    return new Stage([
        account,
        characterCreate,
        characterPlay,
        characterDelete,
        characterInventory,
        game,
        gameEventsStart,
        gameZoneTown,
        gameZoneTrade
    ]);
};
