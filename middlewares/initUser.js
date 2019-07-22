module.exports = async (ctx, next) => {
    if (!ctx.session.scenes) {
        ctx.session.scenes = {};
    }

    if (!ctx.session.messages) {
        ctx.session.messages = [];
    }

    if (!ctx.session.user) {
        ctx.session.user = {};
    }

    if (!ctx.session.account) {
        ctx.session.account = {};
    }

    if (!ctx.session.character) {
        ctx.session.character = {};
    }

    if (!ctx.session.__scenes.current) {
        await ctx.scene.enter('account');
        return;
    }

    next();
};
