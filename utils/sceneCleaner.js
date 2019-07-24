module.exports = (ctx) => {
    for ({ message_id: id } of ctx.session.messages) {
        try {
            ctx.deleteMessage(id);
        } catch (e) {
            console.log(error.message)
        }
    }

    ctx.session.messages = [];
};
