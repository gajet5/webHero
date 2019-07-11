const path = require('path');

const sceneRulesCfg = require(path.join(__basedir, 'config', 'game', 'sceneRules'));
const errorsMessage = require(path.join(__basedir, 'data', 'dialogues', 'standarts', 'errors'));

module.exports = {
    rules(currentScene, nextScene) {
        return !!sceneRulesCfg[currentScene][nextScene];
    },

    async swith(ctx) {
        ctx.session.nextScene = ctx.callbackQuery.data;

        if (this.rules(ctx.session.currentScene, ctx.session.nextScene)) {
            await ctx.scene.enter(ctx.session.nextScene);
            return true;
        }

        await ctx.reply(errorsMessage.sceneRules());
        await ctx.scene.enter(ctx.session.currentScene);

        return false;
    }
};
