const path = require('path');
const Scene = require('telegraf/scenes/base');

const charactersModel = require(path.join(__basedir, 'models', 'characters'));
const charactersInventoryModel = require(path.join(__basedir, 'models', 'charactersInventory'));
const sceneUtils = require(path.join(__basedir, 'utils', 'scene'));
const commonUtils = require(path.join(__basedir, 'utils', 'common'));

const gameCharacterInventory = new Scene('characterInventoryScene');

gameCharacterInventory.enter(async (ctx) => {
    const character = await charactersModel.findOne({ accountId: ctx.session.account.id });
    const invntory = await charactersInventoryModel.find({ ownerId: character.id });
    
    if (!invntory.length){
        await ctx.reply('Инвентарь пуст');
        await commonUtils.sleep(2);
        await sceneUtils.swith(ctx, 'game');
        return;
    }

    await ctx.reply('Вот твои вещи');
    await commonUtils.sleep(2);
    await sceneUtils.swith(ctx, 'game');
});

module.exports = gameCharacterInventory;
