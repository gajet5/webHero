const path = require('path');
const Scene = require('telegraf/scenes/base');

const sceneCleaner = require(path.join(__basedir, 'utils', 'sceneCleaner'));
const charactersModel = require(path.join(__basedir, 'models', 'characters'));
const charactersInventoryModel = require(path.join(__basedir, 'models', 'charactersInventory'));

const keyboards = require(path.join(__dirname, 'keyboards'));

const characterInventory = new Scene('characterInventory');

characterInventory.enter(async (ctx) => {
    const character = await charactersModel.findOne({ accountId: ctx.session.account.id });
    const invntory = await charactersInventoryModel.find({ ownerId: character.id });
    
    if (!invntory.length){
        ctx.session.messages.push(await ctx.reply('Инвентарь пуст', keyboards.getCloseInventaryKeyboard()));
        return;
    }

    ctx.session.messages.push(await ctx.reply('Вещи в инветате', keyboards.getCloseInventaryKeyboard()));
});

characterInventory.hears('❌ Закрыть инвентарь', async ctx => await ctx.scene.enter(ctx.session.scenes.previous));

characterInventory.leave((ctx) => {
    ctx.session.scenes.previous = ctx.session.__scenes.current;
    sceneCleaner(ctx);
});

module.exports = characterInventory;
