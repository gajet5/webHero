const path = require('path');
const Scene = require('telegraf/scenes/base');

const accountsModel = require(path.join(__basedir, 'models', 'accounts'));
const charactersModel = require(path.join(__basedir, 'models', 'characters'));

module.exports = new Scene('characterRemove')
    .enter(async (ctx) => {
        await accountsModel.findByIdAndUpdate(ctx.session.account.id, { haveCharacter: false });
        await charactersModel.deleteMany({ accountId: ctx.session.account.id });
        await ctx.scene.enter('account');
    })
    .leave((ctx) => {
        ctx.session.scenes.previous = ctx.session.__scenes.current;
    });
