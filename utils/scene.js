const path = require('path');

const sceneRulesCfg = require(path.join(__basedir, 'config', 'game', 'sceneRules'));
const errorsMessage = require(path.join(__basedir, 'data', 'dialogues', 'standarts', 'errors'));

module.exports = {
    rules(currentScene, nextScene) {
        return !!sceneRulesCfg[currentScene][nextScene];
    },

    async swith(ctx, nextScene) {
        if (this.rules(ctx.session.scene.currentScene, nextScene)) {
            await ctx.scene.enter(nextScene);
        } else {
            await ctx.reply(errorsMessage.sceneRules());
            await ctx.scene.enter(ctx.session.scene.currentScene);
        }
    }
};
