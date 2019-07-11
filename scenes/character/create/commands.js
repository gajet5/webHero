const path = require('path');

const accountsModel = require(path.join(__basedir, 'models', 'accounts'));
const charactersModel = require(path.join(__basedir, 'models', 'characters'));

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
            for (let i = 0; i < 3; i += 1) {
                stats[item] += randomStat();
            }
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
    }
};
