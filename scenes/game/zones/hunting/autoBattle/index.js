const path = require('path');
const Scene = require('telegraf/scenes/base');
const Chance = require('chance');

const charactersModel = require(path.join(__basedir, 'models', 'characters'));
const charactersEquipmentModel = require(path.join(__basedir, 'models', 'charactersEquipment'));
const sceneCleaner = require(path.join(__basedir, 'utils', 'sceneCleaner'));
const npcs = require(path.join(__basedir, 'data', 'npcs'));

module.exports = new Scene('gameZonesHuntingAutoBattle')
    .enter(async ctx => {
        const chance = new Chance();
        const msgs = [];
        const character = await charactersModel.findById(ctx.session.character.id);
        const equipment = await charactersEquipmentModel.findOne({ owner: character });
        const opponent = npcs[ctx.session.state.opponentId];

        let curHp = character.curHp;
        let pDef = 0;
        let mDef = 0;
        let enemyHp = opponent.hp;

        for (let category in equipment) {
            if (!/weapons|armors/.test(category)) {
                continue;
            }
            
            for (let item in equipment[category]) {
                pDef += equipment[category][item].pDef;
                mDef += equipment[category][item].mDef;
            }
        }

        console.log(pDef);
        console.log(mDef);

        while (true) {
            if (curHp < 0 || enemyHp < 0) {
                break;
            }




            curHp -= opponent.pAtk;
        }


        ctx.session.messages.push(...msgs);
    })
    .leave(ctx => {
        ctx.session.scenes.previous = ctx.session.__scenes.current;
        sceneCleaner(ctx);
    });
