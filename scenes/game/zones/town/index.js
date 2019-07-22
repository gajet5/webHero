const path = require('path');
const Scene = require('telegraf/scenes/base');

const sceneCleaner = require(path.join(__basedir, 'utils', 'sceneCleaner'));
const charactersModel = require(path.join(__basedir, 'models', 'characters'));
const getZoneData = require(path.join(__basedir, 'utils', 'getZoneData'));
const keyboards = require(path.join(__dirname, 'keyboards'));

const gameZonesTown = new Scene('gameZonesTown');

gameZonesTown.enter(async (ctx) => {
    const character = await charactersModel.findById(ctx.session.character.id);
    const zoneData = await getZoneData(character);

    ctx.session.messages.push(await ctx.reply('.', keyboards.getCharacterActionKeyboard()));
    ctx.session.messages.push(await ctx.replyWithPhoto({ source: zoneData.info.img }));
    ctx.session.messages.push(await ctx.reply(zoneData.info.description, keyboards.getKeyboard(zoneData.actions)));

    for (let action in zoneData.actions) {
        gameZonesTown.action(new RegExp(action), zoneData.actions[action].handler);
    }
});

gameZonesTown.hears('🎒 Инвентарь', async ctx => await ctx.scene.enter('characterInventory'));

gameZonesTown.leave((ctx) => {
    ctx.session.scenes.previous = ctx.session.__scenes.current;
    sceneCleaner(ctx);
});

module.exports = gameZonesTown;
