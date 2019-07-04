const path = require('path');
const cmdList = require(path.join(__basedir, 'commands', 'list'));

module.exports = `
${cmdList.getCmdStr('start')} - создание героя
${cmdList.getCmdStr('settings')} - настройки
${cmdList.getCmdStr('help')} - помощь
`;