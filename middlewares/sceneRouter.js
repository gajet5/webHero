module.exports = async (ctx, next) => {
    if (!ctx.callbackQuery) {
        next();
        return;
    }

    const data = JSON.parse(ctx.callbackQuery.data);

    if(data.command === 'switchScene') {
        await ctx.scene.enter(data.sceneName);
        return;
    }

    next();
};
