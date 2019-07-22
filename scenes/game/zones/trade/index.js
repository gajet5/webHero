const path = require('path');
const Scene = require('telegraf/scenes/base');

const charactersModel = require(path.join(__basedir, 'models', 'characters'));
const getZoneData = require(path.join(__basedir, 'utils', 'getZoneData'));
const keyboards = require(path.join(__dirname, 'keyboards'));

const gameZonesTrade = new Scene('gameZonesTrade');

gameZonesTrade.enter(async (ctx) => {
    const character = await charactersModel.findById(ctx.session.character.id);
    const zoneData = await getZoneData(character);

    await ctx.reply('.', keyboards.getKeyboard());
    await ctx.replyWithPhoto({ source: zoneData.info.img });
    await ctx.reply(zoneData.info.description, keyboards.getInlineKeyboard());

});

gameZonesTrade.hears('⬅ Вернуться', async ctx => {
    await charactersModel.findByIdAndUpdate(ctx.session.character.id, {
        zone: 'town'
    });

    await ctx.scene.enter(ctx.session.scenes.previous);
});

gameZonesTrade.leave((ctx) => ctx.session.scenes.previous = ctx.session.__scenes.current);

module.exports = gameZonesTrade;