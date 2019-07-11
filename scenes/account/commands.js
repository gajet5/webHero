const path = require('path');

const sceneRules = require(path.join(__basedir, 'utils', 'sceneRules'));

module.exports = {
    async createCharacter(ctx) {
        ctx.session.nextScene = 'characterCreate';

        if (sceneRules(ctx)) {
            await ctx.scene.enter(ctx.session.nextScene);
        }
    }
};