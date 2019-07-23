const path = require('path');
const Chance = require('chance');

const accountsModel = require(path.join(__basedir, 'models', 'accounts'));
const charactersModel = require(path.join(__basedir, 'models', 'characters'));

const keyboards = require(path.join(__dirname, 'keyboards'));

module.exports = {
    async getStats(ctx) {
        const chance = new Chance();

        const stats = {
            int: 0,
            str: 0,
            con: 0,
            men: 0,
            dex: 0,
            luck: 0
        };

        for (let item in stats) {
            let rndStats = [];

            for (let i = 0; i < 4; i += 1) {
                rndStats.push(chance.integer({
                    min: 1,
                    max: 6
                }));
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

        ctx.session.messages.push(await ctx.reply(`
Ваш интилект ${ stats.int }
Ваша сила ${ stats.str }
Ваша телосложение ${ stats.con }
Ваша сила разума ${ stats.men }
Ваш локовсть ${ stats.dex }
Ваше везение ${ stats.luck }
        `, keyboards.getGameAccountKeyboard()));
    }
};
