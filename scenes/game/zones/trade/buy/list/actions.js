module.exports = {
    async selectInspectItem(ctx) {
        const data = JSON.parse(ctx.callbackQuery.data);
        ctx.session.state.inspectItemId = data.id;
        await ctx.scene.enter('gameZonesItemInspect');
    },

    async buyItem(ctx) {
        const data = JSON.parse(ctx.callbackQuery.data);
        ctx.session.state.buyItemId = data.id;
        await ctx.scene.enter('gameZonesItemBye');
    }
};