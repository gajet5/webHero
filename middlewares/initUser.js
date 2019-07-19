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

    next();
};
