const path = require('path');
const Chance = require('chance');

const gameCfg = require(path.join(__basedir, 'config', 'game'));
const accountsModel = require(path.join(__basedir, 'models', 'accounts'));
const charactersModel = require(path.join(__basedir, 'models', 'characters'));
const charactersItemsModel = require(path.join(__basedir, 'models', 'charactersItems'));
const charactersEquipment = require(path.join(__basedir, 'models', 'charactersEquipment'));

const keyboards = require(path.join(__dirname, 'keyboards'));
const messages = require(path.join(__dirname, 'messages'));

module.exports = {
    async getStats(ctx) {
        const msgs = [];
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

        const characterHp = gameCfg.character.rateHp * stats.con;
        const characterMp = gameCfg.character.rateHp * stats.men;

        let account = await accountsModel.findById(ctx.session.account.id);
        let character = await charactersModel.create({
            account: account,
            maxHp: characterHp,
            curHp: characterHp,
            maxMp: characterMp,
            curMp: characterMp,
            stats
        });

        await account.updateOne({
            haveCharacter: true
        });

        await charactersItemsModel.create({
            owner: character,
            itemId: 1,
            category: 'etc',
            type: 'null',
            count: 0
        });

        await charactersEquipment.create({
            owner: character,
        });

        ctx.session.character.id = character.id;

        msgs.push(await ctx.reply(messages.stats(stats), keyboards.getGameAccountKeyboard()));
        ctx.session.messages.push(...msgs);
    }
};
