const path = require('path');
const Scene = require('telegraf/scenes/base');

const charactersModel = require(path.join(__basedir, 'models', 'characters'));
const charactersInventoryModel = require(path.join(__basedir, 'models', 'charactersInventory'));
const sceneUtils = require(path.join(__basedir, 'utils', 'scene'));

const gameCharacterInventory = new Scene('gameCharacterInventory');

gameCharacterInventory.enter(async (ctx) => {
    const character = await charactersModel.findOne({ accountId: ctx.session.account.id });
    const invntory = await charactersInventoryModel.find({ ownerId: character.id });
    
    if (!inventory ){
        await ctx.replay('Инвентарь пуст');
        await sceneUtils.switch(ctx, 'game');
        return;
    }
    await ctx.replay('Вот твои вещи');
    await sceneUtils.switch(ctx, 'game');
});

module.exports = gameCharacterInventory;
