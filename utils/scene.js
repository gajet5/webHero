const path = require('path');

const sceneRulesCfg = require(path.join(__basedir, 'config', 'game', 'sceneRules'));
const errorsMessage = require(path.join(__basedir, 'data', 'dialogues', 'standarts', 'errors'));

module.exports = {
    rules(current, next) {
        return !!sceneRulesCfg[current][next];
    },

    async swith(ctx, next) {
        if (this.rules(ctx.session.__scenes.current, next)) {
            await ctx.scene.enter(next);
        } else {
            await ctx.reply(errorsMessage.sceneRules());
            await ctx.scene.enter(ctx.session.__scenes.current);
        }
    }
};
