module.exports = {
    async selectTradeCategory(ctx) {
        ctx.session.state.buyItemCategory = ctx.callbackQuery.data;
        await ctx.scene.enter('gameZonesTradeBuyList');
    }
};