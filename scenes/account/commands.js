module.exports = {
    async swichScene(ctx) {
        await ctx.scene.enter(ctx.callbackQuery.data);
    }
};
