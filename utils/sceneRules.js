const path = require('path');

const sceneRulesCfg = require(path.join(__basedir, 'config', 'game', 'sceneRules'));

module.exports = async ({ scene, reply, session: { currentScene, nextScene }}) => {
    try {
        if (!!sceneRulesCfg[currentScene][nextScene]) {
            return true;
        }
        await reply('Вам запрещен такой переход между сценами');
        await scene.enter(currentScene);
        return false;
    } catch (e) {
        console.log(e);
    }
};
