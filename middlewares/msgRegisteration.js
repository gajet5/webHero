module.exports = (ctx, next) => {
    ctx.session.messages.push(ctx.message);
    next();
};
