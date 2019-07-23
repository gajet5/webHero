module.exports = (ctx, next) => {
    function decorator(fn) {
        return async function () {
            const result = await fn.apply(ctx, arguments);
            ctx.session.messages.push(result);
            return result;
        }
    }
    ctx.reply = decorator(ctx.reply);
    next();
};
