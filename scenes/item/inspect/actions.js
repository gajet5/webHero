module.exports = {
    async buyItem(ctx) {
        const data = JSON.parse(ctx.callbackQuery.data);
        ctx.session.state.buyItemId = data.id;
        await ctx.scene.enter('itemBuy');
    }
};