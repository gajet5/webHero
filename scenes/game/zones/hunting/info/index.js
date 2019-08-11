const path = require('path');
const Scene = require('telegraf/scenes/base');

const charactersModel = require(path.join(__basedir, 'models', 'characters'));
const sceneCleaner = require(path.join(__basedir, 'utils', 'sceneCleaner'));
const getZoneData = require(path.join(__basedir, 'utils', 'getZoneData'));

const keyboards = require(path.join(__dirname, 'keyboards'));

module.exports = new Scene('gameZonesHuntingInfo')
    .enter(async ctx => {
        const msgs = [];
        const character = await charactersModel.findById(ctx.session.character.id);
        const zonesData = await getZoneData(character);
        const zoneData = zonesData.zones[ctx.session.state.huntingZoneId];

        msgs.push(await ctx.reply(zoneData.info.name, keyboards.back()));
        msgs.push(await ctx.reply(zoneData.info.description, keyboards.findEnemy(zoneData.zones)));

        ctx.session.messages.push(...msgs);
    })
    .action(/findEnemy/, async ctx => {
        await ctx.scene.enter('gameZonesHuntingFindEnemy');
    })
    .hears('⬅ Вернуться', async ctx => {
        ctx.session.messages.push(ctx.update.message);
        await ctx.scene.enter(ctx.session.scenes.previous);
    })
    .leave(ctx => {
        ctx.session.scenes.previous = ctx.session.__scenes.current;
        sceneCleaner(ctx);
    });
