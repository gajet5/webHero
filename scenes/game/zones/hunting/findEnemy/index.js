const path = require('path');
const Scene = require('telegraf/scenes/base');
const Chance = require('chance');
const moment = require('moment');

const sceneCleaner = require(path.join(__basedir, 'utils', 'sceneCleaner'));

module.exports = new Scene('gameZonesHuntingFindEnemy')
    .enter(async ctx => {
        const chance = new Chance();
        const msgs = [];

        const msg = await ctx.reply('Вы осматриваетесь по сторонам.');
        msgs.push(msg);

        const end = moment().add(chance.integer({ min: 1, max: 10 }) , 's');

        const interval = setInterval(async () => {
            const timeLeft = moment(end.diff(moment()));
            const countdown = timeLeft.format('mm:ss');

            if (timeLeft.valueOf() < 0) {
                clearInterval(interval);
                await ctx.scene.enter('gameZonesHuntingSelectEnemy');
                return false;
            }

            await ctx.telegram.editMessageText(msg.chat.id, msg.message_id, undefined, `
${countdown}
Вы осматриваетесь по сторонам.
            `);

        }, 1000);

        ctx.session.messages.push(...msgs);
    })
    .leave(ctx => {
        ctx.session.scenes.previous = ctx.session.__scenes.current;
        sceneCleaner(ctx);
    });
