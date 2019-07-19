module.exports = (ctx, next) => {
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
        ctx.scene.enter('account');
        return;
    }

    next();
};
