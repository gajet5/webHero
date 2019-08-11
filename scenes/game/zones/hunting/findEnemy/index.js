const path = require('path');
const Scene = require('telegraf/scenes/base');
const Chance = require('chance');
const moment = require('moment');

const charactersModel = require(path.join(__basedir, 'models', 'characters'));
const sceneCleaner = require(path.join(__basedir, 'utils', 'sceneCleaner'));
//const getZoneData = require(path.join(__basedir, 'utils', 'getZoneData'));

// const keyboards = require(path.join(__dirname, 'keyboards'));

module.exports = new Scene('gameZonesHuntingFindEnemy')
    .enter(async ctx => {
        const chance = new Chance();
        const msgs = [];
        const character = await charactersModel.findById(ctx.session.character.id);
        // const zonesData = await getZoneData(character);
        // const zoneData = zonesData.zones[ctx.session.state.huntingZoneId];

        const msg = await ctx.reply('Вы осматриваетесь по сторонам.');
        msgs.push(msg);

        const end = moment().add(chance.integer({ min: 1, max: 10 }) , 'm');

        const interval = setInterval(async () => {
            const timeLeft = moment(end.diff(moment()));
            const countdown = timeLeft.format('mm:ss');

            if (timeLeft.valueOf() < 0) {
                clearInterval(interval);
                // go to select enemy
                console.log('searche end');
                return false;
            }

            await ctx.telegram.editMessageText(msg.chat.id, msg.message_id, undefined, `
${countdown}
Search enemy in location.
            `);

        }, 1000);

        ctx.session.messages.push(...msgs);
    })
    .leave(ctx => {
        ctx.session.scenes.previous = ctx.session.__scenes.current;
        sceneCleaner(ctx);
    });
