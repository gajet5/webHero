const path = require('path');
const Scene = require('telegraf/scenes/base');

const charactersModel = require(path.join(__basedir, 'models', 'characters'));

const getZoneData = require(path.join(__basedir, 'utils', 'getZoneData'));

const keyboards = require(path.join(__dirname, 'keyboards'));

const game = new Scene('gameZoneTown');

game.enter(async (ctx) => {
    const character = await charactersModel.findById(ctx.session.character.id);
    const zoneData = await getZoneData(character);

    await ctx.reply('.', keyboards.getCharacterActionKeyboard());
    await ctx.replyWithPhoto({ source: zoneData.info.img });
    await ctx.reply(zoneData.info.description, keyboards.getKeyboard(zoneData.actions));

    for (let action in zoneData.actions) {
        game.action(new RegExp(action), zoneData.actions[action].handler);
    }
});

game.hears('🎒 Инвентарь', async ctx => await ctx.scene.enter('characterInventory'));

game.leave((ctx) => ctx.session.scenes.previous = ctx.session.__scenes.current);

module.exports = game;
