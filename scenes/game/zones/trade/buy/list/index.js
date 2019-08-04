const path = require('path');
const Scene = require('telegraf/scenes/base');

const sceneCleaner = require(path.join(__basedir, 'utils', 'sceneCleaner'));
const itemsData = require(path.join(__basedir, 'data', 'items'));
const charactersModel = require(path.join(__basedir, 'models', 'characters'));
const getZoneData = require(path.join(__basedir, 'utils', 'getZoneData'));
const keyboards = require(path.join(__dirname, 'keyboards'));
const actions = require(path.join(__dirname, 'actions'));

module.exports = new Scene('gameZonesTradeBuyList')
    .enter(async (ctx) => {
        const msgs = [];
        const character = await charactersModel.findById(ctx.session.character.id);
        const zoneData = await getZoneData(character);
        const buylist = zoneData.buylist[ctx.session.state.tradeBuyCategory];
        const itemsList = [];

        buylist.forEach(value => {
            const item = itemsData[ctx.session.state.tradeBuyCategory][value];
            item['id'] = value;
            itemsList.push(item);
        });

        msgs.push(await ctx.reply('.', keyboards.back()));

        for (let item of itemsList) {
            msgs.push(await ctx.reply(`
Название: ${item.name}
Цена: ${item.price}
            `, keyboards.actions(item.id)));
        }

        ctx.session.messages.push(...msgs);
    })
    .action(/insp/, actions.selectInspectItem)
    .action(/buy/, actions.buyItem)
    .hears('⬅ Вернуться', async ctx => {
        ctx.session.messages.push(ctx.update.message);
        await ctx.scene.enter('gameZonesTradeBuyCategory');
    })
    .leave((ctx) => {
        sceneCleaner(ctx);
        ctx.session.scenes.previous = ctx.session.__scenes.current;
    });
