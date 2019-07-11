const path = require('path');

const sceneUtils = require(path.join(__basedir, 'utils', 'scene'));

module.exports = {
    async swichScene(ctx) {
        await sceneUtils.swith(ctx);
    }
};
