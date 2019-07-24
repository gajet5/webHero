const path = require('path');
const Scene = require('telegraf/scenes/base');

const sceneCleaner = require(path.join(__basedir, 'utils', 'sceneCleaner'));
const charactersModel = require(path.join(__basedir, 'models', 'characters'));
const getZoneData = require(path.join(__basedir, 'utils', 'getZoneData'));
const keyboards = require(path.join(__dirname, 'keyboards'));

module.exports = new Scene('gameZonesTrade')
    .enter(async (ctx) => {
        const msgs = [];
        const character = await charactersModel.findById(ctx.session.character.id);
        const zoneData = await getZoneData(character);

        msgs.push(await ctx.reply('.', keyboards.getKeyboard()));
        msgs.push(await ctx.replyWithPhoto({ source: zoneData.info.img }));
        msgs.push(await ctx.reply(zoneData.info.description, keyboards.getInlineKeyboard()));

        ctx.session.messages.push(...msgs);
    })
    .hears('⬅ Вернуться', async ctx => {
        ctx.session.messages.push(ctx.update.message);
        await charactersModel.findByIdAndUpdate(ctx.session.character.id, {
            zone: 'town'
        });
        await ctx.scene.enter(ctx.session.scenes.previous);
    })
    .leave((ctx) => {
        ctx.session.scenes.previous = ctx.session.__scenes.current;
        sceneCleaner(ctx);
    });