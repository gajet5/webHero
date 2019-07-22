const path = require('path');

const buylist = path.join(__dirname, '..', 'buylist');
const pathToItems = path.join(__basedir, 'data', 'items');

module.exports = {
    info: {
        img: path.join(__dirname, '..', 'media', 'img', 'ti_merchant.jpg'),
        description: 'Описание торговой прощади города'
    },
    buylist: {
        armor: [],
        weapon: [],
        etc: ['1']
    },
    actions: {
        buyItems: {
            text: 'Купить',
            handler: async (ctx) => {
                await ctx.reply('Товары: ');

                for (let category in buylist) {
                    if (!buylist[category].length) {
                        continue;
                    }

                    await ctx.reply(`Категория: ${category}`); // todo: Сделать человеческие имена
                    const itemsInCategory = require(path.join(pathToItems, category));

                    for (let itemId in buylist[category]) {
                        let item = itemsInCategory[itemId];
                        await ctx.reply(`${item.name}: ${item.price}`);
                    }
                    await ctx.reply('...')
                }
            }
        },
        sellItems: {
            text: 'Продать',
            handler: async (ctx) => {
                await ctx.reply('Действие не назначено');
            }
        }
    }
};
