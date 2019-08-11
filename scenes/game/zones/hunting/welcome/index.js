const path = require('path');
const Scene = require('telegraf/scenes/base');

const charactersModel = require(path.join(__basedir, 'models', 'characters'));
const sceneCleaner = require(path.join(__basedir, 'utils', 'sceneCleaner'));
const getZoneData = require(path.join(__basedir, 'utils', 'getZoneData'));

const keyboards = require(path.join(__dirname, 'keyboards'));
const actions = require(path.join(__dirname, 'actions'));

module.exports = new Scene('gameZonesHuntingWelcome')
    .enter(async ctx => {
        const msgs = [];
        const character = await charactersModel.findById(ctx.session.character.id);
        const zonesData = await getZoneData(character);

        msgs.push(await ctx.reply('.', keyboards.back()));

        msgs.push(await ctx.reply('Куда отправимся?', keyboards.getZones(zonesData.zones)));

        ctx.session.messages.push(...msgs);
    })
    .action(/go/, actions.goToZone)
    .hears('⬅ Вернуться', async ctx => {
        ctx.session.messages.push(ctx.update.message);
        await charactersModel.findByIdAndUpdate(ctx.session.character.id, {
            zone: 'town'
        });
        await ctx.scene.enter('gameZonesRouter');
    })
    .leave(ctx => {
        ctx.session.scenes.previous = ctx.session.__scenes.current;
        sceneCleaner(ctx);
    });
