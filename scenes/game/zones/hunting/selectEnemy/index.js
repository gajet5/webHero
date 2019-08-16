const path = require('path');
const Scene = require('telegraf/scenes/base');
const Chance = require('chance');

const charactersModel = require(path.join(__basedir, 'models', 'characters'));
const sceneCleaner = require(path.join(__basedir, 'utils', 'sceneCleaner'));
const getZoneData = require(path.join(__basedir, 'utils', 'getZoneData'));
const npcs = require(path.join(__basedir, 'data', 'npcs'));

const keyboards = require(path.join(__dirname, 'keyboards'));

module.exports = new Scene('gameZonesHuntingSelectEnemy')
    .enter(async ctx => {
        const chance = new Chance();
        const msgs = [];
        const character = await charactersModel.findById(ctx.session.character.id);
        const zonesData = await getZoneData(character);
        const npcsInZone = zonesData.zones[ctx.session.state.huntingZoneId].npcs;
        const opponents = [];
        let opponent;

        for (let npc of npcsInZone) {
            if (chance.bool({ likelihood: npc.chance })) {
                opponents.push(npc);
            }
        }

        if (!opponents.length) {
            msgs.push(await ctx.reply('Увы вы ничего не нашли.', keyboards.findEnemy()));
        } else if (opponents.length === 1) {
            opponent = opponents[0];
            msgs.push(await ctx.reply(`На вашем пути встал ${ npcs[opponent.id].name }.`, keyboards.actionWithEnemy()));
        } else {
            const index = chance.integer({ min: 1, max: opponents.length }) - 1;
            opponent = opponents[index];

            msgs.push(await ctx.reply(`На вашем пути встал ${ npcs[opponent.id].name }.`, keyboards.actionWithEnemy()));
        }

        ctx.session.state.opponentId = opponent.id;
        ctx.session.messages.push(...msgs);
    })
    .action(/findEnemy/, async ctx => {
        await ctx.scene.enter('gameZonesHuntingFindEnemy');
    })
    .action(/attack/, async ctx => {
        await ctx.scene.enter('gameZonesHuntingAutoBattle');
    })
    .action(/goToTown/, async ctx => {
        await charactersModel.findByIdAndUpdate(ctx.session.character.id, {
            zone: 'town'
        });
        await ctx.scene.enter('gameZonesRouter');
    })
    .leave(ctx => {
        ctx.session.scenes.previous = ctx.session.__scenes.current;
        sceneCleaner(ctx);
    });
