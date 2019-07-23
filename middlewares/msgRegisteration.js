module.exports = (ctx, next) => {
    if (ctx.message) {
        ctx.session.messages.push(ctx.message);
    } else if (ctx.update.message) {
        ctx.session.messages.push(ctx.update.message);
    }
    next();
};
