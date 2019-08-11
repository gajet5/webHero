const path = require('path');
const Scene = require('telegraf/scenes/base');

const accountsModel = require(path.join(__basedir, 'models', 'accounts'));
const charactersModel = require(path.join(__basedir, 'models', 'characters'));

module.exports = new Scene('gameEventsStart')
    .enter(async (ctx) => {
        await ctx.reply(`Вступление новой игры`);

        await accountsModel.findByIdAndUpdate(ctx.session.account.id, {
            firstTime: false
        });

        await charactersModel.findByIdAndUpdate(ctx.session.character.id, {
            mapRegion: 'adrin',
            zone: 'town'
        });

        await ctx.scene.enter('gameZonesRouter')
    })
    .leave(async (ctx) => {
        ctx.session.scenes.previous = ctx.session.__scenes.current;
    });
