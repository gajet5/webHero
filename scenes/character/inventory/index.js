const path = require('path');
const Scene = require('telegraf/scenes/base');

const sceneCleaner = require(path.join(__basedir, 'utils', 'sceneCleaner'));
const itemsData = require(path.join(__basedir, 'data', 'items'));
const charactersItemsModel = require(path.join(__basedir, 'models', 'charactersItems'));

const keyboards = require(path.join(__dirname, 'keyboards'));

module.exports = new Scene('characterInventory')
    .enter(async (ctx) => {
        const msgs = [];
        const inventory = await charactersItemsModel.find({ ownerId: ctx.session.character.id });

        if (!inventory.length) {
            msgs.push(await ctx.reply('Инвентарь пуст', keyboards.getCloseInventaryKeyboard()));
            ctx.session.messages.push(...msgs);
            return;
        }

        msgs.push(await ctx.reply('Вещи в инветате', keyboards.getCloseInventaryKeyboard()));

        for (let charItem of inventory) {
            const item = itemsData[charItem.category][charItem.itemId];
            msgs.push(await ctx.reply(`${ item.name } - ${ charItem.count }`));
        }

        ctx.session.messages.push(...msgs);
    })
    .hears('❌ Закрыть инвентарь', async ctx => {
        ctx.session.messages.push(ctx.update.message);
        await ctx.scene.enter(ctx.session.scenes.previous);
    })
    .leave((ctx) => {
        ctx.session.scenes.previous = ctx.session.__scenes.current;
        sceneCleaner(ctx);
    });
