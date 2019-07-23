const Stage = require('telegraf/stage');
const path = require('path');

module.exports = () => {
    return new Stage([
        require(path.join(__dirname, 'account')),
        ...require(path.join(__dirname, 'character')),
        ...require(path.join(__dirname, 'game'))
    ]);
};
