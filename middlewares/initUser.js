module.exports = (ctx, next) => {
    if (!ctx.session.scene || !ctx.session.scene.currentScene) {
        ctx.session.scene = {};
        ctx.session.account = {};
        ctx.session.character = {};

        ctx.scene.enter('account');
    }
    next();
};
