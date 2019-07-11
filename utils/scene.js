const path = require('path');

const sceneRulesCfg = require(path.join(__basedir, 'config', 'game', 'sceneRules'));
const errorsMessage = require(path.join(__basedir, 'data', 'dialogues', 'standarts', 'errors'));

module.exports = {
    rules(currentScene, nextScene) {
        return !!sceneRulesCfg[currentScene][nextScene];
    },

    async swith(ctx) {
        ctx.session.scene.nextScene = ctx.callbackQuery.data;

        if (this.rules(ctx.session.scene.currentScene, ctx.session.scene.nextScene)) {
            await ctx.scene.enter(ctx.session.scene.nextScene);
        } else {
            await ctx.reply(errorsMessage.sceneRules());
            await ctx.scene.enter(ctx.session.scene.currentScene);
        }
        ctx.session.scene.nextScene = '';
    }
};
