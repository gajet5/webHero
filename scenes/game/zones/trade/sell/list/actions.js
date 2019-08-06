module.exports = {
    async sellItem(ctx) {
        const data = JSON.parse(ctx.callbackQuery.data);
        ctx.session.state.sellItemId = data.id;
        ctx.session.state.sellItemCategory = data.ct;
        ctx.session.state.sellItemCount = data.cn;
        await ctx.scene.enter('itemSellOne');
    }
};
