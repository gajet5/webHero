module.exports = {
    async selectTradeCategory(ctx) {
        ctx.session.state.tradeBuyCategory = ctx.callbackQuery.data;
        await ctx.scene.enter('gameZonesTradeBuyList');
    }
};