const path = require('path');
const charactersItemsModel = require(path.join(__basedir, 'models', 'charactersItems'));

module.exports = {
    async sellTrash(ctx) {
        const items = await charactersItemsModel.find({
            owner: ctx.session.character.id,
        });

        for (let item of items) {
            if (item.autoSell) {
                await item.delete();
            }
        }

        ctx.session.messages.push(await ctx.reply('Весь хлам продан.'));
    }
};