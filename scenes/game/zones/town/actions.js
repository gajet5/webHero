const path = require('path');

const charactersModel = require(path.join(__basedir, 'models', 'characters'));

module.exports = {
    async getMerchants(ctx) {
        await charactersModel.findByIdAndUpdate(ctx.session.character.id, {
            zone: 'trade'
        });
        await ctx.scene.enter('gameZonesRouter');
    },
    async getInformations(ctx) {
        await ctx.reply('In dev')
    },
    async goHunting(ctx) {
        await ctx.reply('In dev')
    },
    async goAnotherTown(ctx) {
        await ctx.reply('In dev')
    }
};
