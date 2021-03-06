const path = require('path');
const Scene = require('telegraf/scenes/base');

const accountsModel = require(path.join(__basedir, 'models', 'accounts'));
const charactersModel = require(path.join(__basedir, 'models', 'characters'));

module.exports = new Scene('gameZonesRouter')
    .enter(async (ctx) => {
        const account = await accountsModel.findById(ctx.session.account.id);
        const character = await charactersModel.findById(ctx.session.character.id);

        if (account.firstTime) {
            await ctx.scene.enter('gameEventsStart');
        }

        switch (character.zone) {
            case 'town':
                await ctx.scene.enter('gameZonesTown');
                break;
            case 'trade':
                await ctx.scene.enter('gameZonesTradeWelcome');
                break;
            case 'hunting':
                await ctx.scene.enter('gameZonesHuntingWelcome');
                break;
            default:
                await ctx.reply(`Игровой зоны не существует`);
                await ctx.scene.enter('account');
        }
    })
    .leave((ctx) => {
        ctx.session.scenes.previous = ctx.session.__scenes.current;
    });
