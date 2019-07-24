const path = require('path');

const charactersModel = require(path.join(__basedir, 'models', 'characters'));

module.exports = {
    info: {
        img: path.join(__dirname, '..', 'media', 'img', 'ti_town.jpg'),
        description: 'Описание деревни в которой оказывается наш герой'
    },
    actions: {
        getMerchants: {
            text: 'Торговать',
            handler: async (ctx) => {
                await charactersModel.findByIdAndUpdate(ctx.session.character.id, {
                    zone: 'trade'
                });
                await ctx.scene.enter('gameZonesRouter');
            }
        },
        getInformations: {
            text: 'Распросить местных',
            handler: async (ctx) => {
                await ctx.reply(`В стадии разработки`);
            }
        },
        goHunting: {
            text: 'Охота',
            handler: async (ctx) => {
                await ctx.reply(`В стадии разработки`);
            }
        },
        goAnotherTown: {
            text: 'Отправиться в другой город',
            handler: async(ctx) => {
                await ctx.reply(`В стадии разработки`);
            }
        }
    }
};
