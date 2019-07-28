const path = require('path');
const Scene = require('telegraf/scenes/base');

const itemsData = require(path.join(__basedir, 'data', 'items'));
const charactersModel = require(path.join(__basedir, 'models', 'characters'));
const getZoneData = require(path.join(__basedir, 'utils', 'getZoneData'));

module.exports = new Scene('gameZonesTradeBuyList')
    .enter(async (ctx) => {
        const character = await charactersModel.findById(ctx.session.character.id);
        const zoneData = await getZoneData(character);
        const buylist = zoneData.buylist[ctx.session.state.tradeBuyCategory];
        const itemsList = [];

        buylist.forEach(value => {
            const item = itemsData[ctx.session.state.tradeBuyCategory][value];
            item['id'] = value;
            itemsList.push(item);
        });

        for (let item of itemsList) {
            ctx.session.messages.push(await ctx.reply(`
Название: ${item.name}
Цена: ${item.price}
            `, keyboards.inspect(item.id)));
        }
    })
    .hears('⬅ Вернуться', async ctx => {
        ctx.session.messages.push(ctx.update.message);
        await ctx.scene.enter(ctx.session.scenes.previous);
    })
    .leave((ctx) => {
        sceneCleaner(ctx);
        ctx.session.scenes.previous = ctx.session.__scenes.current;
    });
