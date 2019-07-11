const path = require('path');

const sceneRulesCfg = require(path.join(__basedir, 'config', 'game', 'sceneRules'));
const sceneRulesErrorMessage = require(path.join(__basedir, 'data', 'dialogues', 'standarts', 'errors'));

module.exports = async ({ scene, reply, session: { currentScene, nextScene }}) => {
    try {
        if (!!sceneRulesCfg[currentScene][nextScene]) {
            return true;
        }
        await reply(sceneRulesErrorMessage);
        await scene.enter(currentScene);
        return false;
    } catch (e) {
        console.log(e);
    }
};
