const path = require('path');

const accountsModel = require(path.join(__basedir, 'models', 'accounts'));
const charactersModel = require(path.join(__basedir, 'models', 'characters'));

const characterCreateMessage = require(path.join(__basedir, 'data', 'dialogues', 'character', 'create'));

const sceneUtils = require(path.join(__basedir, 'utils', 'scene'));

module.exports = {
    async getStats(ctx) {
        function randomStat() {
            let numb;

            do {
                numb = Math.round((Math.random() * 10) % 7);
            } while (numb === 0);

            return numb;
        }

        const stats = {
            int: 0,
            str: 0,
            con: 0,
            men: 0,
            dex: 0,
            wit: 0
        };

        for (let item in stats) {
            let rndStats = [];

            for (let i = 0; i < 4; i += 1) {
                rndStats.push(randomStat());
            }

            rndStats.splice(rndStats.findIndex(value => Math.min(...rndStats) === value), 1);
            rndStats.forEach(value => stats[item] += value);
        }

        let account = await accountsModel.findById(ctx.session.account.id);
        let character = await charactersModel.create({
            accountId: account,
            stats
        });
        await account.updateOne({
            haveCharacter: true
        });
        ctx.session.character.id = character.id;

        await ctx.reply(characterCreateMessage.chacterIsCreated(stats));

        await sceneUtils.swith(ctx, 'game');
    }
};
