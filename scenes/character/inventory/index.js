const path = require('path');
const Scene = require('telegraf/scenes/base');

const sceneCleaner = require(path.join(__basedir, 'utils', 'sceneCleaner'));

const charactersModel = require(path.join(__basedir, 'models', 'characters'));
const charactersItemsModel = require(path.join(__basedir, 'models', 'charactersItems'));

const keyboards = require(path.join(__dirname, 'keyboards'));

module.exports = new Scene('characterInventory')
    .enter(async (ctx) => {
        const msgs = [];
        const character = await charactersModel.findOne({ accountId: ctx.session.account.id });
        const invntory = await charactersItemsModel.find({ ownerId: character.id });

        if (!invntory.length) {
            msgs.push(await ctx.reply('Инвентарь пуст', keyboards.getCloseInventaryKeyboard()));
        } else {
            msgs.push(await ctx.reply('Вещи в инветате', keyboards.getCloseInventaryKeyboard()));
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
