global.__basedir = __dirname;

const path = require('path');

const tlgBot = require(path.join(__basedir, 'services', 'tlgBot'));
const { connection } = require(path.join(__basedir, 'services', 'db'));

connection.once('open', async () => {
    const Bot = tlgBot.createTlgBot();
    await tlgBot.initializeTlgBot(Bot);
});
