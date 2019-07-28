const path = require('path');
const Scene = require('telegraf/scenes/base');

const sceneCleaner = require(path.join(__basedir, 'utils', 'sceneCleaner'));
const charactersModel = require(path.join(__basedir, 'models', 'characters'));
const getZoneData = require(path.join(__basedir, 'utils', 'getZoneData'));
const keyboards = require(path.join(__dirname, 'keyboards'));
const actions = require(path.join(__dirname, 'actions'));

module.exports = new Scene('gameZonesTown')
    .enter(async (ctx) => {
        const msgs = [];
        const character = await charactersModel.findById(ctx.session.character.id);
        const zoneData = await getZoneData(character);

        msgs.push(await ctx.reply('.', keyboards.getCharacterActionKeyboard()));
        msgs.push(await ctx.replyWithPhoto({ source: zoneData.info.img }));
        msgs.push(await ctx.reply(zoneData.info.description, keyboards.getKeyboard(zoneData.actions)));

        for (let actionName in zoneData.actions) {
            module.exports.action(new RegExp(actionName), await actions[actionName]);
        }

        ctx.session.messages.push(...msgs);
    })
    .hears('🎒 Инвентарь', async ctx => {
        ctx.session.messages.push(ctx.update.message);
        await ctx.scene.enter('characterInventory')
    })
    .leave((ctx) => {
        ctx.session.scenes.previous = ctx.session.__scenes.current;
        sceneCleaner(ctx);
    });
